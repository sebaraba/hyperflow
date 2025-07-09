import { Container, Title, Text, SimpleGrid, Stack, Group, Card, Button, NumberInput } from '@mantine/core';
import { IconArrowsExchange, IconChartLine, IconWallet } from '@tabler/icons-react';
import { useState } from 'react';
import { WalletConnection } from '../components/WalletConnection';
import { PriceCard } from '../components/PriceCard';
import { TokenSelector } from '../components/TokenSelector';

const mockTokens = [
  { value: 'eth', label: 'Ethereum', symbol: 'ETH', icon: '/eth-icon.png' },
  { value: 'usdc', label: 'USD Coin', symbol: 'USDC', icon: '/usdc-icon.png' },
  { value: 'usdt', label: 'Tether', symbol: 'USDT', icon: '/usdt-icon.png' },
];

export const Home = () => {
  const [fromToken, setFromToken] = useState('eth');
  const [toToken, setToToken] = useState('usdc');
  const [fromAmount, setFromAmount] = useState('');
  const [toAmount, setToAmount] = useState('');

  const handleFromAmountChange = (value: string | number) => {
    setFromAmount(String(value));
  };

  const handleToAmountChange = (value: string | number) => {
    setToAmount(String(value));
  };

  return (
    <Container size="lg">
      <Stack gap="xl">
        {/* Hero Section */}
        <Stack align="center" gap="md" py="xl">
          <Group gap="sm">
            <IconArrowsExchange size={48} color="var(--mantine-color-blue-6)" />
            <Title size="h1" ta="center" c="blue">
              HyperFlow DEX
            </Title>
          </Group>
          <Text size="xl" ta="center" c="dimmed" maw={600}>
            Trade tokens instantly on HyperEVM with zero slippage and minimal fees
          </Text>
        </Stack>

        {/* Price Cards */}
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="md">
          <PriceCard
            tokenSymbol="ETH"
            price="2,345.67"
            change24h={2.45}
            volume24h="1.2M"
          />
          <PriceCard
            tokenSymbol="USDC"
            price="1.00"
            change24h={0.01}
            volume24h="845K"
          />
          <PriceCard
            tokenSymbol="USDT"
            price="0.999"
            change24h={-0.05}
            volume24h="2.1M"
          />
        </SimpleGrid>

        {/* Trading Interface */}
        <SimpleGrid cols={{ base: 1, md: 2 }} spacing="xl">
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
                      tokens={mockTokens}
                      value={fromToken}
                      onChange={setFromToken}
                      placeholder="Select token"
                    />
                    <NumberInput
                      value={fromAmount}
                      onChange={handleFromAmountChange}
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
                      tokens={mockTokens}
                      value={toToken}
                      onChange={setToToken}
                      placeholder="Select token"
                    />
                    <NumberInput
                      value={toAmount}
                      onChange={handleToAmountChange}
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
          <Card shadow="md" p="xl" radius="lg">
            <Stack gap="lg">
              <Group gap="sm">
                <IconWallet size={24} />
                <Title order={2}>Wallet</Title>
              </Group>
              <WalletConnection />
            </Stack>
          </Card>
        </SimpleGrid>
      </Stack>
    </Container>
  );
};
