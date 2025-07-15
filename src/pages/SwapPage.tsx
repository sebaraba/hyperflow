import { Container, Stack, Box } from '@mantine/core';
import { SwapCard } from '../components/SwapCard';

export const SwapPage = () => {
  const handleSwapClick = (
    fromToken: string,
    toToken: string,
    fromAmount: string,
    toAmount: string,
  ) => {
    console.log('Swap initiated:', {
      fromToken,
      toToken,
      fromAmount,
      toAmount,
    });
    // TODO: Implement actual swap logic here
  };

  return (
    <Container size="lg">
      <Box style={{ maxWidth: '480px' }}>
        <SwapCard onSwapClick={handleSwapClick} />
      </Box>
      <Stack gap="xl" py="md"></Stack>
    </Container>
  );
};
