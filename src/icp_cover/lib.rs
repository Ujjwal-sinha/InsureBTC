use candid::{CandidType, Deserialize, Nat, Principal};
use ic_cdk::call;
use ic_cdk_macros::*;
use std::cell::RefCell;
use std::collections::HashMap;

mod types;
use types::{Cover, Deposit, DepositErr, GenericCoverInfo, Pool, RiskType, Status, WithdrawErr};

// Using bqBTC token contract for payments instead of ICP ledger

thread_local! {
    static STATE: RefCell<State> = RefCell::default();
}

#[derive(CandidType, Deserialize, Default)]
struct State {
    covers: HashMap<Nat, Cover>,
    cover_count: Nat,
    owner: Option<Principal>,
    bqbtc_address: Option<Principal>,
    lp_contract: Option<Principal>,
    gov_address: Option<Principal>,
    ledger: Option<Principal>,
    participants: Vec<Principal>,
    participation: HashMap<Principal, Nat>,
    user_covers: HashMap<Principal, HashMap<Nat, GenericCoverInfo>>,
    lp_claims: HashMap<Principal, HashMap<Nat, Nat>>,
    cover_ids: Vec<Nat>,
}

#[init]
fn init(lp_contract: Principal, initial_owner: Principal, governance: Principal, bqbtc: Principal) {
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        state.lp_contract = Some(lp_contract);
        state.owner = Some(initial_owner);
        state.gov_address = Some(governance);
        state.bqbtc_address = Some(bqbtc);
    });
}

#[update(name = "createCover")]
pub async fn create_cover(
    cover_id: Nat,
    cid: String,
    risk_type: RiskType,
    cover_name: String,
    chains: String,
    capacity: Nat,
    cost: Nat,
    pool_id: Nat,
) -> Result<(), String> {
    let _ = ic_cdk::caller();
    let pool_contract = STATE.with(|state| {
        let state = state.borrow();
        state.lp_contract.unwrap()
    });

    let pool_covers: Result<(Vec<Cover>,), _> =
        call(pool_contract, "getPoolCovers", (pool_id.clone(),)).await;
    let covers = match pool_covers {
        Ok((covers,)) => {
            if covers.is_empty() {
                ic_cdk::println!("Pool has no covers yet");
                Vec::new()
            } else {
                covers
            }
        }
        Err(e) => {
            ic_cdk::println!("Error calling getPoolCovers: {:?}", e);
            Vec::new()
        }
    };
    let pool_details: Result<(Option<Pool>,), _> =
        call(pool_contract, "getPool", (pool_id.clone(),)).await;
    let pool = match pool_details {
        Ok((Some(pool),)) => pool,
        Ok((None,)) => {
            return Err("Pool not found".to_string());
        }
        Err(e) => {
            return Err(format!("Failed to get pool: {:?}", e));
        }
    };

    for cover in covers.iter() {
        if cover.cover_name == cover_name || cover_id.clone() == cover.id {
            return Err("Cover Already exists!".to_string());
        }
    }

    if risk_type != pool.risk_type {
        return Err("Wrong pool, risk type must be the same!".to_string());
    }

    let precision = Nat::from(1_000_000_000_000_000_000u128);
    let maxamount: Nat =
        (pool.tvl * (capacity.clone() * precision.clone() / Nat::from(100u64))) / precision;

    STATE.with(|state| {
        let mut state = state.borrow_mut();

        let cover = Cover {
            id: cover_id.clone(),
            cover_name,
            risk_type,
            chains,
            capacity,
            cost,
            capacity_amount: maxamount.clone(),
            cover_values: Nat::from(0u64),
            max_amount: maxamount,
            pool_id,
            cid,
        };

        state.covers.insert(cover_id.clone(), cover);
        state.cover_ids.push(cover_id);
        Ok(())
    })
}

