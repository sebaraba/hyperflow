import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Balance } from './Balance';
import { ChainSwitcher } from './ChainSwitcher';

export const WalletConnection = () => {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleConnect = () => {
    // Connect with the first available connector (usually MetaMask)
    const connector =
      connectors.find((c) => c.name === 'MetaMask') || connectors[0];
    if (connector) {
      connect({ connector });
    }
  };

  return (
    <div className="wallet-connection">
      {!isConnected ? (
        <div className="connect-options">
          <button onClick={handleConnect} className="connect-button">
            Connect Wallet
          </button>
          <div className="connector-list">
            {connectors.map((connector) => (
              <button
                key={connector.uid}
                onClick={() => connect({ connector })}
                className="connector-button"
              >
                {connector.name}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="wallet-info">
          <p>Connected: {formatAddress(address!)}</p>
          <Balance />
          <ChainSwitcher />
          <button onClick={() => disconnect()} className="disconnect-button">
            Disconnect
          </button>
        </div>
      )}
    </div>
  );
};
