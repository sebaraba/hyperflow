import { useBalance } from 'wagmi';
import { formatEther } from 'viem';

interface TokenBalanceHookProps {
  userAddress: `0x${string}` | undefined;
  tokenAddress?: `0x${string}`;
  enabled?: boolean;
}

export const useTokenBalance = ({ userAddress, tokenAddress, enabled = true }: TokenBalanceHookProps) => {
  const { data: balance, isLoading, error } = useBalance({
    address: userAddress,
    token: tokenAddress, // If undefined, fetches native ETH balance
    query: {
      enabled: enabled && !!userAddress,
    },
  });

  const formattedBalance = balance ? {
    value: Number(formatEther(balance.value)),
    symbol: balance.symbol,
    decimals: balance.decimals,
    formatted: `${Number(formatEther(balance.value)).toFixed(6)} ${balance.symbol}`,
    raw: balance.value,
  } : null;

  return {
    balance: formattedBalance,
    isLoading,
    error,
  };
};
