export const idlFactory = ({ IDL }) => {
  const Result = IDL.Variant({ 'Ok' : IDL.Null, 'Err' : IDL.Text });
  const RiskType = IDL.Variant({
    'Stablecoin' : IDL.Null,
    'Slashing' : IDL.Null,
    'SmartContract' : IDL.Null,
    'Protocol' : IDL.Null,
  });
  const ProposalParam = IDL.Record({
    'user' : IDL.Principal,
    'description' : IDL.Text,
    'pool_id' : IDL.Nat,
    'cover_id' : IDL.Nat,
    'claim_amount' : IDL.Nat,
    'tx_hash' : IDL.Text,
    'risk_type' : RiskType,
  });
  const ProposalStatus = IDL.Variant({
    'Claimed' : IDL.Null,
    'Approved' : IDL.Null,
    'Rejected' : IDL.Null,
    'Submitted' : IDL.Null,
    'Pending' : IDL.Null,
  });
  const Proposal = IDL.Record({
    'id' : IDL.Nat,
    'status' : ProposalStatus,
    'proposal_param' : ProposalParam,
    'voters_against' : IDL.Vec(IDL.Principal),
    'deadline' : IDL.Nat,
    'created_at' : IDL.Nat,
    'voters_for' : IDL.Vec(IDL.Principal),
    'votes_for' : IDL.Nat,
    'executed' : IDL.Bool,
    'votes_against' : IDL.Nat,
    'timeleft' : IDL.Nat,
  });
  const Result_1 = IDL.Variant({ 'Ok' : IDL.Vec(Proposal), 'Err' : IDL.Text });
  const Result_2 = IDL.Variant({
    'Ok' : IDL.Vec(IDL.Principal),
    'Err' : IDL.Text,
  });
  const Result_3 = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : IDL.Text });
  return IDL.Service({
    'addAdmin' : IDL.Func([IDL.Principal], [Result], []),
    'createProposal' : IDL.Func([ProposalParam], [Result], []),
    'executeProposal' : IDL.Func([IDL.Nat], [Result], []),
    'getActiveProposals' : IDL.Func([], [Result_1], ['query']),
    'getAllParticipants' : IDL.Func([], [Result_2], ['query']),
    'getAllProposals' : IDL.Func([], [Result_1], ['query']),
    'getCanisterIds' : IDL.Func(
        [],
        [IDL.Principal, IDL.Principal, IDL.Principal],
        ['query'],
      ),
    'getPastProposals' : IDL.Func([], [Result_1], ['query']),
    'getProposalCount' : IDL.Func([], [Result_3], ['query']),
    'getProposalDetails' : IDL.Func([IDL.Nat], [IDL.Opt(Proposal)], ['query']),
    'getUserParticipation' : IDL.Func([IDL.Principal], [Result_3], ['query']),
    'setVotingDuration' : IDL.Func([IDL.Nat64], [Result], []),
    'updateCanisterIds' : IDL.Func(
        [IDL.Principal, IDL.Principal, IDL.Principal],
        [],
        [],
      ),
    'updateProposalStatusToClaimed' : IDL.Func([IDL.Nat], [], []),
    'updateRewardAmount' : IDL.Func([IDL.Nat], [Result], []),
    'vote' : IDL.Func([IDL.Nat, IDL.Bool], [Result], []),
  });
};
export const init = ({ IDL }) => {
  return [IDL.Principal, IDL.Principal, IDL.Principal, IDL.Nat64];
};
