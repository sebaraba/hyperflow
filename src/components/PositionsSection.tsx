import { Stack, Group, Title, SimpleGrid } from '@mantine/core';
import { IconTrendingUp } from '@tabler/icons-react';
import { PositionCard } from './PositionCard';
import { useThemeStyles } from '../hooks/useThemeStyles';

// Mock data for positions
const mockPositions = [
  {
    tokenSymbol: 'ETH/USDC',
    apr: '12.5%',
    currentValue: '$4,567.89',
    rewards: '$45.67',
    changePercent: 3.2,
    volume24h: '$1.2M'
  },
  {
    tokenSymbol: 'USDT/USDC',
    apr: '8.2%',
    currentValue: '$2,345.12',
    rewards: '$23.45',
    changePercent: -1.5,
    volume24h: '$845K'
  },
  {
    tokenSymbol: 'ETH/USDT',
    apr: '15.8%',
    currentValue: '$3,456.78',
    rewards: '$34.56',
    changePercent: 5.7,
    volume24h: '$2.1M'
  },
  {
    tokenSymbol: 'BTC/USDC',
    apr: '9.7%',
    currentValue: '$1,234.56',
    rewards: '$12.34',
    changePercent: 2.1,
    volume24h: '$678K'
  },
  {
    tokenSymbol: 'BTC/USDT',
    apr: '11.3%',
    currentValue: '$5,678.90',
    rewards: '$56.78',
    changePercent: 4.8,
    volume24h: '$950K'
  },
  {
    tokenSymbol: 'USDC/DAI',
    apr: '6.4%',
    currentValue: '$1,987.65',
    rewards: '$19.87',
    changePercent: 0.8,
    volume24h: '$456K'
  }
];

export const PositionsSection = () => {
  const themeStyles = useThemeStyles();

  return (
    <Stack gap="lg">
      <Group gap="sm">
        <IconTrendingUp size={24} color="#4F46E5" />
        <Title order={2} c={themeStyles.primaryText}>
          Your Positions
        </Title>
      </Group>
      <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="lg">
        {mockPositions.map((position, index) => (
          <PositionCard
            key={index}
            tokenSymbol={position.tokenSymbol}
            apr={position.apr}
            currentValue={position.currentValue}
            rewards={position.rewards}
            changePercent={position.changePercent}
            volume24h={position.volume24h}
          />
        ))}
      </SimpleGrid>
    </Stack>
  );
};
