import {
  Card,
  Stack,
  Group,
  Title,
  Text,
  Button,
  NumberInput,
  Loader,
  ActionIcon,
  Box,
  Center,
  Alert,
} from '@mantine/core';
import {
  IconArrowsUpDown,
  IconSettings,
  IconAlertCircle,
  IconGasStation,
  IconBolt,
} from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { useTokenBalance } from '../hooks/useTokenBalance';
import { TokenSelector } from './TokenSelector';
import { useTokens } from '../services/tokenService';
import type { Token } from '../services/tokenService';

interface SwapCardProps {
  onSwapClick?: (
    fromToken: string,
    toToken: string,
    fromAmount: string,
    toAmount: string,
  ) => void;
}

// Component to display token balance
const TokenBalance = ({
  token,
  userAddress,
}: {
  token: Token;
  userAddress: `0x${string}`;
}) => {
  const { balance, isLoading } = useTokenBalance({
    userAddress,
    tokenAddress: token.address,
  });

  if (isLoading) {
    return <Loader size="xs" />;
  }

  if (!balance) {
    return (
      <Text size="xs" c="dimmed">
        0.00 {token.symbol}
      </Text>
    );
  }

  return (
    <Text size="xs" c="dimmed">
      {balance.formatted}
    </Text>
  );
};

