import React, { useState } from 'react';
import {
  Card,
  Stack,
  Group,
  Title,
  Text,
  Button,
  Box,
  Badge,
  NumberInput,
  ActionIcon,
  Avatar,
  Center,
  SimpleGrid,
  Tabs,
  Modal,
  Select,
} from '@mantine/core';
import {
  IconPlus,
  IconTrendingUp,
  IconCoins,
  IconArrowsExchange,
  IconX,
  IconDroplet,
  IconChartBar,
} from '@tabler/icons-react';
import { useThemeStyles } from '../hooks/useThemeStyles';
import { useTokens } from '../services/tokenService';
import { TokenSelector } from '../components/TokenSelector';
import { TokenSelectionModal } from '../components/TokenSelectionModal';
import type { Token } from '../services/tokenService';

interface LiquidityPool {
  id: string;
  token0: Token;
  token1: Token;
  apr: number;
  tvl: number;
  volume24h: number;
  fees24h: number;
  userLiquidity?: number;
  userShare?: number;
}

const mockPools: LiquidityPool[] = [
  {
    id: '1',
    token0: { symbol: 'ETH', name: 'Ethereum', address: '0x1', decimals: 18 },
    token1: { symbol: 'USDC', name: 'USD Coin', address: '0x2', decimals: 6 },
    apr: 12.5,
    tvl: 1250000,
    volume24h: 850000,
    fees24h: 2550,
    userLiquidity: 5000,
    userShare: 0.4,
  },
  {
    id: '2',
    token0: { symbol: 'WBTC', name: 'Wrapped Bitcoin', address: '0x3', decimals: 8 },
    token1: { symbol: 'ETH', name: 'Ethereum', address: '0x1', decimals: 18 },
    apr: 8.3,
    tvl: 890000,
    volume24h: 420000,
    fees24h: 1260,
  },
  {
    id: '3',
    token0: { symbol: 'ARB', name: 'Arbitrum', address: '0x4', decimals: 18 },
    token1: { symbol: 'USDC', name: 'USD Coin', address: '0x2', decimals: 6 },
    apr: 15.2,
    tvl: 650000,
    volume24h: 320000,
    fees24h: 960,
  },
];

const PoolCard = ({ pool }: { pool: LiquidityPool }) => {
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

const AddLiquidityModal = ({
  opened,
  onClose,
  pool,
}: {
  opened: boolean;
  onClose: () => void;
  pool: LiquidityPool;
}) => {
  const themeStyles = useThemeStyles();
  const [amount0, setAmount0] = useState('');
  const [amount1, setAmount1] = useState('');

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Add Liquidity"
      size="lg"
      centered
      styles={{
        content: {
          background: themeStyles.cardBackground,
          border: `1px solid ${themeStyles.cardBorder}`,
        },
        header: {
          background: themeStyles.cardBackground,
          borderBottom: `1px solid ${themeStyles.cardBorder}`,
        },
        title: {
          color: themeStyles.primaryText,
          fontWeight: 600,
        },
      }}
    >
      <Stack gap="md">
        <Text size="sm" c={themeStyles.secondaryText}>
          Add liquidity to {pool.token0.symbol}/{pool.token1.symbol} pool
        </Text>

        {/* Token 0 Input */}
        <Box
          style={{
            background: themeStyles.sectionBackground,
            borderRadius: '16px',
            padding: '16px',
            border: `1px solid ${themeStyles.cardBorder}`,
          }}
        >
          <Group justify="space-between" mb="xs">
            <Text size="sm" c={themeStyles.secondaryText} fw={500}>
              {pool.token0.symbol}
            </Text>
            <Text size="xs" c="dimmed">
              Balance: 0.00
            </Text>
          </Group>
          <Group gap="md" align="center">
            <Group gap="xs">
              <Avatar size={20} radius="xl" style={{ backgroundColor: '#4F46E5' }}>
                <Text size="xs" c="white" fw={600}>
                  {pool.token0.symbol.charAt(0)}
                </Text>
              </Avatar>
              <Text size="sm" fw={500} c={themeStyles.primaryText}>
                {pool.token0.symbol}
              </Text>
            </Group>
            <NumberInput
              value={amount0}
              onChange={(value) => setAmount0(String(value))}
              placeholder="0.0"
              hideControls
              size="lg"
              styles={{
                input: {
                  background: 'transparent',
                  border: 'none',
                  color: themeStyles.primaryText,
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  textAlign: 'right',
                  padding: '0',
                  '&::placeholder': {
                    color: themeStyles.placeholderText,
                  },
                },
              }}
              style={{ flex: 1 }}
            />
          </Group>
        </Box>

        {/* Token 1 Input */}
        <Box
          style={{
            background: themeStyles.sectionBackground,
            borderRadius: '16px',
            padding: '16px',
            border: `1px solid ${themeStyles.cardBorder}`,
          }}
        >
          <Group justify="space-between" mb="xs">
            <Text size="sm" c={themeStyles.secondaryText} fw={500}>
              {pool.token1.symbol}
            </Text>
            <Text size="xs" c="dimmed">
              Balance: 0.00
            </Text>
          </Group>
          <Group gap="md" align="center">
            <Group gap="xs">
              <Avatar size={20} radius="xl" style={{ backgroundColor: '#06B6D4' }}>
                <Text size="xs" c="white" fw={600}>
                  {pool.token1.symbol.charAt(0)}
                </Text>
              </Avatar>
              <Text size="sm" fw={500} c={themeStyles.primaryText}>
                {pool.token1.symbol}
              </Text>
            </Group>
            <NumberInput
              value={amount1}
              onChange={(value) => setAmount1(String(value))}
              placeholder="0.0"
              hideControls
              size="lg"
              styles={{
                input: {
                  background: 'transparent',
                  border: 'none',
                  color: themeStyles.primaryText,
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  textAlign: 'right',
                  padding: '0',
                  '&::placeholder': {
                    color: themeStyles.placeholderText,
                  },
                },
              }}
              style={{ flex: 1 }}
            />
          </Group>
        </Box>

        {/* Pool Share Preview */}
        <Box
          style={{
            background: themeStyles.infoBackground,
            borderRadius: '12px',
            padding: '12px 16px',
            border: `1px solid ${themeStyles.infoBorder}`,
          }}
        >
          <Group justify="space-between" mb="xs">
            <Text size="sm" c={themeStyles.secondaryText}>
              Share of pool
            </Text>
            <Text size="sm" c={themeStyles.primaryText} fw={500}>
              0.00%
            </Text>
          </Group>
          <Group justify="space-between">
            <Text size="xs" c={themeStyles.secondaryText}>
              Estimated APR
            </Text>
            <Text size="xs" c={themeStyles.secondaryText}>
              {pool.apr.toFixed(1)}%
            </Text>
          </Group>
        </Box>

        {/* Add Liquidity Button */}
        <Button
          size="lg"
          fullWidth
          disabled={!amount0 || !amount1}
          style={{
            background: (!amount0 || !amount1)
              ? themeStyles.buttonBackground
              : 'linear-gradient(45deg, #4F46E5, #06B6D4)',
            border: 'none',
            height: '56px',
            borderRadius: '16px',
            fontSize: '18px',
            fontWeight: 600,
            marginTop: '8px',
          }}
        >
          Add Liquidity
        </Button>
      </Stack>
    </Modal>
  );
};

