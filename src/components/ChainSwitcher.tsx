import { useChainId, useSwitchChain, useChains } from 'wagmi';

export const ChainSwitcher = () => {
  const chainId = useChainId();
  const { chains, switchChain } = useSwitchChain();
  const availableChains = useChains();

  return (
    <div className="chain-switcher">
      <h3>Current Network</h3>
      <p>Chain ID: {chainId}</p>
      <p>
        Network:{' '}
        {availableChains.find((chain) => chain.id === chainId)?.name ||
          'Unknown'}
      </p>

      <div className="chain-options">
        <h4>Switch Network:</h4>
        {chains.map((chain) => (
          <button
            key={chain.id}
            onClick={() => switchChain({ chainId: chain.id })}
            disabled={chainId === chain.id}
            className={`chain-button ${chainId === chain.id ? 'active' : ''}`}
          >
            {chain.name}
            {chain.testnet && ' (Testnet)'}
          </button>
        ))}
      </div>
    </div>
  );
};
