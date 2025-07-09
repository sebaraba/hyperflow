# HyperFlow

A modern TypeScript React application configured for HyperEVM integration with professional development tools.

## Features

- **TypeScript** - Type-safe development
- **React 19** - Latest React with modern features
- **Vite** - Fast build tool and development server
- **React Router DOM** - Client-side routing
- **TanStack Query (React Query)** - Data fetching and caching
- **Wagmi + Viem** - Modern Web3 React hooks library for HyperEVM integration
- **ESLint + Prettier** - Code quality and formatting
- **Auto-formatting on save** - Configured for VS Code

## Getting Started

### Prerequisites

- Node.js 18+ (you have v22.5.1)
- npm or yarn
- MetaMask or compatible Web3 wallet

### Installation

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open your browser to `http://localhost:5173`

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Fix ESLint issues
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting

## HyperEVM Integration

This project is configured to connect to HyperEVM testnet:

- **Chain ID**: 811 (0x32B)
- **RPC URL**: https://evm-testnet.hyperlane.eth.limo
- **Explorer**: https://explorer.hyperlane.eth.limo

The wallet will automatically prompt to add the HyperEVM testnet when connecting.

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── Navigation.tsx   # Navigation component
│   └── WalletConnection.tsx  # Web3 wallet connection
├── pages/              # Page components
│   ├── Dashboard.tsx        # Dashboard page
│   └── About.tsx       # About page
├── providers/          # React context providers
│   ├── QueryProvider.tsx    # TanStack Query setup
│   └── Web3Provider.tsx     # Web3/Ethers.js setup
├── App.tsx             # Main app component
├── App.css             # Global styles
└── main.tsx            # App entry point
```

## Development Setup

### VS Code Extensions (Recommended)

1. **ESLint** - For linting
2. **Prettier** - For code formatting
3. **TypeScript** - For TypeScript support

### Auto-formatting on Save

The project is configured to automatically format code on save in VS Code. The configuration is in `.vscode/settings.json`.

## Web3 Development

Wagmi provides modern React hooks for Web3 development:

- **Account Management**: `useAccount()`, `useConnect()`, `useDisconnect()`
- **Chain Operations**: `useChainId()`, `useSwitchChain()`, `useChains()`
- **Balance & Tokens**: `useBalance()`, `useReadContract()`, `useWriteContract()`
- **Multiple Connectors**: MetaMask, WalletConnect, Injected wallets

Use Wagmi hooks in your components:

```typescript
import { useAccount, useBalance, useConnect } from 'wagmi';

const MyComponent = () => {
  const { address, isConnected } = useAccount();
  const { data: balance } = useBalance({ address });
  const { connect, connectors } = useConnect();

  // Your component logic
};
```

## Data Fetching

Wagmi is built on TanStack Query, so all Web3 data fetching is automatically cached and optimized:

```typescript
import { useReadContract } from 'wagmi';
import { erc20Abi } from 'viem';

const MyComponent = () => {
  const { data, isLoading, error } = useReadContract({
    address: '0x...', // Contract address
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: ['0x...'], // User address
  });
};
```

## Building for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Contributing

1. Ensure code passes linting: `npm run lint`
2. Format code: `npm run format`
3. Test the build: `npm run build`

## License

MIT
