export const idlFactory = ({ IDL }) => {
  const RiskType = IDL.Variant({
    'Stablecoin' : IDL.Null,
    'Slashing' : IDL.Null,
    'SmartContract' : IDL.Null,
    'Protocol' : IDL.Null,
  });
  const Cover = IDL.Record({
    'id' : IDL.Nat,
    'cid' : IDL.Text,
    'cover_name' : IDL.Text,
    'cost' : IDL.Nat,
    'cover_values' : IDL.Nat,
    'capacity_amount' : IDL.Nat,
    'chains' : IDL.Text,
    'capacity' : IDL.Nat,
    'pool_id' : IDL.Nat,
    'risk_type' : RiskType,
    'max_amount' : IDL.Nat,
  });
  const Result = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : IDL.Text });
  const Result_1 = IDL.Variant({
    'Ok' : IDL.Vec(IDL.Principal),
    'Err' : IDL.Text,
  });
  const Status = IDL.Variant({ 'Active' : IDL.Null, 'Withdrawn' : IDL.Null });
  const Deposit = IDL.Record({
    'lp' : IDL.Principal,
    'status' : Status,
    'accrued_payout' : IDL.Nat,
    'start_date' : IDL.Nat,
    'expiry_date' : IDL.Nat,
    'days_left' : IDL.Nat,
    'pool_id' : IDL.Nat,
    'daily_payout' : IDL.Nat,
    'amount' : IDL.Nat,
  });
  const Pool = IDL.Record({
    'apy' : IDL.Nat,
    'tcp' : IDL.Nat,
    'tvl' : IDL.Nat,
    'pool_name' : IDL.Text,
    'percentage_split_balance' : IDL.Nat,
    'min_period' : IDL.Nat,
    'is_active' : IDL.Bool,
    'deposits' : IDL.Vec(IDL.Tuple(IDL.Principal, Deposit)),
    'risk_type' : RiskType,
  });
  const Result_2 = IDL.Variant({ 'Ok' : Pool, 'Err' : IDL.Text });
  const Result_3 = IDL.Variant({ 'Ok' : IDL.Vec(Cover), 'Err' : IDL.Text });
  const Result_4 = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : IDL.Text });
  const PoolInfo = IDL.Record({
    'apy' : IDL.Nat,
    'tcp' : IDL.Nat,
    'tvl' : IDL.Nat,
    'pool_name' : IDL.Text,
    'deposit_amount' : IDL.Nat,
    'accrued_payout' : IDL.Nat,
    'min_period' : IDL.Nat,
    'is_active' : IDL.Bool,
    'pool_id' : IDL.Nat,
    'daily_payout' : IDL.Nat,
  });
  const Result_5 = IDL.Variant({ 'Ok' : Deposit, 'Err' : IDL.Text });
  const Result_6 = IDL.Variant({ 'Ok' : IDL.Bool, 'Err' : IDL.Text });
  return IDL.Service({
    'addPoolCover' : IDL.Func([IDL.Nat, Cover], [Result], []),
    'claimProposalFunds' : IDL.Func([IDL.Nat], [Result], []),
    'createPool' : IDL.Func(
        [RiskType, IDL.Text, IDL.Nat, IDL.Nat],
        [Result],
        [],
      ),
    'deactivatePool' : IDL.Func([IDL.Nat], [Result], []),
    'deposit' : IDL.Func([IDL.Nat, IDL.Nat], [Result], []),
    'getAllParticipants' : IDL.Func([], [Result_1], ['query']),
    'getAllPools' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Nat, Pool))],
        ['query'],
      ),
    'getOwner' : IDL.Func([], [IDL.Opt(IDL.Principal)], ['query']),
    'getPool' : IDL.Func([IDL.Nat], [Result_2], ['query']),
    'getPoolCovers' : IDL.Func([IDL.Nat], [Result_3], ['query']),
    'getPoolTVL' : IDL.Func([IDL.Nat], [Result_4], ['query']),
    'getPoolsByAddress' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(PoolInfo)],
        ['query'],
      ),
    'getUserDeposit' : IDL.Func(
        [IDL.Nat, IDL.Principal],
        [Result_5],
        ['query'],
      ),
    'getUserParticipation' : IDL.Func([IDL.Principal], [Result_4], ['query']),
    'increasePercentageSplit' : IDL.Func([IDL.Nat, IDL.Nat], [Result], []),
    'poolActive' : IDL.Func([IDL.Nat], [Result_6], ['query']),
    'reducePercentageSplit' : IDL.Func([IDL.Nat, IDL.Nat], [Result], []),
    'setOwner' : IDL.Func([IDL.Principal], [Result], []),
    'updatePool' : IDL.Func([IDL.Nat, IDL.Nat, IDL.Nat], [Result], []),
    'updatePoolCovers' : IDL.Func([IDL.Nat, Cover], [Result], []),
    'withdraw' : IDL.Func([IDL.Nat, IDL.Nat], [Result], []),
  });
};
export const init = ({ IDL }) => { return [IDL.Principal, IDL.Principal]; };
