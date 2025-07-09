# HyperFlow - Quick Start Guide

## 🚀 Project Setup Complete!

Your TypeScript React project with HyperEVM integration is now fully configured and ready to use.

## ✅ What's Included

### Core Stack

- **TypeScript** - Type-safe development
- **React 19** - Latest React with Vite build system
- **React Router DOM** - Client-side routing with Dashboard/About pages
- **TanStack Query (React Query)** - Data fetching with DevTools
- **Wagmi v2 + Viem** - Modern Web3 React hooks library for HyperEVM

### Development Tools

- **ESLint** - Code linting with TypeScript rules
- **Prettier** - Code formatting
- **VS Code** - Auto-format on save configured
- **Lint on save** - Automatically fixes issues when saving

### Web3 Integration

- **HyperEVM Testnet** - Pre-configured connection
- **Wallet Management** - Connect/disconnect MetaMask
- **Balance Display** - Real-time ETH balance with React Query
- **Auto Network Switching** - Prompts to add HyperEVM testnet

## 🏃‍♂️ Getting Started

1. **Start development server:**

   ```bash
   npm run dev
   ```

   Opens at `http://localhost:5173`

2. **Connect your wallet:**
   - Install MetaMask if not already installed
   - Click "Connect Wallet" on the home page
   - Approve the connection and network addition

3. **Start building:**
   - Add new pages in `src/pages/`
   - Create components in `src/components/`
   - Add Web3 hooks in `src/hooks/`

## 📁 Key Files

```
src/
├── components/
│   ├── Navigation.tsx      # App navigation
│   ├── WalletConnection.tsx # Web3 wallet UI
│   └── Balance.tsx         # ETH balance display
├── pages/
│   ├── Dashboard.tsx           # Dashboard page
│   └── About.tsx          # About page
├── providers/
│   ├── QueryProvider.tsx  # React Query setup
│   └── Web3Provider.tsx   # Web3 context
├── hooks/
│   ├── useWeb3.ts         # Web3 hook
│   └── useBalance.ts      # Balance fetching hook
└── contexts/
    └── Web3Context.ts     # Web3 context definition
```

## 🔧 Available Commands

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint issues
npm run format       # Format with Prettier
npm run format:check # Check formatting
```

## 🌐 HyperEVM Configuration

- **Chain ID:** 811 (0x32B)
- **Network:** HyperEVM Testnet
- **RPC:** https://evm-testnet.hyperlane.eth.limo
- **Explorer:** https://explorer.hyperlane.eth.limo

## 🛠️ Development Tips

1. **VS Code Extensions:**
   - ESLint - Code linting
   - Prettier - Code formatting
   - TypeScript - Enhanced TypeScript support

2. **Code Quality:**
   - Linting runs automatically on save
   - Prettier formats code on save
   - TypeScript provides type safety

3. **Web3 Development:**
   - Use `useAccount()` for wallet state
   - Use `useBalance()` for ETH balance
   - Use `useReadContract()`/`useWriteContract()` for smart contracts
   - Built-in caching and optimization with TanStack Query

4. **Adding Features:**
   - Create new pages and add routes in `App.tsx`
   - Use React Query for data fetching
   - Follow existing TypeScript patterns

## 🚨 Important Notes

- **MetaMask Required:** Users need MetaMask or compatible wallet
- **Testnet Only:** Currently configured for HyperEVM testnet
- **Auto-Formatting:** Code is automatically formatted on save in VS Code

## 🎯 Next Steps

1. **Build your features** - Start adding your application logic
2. **Add more Web3 functionality** - Smart contract interactions, transactions
3. **Customize styling** - Update `App.css` or add a CSS framework
4. **Deploy** - Build and deploy to your hosting platform

## 📚 Learn More

- [React Router Documentation](https://reactrouter.com/)
- [TanStack Query Documentation](https://tanstack.com/query/)
- [Wagmi Documentation](https://wagmi.sh/)
- [Viem Documentation](https://viem.sh/)
- [HyperEVM Documentation](https://hyperlane.xyz/)

Happy coding! 🎉
