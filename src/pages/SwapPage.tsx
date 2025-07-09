import { Container } from '@mantine/core';
import { useState } from 'react';
import { SwapCard } from '../components/SwapCard';

const mockTokens = [
  { value: 'eth', label: 'Ethereum', symbol: 'ETH', icon: '/eth-icon.png' },
  { value: 'usdc', label: 'USD Coin', symbol: 'USDC', icon: '/usdc-icon.png' },
  { value: 'usdt', label: 'Tether', symbol: 'USDT', icon: '/usdt-icon.png' },
];

export const SwapPage = () => {
  const [fromToken, setFromToken] = useState('eth');
  const [toToken, setToToken] = useState('usdc');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

  const handleFromAmountChange = (value: string | number) => {
    setFromAmount(String(value));
  };

  const handleToAmountChange = (value: string | number) => {
    setToAmount(String(value));
  };

  return (
    <Container size="sm" py="xl">
      <SwapCard
        fromToken={fromToken}
        toToken={toToken}
        fromAmount={fromAmount}
        toAmount={toAmount}
        onFromTokenChange={setFromToken}
        onToTokenChange={setToToken}
        onFromAmountChange={handleFromAmountChange}
        onToAmountChange={handleToAmountChange}
        tokens={mockTokens}
      />
    </Container>
  );
};
