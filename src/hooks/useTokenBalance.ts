import { useReadContract } from 'wagmi';
import { erc20Abi } from 'viem';

interface UseTokenBalanceProps {
  tokenAddress: `0x${string}`;
  userAddress: `0x${string}` | undefined;
  enabled?: boolean;
}

export const useTokenBalance = ({
  tokenAddress,
  userAddress,
  enabled = true,
}: UseTokenBalanceProps) => {
  return useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'balanceOf',
    args: userAddress ? [userAddress] : undefined,
    query: {
      enabled: enabled && !!userAddress,
      refetchInterval: 10000, // Refetch every 10 seconds
    },
  });
};

// Example usage hook for token symbol
export const useTokenSymbol = (tokenAddress: `0x${string}`) => {
  return useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'symbol',
  });
};

// Example usage hook for token decimals
export const useTokenDecimals = (tokenAddress: `0x${string}`) => {
  return useReadContract({
    address: tokenAddress,
    abi: erc20Abi,
    functionName: 'decimals',
  });
};