export const LiquidityPage = () => {
  const themeStyles = useThemeStyles();
  const [activeTab, setActiveTab] = useState('pools');

  return (
    <Box style={{ 
      width: '66.67%', 
      margin: '0 auto', 
      padding: '8px',
      marginTop: '16px'
    }}>
      <Card
        shadow="xl"
        p="lg"
        radius="xl"
        style={{
          background: themeStyles.cardBackground,
          border: `1px solid ${themeStyles.cardBorder}`,
          backdropFilter: 'blur(10px)',
        }}
      >
        <Stack gap="lg">
          {/* Header */}
          <Group justify="space-between" align="center">
            <Group gap="sm">
              <IconDroplet size={24} color="#4F46E5" />
              <Title order={2} c={themeStyles.primaryText} size="h3">
                Liquidity
              </Title>
            </Group>
            <Group gap="sm">
              <Button
                variant="outline"
                leftSection={<IconChartBar size={16} />}
                color="blue"
              >
                Analytics
              </Button>
              <Button
                variant="filled"
                leftSection={<IconPlus size={16} />}
                style={{
                  background: 'linear-gradient(45deg, #4F46E5, #06B6D4)',
                  border: 'none',
                }}
              >
                Create Pool
              </Button>
            </Group>
          </Group>

          {/* Tabs */}
          <Tabs value={activeTab} onChange={setActiveTab}>
            <Tabs.List>
              <Tabs.Tab value="pools" leftSection={<IconCoins size={16} />}>
                All Pools
              </Tabs.Tab>
              <Tabs.Tab value="positions" leftSection={<IconTrendingUp size={16} />}>
                My Positions
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="pools">
              <Stack gap="sm" mt="md">
                <Text size="sm" c={themeStyles.secondaryText}>
                  Provide liquidity to earn trading fees from swaps.
                </Text>
                <Stack gap="sm">
                  {mockPools.map((pool) => (
                    <PoolCard key={pool.id} pool={pool} />
                  ))}
                </Stack>
              </Stack>
            </Tabs.Panel>

            <Tabs.Panel value="positions">
              <Stack gap="sm" mt="md">
                <Text size="sm" c={themeStyles.secondaryText}>
                  Your active liquidity positions.
                </Text>
                <Stack gap="sm">
                  {mockPools
                    .filter((pool) => pool.userLiquidity)
                    .map((pool) => (
                      <PoolCard key={pool.id} pool={pool} />
                    ))}
                </Stack>
                {mockPools.filter((pool) => pool.userLiquidity).length === 0 && (
                  <Center py="xl">
                    <Stack align="center" gap="sm">
                      <IconDroplet size={48} color={themeStyles.secondaryText} />
                      <Text size="lg" fw={500} c={themeStyles.primaryText}>
                        No positions yet
                      </Text>
                      <Text size="sm" c={themeStyles.secondaryText} ta="center">
                        Start earning by providing liquidity to pools
                      </Text>
                    </Stack>
                  </Center>
                )}
              </Stack>
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Card>
    </Box>
  );
};

