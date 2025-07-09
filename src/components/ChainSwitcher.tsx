import {
  Paper,
  Text,
  Group,
  Button,
  Stack,
  Badge,
  SimpleGrid,
} from '@mantine/core';
import { IconNetwork, IconCheck } from '@tabler/icons-react';
import { useChainId, useSwitchChain, useChains } from 'wagmi';

export const ChainSwitcher = () => {
  const chainId = useChainId();
  const { chains, switchChain } = useSwitchChain();
  const availableChains = useChains();

  const currentChain = availableChains.find((chain) => chain.id === chainId);

  return (
    <Paper p="md" radius="md">
      <Stack gap="md">
        <Group>
          <IconNetwork size={20} color="var(--mantine-color-blue-6)" />
          <Text size="md" fw={600}>
            Network
          </Text>
        </Group>

        <Paper p="sm" radius="sm" bg="var(--mantine-color-gray-light)">
          <Group justify="space-between">
            <Stack gap={2}>
              <Text size="xs" c="dimmed">
                Current Network:
              </Text>
              <Text size="sm" fw={500}>
                {currentChain?.name || 'Unknown'}
              </Text>
              <Text size="xs" c="dimmed" ff="monospace">
                Chain ID: {chainId}
              </Text>
            </Stack>
            {currentChain?.testnet && (
              <Badge size="sm" color="orange" variant="light">
                Testnet
              </Badge>
            )}
          </Group>
        </Paper>

        {chains.length > 1 && (
          <Stack gap="xs">
            <Text size="sm" fw={500}>
              Switch Network:
            </Text>
            <SimpleGrid cols={2} spacing="xs">
              {chains.map((chain) => (
                <Button
                  key={chain.id}
                  variant={chainId === chain.id ? 'filled' : 'light'}
                  size="sm"
                  onClick={() => switchChain({ chainId: chain.id })}
                  disabled={chainId === chain.id}
                  leftSection={
                    chainId === chain.id ? <IconCheck size={16} /> : null
                  }
                  fullWidth
                >
                  {chain.name}
                  {chain.testnet && (
                    <Badge size="xs" ml={4} color="orange" variant="light">
                      T
                    </Badge>
                  )}
                </Button>
              ))}
            </SimpleGrid>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};
