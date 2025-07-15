import { Container, Stack, Group, Title, Box } from '@mantine/core';
import { IconBolt } from '@tabler/icons-react';
import { SwapCard } from '../components/SwapCard';
import { useThemeStyles } from '../hooks/useThemeStyles';

export const SwapPage = () => {
  const themeStyles = useThemeStyles();

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
      <Group gap="sm">
        <IconBolt size={24} color="#4F46E5" />
        <Title order={2} c={themeStyles.primaryText}>
          Swap Tokens
        </Title>
      </Group>
      <Box style={{ maxWidth: '480px' }}>
        <SwapCard onSwapClick={handleSwapClick} />
      </Box>
      <Stack gap="xl" py="md"></Stack>
    </Container>
  );
};
