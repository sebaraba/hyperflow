import {
  Card,
  Stack,
  Group,
  Text,
  Button,
  NumberInput,
  Loader,
  ActionIcon,
  Box,
  Center,
  Alert,
  UnstyledButton,
  Title,
} from '@mantine/core';
import {
  IconArrowsUpDown,
  IconSettings,
  IconAlertCircle,
  IconGasStation,
  IconChevronDown,
  IconPercentage,
  IconBolt,
} from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import { useThemeStyles } from '../hooks/useThemeStyles';
import { useAccount } from 'wagmi';
import { useTokenBalance } from '../hooks/useTokenBalance';
import { TokenSelector } from './TokenSelector';
import { TokenSelectionModal } from './TokenSelectionModal';
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
  const themeStyles = useThemeStyles();
  const [fromToken, setFromToken] = useState('');
  const [toToken, setToToken] = useState('');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');
  const [isSwapping, setIsSwapping] = useState(false);
  const [showTokenModal, setShowTokenModal] = useState(false);
  const [modalSelectionType, setModalSelectionType] = useState<'from' | 'to'>(
    'from',
  );
  const [showPercentageDropdown, setShowPercentageDropdown] = useState(false);

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

  const handleTokenModalOpen = (type: 'from' | 'to') => {
    setModalSelectionType(type);
    setShowTokenModal(true);
  };

  const handleTokenSelect = (token: Token) => {
    if (modalSelectionType === 'from') {
      setFromToken(token.symbol);
    } else {
      setToToken(token.symbol);
    }
  };

  const handlePercentageClick = (percentage: number) => {
    if (!address || !selectedFromToken) return;

    // TODO: Calculate actual balance percentage
    // For now, use mock values
    const mockBalance = 1000;
    const amount = ((mockBalance * percentage) / 100).toString();
    handleFromAmountChange(amount);
  };

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
      p="lg"
      radius="xl"
      style={{
        background: themeStyles.cardBackground,
        border: `1px solid ${themeStyles.cardBorder}`,
        backdropFilter: 'blur(10px)',
      }}
    >
      <Stack gap="md">
        {/* Header */}
        <Group justify="space-between" align="center">
          <Group gap="sm">
            <IconBolt size={24} color="#4F46E5" />
            <Title order={2} c={themeStyles.primaryText} size="h3">
              Swap
            </Title>
          </Group>
          <ActionIcon variant="subtle" size="lg" color="gray">
            <IconSettings size={18} />
          </ActionIcon>
        </Group>

        <Stack gap="sm">
          {/* From Section */}
          <Box
            style={{
              background: themeStyles.sectionBackground,
              borderRadius: '16px',
              padding: '14px',
              border: `1px solid ${themeStyles.cardBorder}`,
              position: 'relative',
              transition: 'all 0.2s ease',
              minHeight: showPercentageDropdown ? '120px' : 'auto',
            }}
          >
            <Group justify="space-between" mb="xs">
              <Text size="sm" c={themeStyles.secondaryText} fw={500}>
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
                  <UnstyledButton
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '2px',
                      padding: '2px 4px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                    }}
                    onClick={() =>
                      setShowPercentageDropdown(!showPercentageDropdown)
                    }
                  >
                    <IconPercentage size={12} color="#4F46E5" />
                    <IconChevronDown
                      size={10}
                      color="#4F46E5"
                      style={{
                        transform: showPercentageDropdown
                          ? 'rotate(180deg)'
                          : 'rotate(0deg)',
                        transition: 'transform 0.2s ease',
                      }}
                    />
                  </UnstyledButton>
                </Group>
              )}
            </Group>

            {/* Percentage Options */}
            {showPercentageDropdown && address && selectedFromToken && (
              <Group gap="xs" mb="sm">
                <Text size="xs" c={themeStyles.secondaryText}>
                  Quick select:
                </Text>
                {[25, 50, 100].map((percentage) => (
                  <>
                    <UnstyledButton
                      key={percentage}
                      onClick={() => handlePercentageClick(percentage)}
                      style={{
                        padding: '4px 8px',
                        borderRadius: '6px',
                        background: themeStyles.sectionBackground,
                        border: `1px solid ${themeStyles.cardBorder}`,
                        cursor: 'pointer',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = '#4F46E5';
                        e.currentTarget.style.transform = 'scale(1.02)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background =
                          themeStyles.sectionBackground;
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <Text size="xs" c={themeStyles.primaryText} fw={500}>
                        {percentage}%
                      </Text>
                    </UnstyledButton>
                  </>
                ))}
              </Group>
            )}

            <Group gap="md" align="center">
              <TokenSelector
                tokens={tokens}
                value={fromToken}
                onChange={setFromToken}
                placeholder="Select token"
                variant="seamless"
                onClick={() => handleTokenModalOpen('from')}
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
                    color: themeStyles.primaryText,
                    fontSize: '2rem',
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

          {/* Swap Button */}
          <Center my="4px">
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
              background: themeStyles.sectionBackground,
              borderRadius: '16px',
              padding: '14px',
              border: `1px solid ${themeStyles.cardBorder}`,
            }}
          >
            <Group justify="space-between" mb="xs">
              <Text size="sm" c={themeStyles.secondaryText} fw={500}>
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
                onClick={() => handleTokenModalOpen('to')}
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
                    color: themeStyles.primaryText,
                    fontSize: '2rem',
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

          {/* Swap Info */}
          {fromAmount && toAmount && (
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
                  Exchange Rate
                </Text>
                <Text size="sm" c={themeStyles.primaryText} fw={500}>
                  1 {fromToken} ={' '}
                  {(Number(toAmount) / Number(fromAmount)).toFixed(6)} {toToken}
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
              : isSwapping
                ? 'Swapping...'
                : 'Swap Tokens'}
          </Button>
        </Stack>
      </Stack>

      {/* Token Selection Modal */}
      <TokenSelectionModal
        opened={showTokenModal}
        onClose={() => setShowTokenModal(false)}
        tokens={tokens || []}
        onTokenSelect={handleTokenSelect}
        selectedToken={
          modalSelectionType === 'from' ? selectedFromToken : selectedToToken
        }
        title={
          modalSelectionType === 'from'
            ? 'Select Token to Swap From'
            : 'Select Token to Swap To'
        }
      />
    </Card>
  );
};
