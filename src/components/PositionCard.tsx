import { Card, Stack, Text, Group, Badge, Progress } from '@mantine/core';
import { IconTrendingUp, IconTrendingDown, IconCoin, IconGift } from '@tabler/icons-react';
import { useThemeStyles } from '../hooks/useThemeStyles';

interface PositionCardProps {
  tokenSymbol: string;
  apr: string;
  currentValue: string;
  rewards: string;
  changePercent?: number;
  volume24h?: string;
}

export const PositionCard = ({ 
  tokenSymbol, 
  apr, 
  currentValue, 
  rewards, 
  changePercent = 0,
  volume24h = "$0.00"
}: PositionCardProps) => {
  const themeStyles = useThemeStyles();
  const isPositive = changePercent >= 0;
  const aprValue = parseFloat(apr.replace('%', ''));
  
  return (
    <Card
      shadow="xl"
      p="lg"
      radius="xl"
      style={{
        background: themeStyles.cardBackground,
        border: `1px solid ${themeStyles.cardBorder}`,
        boxShadow: themeStyles.cardShadow,
        backdropFilter: 'blur(10px)',
        transition: 'all 0.3s ease',
        cursor: 'pointer',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-4px)';
        e.currentTarget.style.boxShadow = '0 35px 60px -12px rgba(0, 0, 0, 0.4)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0px)';
        e.currentTarget.style.boxShadow = themeStyles.cardShadow;
      }}
    >
      <Stack gap="lg">
        {/* Header with Token Symbol and APR */}
        <Group justify="space-between" align="flex-start">
          <Group gap="sm">
            <IconCoin size={24} color="#4F46E5" />
            <Stack gap="4px">
              <Text size="lg" fw={600} c={themeStyles.primaryText}>
                {tokenSymbol}
              </Text>
              <Text size="xs" c={themeStyles.mutedText}>
                Liquidity Pool
              </Text>
            </Stack>
          </Group>
          <Badge
            size="lg"
            variant="light"
            color={aprValue > 10 ? 'green' : aprValue > 5 ? 'yellow' : 'blue'}
            style={{
              background: themeStyles.sectionBackground,
              color: themeStyles.primaryText,
              border: `1px solid ${themeStyles.cardBorder}`,
            }}
          >
            {apr} APR
          </Badge>
        </Group>

        {/* Current Value and Change */}
        <Stack gap="xs">
          <Group justify="space-between">
            <Text size="sm" c={themeStyles.secondaryText}>
              Current Value
            </Text>
            <Group gap="xs">
              {isPositive ? (
                <IconTrendingUp size={16} color="#22C55E" />
              ) : (
                <IconTrendingDown size={16} color="#EF4444" />
              )}
              <Text 
                size="sm" 
                c={isPositive ? '#22C55E' : '#EF4444'}
                fw={500}
              >
                {changePercent > 0 ? '+' : ''}{changePercent.toFixed(2)}%
              </Text>
            </Group>
          </Group>
          <Text size="xl" fw={700} c={themeStyles.primaryText}>
            {currentValue}
          </Text>
        </Stack>

        {/* Progress Bar for APR */}
        <Stack gap="xs">
          <Group justify="space-between">
            <Text size="sm" c={themeStyles.secondaryText}>
              APR Progress
            </Text>
            <Text size="sm" c={themeStyles.secondaryText}>
              {aprValue > 20 ? 'Excellent' : aprValue > 10 ? 'Good' : 'Fair'}
            </Text>
          </Group>
          <Progress
            value={Math.min(aprValue * 5, 100)}
            color={aprValue > 10 ? 'green' : aprValue > 5 ? 'yellow' : 'blue'}
            radius="xl"
            size="sm"
            style={{
              background: themeStyles.sectionBackground,
            }}
          />
        </Stack>

        {/* Rewards and Additional Info */}
        <Group justify="space-between" style={{
          background: themeStyles.sectionBackground,
          borderRadius: '12px',
          padding: '12px',
          border: `1px solid ${themeStyles.cardBorder}`,
        }}>
          <Stack gap="4px">
            <Group gap="xs">
              <IconGift size={16} color="#4F46E5" />
              <Text size="sm" c={themeStyles.secondaryText}>
                Rewards
              </Text>
            </Group>
            <Text size="md" fw={600} c={themeStyles.primaryText}>
              {rewards}
            </Text>
          </Stack>
          <Stack gap="4px" align="flex-end">
            <Text size="sm" c={themeStyles.secondaryText}>
              24h Volume
            </Text>
            <Text size="md" fw={500} c={themeStyles.primaryText}>
              {volume24h}
            </Text>
          </Stack>
        </Group>
      </Stack>
    </Card>
  );
};

