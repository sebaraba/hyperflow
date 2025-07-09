import { Card, Stack, Group, Title, Text, Button, NumberInput } from '@mantine/core';
import { IconChartLine } from '@tabler/icons-react';
import { TokenSelector } from './TokenSelector';

interface SwapCardProps {
  fromToken: string;
  toToken: string;
  fromAmount: string;
  toAmount: string;
  onFromTokenChange: (value: string) => void;
  onToTokenChange: (value: string) => void;
  onFromAmountChange: (value: string | number) => void;
  onToAmountChange: (value: string | number) => void;
  tokens: { value: string; label: string; symbol: string; icon: string }[];
  balance: string; // New prop for wallet balance
}

export const SwapCard = ({
                           fromToken,
                           toToken,
                           fromAmount,
                           toAmount,
                           onFromTokenChange,
                           onToTokenChange,
                           onFromAmountChange,
                           onToAmountChange,
                           tokens,
                           balance, // Destructure the balance prop
                         }: SwapCardProps) => {
  return (
    <Card
      shadow="md"
      p="xl"
      radius="lg"
      style={{
        background: 'linear-gradient(135deg, black, var(--mantine-color-blue-9))',
        height: 'auto',
      }}
    >
      <Stack gap="lg">
        <Group gap="sm">
          <IconChartLine size={24} color="white" />
          <Title order={2} style={{ color: 'white' }}>
            Swap Tokens
          </Title>
        </Group>

        <Stack gap="md">
          {/* Sell Section */}
          <div>
            <Text size="sm" mb="xs" style={{ color: 'white' }}>
              Sell
            </Text>
            <Text size="xs" mb="xs" style={{ color: 'gray' }}>
              Balance: {balance} {fromToken.toUpperCase()}
            </Text>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '8px',
              }}
            >
              <TokenSelector
                tokens={tokens}
                value={fromToken}
                onChange={onFromTokenChange}
                placeholder="Select token"
              />
              <NumberInput
                value={fromAmount}
                onChange={onFromAmountChange}
                placeholder="0.0"
                hideControls
                style={{
                  flex: 1,
                  fontSize: '1.5rem',
                  padding: '8px',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                }}
              />
            </div>
          </div>

          {/* Buy Section */}
          <div>
            <Text size="sm" mb="xs" style={{ color: 'white' }}>
              Buy
            </Text>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(255, 255, 255, 0.1)',
                borderRadius: '8px',
                padding: '8px',
              }}
            >
              <TokenSelector
                tokens={tokens}
                value={toToken}
                onChange={onToTokenChange}
                placeholder="Select token"
              />
              <NumberInput
                value={toAmount}
                onChange={onToAmountChange}
                placeholder="0.0"
                hideControls
                style={{
                  flex: 1,
                  fontSize: '1.5rem',
                  padding: '8px',
                  background: 'none',
                  border: 'none',
                  color: 'white',
                }}
              />
            </div>
          </div>

          <Button size="lg" fullWidth style={{ marginTop: '16px' }}>
            Swap Tokens
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
};
