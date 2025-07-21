import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory as bqbtc_idl } from '../../../declarations/icp_bqbtc/icp_bqbtc.did.js';

// Canister ID for BQBTC (update if needed)
const BQBTC_CANISTER_ID = process.env.BQBTC_CANISTER_ID ||
  (typeof window !== 'undefined' && (window as any).BQBTC_CANISTER_ID) ||
  'bkyz2-fmaaa-aaaaa-qaaaq-cai';

export function getBQBTCActor() {
  const agent = new HttpAgent();
  // For local development, you may want to fetchRootKey
  if (process.env.DFX_NETWORK === 'local') {
    agent.fetchRootKey && agent.fetchRootKey();
  }
  return Actor.createActor(bqbtc_idl, {
    agent,
    canisterId: BQBTC_CANISTER_ID,
  });
}
