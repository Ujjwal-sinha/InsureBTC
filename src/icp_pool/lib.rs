use candid::{CandidType, Deserialize, Nat, Principal};
use ic_cdk::api::call::call;
use ic_cdk_macros::*;
use ic_ledger_types::{
    AccountIdentifier, Memo, Subaccount, Tokens, DEFAULT_SUBACCOUNT, MAINNET_LEDGER_CANISTER_ID,
};
use std::cell::RefCell;
use std::collections::HashMap;

mod types;
use types::{
    Cover, Deposit, DepositErr, Pool, PoolInfo, Proposal, ProposalStatus, RiskType, Status,
    WithdrawErr,
};

use crate::types::TxReceipt;

const ZER0: u64 = 0;
const ICP_FEE: u64 = 10_000;

thread_local! {
    static STATE: RefCell<State> = RefCell::default();
}

#[derive(CandidType, Deserialize, Default)]
struct State {
    pools: HashMap<Nat, Pool>,
    pool_count: Nat,
    owner: Option<Principal>,
    bq_btc_address: Option<Principal>,
    cover_address: Option<Principal>,
    gov_address: Option<Principal>,
    ledger: Option<Principal>,
    participants: Vec<Principal>,
    participation: HashMap<Principal, Nat>,
    pool_covers: HashMap<Nat, Vec<Cover>>,
}

#[init]
fn init(owner: Principal, bq_btc: Principal) {
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        state.owner = Some(owner);
        state.bq_btc_address = Some(bq_btc);
    });
}

#[update(name = "createPool")]
async fn create_pool(
    risk_type: RiskType,
    pool_name: String,
    apy: Nat,
    min_period: Nat,
) -> Result<(), String> {
    let caller = ic_cdk::caller();
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        if state.owner != Some(caller) {
            return Err("Only owner can create pools".to_string());
        }
        let pool_count = state.pool_count.clone() + Nat::from(1u64);
        let new_pool = Pool {
            pool_name,
            risk_type,
            apy,
            min_period,
            tvl: Nat::from(ZER0),
            tcp: Nat::from(ZER0),
            is_active: true,
            percentage_split_balance: Nat::from(100u64),
            deposits: HashMap::new(),
        };
        state.pools.insert(pool_count.clone(), new_pool);
        state.pool_count = pool_count;
        Ok(())
    })
}

#[update(name = "updatePool")]
async fn update_pool(pool_id: Nat, apy: Nat, min_period: Nat) -> Result<(), String> {
    let caller = ic_cdk::caller();
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        if state.owner != Some(caller) {
            return Err("Only owner can create pools".to_string());
        }

        let pool = state
            .pools
            .get_mut(&pool_id)
            .ok_or("Pool not found".to_string())?;
        pool.apy = apy;
        pool.min_period = min_period;
        Ok(())
    })
}

#[update(name = "reducePercentageSplit")]
async fn reduce_percentage_split(pool_id: Nat, percentage_split: Nat) -> () {
    let caller = ic_cdk::caller();
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        if state.cover_address != Some(caller) {
            ic_cdk::trap("Only cover contract can create pools");
        }

        match state.pools.get_mut(&pool_id) {
            Some(pool) => pool.percentage_split_balance -= percentage_split,
            None => ic_cdk::trap("Pool not found"),
        }
    })
}

#[update(name = "increasePercentageSplit")]
async fn increase_percentage_split(pool_id: Nat, percentage_split: Nat) -> () {
    let caller = ic_cdk::caller();
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        if state.cover_address != Some(caller) {
            ic_cdk::trap("Only cover contract can create pools");
        }

        match state.pools.get_mut(&pool_id) {
            Some(pool) => pool.percentage_split_balance += percentage_split,
            None => ic_cdk::trap("Pool not found"),
        }
    })
}

#[update(name = "deactivatePool")]
async fn deactivate_pool(pool_id: Nat) -> Result<(), String> {
    let caller = ic_cdk::caller();
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        if state.owner != Some(caller) {
            return Err("Only owner can create pools".to_string());
        }

        let pool = state
            .pools
            .get_mut(&pool_id)
            .ok_or("Pool not found".to_string())?;
        pool.is_active = false;
        Ok(())
    })
}

