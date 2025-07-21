import { useState, useEffect } from 'react';
import { getBQBTCActor } from './utils/actor';
import { Principal } from '@dfinity/principal';
import './App.css'

const App = () => {
  const [balance, setBalance] = useState<string>('0');
  const [isLoading, setIsLoading] = useState(false);
  const [checkAddress, setCheckAddress] = useState('');
  const [mintAddress, setMintAddress] = useState('');
  const [burnAddress, setBurnAddress] = useState('');
  const [transferAddress, setTransferAddress] = useState('');
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');
  const [currentPrincipal, setCurrentPrincipal] = useState('');
  const [currentOperation, setCurrentOperation] = useState<'check' | 'mint' | 'burn' | 'transfer' | null>(null);

  const defaultPrincipal = 'lwhp7-4f5ko-574g2-7fbvf-iba42-scc2h-34u62-ig5gr-ncqfi-exlgd-aqe';

  const validatePrincipal = (principalId: string): boolean => {
    try {
      Principal.fromText(principalId);
      return true;
    } catch {
      return false;
    }
  };

  const fetchBalance = async (principalId?: string) => {
    const targetPrincipal = principalId || checkAddress || defaultPrincipal;
    
    if (!validatePrincipal(targetPrincipal)) {
      setMessage('Error: Invalid Principal ID format');
      return;
    }

    setCurrentOperation('check');
    setIsLoading(true);
    try {
      const actor = await getBQBTCActor();
      const result = await actor.balance_of(Principal.fromText(targetPrincipal));
      // Convert bigint to string safely
      const balanceStr = typeof result === 'bigint' ? result.toString() : '0';
      setBalance(balanceStr);
      setCurrentPrincipal(targetPrincipal);
      setMessage(`Balance fetched successfully for ${targetPrincipal}`);
    } catch (error) {
      console.error('Error fetching balance:', error);
      setMessage(`Error fetching balance: ${error instanceof Error ? error.message : 'Unknown error'}`);
      setBalance('0');
    } finally {
      setIsLoading(false);
      setCurrentOperation(null);
    }
  };

  const handleMint = async () => {
    if (!amount) {
      setMessage('Error: Amount is required');
      return;
    }
    
    const recipient = mintAddress || defaultPrincipal;
    if (!validatePrincipal(recipient)) {
      setMessage('Error: Invalid recipient Principal ID');
      return;
    }

    setCurrentOperation('mint');
    setIsLoading(true);
    try {
      const actor = await getBQBTCActor();
      await actor.mint(Principal.fromText(recipient), BigInt(amount));
      setMessage(`Successfully minted ${amount} tokens to ${recipient}`);
      // Refresh the balance for the recipient
      await fetchBalance(recipient);
    } catch (error) {
      console.error('Error minting tokens:', error);
      setMessage(`Error minting tokens: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
      setCurrentOperation(null);
    }
  };

  const handleBurn = async () => {
    if (!amount) {
      setMessage('Error: Amount is required');
      return;
    }

    const target = burnAddress || defaultPrincipal;
    if (!validatePrincipal(target)) {
      setMessage('Error: Invalid target Principal ID');
      return;
    }

    setCurrentOperation('burn');
    setIsLoading(true);
    try {
      const actor = await getBQBTCActor();
      await actor.burn(Principal.fromText(target), BigInt(amount));
      setMessage(`Successfully burned ${amount} tokens from ${target}`);
      // Refresh the balance for the target
      await fetchBalance(target);
    } catch (error) {
      console.error('Error burning tokens:', error);
      setMessage(`Error burning tokens: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
      setCurrentOperation(null);
    }
  };

  const handleTransfer = async () => {
    if (!amount) {
      setMessage('Error: Amount is required');
      return;
    }
    
    if (!transferAddress) {
      setMessage('Error: Recipient address is required');
      return;
    }

    if (!validatePrincipal(transferAddress)) {
      setMessage('Error: Invalid recipient Principal ID');
      return;
    }

    setCurrentOperation('transfer');
    setIsLoading(true);
    try {
      const actor = await getBQBTCActor();
      await actor.transfer(Principal.fromText(transferAddress), BigInt(amount));
      setMessage(`Successfully transferred ${amount} tokens to ${transferAddress}`);
      // Refresh the current user's balance
      await fetchBalance();
    } catch (error) {
      console.error('Error transferring tokens:', error);
      setMessage(`Error transferring tokens: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
      setCurrentOperation(null);
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
            <div className="input-group">
              <input
                type="text"
                placeholder="Enter Principal ID"
                value={checkAddress}
                onChange={(e) => setCheckAddress(e.target.value)}
                className={checkAddress && !validatePrincipal(checkAddress) ? 'error' : ''}
              />
              {checkAddress && !validatePrincipal(checkAddress) && (
                <p className="error-text">Invalid Principal ID format</p>
              )}
              <div className="helper-text">
                Leave empty to use default principal: {defaultPrincipal.slice(0, 10)}...
              </div>
            </div>
            <div className="button-group">
              <button 
                onClick={() => fetchBalance()} 
                disabled={isLoading || (checkAddress.length > 0 && !validatePrincipal(checkAddress))}
              >
                {isLoading && currentOperation === 'check' ? 'Checking...' : 'Check Balance'}
              </button>
              <button 
                onClick={() => {
                  setCheckAddress('');
                  fetchBalance(defaultPrincipal);
                }}
                disabled={isLoading}
                className="secondary"
              >
                Use Default Principal
              </button>
            </div>
            <div className="balance-display">
              <h4>Current Balance:</h4>
              <p className="balance">{balance} BQBTC</p>
              {currentPrincipal && (
                <p className="principal-info">Principal: {currentPrincipal}</p>
              )}
            </div>
          </div>

          <div className="operation-section">
            <h3>Mint Tokens</h3>
            <div className="input-group">
              <input
                type="text"
                placeholder="Recipient Principal ID (optional)"
                value={mintAddress}
                onChange={(e) => setMintAddress(e.target.value)}
                className={mintAddress && !validatePrincipal(mintAddress) ? 'error' : ''}
              />
              {mintAddress && !validatePrincipal(mintAddress) && (
                <p className="error-text">Invalid Principal ID format</p>
              )}
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
              />
            </div>
            <button 
              onClick={handleMint} 
              disabled={isLoading || !amount || (mintAddress.length > 0 && !validatePrincipal(mintAddress))}
            >
              {isLoading && currentOperation === 'mint' ? 'Minting...' : 'Mint'}
            </button>
          </div>

          <div className="operation-section">
            <h3>Burn Tokens</h3>
            <div className="input-group">
              <input
                type="text"
                placeholder="Target Principal ID (optional)"
                value={burnAddress}
                onChange={(e) => setBurnAddress(e.target.value)}
                className={burnAddress && !validatePrincipal(burnAddress) ? 'error' : ''}
              />
              {burnAddress && !validatePrincipal(burnAddress) && (
                <p className="error-text">Invalid Principal ID format</p>
              )}
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
              />
            </div>
            <button 
              onClick={handleBurn} 
              disabled={isLoading || !amount || (burnAddress.length > 0 && !validatePrincipal(burnAddress))}
            >
              {isLoading && currentOperation === 'burn' ? 'Burning...' : 'Burn'}
            </button>
          </div>

          <div className="operation-section">
            <h3>Transfer Tokens</h3>
            <div className="input-group">
              <input
                type="text"
                placeholder="Recipient Principal ID"
                value={transferAddress}
                onChange={(e) => setTransferAddress(e.target.value)}
                className={transferAddress && !validatePrincipal(transferAddress) ? 'error' : ''}
              />
              {transferAddress && !validatePrincipal(transferAddress) && (
                <p className="error-text">Invalid Principal ID format</p>
              )}
              <input
                type="number"
                placeholder="Amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                min="0"
              />
            </div>
            <button 
              onClick={handleTransfer} 
              disabled={isLoading || !amount || !transferAddress || !validatePrincipal(transferAddress)}
            >
              {isLoading && currentOperation === 'transfer' ? 'Transferring...' : 'Transfer'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