export const SwapCard = ({ onSwapClick }: SwapCardProps) => {
  const { address } = useAccount();
  const { data: tokens, isLoading: tokensLoading, error } = useTokens();
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);

  // Set initial tokens when data loads
  useEffect(() => {
    if (tokens && tokens.length > 0) {
      setFromToken(tokens[0].symbol);
      setToToken(tokens[1]?.symbol || tokens[0].symbol);
    }
  }, [tokens]);

  const handleFromAmountChange = (value: string | number) => {
    setFromAmount(String(value));
    // TODO: Add price calculation logic here
    // For now, just set a mock conversion
    if (value && !isNaN(Number(value))) {
      setToAmount((Number(value) * 0.98).toFixed(6)); // Mock 2% slippage
    }
  };

  const handleToAmountChange = (value: string | number) => {
    setToAmount(String(value));
  };

  const handleSwapTokens = () => {
    const tempToken = fromToken;
    const tempAmount = fromAmount;
    setFromToken(toToken);
    setToToken(tempToken);
    setFromAmount(toAmount);
    setToAmount(tempAmount);
  };

  const handleSwapClick = () => {
    if (onSwapClick) {
      onSwapClick(fromToken, toToken, fromAmount, toAmount);
    }
    setIsSwapping(true);
    // Mock swap process
    setTimeout(() => setIsSwapping(false), 2000);
  };

  const selectedFromToken = tokens?.find((token) => token.symbol === fromToken);
  const selectedToToken = tokens?.find((token) => token.symbol === toToken);

  const isSwapDisabled = !fromAmount || !toAmount || isSwapping || !address;

  if (tokensLoading) {
    return (
      <Card shadow="md" p="xl" radius="lg" style={{ minHeight: '400px' }}>
        <Center h="100%">
          <Stack align="center" gap="md">
            <Loader size="lg" />
            <Text c="dimmed">Loading available tokens...</Text>
          </Stack>
        </Center>
      </Card>
    );
  }

  if (error || !tokens) {
    return (
      <Card shadow="md" p="xl" radius="lg">
        <Alert
          icon={<IconAlertCircle size={16} />}
          title="Error"
          color="red"
          variant="light"
        >
          Failed to load tokens. Please try again.
        </Alert>
      </Card>
    );
  }
  return (
    <Card
      shadow="xl"
      p="xl"
      radius="xl"
      style={{
        background: 'linear-gradient(135deg, #1a1b23, #2d3748)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
      }}
    >
      <Stack gap="lg">
        {/* Header */}
        <Group justify="space-between" align="center">
          <Group gap="sm">
            <IconBolt size={24} color="#4F46E5" />
            <Title order={2} c="white" size="h3">
              Swap
            </Title>
          </Group>
          <ActionIcon variant="subtle" size="lg" color="gray">
            <IconSettings size={18} />
          </ActionIcon>
        </Group>

        <Stack gap="xs">
          {/* From Section */}
          <Box
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Group justify="space-between" mb="sm">
              <Text size="sm" c="rgba(255, 255, 255, 0.7)" fw={500}>
                From
              </Text>
              {address && selectedFromToken && (
                <Group gap="xs">
                  <Text size="xs" c="dimmed">
                    Balance:
                  </Text>
                  <TokenBalance
                    token={selectedFromToken}
                    userAddress={address}
                  />
                </Group>
              )}
            </Group>

            <Group gap="md" align="center">
              <TokenSelector
                tokens={tokens}
                value={fromToken}
                onChange={setFromToken}
                placeholder="Select token"
                variant="seamless"
              />
              <NumberInput
                value={fromAmount}
                onChange={handleFromAmountChange}
                placeholder="0.0"
                hideControls
                size="xl"
                styles={{
                  input: {
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 600,
                    textAlign: 'right',
                    padding: '0',
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.4)',
                    },
                  },
                }}
                style={{ flex: 1 }}
              />
            </Group>
          </Box>

          {/* Swap Button */}
          <Center my="xs">
            <ActionIcon
              size="lg"
              variant="filled"
              color="blue"
              onClick={handleSwapTokens}
              style={{
                borderRadius: '50%',
                background: 'linear-gradient(45deg, #4F46E5, #06B6D4)',
                border: '4px solid #1a1b23',
              }}
            >
              <IconArrowsUpDown size={20} />
            </ActionIcon>
          </Center>

          {/* To Section */}
          <Box
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '16px',
              padding: '20px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Group justify="space-between" mb="sm">
              <Text size="sm" c="rgba(255, 255, 255, 0.7)" fw={500}>
                To
              </Text>
              {address && selectedToToken && (
                <Group gap="xs">
                  <Text size="xs" c="dimmed">
                    Balance:
                  </Text>
                  <TokenBalance token={selectedToToken} userAddress={address} />
                </Group>
              )}
            </Group>

            <Group gap="md" align="center">
              <TokenSelector
                tokens={tokens}
                value={toToken}
                onChange={setToToken}
                placeholder="Select token"
                variant="seamless"
              />
              <NumberInput
                value={toAmount}
                onChange={handleToAmountChange}
                placeholder="0.0"
                hideControls
                size="xl"
                styles={{
                  input: {
                    background: 'transparent',
                    border: 'none',
                    color: 'white',
                    fontSize: '2rem',
                    fontWeight: 600,
                    textAlign: 'right',
                    padding: '0',
                    '&::placeholder': {
                      color: 'rgba(255, 255, 255, 0.4)',
                    },
                  },
                }}
                style={{ flex: 1 }}
              />
            </Group>
          </Box>

          {/* Swap Info */}
          {fromAmount && toAmount && (
            <Box
              style={{
                background: 'rgba(79, 70, 229, 0.1)',
                borderRadius: '12px',
                padding: '12px 16px',
                border: '1px solid rgba(79, 70, 229, 0.2)',
              }}
            >
              <Group justify="space-between" mb="xs">
                <Text size="sm" c="rgba(255, 255, 255, 0.7)">
                  Exchange Rate
                </Text>
                <Text size="sm" c="white" fw={500}>
                  1 {fromToken} ={' '}
                  {(Number(toAmount) / Number(fromAmount)).toFixed(6)} {toToken}
                </Text>
              </Group>
              <Group justify="space-between">
                <Group gap="xs">
                  <IconGasStation size={14} color="rgba(255, 255, 255, 0.7)" />
                  <Text size="xs" c="rgba(255, 255, 255, 0.7)">
                    Gas Fee
                  </Text>
                </Group>
                <Text size="xs" c="rgba(255, 255, 255, 0.7)">
                  ~$2.50
                </Text>
              </Group>
            </Box>
          )}

          {/* Swap Button */}
          <Button
            size="lg"
            fullWidth
            loading={isSwapping}
            disabled={isSwapDisabled}
            onClick={handleSwapClick}
            style={{
              background: isSwapDisabled
                ? 'rgba(255, 255, 255, 0.1)'
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
              : isSwapping
                ? 'Swapping...'
                : 'Swap Tokens'}
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};
