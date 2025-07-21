import { useState, useEffect } from 'react';
import { getBQBTCActor } from './utils/actor';
import { Principal } from '@dfinity/principal';
import './App.css'

const App = () => {
  const [balance, setBalance] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(false);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');

  const defaultPrincipal = 'lwhp7-4f5ko-574g2-7fbvf-iba42-scc2h-34u62-ig5gr-ncqfi-exlgd-aqe';

  const fetchBalance = async (principalId: string = defaultPrincipal) => {
    setIsLoading(true);
    try {
      const actor = await getBQBTCActor();
      const result = await actor.balance_of(Principal.fromText(principalId));
      setBalance(result.toString());
      setMessage('Balance fetched successfully');
    } catch (error) {
      console.error('Error fetching balance:', error);
      setMessage('Error fetching balance');
    } finally {
      setIsLoading(false);
    }
  };

  const handleMint = async () => {
    if (!amount) return;
    setIsLoading(true);
    try {
      const actor = await getBQBTCActor();
      const recipient = address || defaultPrincipal;
      await actor.mint(Principal.fromText(recipient), BigInt(amount));
      setMessage('Tokens minted successfully');
      fetchBalance(recipient);
    } catch (error) {
      console.error('Error minting tokens:', error);
      setMessage('Error minting tokens');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBurn = async () => {
    if (!amount) return;
    setIsLoading(true);
    try {
      const actor = await getBQBTCActor();
      const target = address || defaultPrincipal;
      await actor.burn(Principal.fromText(target), BigInt(amount));
      setMessage('Tokens burned successfully');
      fetchBalance(target);
    } catch (error) {
      console.error('Error burning tokens:', error);
      setMessage('Error burning tokens');
    } finally {
      setIsLoading(false);
    }
  };

  const handleTransfer = async () => {
    if (!amount || !recipientAddress) return;
    setIsLoading(true);
    try {
      const actor = await getBQBTCActor();
      await actor.transfer(Principal.fromText(recipientAddress), BigInt(amount));
      setMessage('Transfer successful');
      fetchBalance();
    } catch (error) {
      console.error('Error transferring tokens:', error);
      setMessage('Error transferring tokens');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBalance();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>BQBTC Token Dashboard</h1>
      </header>
      <main>
        <div className="balance-container">
          <h2>Token Operations</h2>
          {message && <p className={`message ${message.includes('Error') ? 'error' : 'success'}`}>{message}</p>}
          
          <div className="operation-section">
            <h3>Check Balance</h3>
            <input
              type="text"
              placeholder="Principal ID (optional)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <button onClick={() => fetchBalance(address || defaultPrincipal)} disabled={isLoading}>
              Check Balance
            </button>
            <p className="balance">Current Balance: {balance}</p>
          </div>

          <div className="operation-section">
            <h3>Mint Tokens</h3>
            <input
              type="text"
              placeholder="Recipient Principal ID (optional)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleMint} disabled={isLoading || !amount}>
              Mint
            </button>
          </div>

          <div className="operation-section">
            <h3>Burn Tokens</h3>
            <input
              type="text"
              placeholder="Target Principal ID (optional)"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleBurn} disabled={isLoading || !amount}>
              Burn
            </button>
          </div>

          <div className="operation-section">
            <h3>Transfer Tokens</h3>
            <input
              type="text"
              placeholder="Recipient Principal ID"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
            />
            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <button onClick={handleTransfer} disabled={isLoading || !amount || !recipientAddress}>
              Transfer
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
