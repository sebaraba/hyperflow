import { Container } from '@mantine/core';
import { SwapCard } from '../components/SwapCard';

export const SwapPage = () => {
  const handleSwapClick = (fromToken: string, toToken: string, fromAmount: string, toAmount: string) => {
    console.log('Swap initiated:', { fromToken, toToken, fromAmount, toAmount });
    // TODO: Implement actual swap logic here
  };

  return (
    <Container size="sm" py="xl">
      <SwapCard onSwapClick={handleSwapClick} />
    </Container>
  );
};