#[query(name = "getPool")]
fn get_pool(pool_id: Nat) -> Option<Pool> {
    STATE.with(|state| {
        let state = state.borrow();
        match state.pools.get(&pool_id).cloned() {
            Some(pool) => Some(pool),
            None => None,
        }
    })
}

#[query(name = "getAllPools")]
fn get_all_pools() -> Vec<(Nat, Pool)> {
    STATE.with(|state| {
        let state = state.borrow();
        state
            .pools
            .iter()
            .map(|(k, v)| (k.clone(), v.clone()))
            .collect()
    })
}

#[update(name = "updatePoolCovers")]
async fn update_pool_covers(pool_id: Nat, new_cover: Cover) -> Result<(), String> {
    let caller = ic_cdk::caller();
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        if state.cover_address != Some(caller) {
            return Err("Only the cover contract can update covers".to_string());
        }

        let pool_covers = state
            .pool_covers
            .get_mut(&pool_id)
            .ok_or("Pool not found".to_string())?;
        let mut found = false;

        for cover in pool_covers.iter_mut() {
            if cover.id == new_cover.id {
                *cover = new_cover;
                found = true;
                break;
            }
        }

        if !found {
            return Err("Cover not found in pool".to_string());
        }

        Ok(())
    })
}

#[update(name = "addPoolCover")]
async fn add_pool_covers(pool_id: Nat, new_cover: Cover) -> Result<(), String> {
    let caller = ic_cdk::caller();
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        if state.cover_address != Some(caller) {
            return Err("Only the cover contract can add covers".to_string());
        }

        let pool_covers = state
            .pool_covers
            .get_mut(&pool_id)
            .ok_or("Pool not found".to_string())?;

        pool_covers.push(new_cover);

        Ok(())
    })
}

#[update(name = "getPoolCovers")]
async fn get_pool_covers(pool_id: Nat) -> Vec<Cover> {
    STATE.with(|state| {
        let state = state.borrow();

        let pool_covers = match state.pool_covers.get(&pool_id) {
            Some(covers) => covers.clone(),
            None => {
                ic_cdk::println!("No covers yet");
                Vec::new()
            }
        };

        pool_covers
    })
}

#[query(name = "getPoolsByAddress")]
fn get_pools_by_address(user_address: Principal) -> Vec<PoolInfo> {
    STATE.with(|state| {
        let state = state.borrow();
        state
            .pools
            .iter()
            .filter_map(|(pool_id, pool)| {
                pool.deposits.get(&user_address).map(|deposit| PoolInfo {
                    pool_name: pool.pool_name.clone(),
                    pool_id: pool_id.clone(),
                    daily_payout: deposit.daily_payout.clone(),
                    deposit_amount: deposit.amount.clone(),
                    apy: pool.apy.clone(),
                    min_period: pool.min_period.clone(),
                    tvl: pool.tvl.clone(),
                    tcp: pool.tcp.clone(),
                    is_active: pool.is_active,
                    accrued_payout: deposit.accrued_payout.clone(),
                })
            })
            .collect()
    })
}

#[update(name = "withdraw")]
async fn withdraw(pool_id: Nat, amount: Nat) -> Result<(), String> {
    let caller = ic_cdk::caller();

    let amount_to_mint = STATE.with(|state| {
        let mut state = state.borrow_mut();
        let pool = state.pools.get_mut(&pool_id).ok_or("Pool not found")?;

        if !pool.is_active {
            return Err("Pool is inactive".to_string());
        }

        if let Some(caller_deposit) = pool.deposits.get_mut(&caller) {
            let current_time = Nat::from(ic_cdk::api::time() / 1_000_000_000);
            if current_time < caller_deposit.expiry_date {
                return Err("Cant withdraw before the end of a deposit period".to_string());
            }
            if caller_deposit.status == Status::Withdrawn {
                return Err("Caller has already withdrawn".to_string());
            }
            if caller_deposit.amount == Nat::from(0u64) {
                return Err("Caller deposit is 0".to_string());
            }
            if amount > caller_deposit.amount {
                return Err("Amount is more than caller deposit".to_string());
            }

            caller_deposit.amount -= amount.clone();
            pool.tvl -= amount.clone();
            Ok(amount.clone())
        } else {
            Err("No deposit found for caller".to_string())
        }
    })?;

    match withdraw_icp(&amount_to_mint, caller).await {
        Ok(_) => Ok(()),
        Err(WithdrawErr::BalanceLow) => return Err("Insufficient balance".to_string()),
        Err(WithdrawErr::TransferFailure) => return Err("Transfer failed".to_string()),
        Err(WithdrawErr::BalanceCheckFailed) => return Err("Balance check failed".to_string()),
    }
}

