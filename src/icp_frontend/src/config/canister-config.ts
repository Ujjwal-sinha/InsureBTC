interface CanisterIds {
  local: string;
  ic?: string;
}

interface Canisters {
  icp_bqbtc: CanisterIds;
  icp_governance: CanisterIds;
  icp_cover: CanisterIds;
  icp_pool: CanisterIds;
  icp_frontend: CanisterIds;
}

// Local development canister IDs
export const LOCAL_CANISTER_IDS: Canisters = {
  icp_bqbtc: {
    local: "uxrrr-q7777-77774-qaaaq-cai"
  },
  icp_governance: {
    local: "umunu-kh777-77774-qaaca-cai"
  },
  icp_cover: {
    local: "u6s2n-gx777-77774-qaaba-cai"
  },
  icp_pool: {
    local: "ulvla-h7777-77774-qaacq-cai"
  },
  icp_frontend: {
    local: "uzt4z-lp777-77774-qaabq-cai"
  }
};

export const getCanisterId = (canisterName: keyof Canisters, network: 'local' | 'ic'): string => {
  const canister = LOCAL_CANISTER_IDS[canisterName];
  return network === 'local' ? canister.local : (canister.ic || canister.local);
};
