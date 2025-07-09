import { http, createConfig } from 'wagmi';
import { mainnet, sepolia } from 'wagmi/chains';
import { injected, metaMask, walletConnect } from 'wagmi/connectors';

// Define HyperEVM testnet
export const hyperEvmTestnet = {
  id: 998,
  name: 'HyperEVM Testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'HYPE',
    symbol: 'HYPE',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.hyperliquid-testnet.xyz/evm'],
    },
  },
  blockExplorers: {
    default: {
      name: 'HyperEVM Explorer',
      url: 'https://purrsec.com',
    },
  },
  testnet: true,
} as const;

// Wagmi configuration
export const config = createConfig({
  chains: [hyperEvmTestnet, mainnet, sepolia],
  connectors: [
    injected(),
    metaMask(),
    walletConnect({
      projectId: 'demo-project-id', // You can replace with your WalletConnect project ID
    }),
  ],
  transports: {
    [hyperEvmTestnet.id]: http(),
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

declare module 'wagmi' {
  interface Register {
    config: typeof config;
  }
}