#[update(name = "deposit")]
async fn deposit(pool_id: Nat, amount: u64) -> Result<(), String> {
    let caller = ic_cdk::caller();

    let (daily_payout, min_period) = STATE.with(|state| {
        let state = state.borrow();
        let pool = state.pools.get(&pool_id).ok_or("Pool not found")?;

        if !pool.is_active {
            return Err("Pool is inactive".to_string());
        }

        let daily_payout =
            (amount.clone() * pool.apy.clone()) / Nat::from(100u64) / Nat::from(365u64);
        let min_period = pool.min_period.clone();

        Ok((daily_payout, min_period))
    })?;

    let result = deposit_icp(caller, amount).await;

    match result {
        Ok(_) => {
            STATE.with(|state| {
                let mut state = state.borrow_mut();
                let pool = state.pools.get_mut(&pool_id).expect("Pool should be found");
                pool.tvl += amount.clone();

                let deposit = Deposit {
                    lp: caller,
                    amount: Nat(amount.into()),
                    pool_id: pool_id.clone(),
                    daily_payout,
                    status: Status::Active,
                    days_left: min_period.clone(),
                    start_date: Nat::from(ic_cdk::api::time() / 1_000_000_000),
                    expiry_date: Nat::from(ic_cdk::api::time() / 1_000_000_000)
                        + min_period * Nat::from(86400u64),
                    accrued_payout: Nat::from(0u64),
                };

                pool.deposits.insert(caller, deposit);

                if !state.participants.contains(&caller) {
                    state.participants.push(caller);
                }
                *state.participation.entry(caller).or_insert(Nat::from(0u64)) += Nat::from(1u64);
            });

            Ok(())
        }
        Err(DepositErr::BalanceLow) => return Err("Insufficient balance".to_string()),
        Err(DepositErr::TransferFailure) => return Err("Transfer failed".to_string()),
    }
}

#[update(name = "claimProposalFunds")]
pub async fn claim_proposal_funds(proposal_id: Nat) -> Result<(), String> {
    let caller = ic_cdk::caller();
    let (gov_canister, bqbtc_canister, cover_canister) = STATE.with(|state| {
        let state = state.borrow();
        let gov_canister = state
            .gov_address
            .ok_or("Governance canister address not set")?;
        let bqbtc_canister = state
            .bq_btc_address
            .ok_or("bqBTC canister address not set")?;
        let cover_canister = state
            .cover_address
            .ok_or("Cover canister address not set")?;
        Ok::<(Principal, Principal, Principal), String>((
            gov_canister,
            bqbtc_canister,
            cover_canister,
        ))
    })?;

    let proposal_details: Result<(Option<Proposal>,), _> = call(
        gov_canister,
        "getProposalDetails",
        (caller, proposal_id.clone()),
    )
    .await;
    let proposal = match proposal_details {
        Ok((Some(proposal),)) => proposal,
        Ok((None,)) => {
            return Err("Proposal not found".to_string());
        }
        Err(e) => {
            return Err(format!("Failed to fetch proposal: {:?}", e));
        }
    };

    if proposal.status != ProposalStatus::Approved || proposal.executed {
        return Err("Proposal not approved".to_string());
    }
    if proposal.proposal_param.user != caller {
        return Err("Not a valid proposal".to_string());
    }

    let _ = STATE.with(|state| {
        let mut state = state.borrow_mut();
        let pool = state
            .pools
            .get_mut(&proposal.proposal_param.pool_id)
            .ok_or("Pool should be found")?;

        if !pool.is_active {
            return Err("Pool is not active".to_string());
        }
        if pool.tvl < proposal.proposal_param.claim_amount {
            return Err("Not enough funds in the pool".to_string());
        }

        pool.tcp += proposal.proposal_param.claim_amount.clone();
        pool.tvl -= proposal.proposal_param.claim_amount.clone();

        Ok::<(), String>(())
    });

    let pool_covers = get_pool_covers(proposal.proposal_param.pool_id).await;
    for cover in pool_covers.iter() {
        let update_result: Result<((),), _> = call(
            cover_canister,
            "updateMaxAmount",
            (caller, cover.id.clone()),
        )
        .await;
        update_result.map_err(|e| format!("Failed to update cover id {}: {:?}", cover.id, e))?;
    }

    let update_status: Result<((),), _> = call(
        gov_canister,
        "updateProposalStatusToClaimed",
        (caller, proposal_id),
    )
    .await;
    update_status.map_err(|e| format!("Failed to update proposal status: {:?}", e))?;

    let mint_result: Result<(TxReceipt,), _> = call(
        bqbtc_canister,
        "mint",
        (caller, proposal.proposal_param.claim_amount),
    )
    .await;
    match mint_result {
        Ok(_) => return Ok(()),
        Err(e) => return Err(format!("Error minting BQ BTC: {:?}", e)),
    };
}

