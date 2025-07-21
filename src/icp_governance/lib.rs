use candid::{CandidType, Deserialize, Nat, Principal};
use ic_cdk::api::call::call;
use ic_cdk_macros::*;
use std::cell::RefCell;
use std::collections::HashMap;

mod types;
use types::{GenericCoverInfo, Proposal, ProposalParam, ProposalStatus, Voter};

use crate::types::TxReceipt;

thread_local! {
    static STATE: RefCell<State> = RefCell::new(State::default());
}

#[derive(CandidType, Deserialize, Default)]
struct State {
    proposals: HashMap<Nat, Proposal>,
    proposal_counter: Nat,
    voting_duration: u64,
    reward_amount: Nat,
    voters: HashMap<Nat, HashMap<Principal, Voter>>,
    participants: Vec<Principal>,
    participation: HashMap<Principal, Nat>,
    is_admin: HashMap<Principal, bool>,
    governance_token: Option<Principal>,
    lp_contract: Option<Principal>,
    bqbtc_contract: Option<Principal>,
    cover_contract: Option<Principal>,
}

#[init]
fn init(
    owner: Principal,
    governance_token: Principal,
    lp_contract: Principal,
    voting_duration_minutes: u64,
) {
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        state.is_admin.insert(owner, true);
        state.voting_duration = voting_duration_minutes * 60;
        state.governance_token = Some(governance_token);
        state.lp_contract = Some(lp_contract);
        state.reward_amount = Nat::from(100u64 * 10u64.pow(18));
    });
}

#[update(name = "createProposal")]
pub async fn create_proposal(params: ProposalParam) -> Result<(), String> {
    let caller = ic_cdk::caller();

    let cover_contract = STATE.with(|state| state.borrow().cover_contract.unwrap());
    let cover_info: Result<(Option<GenericCoverInfo>,), _> = call(
        cover_contract,
        "getUserCoverInfo",
        (params.user, params.cover_id.clone()),
    )
    .await;

    let cover = match cover_info {
        Ok((Some(cover),)) => cover,
        Ok((None,)) => {
            ic_cdk::trap("cover not found");
        }
        Err(e) => {
            let err = format!("Failed to get cover: {:?}", e);
            ic_cdk::trap(&err);
        }
    };

    if params.claim_amount > cover.cover_value {
        return Err("Claim amount exceeds cover value".to_string());
    }

    STATE.with(|state| {
        let mut state = state.borrow_mut();
        let proposal_id = state.proposal_counter.clone() + Nat::from(1u64);
        state.proposal_counter = proposal_id.clone();
        state.proposals.insert(
            proposal_id.clone(),
            Proposal {
                id: proposal_id.clone(),
                votes_for: Nat::from(0u64),
                votes_against: Nat::from(0u64),
                created_at: Nat::from(ic_cdk::api::time() / 1_000_000_000),
                deadline: Nat::from(0u64),
                timeleft: Nat::from(0u64),
                executed: false,
                status: ProposalStatus::Submitted,
                proposal_param: params,
                voters_for: vec![],
                voters_against: vec![],
            },
        );

        if !state.participants.contains(&caller) {
            state.participants.push(caller);
        }
        *state.participation.entry(caller).or_insert(Nat::from(0u64)) += Nat::from(1u64);

        Ok(())
    })
}

#[update(name = "vote")]
pub async fn vote(proposal_id: Nat, in_favor: bool) -> Result<(), String> {
    let caller = ic_cdk::caller();
    let bqbtc_canister = STATE.with(|state| {
        let state = state.borrow();
        state.bqbtc_contract.ok_or("bqBTC canister address not set")
    })?;

    let weight: Result<(Nat,), _> = call(bqbtc_canister, "balance_of", (caller, caller)).await;
    let voter_weight = weight
        .map_err(|e| format!("Failed to retrieve voting weight: {:?}", e))?
        .0;

    let (mut proposal, has_voted) = STATE.with(|state| {
        let state = state.borrow();
        let proposal = state
            .proposals
            .get(&proposal_id)
            .cloned()
            .ok_or("Proposal not found")?;
        let has_voted = state
            .voters
            .get(&proposal_id)
            .and_then(|v| v.get(&caller))
            .map(|v| v.voted)
            .unwrap_or(false);
        Ok::<(Proposal, bool), String>((proposal, has_voted))
    })?;

    if has_voted {
        return Err("Already voted".to_string());
    }

    if ic_cdk::api::time() / 1_000_000_000 >= proposal.deadline
        && proposal.status != ProposalStatus::Submitted
    {
        return Err("Voting period elapsed".to_string());
    }

    STATE.with(|state| {
        let mut state = state.borrow_mut();

        if in_favor {
            proposal.votes_for += voter_weight.clone();
            proposal.voters_for.push(caller);
        } else {
            proposal.votes_against += voter_weight.clone();
            proposal.voters_against.push(caller);
        }

        state.proposals.insert(proposal_id.clone(), proposal);
        state.voters.entry(proposal_id.clone()).or_default().insert(
            caller,
            Voter {
                voted: true,
                vote: in_favor,
                weight: voter_weight,
            },
        );

        Ok(())
    })
}

