# `icp`

## Canister URL

icp_backend canister created with canister id: bkyz2-fmaaa-aaaaa-qaaaq-cai
icp_backend: https://a4gq6-oaaaa-aaaab-qaa4q-cai.raw.icp0.io/?id=lpi4p-cqaaa-aaaal-qsgaa-cai

# Frontend Integration

### get_total_tvl

Returns the total TVL across all networks we have integrated. Takes no parameter

### get_network_tvl

Returns the total TVL of the pools in a specific network. Takes the network `chain ID` and `RPC` as parameter

### pool_withdraw

For withdrawing deposit from a pool on a specific network to be called by the user/ depositor. Takes the `pool_id`, `user` address as string, `pool_deposit_type` which is either native or vault deposit and the `chain_id` of the network. Returns the hash of the transaction.

### vault_withdraw

For withdrawing deposit from a vault on a specific network to be called by the user/ depositor. Takes the `vault_id`, `user` address as string, `pool_deposit_type` which is either native or vault deposit and the `chain_id` of the network. Returns the hash of the transaction.

### claim_proposal_funds

For paying claims for approved proposals from the governance contract. Tkes the `proposal_id`, `user` address as string, and the `chain_id` of the network. Also returns the transaction hash.
