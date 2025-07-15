import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Card,
  Stack,
  Box,
  Group,
  Text,
  Button,
  NumberInput,
  Avatar,
  Badge,
  ActionIcon,
  Divider,
  Alert,
} from '@mantine/core';
import {
  IconArrowLeft,
  IconPlus,
  IconInfoCircle,
  IconGasStation,
} from '@tabler/icons-react';
import { useThemeStyles } from '../hooks/useThemeStyles';
import { mockPools } from '../components/mockPools';
import { useAccount } from 'wagmi';
import { Routes } from '../constants/routes';

export const AddLiquidityPage = () => {
  const { poolId } = useParams<{ poolId: string }>();
  const navigate = useNavigate();
  const themeStyles = useThemeStyles();
  const { address } = useAccount();
  
  const [token0Amount, setToken0Amount] = useState('');
  const [token1Amount, setToken1Amount] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Find the pool by ID
  const pool = mockPools.find(p => p.id === poolId);
  
  if (!pool) {
    return (
      <Box
        style={{
          width: '90%',
          margin: '0 auto',
          padding: '16px',
          marginTop: '24px',
        }}
      >
        <Alert icon={<IconInfoCircle size={16} />} title="Pool not found" color="red">
          The requested liquidity pool could not be found.
        </Alert>
      </Box>
    );
  }

  const handleToken0Change = (value: string | number) => {
    setToken0Amount(String(value));
    // Mock price ratio calculation
    if (value && !isNaN(Number(value))) {
      setToken1Amount((Number(value) * 1.2).toFixed(6));
    }
  };

  const handleToken1Change = (value: string | number) => {
    setToken1Amount(String(value));
    // Mock price ratio calculation
    if (value && !isNaN(Number(value))) {
      setToken0Amount((Number(value) / 1.2).toFixed(6));
    }
  };

  const handleAddLiquidity = async () => {
    if (!address || !token0Amount || !token1Amount) return;
    
    setIsLoading(true);
    // Mock liquidity addition process
    setTimeout(() => {
      setIsLoading(false);
      // Navigate back to liquidity page
      navigate(Routes.Liquidity);
    }, 2000);
  };

  const isDisabled = !address || !token0Amount || !token1Amount || isLoading;

  return (
    <Box
      style={{
        width: '90%',
        margin: '0 auto',
        padding: '16px',
        marginTop: '24px',
      }}
    >
      <Stack gap="xl">
        {/* Header */}
        <Group justify="center" pos="relative">
          <ActionIcon 
            variant="subtle" 
            size="lg" 
            onClick={() => navigate(Routes.Liquidity)}
            style={{
              position: 'absolute',
              left: 0,
              transition: 'all 0.2s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = themeStyles.sectionBackground;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'transparent';
            }}
          >
            <IconArrowLeft size={20} />
          </ActionIcon>
          <Text size="xl" fw={700} c={themeStyles.primaryText}>
            Add Liquidity
          </Text>
        </Group>

        <Group align="flex-start" gap="xl" justify="center">
          {/* Main Add Liquidity Card */}
          <Card
            shadow="xl"
            radius="xl"
            p="xl"
            style={{
              background: themeStyles.cardBackground,
              border: `1px solid ${themeStyles.cardBorder}`,
              backdropFilter: 'blur(10px)',
              flex: 1,
              maxWidth: '500px',
            }}
          >
            <Stack gap="lg">
              {/* Pool Info Header */}
              <Group gap="md" align="center">
                <Group gap="-xs">
                  <Avatar size={40} radius="xl" style={{ backgroundColor: '#4F46E5' }}>
                    <Text size="lg" c="white" fw={700}>
                      {pool.token0.symbol.charAt(0)}
                    </Text>
                  </Avatar>
                  <Avatar size={40} radius="xl" style={{ backgroundColor: '#06B6D4' }}>
                    <Text size="lg" c="white" fw={700}>
                      {pool.token1.symbol.charAt(0)}
                    </Text>
                  </Avatar>
                </Group>
                <Box>
                  <Text size="xl" fw={700} c={themeStyles.primaryText}>
                    {pool.token0.symbol}/{pool.token1.symbol}
                  </Text>
                  <Badge
                    variant="light"
                    color={pool.apr > 10 ? 'green' : 'blue'}
                    size="md"
                  >
                    {pool.apr.toFixed(1)}% APR
                  </Badge>
                </Box>
              </Group>

              <Divider />

              {/* Token 0 Input */}
              <Box
                style={{
                  background: themeStyles.sectionBackground,
                  borderRadius: '16px',
                  padding: '16px',
                  border: `1px solid ${themeStyles.cardBorder}`,
                }}
              >
                <Group justify="space-between" mb="sm">
                  <Text size="sm" c={themeStyles.secondaryText} fw={500}>
                    {pool.token0.symbol}
                  </Text>
                  <Text size="xs" c={themeStyles.secondaryText}>
                    Balance: 1,000.00
                  </Text>
                </Group>
                <Group gap="md" align="center">
                  <Avatar size={32} radius="xl" style={{ backgroundColor: '#4F46E5' }}>
                    <Text size="sm" c="white" fw={600}>
                      {pool.token0.symbol.charAt(0)}
                    </Text>
                  </Avatar>
                  <NumberInput
                    value={token0Amount}
                    onChange={handleToken0Change}
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

              {/* Plus Icon */}
              <Group justify="center">
                <ActionIcon
                  size="lg"
                  variant="filled"
                  style={{
                    borderRadius: '50%',
                    background: 'linear-gradient(45deg, #4F46E5, #06B6D4)',
                    border: `4px solid ${themeStyles.cardBackground}`,
                  }}
                >
                  <IconPlus size={16} />
                </ActionIcon>
              </Group>

              {/* Token 1 Input */}
              <Box
                style={{
                  background: themeStyles.sectionBackground,
                  borderRadius: '16px',
                  padding: '16px',
                  border: `1px solid ${themeStyles.cardBorder}`,
                }}
              >
                <Group justify="space-between" mb="sm">
                  <Text size="sm" c={themeStyles.secondaryText} fw={500}>
                    {pool.token1.symbol}
                  </Text>
                  <Text size="xs" c={themeStyles.secondaryText}>
                    Balance: 2,500.00
                  </Text>
                </Group>
                <Group gap="md" align="center">
                  <Avatar size={32} radius="xl" style={{ backgroundColor: '#06B6D4' }}>
                    <Text size="sm" c="white" fw={600}>
                      {pool.token1.symbol.charAt(0)}
                    </Text>
                  </Avatar>
                  <NumberInput
                    value={token1Amount}
                    onChange={handleToken1Change}
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

              {/* Transaction Details */}
              {token0Amount && token1Amount && (
                <Box
                  style={{
                    background: themeStyles.infoBackground,
                    borderRadius: '12px',
                    padding: '16px',
                    border: `1px solid ${themeStyles.infoBorder}`,
                  }}
                >
                  <Stack gap="sm">
                    <Group justify="space-between">
                      <Text size="sm" c={themeStyles.secondaryText}>
                        Share of Pool
                      </Text>
                      <Text size="sm" c={themeStyles.primaryText} fw={500}>
                        ~0.15%
                      </Text>
                    </Group>
                    <Group justify="space-between">
                      <Text size="sm" c={themeStyles.secondaryText}>
                        {pool.token0.symbol} per {pool.token1.symbol}
                      </Text>
                      <Text size="sm" c={themeStyles.primaryText} fw={500}>
                        {(Number(token0Amount) / Number(token1Amount)).toFixed(6)}
                      </Text>
                    </Group>
                    <Group justify="space-between">
                      <Group gap="xs">
                        <IconGasStation size={14} color={themeStyles.secondaryText} />
                        <Text size="xs" c={themeStyles.secondaryText}>
                          Gas Fee
                        </Text>
                      </Group>
                      <Text size="xs" c={themeStyles.secondaryText}>
                        ~$3.50
                      </Text>
                    </Group>
                  </Stack>
                </Box>
              )}

              {/* Add Liquidity Button */}
              <Button
                size="lg"
                fullWidth
                loading={isLoading}
                disabled={isDisabled}
                onClick={handleAddLiquidity}
                style={{
                  background: isDisabled
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
                {!address
                  ? 'Connect Wallet'
                  : isLoading
                    ? 'Adding Liquidity...'
                    : 'Add Liquidity'}
              </Button>
            </Stack>
          </Card>

          {/* Pool Stats Card */}
          <Card
            shadow="xl"
            radius="xl"
            p="xl"
            style={{
              background: themeStyles.cardBackground,
              border: `1px solid ${themeStyles.cardBorder}`,
              backdropFilter: 'blur(10px)',
              minWidth: '300px',
              maxWidth: '350px',
            }}
          >
            <Stack gap="lg">
              <Text size="lg" fw={700} c={themeStyles.primaryText}>
                Pool Statistics
              </Text>
              
              <Stack gap="md">
                <Group justify="space-between">
                  <Text size="sm" c={themeStyles.secondaryText}>
                    Total Value Locked
                  </Text>
                  <Text size="sm" fw={600} c={themeStyles.primaryText}>
                    ${pool.tvl.toLocaleString()}
                  </Text>
                </Group>
                
                <Group justify="space-between">
                  <Text size="sm" c={themeStyles.secondaryText}>
                    Volume (24h)
                  </Text>
                  <Text size="sm" fw={600} c={themeStyles.primaryText}>
                    ${pool.volume24h.toLocaleString()}
                  </Text>
                </Group>
                
                <Group justify="space-between">
                  <Text size="sm" c={themeStyles.secondaryText}>
                    Fees (24h)
                  </Text>
                  <Text size="sm" fw={600} c={themeStyles.primaryText}>
                    ${pool.fees24h.toLocaleString()}
                  </Text>
                </Group>
                
                <Group justify="space-between">
                  <Text size="sm" c={themeStyles.secondaryText}>
                    APR
                  </Text>
                  <Badge
                    variant="light"
                    color={pool.apr > 10 ? 'green' : 'blue'}
                    size="md"
                  >
                    {pool.apr.toFixed(1)}%
                  </Badge>
                </Group>
              </Stack>

              <Divider />

              <Stack gap="md">
                <Text size="md" fw={600} c={themeStyles.primaryText}>
                  Pool Composition
                </Text>
                
                {/* Enhanced Liquidity Distribution Chart */}
                <Stack gap="md">
                  {/* Token Distribution Display */}
                  <Stack gap="sm">
                    <Group justify="space-between" align="center">
                      <Group gap="xs">
                        <Avatar size={32} radius="xl" style={{ backgroundColor: '#4F46E5' }}>
                          <Text size="sm" c="white" fw={700}>
                            {pool.token0.symbol.charAt(0)}
                          </Text>
                        </Avatar>
                        <Text size="sm" c={themeStyles.primaryText} fw={600}>
                          {pool.token0.symbol}
                        </Text>
                      </Group>
                      <Text size="lg" fw={700} c={themeStyles.primaryText}>
                        50%
                      </Text>
                    </Group>
                    
                    <Group justify="space-between" align="center">
                      <Group gap="xs">
                        <Avatar size={32} radius="xl" style={{ backgroundColor: '#06B6D4' }}>
                          <Text size="sm" c="white" fw={700}>
                            {pool.token1.symbol.charAt(0)}
                          </Text>
                        </Avatar>
                        <Text size="sm" c={themeStyles.primaryText} fw={600}>
                          {pool.token1.symbol}
                        </Text>
                      </Group>
                      <Text size="lg" fw={700} c={themeStyles.primaryText}>
                        50%
                      </Text>
                    </Group>
                  </Stack>
                  
                  {/* Visual Distribution Bar */}
                  <Box
                    style={{
                      height: '12px',
                      borderRadius: '6px',
                      background: `linear-gradient(90deg, #4F46E5 0%, #4F46E5 50%, #06B6D4 50%, #06B6D4 100%)`,
                      border: `1px solid ${themeStyles.cardBorder}`,
                      marginTop: '8px',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                    }}
                  />
                  
                  {/* Distribution Value Labels */}
                  <Group justify="space-between" mt="xs">
                    <Text size="xs" c={themeStyles.secondaryText} fw={500}>
                      ${(pool.tvl * 0.5).toLocaleString()}
                    </Text>
                    <Text size="xs" c={themeStyles.secondaryText} fw={500}>
                      ${(pool.tvl * 0.5).toLocaleString()}
                    </Text>
                  </Group>
                </Stack>
              </Stack>
            </Stack>
          </Card>
        </Group>
      </Stack>
    </Box>
  );
};
