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
export interface GenericCoverInfo {
  'cover_name' : string,
  'end_day' : bigint,
  'cover_period' : bigint,
  'user' : Principal,
  'claim_paid' : bigint,
  'cover_value' : bigint,
  'is_active' : boolean,
  'cover_id' : bigint,
  'risk_type' : RiskType,
}
export type Result = { 'Ok' : null } |
  { 'Err' : string };
export type Result_1 = { 'Ok' : Array<Cover> } |
  { 'Err' : string };
export type Result_2 = { 'Ok' : Array<Principal> } |
  { 'Err' : string };
export type Result_3 = { 'Ok' : Array<GenericCoverInfo> } |
  { 'Err' : string };
export type Result_4 = { 'Ok' : Cover } |
  { 'Err' : string };
export type Result_5 = { 'Ok' : bigint } |
  { 'Err' : string };
export type Result_6 = { 'Ok' : GenericCoverInfo } |
  { 'Err' : string };
export type RiskType = { 'Stablecoin' : null } |
  { 'Slashing' : null } |
  { 'SmartContract' : null } |
  { 'Protocol' : null };
export interface _SERVICE {
  'claimPayoutForLP' : ActorMethod<[bigint], Result>,
  'createCover' : ActorMethod<
    [bigint, string, RiskType, string, string, bigint, bigint, bigint],
    Result
  >,
  'deleteExpiredUserCovers' : ActorMethod<[Principal], Result>,
  'getAllAvailableCovers' : ActorMethod<[], Result_1>,
  'getAllParticipants' : ActorMethod<[], Result_2>,
  'getAllUserCovers' : ActorMethod<[Principal], Result_3>,
  'getCoverInfo' : ActorMethod<[bigint], Result_4>,
  'getDepositClaimableDays' : ActorMethod<[Principal, bigint], Result_5>,
  'getLastClaimTime' : ActorMethod<[Principal, bigint], Result_5>,
  'getUserCoverInfo' : ActorMethod<[Principal, bigint], Result_6>,
  'getUserParticipation' : ActorMethod<[Principal], Result_5>,
  'purchaseCover' : ActorMethod<[bigint, bigint, bigint, bigint], Result>,
  'updateCover' : ActorMethod<
    [bigint, string, RiskType, string, string, bigint, bigint, bigint],
    Result
  >,
  'updateMaxAmount' : ActorMethod<[bigint], Result>,
  'updateUserCoverValue' : ActorMethod<[Principal, bigint, bigint], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
