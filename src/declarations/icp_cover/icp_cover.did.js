export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : IDL.Text });
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
  const Result_1 = IDL.Variant({ 'Ok' : IDL.Vec(Cover), 'Err' : IDL.Text });
  const Result_2 = IDL.Variant({
    'Ok' : IDL.Vec(IDL.Principal),
    'Err' : IDL.Text,
  });
  const GenericCoverInfo = IDL.Record({
    'cover_name' : IDL.Text,
    'end_day' : IDL.Nat,
    'cover_period' : IDL.Nat,
    'user' : IDL.Principal,
    'claim_paid' : IDL.Nat,
    'cover_value' : IDL.Nat,
    'is_active' : IDL.Bool,
    'cover_id' : IDL.Nat,
    'risk_type' : RiskType,
  });
  const Result_3 = IDL.Variant({
    'Ok' : IDL.Vec(GenericCoverInfo),
    'Err' : IDL.Text,
  });
  const Result_4 = IDL.Variant({ 'Ok' : Cover, 'Err' : IDL.Text });
  const Result_5 = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : IDL.Text });
  return IDL.Service({
    'claimPayoutForLP' : IDL.Func([IDL.Nat], [Result], []),
    'createCover' : IDL.Func(
        [
          IDL.Nat,
          IDL.Text,
          RiskType,
          IDL.Text,
          IDL.Text,
          IDL.Nat,
          IDL.Nat,
          IDL.Nat,
        ],
        [Result],
        [],
      ),
    'deleteExpiredUserCovers' : IDL.Func([IDL.Principal], [Result], []),
    'getAllAvailableCovers' : IDL.Func([], [Result_1], ['query']),
    'getAllParticipants' : IDL.Func([], [Result_2], ['query']),
    'getAllUserCovers' : IDL.Func([IDL.Principal], [Result_3], ['query']),
    'getCanisterIds' : IDL.Func(
        [],
        [IDL.Principal, IDL.Principal, IDL.Principal, IDL.Principal],
        ['query'],
      ),
    'getCoverInfo' : IDL.Func([IDL.Nat], [Result_4], ['query']),
    'getDepositClaimableDays' : IDL.Func(
        [IDL.Principal, IDL.Nat],
        [Result_5],
        ['query'],
      ),
    'getLastClaimTime' : IDL.Func(
        [IDL.Principal, IDL.Nat],
        [Result_5],
        ['query'],
      ),
    'getUserCoverInfo' : IDL.Func(
        [IDL.Principal, IDL.Nat],
        [IDL.Opt(GenericCoverInfo)],
        ['query'],
      ),
    'getUserParticipation' : IDL.Func([IDL.Principal], [Result_5], ['query']),
    'purchaseCover' : IDL.Func(
        [IDL.Nat, IDL.Nat, IDL.Nat, IDL.Nat64],
        [Result],
        [],
      ),
    'updateCanisterIds' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Principal],
        [],
        [],
      ),
    'updateCover' : IDL.Func(
        [
          IDL.Nat,
          IDL.Text,
          RiskType,
          IDL.Text,
          IDL.Text,
          IDL.Nat,
          IDL.Nat,
          IDL.Nat,
        ],
        [Result],
        [],
      ),
    'updateMaxAmount' : IDL.Func([IDL.Nat], [], []),
    'updateUserCoverValue' : IDL.Func(
        [IDL.Principal, IDL.Nat, IDL.Nat],
        [Result],
        [],
      ),
  });
};
export const init = ({ IDL }) => {
  return [IDL.Principal, IDL.Principal, IDL.Principal, IDL.Principal];
};
