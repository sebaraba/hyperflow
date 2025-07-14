import { useQuery } from '@tanstack/react-query';

export interface Token {
  address?: `0x${string}`;
  symbol: string;
  name: string;
  decimals: number;
  logoURI?: string;
  isNative?: boolean;
}

// Mock API call - replace with actual HyperEVM token list API
const fetchTokens = async (): Promise<Token[]> => {
  // This would typically be an API call to fetch tokens from HyperEVM
  // For now, returning a more comprehensive mock list
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        {
          symbol: 'ETH',
          name: 'Ethereum',
          decimals: 18,
          logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2/logo.png',
          isNative: true,
        },
        {
          address: '0xa0b86a33e6ba0dc34b8e6f3c8b6b2b5c5a9f2e7f',
          symbol: 'USDC',
          name: 'USD Coin',
          decimals: 6,
          logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xA0b86a33E6ba0DC34b8e6F3c8B6b2b5c5a9F2e7f/logo.png',
        },
        {
          address: '0xdac17f958d2ee523a2206206994597c13d831ec7',
          symbol: 'USDT',
          name: 'Tether USD',
          decimals: 6,
          logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0xdAC17F958D2ee523a2206206994597C13D831ec7/logo.png',
        },
        {
          address: '0x6b175474e89094c44da98b954eedeac495271d0f',
          symbol: 'DAI',
          name: 'Dai Stablecoin',
          decimals: 18,
          logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x6B175474E89094C44Da98b954EedeAC495271d0F/logo.png',
        },
        {
          address: '0x2260fac5e5542a773aa44fbcfedf7c193bc2c599',
          symbol: 'WBTC',
          name: 'Wrapped Bitcoin',
          decimals: 8,
          logoURI: 'https://raw.githubusercontent.com/trustwallet/assets/master/blockchains/ethereum/assets/0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599/logo.png',
        },
      ]);
    }, 1000);
  });
};

export const useTokens = () => {
  return useQuery({
    queryKey: ['tokens'],
    queryFn: fetchTokens,
    staleTime: 5 * 60 * 1000, // 5 minutes
    refetchOnWindowFocus: false,
  });
};