#[query(name = "getUserDeposit")]
pub async fn get_user_deposit(pool_id: Nat, user: Principal) -> Option<Deposit> {
    STATE.with(|state| {
        let state = state.borrow();
        match state.pools.get(&pool_id) {
            Some(pool) => match pool.deposits.get(&user) {
                Some(deposit) => Some(deposit.clone()),
                None => None,
            },
            None => None,
        }
    })
}

#[query(name = "getPoolTVL")]
pub async fn get_pool_tvl(pool_id: Nat) -> Result<Nat, String> {
    STATE.with(|state| {
        let state = state.borrow();
        let pool = state.pools.get(&pool_id).ok_or("Pool should be found")?;

        let tvl = pool.tvl.clone();

        Ok(tvl)
    })
}

#[query(name = "poolActive")]
pub async fn pool_active(pool_id: Nat) -> Result<bool, String> {
    STATE.with(|state| {
        let state = state.borrow();
        let pool = state.pools.get(&pool_id).ok_or("Pool should be found")?;

        let active = pool.is_active;

        Ok(active)
    })
}

#[query(name = "getAllParticipants")]
pub async fn get_all_participants() -> Result<Vec<Principal>, String> {
    STATE.with(|state| {
        let state = state.borrow();
        let participants = state.participants.clone();

        Ok(participants)
    })
}

#[query(name = "getUserParticipation")]
pub async fn get_user_participation(user: Principal) -> Result<Nat, String> {
    STATE.with(|state| {
        let state = state.borrow();
        let participation = state
            .participation
            .get(&user)
            .ok_or("error getting user participation")?;

        Ok(participation.clone())
    })
}

#[query(name = "getOwner")]
fn get_owner() -> Option<Principal> {
    STATE.with(|state| state.borrow().owner)
}
#[update(name = "updateCanisterIds")]
fn update_canister_ids(cover_contract: Principal, governance: Principal, bqbtc: Principal) {
    let caller = ic_cdk::caller();
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        if state.owner != Some(caller) {
            ic_cdk::trap("Only the owner can update canister IDs");
        }
        state.cover_address = Some(cover_contract);
        state.gov_address = Some(governance);
        state.bq_btc_address = Some(bqbtc);
    });
}

#[query(name = "getCanisterIds")]
fn get_canister_ids() -> (Option<Principal>, Option<Principal>, Option<Principal>) {
    STATE.with(|state| {
        let state = state.borrow();
        (state.gov_address, state.cover_address, state.bq_btc_address)
    })
}

#[update(name = "setOwner")]
fn set_owner(new_owner: Principal) -> Result<(), String> {
    let caller = ic_cdk::caller();
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        if state.owner != Some(caller) {
            return Err("Only the current owner can set a new owner".to_string());
        }
        state.owner = Some(new_owner);
        Ok(())
    })
}

