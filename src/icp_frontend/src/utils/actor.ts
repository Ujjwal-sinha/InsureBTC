
import { HttpAgent, Actor } from '@dfinity/agent';
import { idlFactory as bqbtc_idl } from '../../../declarations/icp_bqbtc/icp_bqbtc.did.js';
import { idlFactory as governance_idl } from '../../../declarations/icp_governance/icp_governance.did.js';
import { idlFactory as cover_idl } from '../../../declarations/icp_cover/icp_cover.did.js';
import { idlFactory as pool_idl } from '../../../declarations/icp_pool/icp_pool.did.js';

// Determine if we're in local development
const isDevelopment = import.meta.env.VITE_DFX_NETWORK === 'local' || 
                     import.meta.env.NODE_ENV === 'development' ||
                     window.location.hostname === 'localhost' ||
                     window.location.hostname.includes('127.0.0.1');

const host = isDevelopment ? 
  (import.meta.env.VITE_IC_HOST_LOCAL || 'http://127.0.0.1:4943') : 
  (import.meta.env.VITE_IC_HOST_MAINNET || 'https://ic0.app');

// Get canister IDs from environment or config based on network
// Load canister IDs from environment variables first, then use defaults
const BQBTC_CANISTER_ID = import.meta.env.VITE_CANISTER_ID_ICP_BQBTC || "uxrrr-q7777-77774-qaaaq-cai";
const GOVERNANCE_CANISTER_ID = import.meta.env.VITE_CANISTER_ID_ICP_GOVERNANCE || "umunu-kh777-77774-qaaca-cai";
const COVER_CANISTER_ID = import.meta.env.VITE_CANISTER_ID_ICP_COVER || "u6s2n-gx777-77774-qaaba-cai";
const POOL_CANISTER_ID = import.meta.env.VITE_CANISTER_ID_ICP_POOL || "ulvla-h7777-77774-qaacq-cai";
// Create a shared agent
let agent: HttpAgent | null = null;

async function getAgent() {
  if (!agent) {
    console.log('Initializing HTTP agent with host:', host);
    console.log('Environment:', isDevelopment ? 'Development' : 'Production');
    
    agent = new HttpAgent({ host });
    
    // For local development, fetch root key to disable certificate verification
    if (isDevelopment) {
      try {
        await agent.fetchRootKey();
        console.log('Root key fetched successfully for local development');
      } catch (error) {
        console.error('Failed to fetch root key:', error);
        console.warn('Please ensure:');
        console.warn('1. Your local dfx replica is running (dfx start)');
        console.warn('2. The correct port is being used (default: 4943)');
        console.warn('3. The network configuration matches your environment');
        throw new Error('Failed to initialize agent: Root key fetch failed');
      }
    }
  }
  return agent;
}

export async function getBQBTCActor() {
  try {
    const agentInstance = await getAgent();
    console.log('Creating BQBTC actor with canister ID:', BQBTC_CANISTER_ID);
    const actor = Actor.createActor(bqbtc_idl, {
      agent: agentInstance,
      canisterId: BQBTC_CANISTER_ID,
    });
    
    // Verify actor creation
    if (!actor) {
      throw new Error('Failed to create BQBTC actor');
    }
    
    return actor;
  } catch (error) {
    console.error('Error creating BQBTC actor:', error);
    throw new Error(`Failed to initialize BQBTC actor: ${error instanceof Error ? error.message : String(error)}`);
  }
}

export async function getGovernanceActor() {
  const agentInstance = await getAgent();
  return Actor.createActor(governance_idl, {
    agent: agentInstance,
    canisterId: GOVERNANCE_CANISTER_ID,
  });
}

export async function getCoverActor() {
  const agentInstance = await getAgent();
  return Actor.createActor(cover_idl, {
    agent: agentInstance,
    canisterId: COVER_CANISTER_ID,
  });
}

export async function getPoolActor() {
  const agentInstance = await getAgent();
  return Actor.createActor(pool_idl, {
    agent: agentInstance,
    canisterId: POOL_CANISTER_ID,
  });
}
