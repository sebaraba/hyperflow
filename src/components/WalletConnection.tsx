import {
  Paper,
  Text,
  Button,
  Group,
  Stack,
  Badge,
  Card,
  Divider,
} from '@mantine/core';
import { IconWallet, IconPlugConnected, IconLogout } from '@tabler/icons-react';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Balance } from './Balance';
import { ChainSwitcher } from './ChainSwitcher';

export const WalletConnection = () => {
  const { address, isConnected } = useAccount();
  const { connectors, connect } = useConnect();
  const { disconnect } = useDisconnect();

  const formatAddress = (address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  const handleConnect = () => {
    // Connect with the first available connector (usually MetaMask)
    const connector =
      connectors.find((c) => c.name === 'MetaMask') || connectors[0];
    if (connector) {
      connect({ connector });
    }
  };

  if (!isConnected) {
    return (
      <Card shadow="md" padding="xl" radius="lg">
        <Stack align="center" gap="lg">
          <IconWallet size={48} color="var(--mantine-color-blue-6)" />
          <Text size="xl" fw={600} ta="center">
            Connect Your Wallet
          </Text>
          <Text size="md" c="dimmed" ta="center">
            Connect your wallet to start trading on HyperFlow DEX
          </Text>

          <Button
            size="lg"
            leftSection={<IconPlugConnected size={20} />}
            onClick={handleConnect}
            fullWidth
          >
            Connect Wallet
          </Button>

          <Divider label="Available Connectors" labelPosition="center" />

          <Group justify="center" gap="sm">
            {connectors.map((connector) => (
              <Button
                key={connector.uid}
                variant="light"
                size="sm"
                onClick={() => connect({ connector })}
              >
                {connector.name}
              </Button>
            ))}
          </Group>
        </Stack>
      </Card>
    );
  }

  return (
    <Card shadow="md" padding="xl" radius="lg">
      <Stack gap="lg">
        <Group justify="space-between">
          <Group>
            <IconWallet size={24} color="var(--mantine-color-green-6)" />
            <Text size="lg" fw={600}>
              Wallet Connected
            </Text>
          </Group>
          <Badge color="green" size="lg">
            Connected
          </Badge>
        </Group>

        <Paper p="md" radius="md" bg="var(--mantine-color-gray-light)">
          <Text size="sm" c="dimmed" mb={4}>
            Address:
          </Text>
          <Text ff="monospace" size="md" fw={500}>
            {formatAddress(address!)}
          </Text>
        </Paper>

        <Balance />
        <ChainSwitcher />

        <Button
          color="red"
          variant="light"
          leftSection={<IconLogout size={16} />}
          onClick={() => disconnect()}
          fullWidth
        >
          Disconnect Wallet
        </Button>
      </Stack>
    </Card>
  );
};
