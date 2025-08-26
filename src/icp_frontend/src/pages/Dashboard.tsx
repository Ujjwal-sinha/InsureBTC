import React, { useState, useEffect } from 'react';
import { Principal } from '@dfinity/principal';
import { getInsureBTCActor } from '../utils/actor';
import DashboardLayout from '../components/DashboardLayout';
import Footer from '../components/Footer';

interface TokenMetadata {
  decimals: number;
  owner: string;
  logo: string;
  name: string;
  cover_address: string | null;
  pool_address: string | null;
  total_supply: bigint;
  symbol: string;
}

interface TokenInfo {
  name: string;
  symbol: string;
  decimals: number;
  total_supply: bigint;
}

const Dashboard: React.FC = () => {
  const [insureBtcBalance, setInsureBtcBalance] = useState<string>('0');
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
      const actor = await getInsureBTCActor();

      // Validate principal ID
      let principal;
      try {
        principal = Principal.fromText(principalId);
      } catch (err) {
        throw new Error('Invalid Principal ID format');
      }

      // Fetch token metadata
      const metadata = await actor.get_metadata() as TokenMetadata;
      
      setTokenInfo({
        name: metadata.name,
        symbol: metadata.symbol,
        decimals: Number(metadata.decimals),
        total_supply: metadata.total_supply,
      });

      // Fetch balance
      const balance = await actor.balance_of(principal);
      if (balance === undefined || balance === null) {
        throw new Error('Balance returned undefined or null');
      }
      setInsureBtcBalance(balance.toString());
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
      const actor = await getInsureBTCActor();
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
      const actor = await getInsureBTCActor();
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
      const actor = await getInsureBTCActor();
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
  }, [principalId]);

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
    <DashboardLayout title="Dashboard" subtitle="Manage your InsureBTC tokens and DeFi portfolio">
      {/* Overview Cards */}
      <div className="overview-cards">
        <div className="overview-card card-blue">
          <div className="card-label">Total Balance</div>
          <div className="card-value">{insureBtcBalance} InsureBTC</div>
        </div>
        
        <div className="overview-card card-green">
          <div className="card-label">Total Supply</div>
          <div className="card-value">{tokenInfo?.total_supply.toString() || '0'} InsureBTC</div>
        </div>
        
        <div className="overview-card card-orange">
          <div className="card-label">Token Symbol</div>
          <div className="card-value">{tokenInfo?.symbol || 'InsureBTC'}</div>
        </div>
        
        <div className="overview-card card-purple">
          <div className="card-label">Decimals</div>
          <div className="card-value">{tokenInfo?.decimals || 8}</div>
        </div>
      </div>

      <div className="dashboard-grid">
        {/* BQBTC Token Contract */}
        <div className="dashboard-card">
          <h2>🪙 Token Management</h2>

          {tokenInfo && (
            <div className="token-info-grid">
              <div><strong>Name:</strong> {tokenInfo.name}</div>
              <div><strong>Symbol:</strong> {tokenInfo.symbol}</div>
              <div><strong>Decimals:</strong> {tokenInfo.decimals}</div>
              <div><strong>Total Supply:</strong> {tokenInfo.total_supply.toString()}</div>
            </div>
          )}

          <div className="form-group">
            <h3>Check Balance</h3>
            <div className="form-row">
              <input
                type="text"
                placeholder="Principal ID"
                value={principalId}
                onChange={(e) => setPrincipalId(e.target.value)}
              />
              <button onClick={fetchBalance} disabled={loading || !principalId || !isValidPrincipal()}>
                {loading ? 'Loading...' : 'Check'}
              </button>
            </div>
            {!isValidPrincipal() && principalId && (
              <p className="validation-error">Invalid Principal ID</p>
            )}
            <div className="info-box">
              <strong>Balance:</strong> {insureBtcBalance} InsureBTC
            </div>
          </div>

          <div className="form-group">
            <h4>Mint Tokens</h4>
            <div className="form-row">
              <input
                type="number"
                placeholder="Amount to mint"
                value={mintAmount}
                onChange={(e) => setMintAmount(e.target.value)}
              />
              <button onClick={handleMint} disabled={loading || !mintAmount}>
                Mint
              </button>
            </div>
          </div>

          <div className="form-group">
            <h4>Burn Tokens</h4>
            <div className="form-row">
              <input
                type="number"
                placeholder="Amount to burn"
                value={burnAmount}
                onChange={(e) => setBurnAmount(e.target.value)}
              />
              <button onClick={handleBurn} disabled={loading || !burnAmount}>
                Burn
              </button>
            </div>
          </div>

          <div className="form-group">
            <h4>Transfer Tokens</h4>
            <div className="form-row">
              <input
                type="text"
                placeholder="Recipient Principal"
                value={transferTo}
                onChange={(e) => setTransferTo(e.target.value)}
              />
            </div>
            <div className="form-row">
              <input
                type="number"
                placeholder="Amount"
                value={transferAmount}
                onChange={(e) => setTransferAmount(e.target.value)}
              />
              <button
                onClick={handleTransfer}
                disabled={loading || !transferTo || !transferAmount}
              >
                Transfer
              </button>
            </div>
            {transferTo && (() => {
              try {
                Principal.fromText(transferTo);
                return null;
              } catch {
                return <p className="validation-error">Invalid Recipient Principal</p>;
              }
            })()}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card">
          <h2>⚡ Quick Actions</h2>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <button 
              onClick={() => window.location.href = '/governance'}
              style={{
                background: 'linear-gradient(135deg, #3b82f6, #1d4ed8)',
                color: 'white',
                border: 'none',
                padding: '1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'left'
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🏛️</div>
              <div style={{ fontWeight: '600' }}>Governance</div>
                             <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Vote on proposals and manage protocol</div>
            </button>
            
            <button 
              onClick={() => window.location.href = '/cover'}
              style={{
                background: 'linear-gradient(135deg, #10b981, #059669)',
                color: 'white',
                border: 'none',
                padding: '1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'left'
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>🛡️</div>
              <div style={{ fontWeight: '600' }}>Insurance Cover</div>
                             <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Protect your investments</div>
            </button>
            
            <button 
              onClick={() => window.location.href = '/pool'}
              style={{
                background: 'linear-gradient(135deg, #f59e0b, #d97706)',
                color: 'white',
                border: 'none',
                padding: '1rem',
                borderRadius: '8px',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                textAlign: 'left'
              }}
            >
              <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>💧</div>
              <div style={{ fontWeight: '600' }}>Liquidity Pool</div>
                             <div style={{ fontSize: '0.875rem', opacity: 0.9 }}>Provide liquidity and earn rewards</div>
            </button>
          </div>
        </div>
      </div>

      {error && (
        <div
          style={{
            color: '#ef4444',
            marginTop: '1rem',
            padding: '1rem',
            background: '#fef2f2',
            borderRadius: '8px',
            border: '1px solid #fecaca'
          }}
        >
          {error}
        </div>
      )}
      <Footer />
    </DashboardLayout>
  );
};

export default Dashboard;