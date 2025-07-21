import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Proposal {
  'id' : bigint,
  'status' : ProposalStatus,
  'proposal_param' : ProposalParam,
  'voters_against' : Array<Principal>,
  'deadline' : bigint,
  'created_at' : bigint,
  'voters_for' : Array<Principal>,
  'votes_for' : bigint,
  'executed' : boolean,
  'votes_against' : bigint,
  'timeleft' : bigint,
}
export interface ProposalParam {
  'user' : Principal,
  'description' : string,
  'pool_id' : bigint,
  'cover_id' : bigint,
  'claim_amount' : bigint,
  'tx_hash' : string,
  'risk_type' : RiskType,
}
export type ProposalStatus = { 'Claimed' : null } |
  { 'Approved' : null } |
  { 'Rejected' : null } |
  { 'Submitted' : null } |
  { 'Pending' : null };
export type Result = { 'Ok' : null } |
  { 'Err' : string };
export type Result_1 = { 'Ok' : Array<Proposal> } |
  { 'Err' : string };
export type Result_2 = { 'Ok' : Array<Principal> } |
  { 'Err' : string };
export type Result_3 = { 'Ok' : bigint } |
  { 'Err' : string };
export type RiskType = { 'Stablecoin' : null } |
  { 'Slashing' : null } |
  { 'SmartContract' : null } |
  { 'Protocol' : null };
export interface _SERVICE {
  'addAdmin' : ActorMethod<[Principal], Result>,
  'createProposal' : ActorMethod<[ProposalParam], Result>,
  'executeProposal' : ActorMethod<[bigint], Result>,
  'getActiveProposals' : ActorMethod<[], Result_1>,
  'getAllParticipants' : ActorMethod<[], Result_2>,
  'getAllProposals' : ActorMethod<[], Result_1>,
  'getCanisterIds' : ActorMethod<[], [Principal, Principal, Principal]>,
  'getPastProposals' : ActorMethod<[], Result_1>,
  'getProposalCount' : ActorMethod<[], Result_3>,
  'getProposalDetails' : ActorMethod<[bigint], [] | [Proposal]>,
  'getUserParticipation' : ActorMethod<[Principal], Result_3>,
  'setVotingDuration' : ActorMethod<[bigint], Result>,
  'updateCanisterIds' : ActorMethod<
    [Principal, Principal, Principal],
    undefined
  >,
  'updateProposalStatusToClaimed' : ActorMethod<[bigint], undefined>,
  'updateRewardAmount' : ActorMethod<[bigint], Result>,
  'vote' : ActorMethod<[bigint, boolean], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