#[update(name = "updateCover")]
pub async fn update_cover(
    cover_id: Nat,
    cover_name: String,
    risk_type: RiskType,
    cid: String,
    chains: String,
    capacity: Nat,
    cost: Nat,
    pool_id: Nat,
) -> Result<(), String> {
    let pool_contract = STATE.with(|state| {
        let state = state.borrow();
        state.lp_contract.unwrap()
    });

    let pool_covers: Result<(Vec<Cover>,), _> =
        call(pool_contract, "getPoolCovers", (pool_id.clone(),)).await;
    let covers = match pool_covers {
        Ok((covers,)) => {
            if covers.is_empty() {
                ic_cdk::println!("Pool has no covers yet");
                Vec::new()
            } else {
                covers
            }
        }
        Err(e) => {
            ic_cdk::println!("Error calling getPoolCovers: {:?}", e);
            Vec::new()
        }
    };

    let pool_details: Result<(Option<Pool>,), _> =
        call(pool_contract, "getPool", (pool_id.clone(),)).await;
    let pool = match pool_details {
        Ok((Some(pool),)) => pool,
        Ok((None,)) => {
            return Err("Pool not found".to_string());
        }
        Err(e) => {
            return Err(format!("Failed to get pool: {:?}", e));
        }
    };

    for cover in covers.iter() {
        if cover.cover_name == cover_name || cover_id.clone() != cover.id {
            return Err("Cover Already exists!".to_string());
        }
    }

    if risk_type != pool.risk_type {
        return Err("Wrong pool, risk type must be the same!".to_string());
    }

    let precision = Nat::from(1_000_000_000_000_000_000u128);
    let maxamount: Nat =
        (pool.tvl * (capacity.clone() * precision.clone() / Nat::from(100u64))) / precision;

    let old_capacity = STATE.with(|state| {
        let mut state = state.borrow_mut();

        let cover = state.covers.get_mut(&cover_id).ok_or("Cover not found")?;
        let old_capacity = cover.capacity.clone();

        if cover.cover_values > maxamount {
            return Err("Wrong Pool".to_string());
        }

        cover.cover_name = cover_name;
        cover.risk_type = risk_type;
        cover.chains = chains;
        cover.capacity = capacity.clone();
        cover.cost = cost;
        cover.cid = cid;
        cover.capacity_amount = capacity.clone();

        Ok::<Nat, String>(old_capacity)
    });
    let old_cover_cap = old_capacity.unwrap();
    let difference = if old_cover_cap.clone() > capacity.clone() {
        old_cover_cap.clone() - capacity.clone()
    } else {
        capacity.clone() - old_cover_cap.clone()
    };

    if old_cover_cap > capacity {
        match call(
            pool_contract,
            "increasePercentageSplit",
            (pool_id.clone(), difference.clone()),
        )
        .await
        {
            Ok(((),)) => return Ok(()),
            Err(e) => return Err(format!("Error increasing percentage split: {:?}", e)),
        }
    } else {
        match call(
            pool_contract,
            "reducePercentageSplit",
            (pool_id.clone(), difference.clone()),
        )
        .await
        {
            Ok(((),)) => return Ok(()),
            Err(e) => return Err(format!("Error decreasing percentage split: {:?}", e)),
        }
    };
}

#[update(name = "purchaseCover")]
pub async fn purchase_cover(
    cover_id: Nat,
    cover_value: Nat,
    cover_period: Nat,
    cover_fee: Nat,
) -> Result<(), String> {
    let caller = ic_cdk::caller();

    match deposit_bqbtc(caller, cover_fee).await {
        Ok(_) => (),
        Err(DepositErr::BalanceLow) => return Err("Insufficient bqBTC balance".to_string()),
        Err(DepositErr::TransferFailure) => return Err("bqBTC transfer failed".to_string()),
    }

    let cover = STATE.with(|state| {
        let mut state = state.borrow_mut();
        let cover = state.covers.get_mut(&cover_id).ok_or("Cover not found")?;

        if cover_value > cover.max_amount {
            return Err("Insufficient capacity".to_string());
        }

        cover.cover_values += cover_value.clone();
        cover.max_amount -= cover_value.clone();
        Ok(cover.clone())
    })?;

    STATE.with(|state| {
        let mut state = state.borrow_mut();
        let user_cover_map = state.user_covers.entry(caller).or_insert_with(HashMap::new);

        user_cover_map.insert(
            cover_id.clone(),
            GenericCoverInfo {
                user: caller,
                cover_id,
                risk_type: cover.risk_type.clone(),
                cover_name: cover.cover_name.clone(),
                cover_value,
                claim_paid: Nat::from(0u64),
                cover_period: cover_period.clone(),
                end_day: Nat::from(ic_cdk::api::time() / 1_000_000_000)
                    + cover_period * Nat::from(86400u64),
                is_active: true,
            },
        );

        if !state.participants.contains(&caller) {
            state.participants.push(caller);
        }
        *state.participation.entry(caller).or_insert(Nat::from(0u64)) += Nat::from(1u64);

        Ok(())
    })
}

