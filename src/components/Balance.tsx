import { useAccount, useBalance } from 'wagmi';
import { formatEther } from 'viem';

export const Balance = () => {
  const { address } = useAccount();
  const {
    data: balance,
    isLoading,
    error,
  } = useBalance({
    address,
  });

  if (isLoading) {
    return <p>Loading balance...</p>;
  }

  if (error) {
    return <p>Error loading balance: {error.message}</p>;
  }

  if (!balance) {
    return <p>No balance data</p>;
  }

  return (
    <div className="balance">
      <h3>Wallet Balance</h3>
      <p>
        {formatEther(balance.value)} {balance.symbol}
      </p>
    </div>
  );
};
