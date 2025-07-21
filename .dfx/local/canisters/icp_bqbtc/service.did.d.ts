import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type Result = { 'Ok' : bigint } |
  { 'Err' : TxError };
export type Result_1 = { 'Ok' : null } |
  { 'Err' : string };
export interface TokenMetadata {
  'decimals' : number,
  'owner' : Principal,
  'logo' : string,
  'name' : string,
  'cover_address' : [] | [Principal],
  'pool_address' : [] | [Principal],
  'total_supply' : bigint,
  'symbol' : string,
}
export type TxError = { 'InsufficientAllowance' : null } |
  { 'InsufficientBalance' : null } |
  { 'ErrorOperationStyle' : null } |
  { 'Unauthorized' : null } |
  { 'LedgerTrap' : null } |
  { 'ErrorTo' : null } |
  { 'Other' : null } |
  { 'BlockUsed' : null } |
  { 'AmountTooSmall' : null };
export interface _SERVICE {
  'balance_of' : ActorMethod<[Principal], bigint>,
  'burn' : ActorMethod<[Principal, bigint], Result>,
  'get_metadata' : ActorMethod<[], TokenMetadata>,
  'mint' : ActorMethod<[Principal, bigint], Result>,
  'set_pool_and_cover' : ActorMethod<[Principal, Principal], Result_1>,
  'transfer' : ActorMethod<[Principal, bigint], Result>,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
