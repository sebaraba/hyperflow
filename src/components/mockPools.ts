import type { Token } from '../services/tokenService';

export interface LiquidityPool {
  id: string;
  token0: Token;
  token1: Token;
  apr: number;
  tvl: number;
  volume24h: number;
  fees24h: number;
  userLiquidity?: number;
  userShare?: number;
}

export const mockPools: LiquidityPool[] = [
  {
    id: '1',
    token0: { symbol: 'ETH', name: 'Ethereum', address: '0x1', decimals: 18 },
    token1: { symbol: 'USDC', name: 'USD Coin', address: '0x2', decimals: 6 },
    apr: 12.5,
    tvl: 1250000,
    volume24h: 850000,
    fees24h: 2550,
    userLiquidity: 5000,
    userShare: 0.4,
  },
  {
    id: '2',
    token0: { symbol: 'WBTC', name: 'Wrapped Bitcoin', address: '0x3', decimals: 8 },
    token1: { symbol: 'ETH', name: 'Ethereum', address: '0x1', decimals: 18 },
    apr: 8.3,
    tvl: 890000,
    volume24h: 420000,
    fees24h: 1260,
  },
  {
    id: '3',
    token0: { symbol: 'ARB', name: 'Arbitrum', address: '0x4', decimals: 18 },
    token1: { symbol: 'USDC', name: 'USD Coin', address: '0x2', decimals: 6 },
    apr: 15.2,
    tvl: 650000,
    volume24h: 320000,
    fees24h: 960,
  },
];
