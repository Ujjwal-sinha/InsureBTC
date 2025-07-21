import React, { useState, useEffect } from 'react';
import { getBQBTCActor, } from '../utils/actor';

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

      // Get token info (as properties, not functions)
      const name = await actor.name();
      const symbol = await actor.symbol();
      const decimals = await actor.decimals();
      const totalSupply = await actor.total_supply();

      setTokenInfo({
        name: typeof name === 'string' ? name : '',
        symbol: typeof symbol === 'string' ? symbol : '',
        decimals: typeof decimals === 'bigint' ? Number(decimals) : Number(decimals),
        total_supply: typeof totalSupply === 'bigint' ? totalSupply : BigInt(String(totalSupply))
      });

      // Use entered principal for balance
      const balance = await actor.balance_of(principalId);
      setBqbtcBalance((balance as bigint).toString());
    } catch (err) {
      console.error('Error fetching balance:', err);
      setError(`Error fetching balance: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleMint = async () => {
    if (!mintAmount) return;
    try {
      setLoading(true);
      setError('');
      const actor = await getBQBTCActor();
      await actor.mint('2vxsx-fae', BigInt(mintAmount));
      await fetchBalance();
    } catch (err) {
      console.error('Error minting:', err);
      setError(`Error minting: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleBurn = async () => {
    if (!burnAmount) return;
    try {
      setLoading(true);
      setError('');
      const actor = await getBQBTCActor();
      await actor.burn(BigInt(burnAmount));
      await fetchBalance();
    } catch (err) {
      console.error('Error burning:', err);
      setError(`Error burning: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTransfer = async () => {
    if (!transferTo || !transferAmount) return;
    try {
      setLoading(true);
      setError('');
      const actor = await getBQBTCActor();
      await actor.transfer(transferTo, BigInt(transferAmount));
      await fetchBalance();
    } catch (err) {
      console.error('Error transferring:', err);
      setError(`Error transferring: ${err}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

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
              onChange={e => setPrincipalId(e.target.value)}
              style={{ marginRight: '10px', padding: '5px', width: '220px' }}
            />
            <button onClick={fetchBalance} disabled={loading || !principalId}>
              {loading ? 'Loading...' : 'Check Balance'}
            </button>
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
            <button onClick={handleTransfer} disabled={loading || !transferTo || !transferAmount}>
              Transfer
            </button>
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
        <div style={{ 
          color: 'red', 
          marginTop: '20px', 
          padding: '10px', 
          background: 'rgba(255,0,0,0.1)', 
          borderRadius: '5px' 
        }}>
          {error}
        </div>
      )}
    </div>
  );
};

export default Dashboard;