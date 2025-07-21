import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Cover {
  'id' : bigint,
  'cid' : string,
  'cover_name' : string,
  'cost' : bigint,
  'cover_values' : bigint,
  'capacity_amount' : bigint,
  'chains' : string,
  'capacity' : bigint,
  'pool_id' : bigint,
  'risk_type' : RiskType,
  'max_amount' : bigint,
}
export interface Deposit {
  'lp' : Principal,
  'status' : Status,
  'accrued_payout' : bigint,
  'start_date' : bigint,
  'expiry_date' : bigint,
  'days_left' : bigint,
  'pool_id' : bigint,
  'daily_payout' : bigint,
  'amount' : bigint,
}
export interface Pool {
  'apy' : bigint,
  'tcp' : bigint,
  'tvl' : bigint,
  'pool_name' : string,
  'percentage_split_balance' : bigint,
  'min_period' : bigint,
  'is_active' : boolean,
  'deposits' : Array<[Principal, Deposit]>,
  'risk_type' : RiskType,
}
export interface PoolInfo {
  'apy' : bigint,
  'tcp' : bigint,
  'tvl' : bigint,
  'pool_name' : string,
  'deposit_amount' : bigint,
  'accrued_payout' : bigint,
  'min_period' : bigint,
  'is_active' : boolean,
  'pool_id' : bigint,
  'daily_payout' : bigint,
}
export type Result = { 'Ok' : null } |
  { 'Err' : string };
export type Result_1 = { 'Ok' : Array<Principal> } |
  { 'Err' : string };
export type Result_2 = { 'Ok' : Pool } |
  { 'Err' : string };
export type Result_3 = { 'Ok' : Array<Cover> } |
  { 'Err' : string };
export type Result_4 = { 'Ok' : bigint } |
  { 'Err' : string };
export type Result_5 = { 'Ok' : Deposit } |
  { 'Err' : string };
export type Result_6 = { 'Ok' : boolean } |
  { 'Err' : string };
export type RiskType = { 'Stablecoin' : null } |
  { 'Slashing' : null } |
  { 'SmartContract' : null } |
  { 'Protocol' : null };
export type Status = { 'Active' : null } |
  { 'Withdrawn' : null };
export interface _SERVICE {
  'addPoolCover' : ActorMethod<[bigint, Cover], Result>,
  'claimProposalFunds' : ActorMethod<[bigint], Result>,
  'createPool' : ActorMethod<[RiskType, string, bigint, bigint], Result>,
  'deactivatePool' : ActorMethod<[bigint], Result>,
  'deposit' : ActorMethod<[bigint, bigint], Result>,
  'getAllParticipants' : ActorMethod<[], Result_1>,
  'getAllPools' : ActorMethod<[], Array<[bigint, Pool]>>,
  'getOwner' : ActorMethod<[], [] | [Principal]>,
  'getPool' : ActorMethod<[bigint], Result_2>,
  'getPoolCovers' : ActorMethod<[bigint], Result_3>,
  'getPoolTVL' : ActorMethod<[bigint], Result_4>,
  'getPoolsByAddress' : ActorMethod<[Principal], Array<PoolInfo>>,
  'getUserDeposit' : ActorMethod<[bigint, Principal], Result_5>,
  'getUserParticipation' : ActorMethod<[Principal], Result_4>,
  'increasePercentageSplit' : ActorMethod<[bigint, bigint], Result>,
  'poolActive' : ActorMethod<[bigint], Result_6>,
  'reducePercentageSplit' : ActorMethod<[bigint, bigint], Result>,
  'setOwner' : ActorMethod<[Principal], Result>,
  'updatePool' : ActorMethod<[bigint, bigint, bigint], Result>,
  'updatePoolCovers' : ActorMethod<[bigint, Cover], Result>,
  'withdraw' : ActorMethod<[bigint, bigint], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
