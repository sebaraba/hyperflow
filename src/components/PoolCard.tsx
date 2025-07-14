import { useState } from 'react';
import {
  Card,
  Group,
  Avatar,
  Box,
  Text,
  Badge,
  Button,
} from '@mantine/core';
import { IconPlus } from '@tabler/icons-react';
import { AddLiquidityModal } from './AddLiquidityModal';
import { useThemeStyles } from '../hooks/useThemeStyles';
import type { LiquidityPool } from './mockPools';

interface PoolCardProps {
  pool: LiquidityPool;
}

export const PoolCard = ({ pool }: PoolCardProps) => {
  const themeStyles = useThemeStyles();
  const [showAddLiquidity, setShowAddLiquidity] = useState(false);

  return (
    <>
      <Card
        shadow="md"
        radius="lg"
        style={{
          background: themeStyles.sectionBackground,
          border: `1px solid ${themeStyles.cardBorder}`,
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          width: '100%',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.15)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow = '';
        }}
      >
        <Group justify="space-between" align="center" wrap="nowrap">
          {/* Pool Info */}
          <Group gap="md" align="center">
            <Group gap="xs">
              <Group gap="-xs">
                <Avatar size={32} radius="xl" style={{ backgroundColor: '#4F46E5' }}>
                  <Text size="sm" c="white" fw={600}>
                    {pool.token0.symbol.charAt(0)}
                  </Text>
                </Avatar>
                <Avatar size={32} radius="xl" style={{ backgroundColor: '#06B6D4' }}>
                  <Text size="sm" c="white" fw={600}>
                    {pool.token1.symbol.charAt(0)}
                  </Text>
                </Avatar>
              </Group>
              <Box>
                <Text size="md" fw={600} c={themeStyles.primaryText}>
                  {pool.token0.symbol}/{pool.token1.symbol}
                </Text>
                <Badge
                  variant="light"
                  color={pool.apr > 10 ? 'green' : 'blue'}
                  size="sm"
                  mt={2}
                >
                  {pool.apr.toFixed(1)}% APR
                </Badge>
              </Box>
            </Group>
          </Group>

          {/* Pool Stats */}
          <Group gap="xl" align="center">
            <Box style={{ minWidth: '80px' }}>
              <Text size="xs" c={themeStyles.secondaryText}>
                TVL
              </Text>
              <Text size="sm" fw={500} c={themeStyles.primaryText}>
                ${pool.tvl.toLocaleString()}
              </Text>
            </Box>
            <Box style={{ minWidth: '100px' }}>
              <Text size="xs" c={themeStyles.secondaryText}>
                Volume 24H
              </Text>
              <Text size="sm" fw={500} c={themeStyles.primaryText}>
                ${pool.volume24h.toLocaleString()}
              </Text>
            </Box>
            <Box style={{ minWidth: '80px' }}>
              <Text size="xs" c={themeStyles.secondaryText}>
                Fees 24H
              </Text>
              <Text size="sm" fw={500} c={themeStyles.primaryText}>
                ${pool.fees24h.toLocaleString()}
              </Text>
            </Box>
          </Group>

          {/* User Position (if exists) */}
          {pool.userLiquidity && (
            <Box
              style={{
                background: themeStyles.cardBackground,
                borderRadius: '8px',
                padding: '8px 12px',
                border: `1px solid ${themeStyles.cardBorder}`,
                minWidth: '120px',
              }}
            >
              <Text size="xs" c={themeStyles.secondaryText}>
                Your Position
              </Text>
              <Text size="sm" fw={500} c={themeStyles.primaryText}>
                ${pool.userLiquidity.toLocaleString()}
              </Text>
              <Text size="xs" c={themeStyles.secondaryText}>
                {pool.userShare}% of pool
              </Text>
            </Box>
          )}

          {/* Actions */}
          <Group gap="xs">
            <Button
              variant="filled"
              size="sm"
              leftSection={<IconPlus size={14} />}
              onClick={() => setShowAddLiquidity(true)}
              style={{
                background: 'linear-gradient(45deg, #4F46E5, #06B6D4)',
                border: 'none',
              }}
            >
              Add Liquidity
            </Button>
            {pool.userLiquidity && (
              <Button variant="outline" size="sm" color="red">
                Remove
              </Button>
            )}
          </Group>
        </Group>
      </Card>

      {/* Add Liquidity Modal */}
      <AddLiquidityModal
        opened={showAddLiquidity}
        onClose={() => setShowAddLiquidity(false)}
        pool={pool}
      />
    </>
  );
};
