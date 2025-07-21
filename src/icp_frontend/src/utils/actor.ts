import { Actor, HttpAgent } from "@dfinity/agent";
import { idlFactory as bqbtcIDL } from "../../../declarations/icp_bqbtc/icp_bqbtc.did.js";
import type { _SERVICE as BQBTCService } from "../../../declarations/icp_bqbtc/icp_bqbtc.did";

const host = "http://127.0.0.1:4943";  // Local development
const BQBTC_CANISTER_ID = "uxrrr-q7777-77774-qaaaq-cai";

export const createActor = <T>(canisterId: string, idlFactory: any): T => {
  const agent = new HttpAgent({ host });
  return Actor.createActor(idlFactory, {
    agent,
    canisterId,
  });
};

export const getBQBTCActor = () => {
  return createActor<BQBTCService>(BQBTC_CANISTER_ID, bqbtcIDL);
};
