import React, { useState, useEffect } from 'react';
import { Principal } from '@dfinity/principal';
import { getBQBTCActor } from '../utils/actor';

interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  total_supply: bigint;
}

const Dashboard: React.FC = () => {
  const [bqbtcBalance, setBqbtcBalance] = useState<string>('0');
  const [tokenInfo, setTokenInfo] = useState<TokenInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [mintAmount, setMintAmount] = useState('');
  const [burnAmount, setBurnAmount] = useState('');
  const [transferTo, setTransferTo] = useState('');
  const [transferAmount, setTransferAmount] = useState('');
  const [principalId, setPrincipalId] = useState('2vxsx-fae');

  const fetchBalance = async () => {
    try {
      setLoading(true);
      setError('');
      const actor = await getBQBTCActor();

      // Validate principal ID
      let principal;
      try {
        principal = Principal.fromText(principalId);
      } catch (err) {
        throw new Error('Invalid Principal ID format');
      }

      // Fetch token info
      const name = await actor.name();
      const symbol = await actor.symbol();
      const decimals = await actor.decimals();
      const totalSupply = await actor.total_supply();

      setTokenInfo({
        name: typeof name === 'string' ? name : '',
        symbol: typeof symbol === 'string' ? symbol : '',
        decimals: typeof decimals === 'bigint' ? Number(decimals) : Number(decimals),
        total_supply: BigInt(totalSupply as bigint),
      });

      // Fetch balance
      const balance = await actor.balance_of(principal);
      if (balance === undefined || balance === null) {
        throw new Error('Balance returned undefined or null');
      }
      setBqbtcBalance(balance.toString());
    } catch (err) {
      console.error('Error fetching balance:', err);
      setError(`Error fetching balance: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleMint = async () => {
    if (!mintAmount) {
      setError('Please enter a valid mint amount');
      return;
    }
    const amount = Number(mintAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Invalid mint amount');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const actor = await getBQBTCActor();
      const principal = Principal.fromText('2vxsx-fae'); // Replace with authenticated principal if needed
      await actor.mint(principal, BigInt(amount));
      await fetchBalance();
      setMintAmount('');
    } catch (err) {
      console.error('Error minting:', err);
      setError(`Error fetching balance: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBurn = async () => {
    if (!burnAmount) {
      setError('Please enter a valid burn amount');
      return;
    }
    const amount = Number(burnAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Invalid burn amount');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const actor = await getBQBTCActor();
      await actor.burn(BigInt(amount));
      await fetchBalance();
      setBurnAmount('');
    } catch (err) {
      console.error('Error burning:', err);
      setError(`Error fetching balance: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async () => {
    if (!transferTo || !transferAmount) {
      setError('Please enter recipient principal and amount');
      return;
    }
    const amount = Number(transferAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Invalid transfer amount');
      return;
    }
    try {
      setLoading(true);
      setError('');
      const actor = await getBQBTCActor();
      let recipient;
      try {
        recipient = Principal.fromText(transferTo);
      } catch (err) {
        throw new Error('Invalid recipient Principal ID');
      }
      await actor.transfer(recipient, BigInt(amount));
      await fetchBalance();
      setTransferTo('');
      setTransferAmount('');
    } catch (err) {
      console.error('Error transferring:', err);
      setError(`Error fetching balance: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, [principalId]); // Re-fetch balance when principalId changes

  // Validate principal ID for UI feedback
  const isValidPrincipal = () => {
    try {
      Principal.fromText(principalId);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Interact with your deployed contracts</p>
      </div>

      <div className="dashboard-grid">
        {/* BQBTC Token Contract */}
        <div className="dashboard-card">
          <h2>BQBTC Token</h2>

          {tokenInfo && (
            <div style={{ marginBottom: '20px' }}>
              <p><strong>Name:</strong> {tokenInfo.name}</p>
              <p><strong>Symbol:</strong> {tokenInfo.symbol}</p>
              <p><strong>Decimals:</strong> {tokenInfo.decimals}</p>
              <p><strong>Total Supply:</strong> {tokenInfo.total_supply.toString()}</p>
            </div>
          )}

          <div style={{ marginBottom: '20px' }}>
            <h3>Check Balance</h3>
            <input
              type="text"
              placeholder="Principal ID"
              value={principalId}
              onChange={(e) => setPrincipalId(e.target.value)}
              style={{ marginRight: '10px', padding: '5px', width: '220px' }}
            />
            <button onClick={fetchBalance} disabled={loading || !principalId || !isValidPrincipal()}>
              {loading ? 'Loading...' : 'Check Balance'}
            </button>
            {!isValidPrincipal() && principalId && (
              <p style={{ color: 'red', fontSize: '12px' }}>Invalid Principal ID</p>
            )}
            <div style={{ marginTop: '10px' }}>
              <strong>Balance:</strong> {bqbtcBalance} BQBTC
            </div>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4>Mint Tokens</h4>
            <input
              type="number"
              placeholder="Amount to mint"
              value={mintAmount}
              onChange={(e) => setMintAmount(e.target.value)}
              style={{ marginRight: '10px', padding: '5px' }}
            />
            <button onClick={handleMint} disabled={loading || !mintAmount}>
              Mint
            </button>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4>Burn Tokens</h4>
            <input
              type="number"
              placeholder="Amount to burn"
              value={burnAmount}
              onChange={(e) => setBurnAmount(e.target.value)}
              style={{ marginRight: '10px', padding: '5px' }}
            />
            <button onClick={handleBurn} disabled={loading || !burnAmount}>
              Burn
            </button>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <h4>Transfer Tokens</h4>
            <input
              type="text"
              placeholder="Recipient Principal"
              value={transferTo}
              onChange={(e) => setTransferTo(e.target.value)}
              style={{ marginRight: '10px', padding: '5px', width: '200px' }}
            />
            <input
              type="number"
              placeholder="Amount"
              value={transferAmount}
              onChange={(e) => setTransferAmount(e.target.value)}
              style={{ marginRight: '10px', padding: '5px' }}
            />
            <button
              onClick={handleTransfer}
              disabled={loading || !transferTo || !transferAmount}
            >
              Transfer
            </button>
            {transferTo && (() => {
              try {
                Principal.fromText(transferTo);
                return null;
              } catch {
                return <p style={{ color: 'red', fontSize: '12px' }}>Invalid Recipient Principal</p>;
              }
            })()}
          </div>
        </div>

        {/* Governance Contract */}
        <div className="dashboard-card">
          <h2>Governance</h2>
          <p>Governance contract is deployed and ready for interaction.</p>
          <button onClick={() => window.location.href = '/governance'}>
            Go to Governance
          </button>
        </div>

        {/* Cover Contract */}
        <div className="dashboard-card">
          <h2>Cover Protocol</h2>
          <p>Cover contract is deployed and ready for interaction.</p>
          <button onClick={() => window.location.href = '/cover'}>
            Go to Cover
          </button>
        </div>

        {/* Pool Contract */}
        <div className="dashboard-card">
          <h2>Liquidity Pool</h2>
          <p>Pool contract is deployed and ready for interaction.</p>
          <button onClick={() => window.location.href = '/pool'}>
            Go to Pool
          </button>
        </div>
      </div>

      {error && (
        <div
          style={{
            color: 'red',
            marginTop: '20px',
            padding: '10px',
            background: 'rgba(255,0,0,0.1)',
            borderRadius: '5px',
          }}
        >
          {error}
        </div>
      )}
    </div>
  );
};

export default Dashboard;