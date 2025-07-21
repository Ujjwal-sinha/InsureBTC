
import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory as bqbtc_idl } from '../../../declarations/icp_bqbtc/icp_bqbtc.did.js';
import { idlFactory as governance_idl } from '../../../declarations/icp_governance/icp_governance.did.js';
import { idlFactory as cover_idl } from '../../../declarations/icp_cover/icp_cover.did.js';
import { idlFactory as pool_idl } from '../../../declarations/icp_pool/icp_pool.did.js';
import { canisterId as bqbtc_canister_id } from '../../../declarations/icp_bqbtc/index.js';
import { canisterId as governance_canister_id } from '../../../declarations/icp_governance/index.js';
import { canisterId as cover_canister_id } from '../../../declarations/icp_cover/index.js';
import { canisterId as pool_canister_id } from '../../../declarations/icp_pool/index.js';

// Determine if we're in local development
const isDevelopment = process.env.NODE_ENV === 'development' || 
                     process.env.DFX_NETWORK === 'local' ||
                     window.location.hostname === 'localhost' ||
                     window.location.hostname.includes('127.0.0.1');

const host = isDevelopment ? 'http://127.0.0.1:4943' : 'https://ic0.app';

// Create a shared agent
let agent: HttpAgent | null = null;

async function getAgent() {
  if (!agent) {
    agent = new HttpAgent({ host });
    
    // For local development, fetch root key to disable certificate verification
    if (isDevelopment) {
      try {
        await agent.fetchRootKey();
        console.log('Root key fetched successfully for local development');
      } catch (error) {
        console.warn('Unable to fetch root key. Ensure your local dfx replica is running on port 4943');
        console.error(error);
      }
    }
  }
  return agent;
}

export async function getBQBTCActor() {
  const agentInstance = await getAgent();
  return Actor.createActor(bqbtc_idl, {
    agent: agentInstance,
    canisterId: bqbtc_canister_id,
  });
}

export async function getGovernanceActor() {
  const agentInstance = await getAgent();
  return Actor.createActor(governance_idl, {
    agent: agentInstance,
    canisterId: governance_canister_id,
  });
}

export async function getCoverActor() {
  const agentInstance = await getAgent();
  return Actor.createActor(cover_idl, {
    agent: agentInstance,
    canisterId: cover_canister_id,
  });
}

export async function getPoolActor() {
  const agentInstance = await getAgent();
  return Actor.createActor(pool_idl, {
    agent: agentInstance,
    canisterId: pool_canister_id,
  });
}