#[update(name = "executeProposal")]
pub async fn execute_proposal(proposal_id: Nat) -> Result<(), String> {
    let caller = ic_cdk::caller();
    let (bqbtc_canister, reward_amount) = STATE.with(|state| {
        let state = state.borrow();
        if !state.is_admin.get(&caller).cloned().unwrap_or(false) {
            return Err("Not authorized".to_string());
        }
        let reward = state.reward_amount.clone();
        Ok((state.bqbtc_contract.unwrap(), reward))
    })?;

    let win_voters = STATE.with(|state| {
        let mut state = state.borrow_mut();
        let proposal = state
            .proposals
            .get_mut(&proposal_id)
            .ok_or("Proposal not found".to_string())
            .unwrap();

        let mut win_voters = vec![];

        if proposal.status == ProposalStatus::Pending
            && ic_cdk::api::time() / 1_000_000_000 > proposal.deadline
            && !proposal.executed
        {
            proposal.executed = true;
            proposal.timeleft = Nat::from(0u64);

            if proposal.votes_for > proposal.votes_against {
                proposal.status = ProposalStatus::Approved;
                win_voters = proposal.voters_for.clone();
            } else {
                proposal.status = ProposalStatus::Rejected;
                win_voters = proposal.voters_against.clone();
            }
        }
        win_voters
    });

    for voter in win_voters.iter() {
        let reward_result: Result<(TxReceipt,), _> =
            call(bqbtc_canister, "mint", (*voter, reward_amount.clone())).await;
        if reward_result.is_err() {
            ic_cdk::println!("Failed to mint reward for voter: {:?}", voter);
        }
    }

    Ok(())
}

#[update(name = "updateProposalStatusToClaimed")]
pub async fn update_proposal_to_claimed(proposal_id: Nat) {
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        match state.proposals.get_mut(&proposal_id) {
            Some(proposal) => proposal.status = ProposalStatus::Claimed,
            None => ic_cdk::trap("Failed to update proposal"),
        }
    })
}

#[update(name = "setVotingDuration")]
pub async fn set_voting_duration(duration: u64) -> Result<(), String> {
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        state.voting_duration = duration;

        Ok(())
    })
}

#[update(name = "updateRewardAmount")]
pub async fn update_reward_amount(reward: Nat) -> Result<(), String> {
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        state.reward_amount = reward;

        Ok(())
    })
}

#[update(name = "updateCanisterIds")]
fn update_canister_ids(lp_contract: Principal, cover_contract: Principal, bqbtc: Principal) {
    let caller = ic_cdk::caller();
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        if !state.is_admin.get(&caller).cloned().unwrap_or(false) {
            ic_cdk::println!("Caller is not an admin: {:?}", caller);
            return;
        }
        state.lp_contract = Some(lp_contract);
        state.cover_contract = Some(cover_contract);
        state.governance_token = Some(bqbtc);
    });
}

#[query(name = "getCanisterIds")]
fn get_canister_ids() -> (Principal, Principal, Principal) {
    STATE.with(|state| {
        let state = state.borrow();
        (
            state.lp_contract.unwrap_or(Principal::anonymous()),
            state.cover_contract.unwrap_or(Principal::anonymous()),
            state.governance_token.unwrap_or(Principal::anonymous()),
        )
    })
}

#[query(name = "getProposalCount")]
pub async fn get_proposal_count() -> Result<Nat, String> {
    STATE.with(|state| {
        let state = state.borrow();
        Ok(state.proposal_counter.clone())
    })
}

#[query(name = "getAllProposals")]
pub async fn get_all_proposals() -> Result<Vec<Proposal>, String> {
    STATE.with(|state| {
        let state = state.borrow();
        let proposals = state.proposals.values().cloned().collect();

        Ok(proposals)
    })
}

#[query(name = "getActiveProposals")]
pub async fn get_active_proposals() -> Result<Vec<Proposal>, String> {
    STATE.with(|state| {
        let state = state.borrow();
        let current_time = Nat::from(ic_cdk::api::time() / 1_000_000_000);

        let active_proposals: Vec<Proposal> = state
            .proposals
            .values()
            .filter(|proposal| {
                proposal.deadline == Nat::from(0u64)
                    || proposal.deadline > current_time && !proposal.executed
            })
            .cloned()
            .collect();

        Ok(active_proposals)
    })
}

#[query(name = "getPastProposals")]
pub async fn get_past_proposals() -> Result<Vec<Proposal>, String> {
    STATE.with(|state| {
        let state = state.borrow();
        let current_time = Nat::from(ic_cdk::api::time() / 1_000_000_000);

        let active_proposals: Vec<Proposal> = state
            .proposals
            .values()
            .filter(|proposal| {
                proposal.deadline == Nat::from(0u64) || proposal.deadline > current_time
            })
            .cloned()
            .collect();

        Ok(active_proposals)
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

#[query(name = "getProposalDetails")]
pub fn get_proposal_details(proposal_id: Nat) -> Option<Proposal> {
    STATE.with(|state| {
        let state = state.borrow();
        match state.proposals.get(&proposal_id).cloned() {
            Some(proposal) => Some(proposal),
            None => None,
        }
    })
}

#[update(name = "addAdmin")]
pub fn add_admin(new_admin: Principal) -> Result<(), String> {
    let caller = ic_cdk::caller();
    STATE.with(|state| {
        if !state
            .borrow()
            .is_admin
            .get(&caller)
            .cloned()
            .unwrap_or(false)
        {
            return Err("Not authorized".to_string());
        }
        state.borrow_mut().is_admin.insert(new_admin, true);
        Ok(())
    })
}

ic_cdk::export_candid!();

#[update(name = "setCover")]
fn set_cover(cover: Principal) -> Result<(), String> {
    let caller = ic_cdk::caller();
    STATE.with(|state| {
        let mut state = state.borrow_mut();
        if !state.is_admin.get(&caller).cloned().unwrap_or(false) {
            return Err("Not authorized".to_string());
        }
        state.cover_contract = Some(cover);
        Ok(())
    })
}