#[update(name = "updateUserCoverValue")]
pub async fn update_user_cover_value(
    user: Principal,
    cover_id: Nat,
    claim_paid: Nat,
) -> Result<(), String> {
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        let user_cover = state
            .user_covers
            .get_mut(&user)
            .ok_or("error getting cover")
            .unwrap()
            .get_mut(&cover_id)
            .ok_or("error getting cover info")
            .unwrap();
        user_cover.cover_value -= claim_paid.clone();
        user_cover.claim_paid += claim_paid;
        Ok(())
    })
}

#[update(name = "claimPayoutForLP")]
pub async fn claim_payout_for_lp(pool_id: Nat) -> Result<(), String> {
    let caller = ic_cdk::caller();
    let lp_contract = STATE.with(|state| {
        let lp_contract = state
            .borrow()
            .lp_contract
            .ok_or("LP contract address not set".to_string())
            .unwrap();

        lp_contract
    });

    let deposit_info_result: Result<(Option<Deposit>,), _> =
        call(lp_contract, "getUserDeposit", (pool_id.clone(),)).await;
    let deposit_info = match deposit_info_result {
        Ok((Some(deposit),)) => deposit,
        Ok((None,)) => {
            return Err("Deposit not found".to_string());
        }
        Err(e) => {
            return Err(format!("Failed to get deposit: {:?}", e));
        }
    };

    if deposit_info.status != Status::Active {
        return Err("Deposit is not active".to_string());
    }

    let last_claim_time = STATE.with(|state| {
        let state = state.borrow();
        state
            .lp_claims
            .get(&caller)
            .and_then(|claims| claims.get(&pool_id).cloned())
            .unwrap_or(deposit_info.start_date.clone())
    });

    let mut current_time = Nat::from(ic_cdk::api::time() / 1_000_000_000);
    if current_time > deposit_info.expiry_date {
        current_time = deposit_info.expiry_date;
    }
    let claimable_days = (current_time.clone() - last_claim_time.clone()) / Nat::from(86400u64);

    if claimable_days <= Nat::from(0u64) {
        return Err("No claimable reward".to_string());
    }

    let claimable_amount = deposit_info.daily_payout.clone() * claimable_days.clone();

    match withdraw_bqbtc(&claimable_amount, caller).await {
        Ok(_) => (),
        Err(WithdrawErr::BalanceLow) => return Err("Insufficient bqBTC balance".to_string()),
        Err(WithdrawErr::TransferFailure) => return Err("bqBTC transfer failed".to_string()),
        Err(WithdrawErr::BalanceCheckFailed) => return Err("bqBTC balance check failed".to_string()),
    }

    STATE.with(|state| {
        let mut state = state.borrow_mut();
        state
            .lp_claims
            .entry(caller)
            .or_insert_with(HashMap::new)
            .insert(pool_id, current_time);
    });

    Ok(())
}

#[update(name = "updateCanisterIds")]
fn update_canister_ids(lp_contract: Principal, governance: Principal, bqbtc: Principal) {
    let caller = ic_cdk::caller();
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        if state.owner.is_none() || state.owner.unwrap() != caller {
            ic_cdk::trap("Only the owner can update canister IDs");
        }
        state.lp_contract = Some(lp_contract);
        state.gov_address = Some(governance);
        state.bqbtc_address = Some(bqbtc);
    });
}

