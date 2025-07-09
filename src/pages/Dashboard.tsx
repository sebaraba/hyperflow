import { Container, Title, Text, SimpleGrid, Stack, Group, Card } from '@mantine/core';
import { IconArrowsExchange, IconWallet } from '@tabler/icons-react';
import { WalletConnection } from '../components/WalletConnection';
import { PriceCard } from '../components/PriceCard';

export const Dashboard = () => {

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
        <SimpleGrid cols={{ base: 1, sm: 2, md: 3 }} spacing="xl">
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
        <SimpleGrid cols={{ base: 1, md: 1 }} spacing="xl">
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
