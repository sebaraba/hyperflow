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
import { useNavigate } from 'react-router-dom';
import { useThemeStyles } from '../hooks/useThemeStyles';
import type { LiquidityPool } from './mockPools';

interface PoolCardProps {
  pool: LiquidityPool;
}

export const PoolCard = ({ pool }: PoolCardProps) => {
  const themeStyles = useThemeStyles();
  const navigate = useNavigate();

  return (
    <Card
        shadow="md"
        radius="lg"
        p="lg"
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
        <Group justify="space-between" align="center" wrap="nowrap" style={{ width: '100%' }}>
          {/* Pool Info */}
          <Box style={{ width: '25%', minWidth: '200px' }}>
            <Group gap="md" align="center">
              <Group gap="-xs">
                <Avatar size={36} radius="xl" style={{ backgroundColor: '#4F46E5' }}>
                  <Text size="md" c="white" fw={700}>
                    {pool.token0.symbol.charAt(0)}
                  </Text>
                </Avatar>
                <Avatar size={36} radius="xl" style={{ backgroundColor: '#06B6D4' }}>
                  <Text size="md" c="white" fw={700}>
                    {pool.token1.symbol.charAt(0)}
                  </Text>
                </Avatar>
              </Group>
              <Box>
                <Text size="lg" fw={700} c={themeStyles.primaryText}>
                  {pool.token0.symbol}/{pool.token1.symbol}
                </Text>
                <Text size="sm" c={themeStyles.secondaryText} fw={500}>
                  {pool.token0.name} • {pool.token1.name}
                </Text>
              </Box>
            </Group>
          </Box>

          {/* APR */}
          <Box style={{ width: '15%', textAlign: 'center' }}>
            <Badge
              variant="light"
              color={pool.apr > 10 ? 'green' : 'blue'}
              size="lg"
              style={{ fontSize: '14px', fontWeight: 600 }}
            >
              {pool.apr.toFixed(1)}%
            </Badge>
          </Box>

          {/* TVL */}
          <Box style={{ width: '20%', textAlign: 'center' }}>
            <Text size="lg" fw={600} c={themeStyles.primaryText}>
              ${pool.tvl.toLocaleString()}
            </Text>
          </Box>

          {/* Volume 24H */}
          <Box style={{ width: '20%', textAlign: 'center' }}>
            <Text size="lg" fw={600} c={themeStyles.primaryText}>
              ${pool.volume24h.toLocaleString()}
            </Text>
          </Box>

          {/* Fees 24H */}
          <Box style={{ width: '20%', textAlign: 'center' }}>
            <Text size="lg" fw={600} c={themeStyles.primaryText}>
              ${pool.fees24h.toLocaleString()}
            </Text>
          </Box>

          {/* Actions */}
          <Box style={{ width: '15%', textAlign: 'right' }}>
            <Button
              variant="filled"
              size="md"
              leftSection={<IconPlus size={16} />}
              onClick={() => navigate(`/liquidity/add/${pool.id}`)}
              style={{
                background: 'linear-gradient(45deg, #4F46E5, #06B6D4)',
                border: 'none',
                fontSize: '14px',
                fontWeight: 600,
              }}
            >
              Add Liquidity
            </Button>
          </Box>
        </Group>
      </Card>
  );
};