#[query(name = "getCanisterIds")]
fn get_canister_ids() -> (Principal, Principal, Principal, Principal) {
    STATE.with(|state| {
        let state = state.borrow();
        (
            state.lp_contract.unwrap_or(Principal::anonymous()),
            state.gov_address.unwrap_or(Principal::anonymous()),
            state.bqbtc_address.unwrap_or(Principal::anonymous()),
            state.owner.unwrap_or(Principal::anonymous()),
        )
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

#[update(name = "deleteExpiredUserCovers")]
pub async fn delete_expired_user_covers(user: Principal) -> Result<(), String> {
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        let cover_ids = state.cover_ids.clone();
        let user_covers = state
            .user_covers
            .get_mut(&user)
            .ok_or("Error getting user covers")?;

        let current_time = Nat::from(ic_cdk::api::time() / 1_000_000_000);

        let expired_ids: Vec<Nat> = cover_ids
            .iter()
            .filter_map(|id| {
                if let Some(user_cover) = user_covers.get_mut(id) {
                    if user_cover.is_active && current_time > user_cover.end_day {
                        user_cover.is_active = false;
                        return Some(id.clone());
                    }
                }
                None
            })
            .collect();

        for id in expired_ids {
            user_covers.remove(&id);
        }

        Ok(())
    })
}

#[update(name = "updateMaxAmount")]
pub async fn update_max_amount(cover_id: Nat) {
    let (cover, pool_contract) = STATE.with(|state| {
        let state = state.borrow();
        let pool_contract = state.lp_contract.unwrap();
        let cover = state
            .covers
            .get(&cover_id)
            .ok_or("error getting cover")
            .unwrap();
        (cover.clone(), pool_contract)
    });

    if cover.capacity <= Nat::from(0u64) {
        ic_cdk::trap("Invalid cover capacity");
    }

    let pool_details: Result<(Option<Pool>,), _> =
        call(pool_contract, "getPool", (cover.pool_id.clone(),)).await;
    let pool = match pool_details {
        Ok((Some(pool),)) => pool,
        Ok((None,)) => {
            ic_cdk::trap("Pool not found");
        }
        Err(e) => {
            let err = format!("Failed to get pool: {:?}", e);
            ic_cdk::trap(&err);
        }
    };
    let precision = Nat::from(1_000_000_000_000_000_000u128);
    let amount = (pool.tvl * (cover.capacity * precision.clone() / Nat::from(100u64))) / precision;

    STATE.with(|state| {
        let mut state = state.borrow_mut();
        let cover = state
            .covers
            .get_mut(&cover_id)
            .ok_or("error getting cover")
            .unwrap();
        cover.capacity_amount = amount.clone();
        cover.max_amount = amount - cover.cover_values.clone();
    });
}

#[query(name = "getAllUserCovers")]
pub async fn get_all_user_covers(user: Principal) -> Result<Vec<GenericCoverInfo>, String> {
    STATE.with(|state| {
        let state = state.borrow();
        let user_covers = state
            .user_covers
            .get(&user)
            .ok_or_else(|| "User has no covers".to_string())?;
        let covers: Vec<GenericCoverInfo> = user_covers
            .values()
            .cloned()
            .collect();

        Ok(covers)
    })
}

#[query(name = "getAllAvailableCovers")]
pub async fn get_all_available_covers() -> Result<Vec<Cover>, String> {
    STATE.with(|state| {
        let state = state.borrow();
        let available_covers = state.covers.values().cloned().collect();

        Ok(available_covers)
    })
}

#[query(name = "getCoverInfo")]
pub async fn get_cover_info(cover_id: Nat) -> Result<Cover, String> {
    STATE.with(|state| {
        let state = state.borrow();
        let cover = state
            .covers
            .get(&cover_id)
            .ok_or_else(|| "cover doesnt exist")?;

        Ok(cover.clone())
    })
}

#[query(name = "getUserCoverInfo")]
pub async fn get_user_cover_info(user: Principal, cover_id: Nat) -> Option<GenericCoverInfo> {
    STATE.with(|state| {
        let state = state.borrow();
        match state
            .user_covers
            .get(&user)
            .expect("user covers not found")
            .get(&cover_id)
        {
            Some(coverinfo) => Some(coverinfo.clone()),
            None => None,
        }
    })
}

#[query(name = "getDepositClaimableDays")]
pub async fn get_deposit_claimable_days(user: Principal, pool_id: Nat) -> Result<Nat, String> {
    let lp_contract = STATE.with(|state| {
        let state = state.borrow();
        let lp_contract = state
            .lp_contract
            .ok_or_else(|| "error getting pool canister id")
            .unwrap();

        lp_contract
    });

    let deposit_info_result: Result<(Option<Deposit>,), _> =
        call(lp_contract, "getUserDeposit", (pool_id.clone(),)).await;
    let deposit_info = match deposit_info_result {
        Ok((Some(deposit),)) => deposit,
        Ok((None,)) => {
            return Err("Deposit not found".to_string());
        }
        Err(e) => {
            return Err(format!("Failed to get deposit: {:?}", e));
        }
    };

    let last_claim_time = STATE.with(|state| {
        let state = state.borrow();
        state
            .lp_claims
            .get(&user)
            .and_then(|claims| claims.get(&pool_id).cloned())
            .unwrap_or(deposit_info.start_date.clone())
    });

    let mut current_time = Nat::from(ic_cdk::api::time() / 1_000_000_000);
    if current_time > deposit_info.expiry_date {
        current_time = deposit_info.expiry_date;
    }
    let claimable_days = (current_time.clone() - last_claim_time.clone()) / Nat::from(86400u64);

    Ok(claimable_days)
}

#[query(name = "getLastClaimTime")]
pub async fn get_last_claim_time(user: Principal, pool_id: Nat) -> Result<Nat, String> {
    STATE.with(|state| {
        let state = state.borrow();
        let last_claim = state
            .lp_claims
            .get(&user)
            .ok_or_else(|| "user doesnt have claim yet")?
            .get(&pool_id)
            .ok_or_else(|| "no claim made yet")?;

        Ok(last_claim.clone())
    })
}

async fn deposit_bqbtc(caller: Principal, amount: Nat) -> Result<Nat, DepositErr> {
    let canister_id = ic_cdk::api::id();
    let bqbtc_canister = STATE.with(|state| {
        let state = state.borrow();
        state.bqbtc_address.ok_or(DepositErr::TransferFailure)
    })?;

    // Check caller's bqBTC balance
    let balance_result: Result<(Nat,), _> = call(bqbtc_canister, "balance_of", (caller,)).await;
    let caller_balance = balance_result
        .map_err(|_| DepositErr::TransferFailure)?
        .0;

    if caller_balance < amount {
        return Err(DepositErr::BalanceLow);
    }

    // Transfer bqBTC from caller to this canister
    let transfer_result: Result<(Result<Nat, types::TxError>,), _> = 
        call(bqbtc_canister, "transfer", (canister_id, amount.clone())).await;
    
    match transfer_result {
        Ok((Ok(_),)) => {
            ic_cdk::println!(
                "Successfully received {} bqBTC from {:?}",
                amount,
                caller
            );
            Ok(amount)
        },
        Ok((Err(_),)) => Err(DepositErr::TransferFailure),
        Err(_) => Err(DepositErr::TransferFailure),
    }
}

async fn withdraw_bqbtc(amount: &Nat, user: Principal) -> Result<Nat, WithdrawErr> {
    let canister_id = ic_cdk::api::id();
    let bqbtc_canister = STATE.with(|state| {
        let state = state.borrow();
        state.bqbtc_address.ok_or(WithdrawErr::BalanceCheckFailed)
    })?;

    // Check canister's bqBTC balance
    let balance_result: Result<(Nat,), _> = call(bqbtc_canister, "balance_of", (canister_id,)).await;
    let canister_balance = balance_result
        .map_err(|_| WithdrawErr::BalanceCheckFailed)?
        .0;

    if canister_balance < *amount {
        return Err(WithdrawErr::BalanceLow);
    }

    // Transfer bqBTC from canister to user
    let transfer_result: Result<(Result<Nat, types::TxError>,), _> = 
        call(bqbtc_canister, "transfer", (user, amount.clone())).await;

    match transfer_result {
        Ok((Ok(_),)) => {
            ic_cdk::println!(
                "Withdrawal of {} bqBTC to user {:?}",
                amount,
                user
            );
            Ok(amount.clone())
        },
        Ok((Err(_),)) => Err(WithdrawErr::TransferFailure),
        Err(_) => Err(WithdrawErr::TransferFailure),
    }
}

// Removed principal_to_subaccount function as it's no longer needed for bqBTC transfers

ic_cdk::export_candid!();