#[update(name = "setCover")]
fn set_cover(cover: Principal) -> Result<(), String> {
    let caller = ic_cdk::caller();
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        if state.owner != Some(caller) {
            return Err("Only the current owner can set a new owner".to_string());
        }
        state.cover_address = Some(cover);
        Ok(())
    })
}

async fn deposit_icp(caller: Principal, amount: u64) -> Result<Nat, DepositErr> {
    let canister_id = ic_cdk::api::id();
    let ledger_canister_id = STATE
        .with(|s| s.borrow().ledger)
        .unwrap_or(MAINNET_LEDGER_CANISTER_ID);

    let account = AccountIdentifier::new(&canister_id, &principal_to_subaccount(&caller));

    let balance_args = ic_ledger_types::AccountBalanceArgs { account };
    let balance = ic_ledger_types::account_balance(ledger_canister_id, balance_args)
        .await
        .map_err(|_| DepositErr::TransferFailure)?;

    if balance.e8s() < amount + ICP_FEE {
        return Err(DepositErr::BalanceLow);
    }

    let transfer_args = ic_ledger_types::TransferArgs {
        memo: Memo(0),
        amount: balance - Tokens::from_e8s(amount),
        fee: Tokens::from_e8s(ICP_FEE),
        from_subaccount: Some(principal_to_subaccount(&caller)),
        to: AccountIdentifier::new(&canister_id, &DEFAULT_SUBACCOUNT),
        created_at_time: None,
    };
    ic_ledger_types::transfer(ledger_canister_id, transfer_args)
        .await
        .map_err(|_| DepositErr::TransferFailure)?
        .map_err(|_| DepositErr::TransferFailure)?;

    ic_cdk::println!(
        "Deposit of {} ICP in account {:?}",
        balance - Tokens::from_e8s(amount + ICP_FEE),
        &account
    );

    Ok((balance.e8s() - amount).into())
}

pub fn principal_to_subaccount(principal_id: &Principal) -> Subaccount {
    let mut subaccount = [0; std::mem::size_of::<Subaccount>()];
    let principal_id = principal_id.as_slice();
    subaccount[0] = principal_id.len().try_into().unwrap();
    subaccount[1..1 + principal_id.len()].copy_from_slice(principal_id);

    Subaccount(subaccount)
}

async fn withdraw_icp(amount: &Nat, user: Principal) -> Result<Nat, WithdrawErr> {
    let canister_id = ic_cdk::api::id();
    let ledger_canister_id = STATE
        .with(|s| s.borrow().ledger)
        .unwrap_or(MAINNET_LEDGER_CANISTER_ID);

    let canister_account = AccountIdentifier::new(&canister_id, &DEFAULT_SUBACCOUNT);
    let caller_account = AccountIdentifier::new(&user, &principal_to_subaccount(&user));

    // Fetch the canister's balance
    let balance_args = ic_ledger_types::AccountBalanceArgs {
        account: canister_account,
    };
    let canister_balance = ic_ledger_types::account_balance(ledger_canister_id, balance_args)
        .await
        .map_err(|_| WithdrawErr::BalanceCheckFailed)?;

    let total_amount = amount.to_owned() + ICP_FEE;

    if canister_balance.e8s() < total_amount {
        return Err(WithdrawErr::BalanceLow);
    }

    // Create transfer arguments
    let transfer_args = ic_ledger_types::TransferArgs {
        memo: Memo(0),
        amount: Tokens::from_e8s(
            amount
                .clone()
                .0
                .try_into()
                .map_err(|_| WithdrawErr::TransferFailure)?,
        ),
        fee: Tokens::from_e8s(ICP_FEE),
        from_subaccount: Some(DEFAULT_SUBACCOUNT),
        to: caller_account,
        created_at_time: None,
    };

    let transfer_result = ic_ledger_types::transfer(ledger_canister_id, transfer_args).await;

    match transfer_result {
        Ok(Ok(_)) => {
            ic_cdk::println!(
                "Withdrawal of {} ICP to account {:?}",
                amount,
                &caller_account
            );
            Ok(total_amount)
        }
        _ => Err(WithdrawErr::TransferFailure),
    }
}

ic_cdk::export_candid!();

// candid::export_service!();
// #[query(name = "__get_candid_interface_tmp_hack")]
// fn export_candid() -> String {
//     __export_service()
// }
