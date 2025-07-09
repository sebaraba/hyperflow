import { Paper, Text, Group, Loader, Alert } from '@mantine/core';
import { IconCoins, IconAlertCircle } from '@tabler/icons-react';
import { useAccount, useBalance } from 'wagmi';
import { formatEther } from 'viem';

export const Balance = () => {
  const { address } = useAccount();
  const {
    data: balance,
    isLoading,
    error,
  } = useBalance({
    address,
  });

  if (isLoading) {
    return (
      <Paper p="md" radius="md">
        <Group>
          <Loader size="sm" />
          <Text size="sm">Loading balance...</Text>
        </Group>
      </Paper>
    );
  }

  if (error) {
    return (
      <Alert
        icon={<IconAlertCircle size={16} />}
        title="Error"
        color="red"
        variant="light"
      >
        Failed to load balance: {error.message}
      </Alert>
    );
  }

  if (!balance) {
    return (
      <Alert
        icon={<IconAlertCircle size={16} />}
        title="No Data"
        color="orange"
        variant="light"
      >
        No balance data available
      </Alert>
    );
  }

  return (
    <Paper p="md" radius="md" bg="var(--mantine-color-dark-6)">
      <Group justify="space-between">
        <Group>
          <IconCoins size={20} color="var(--mantine-color-yellow-6)" />
          <Text size="sm" c="dimmed">
            Balance:
          </Text>
        </Group>
        <Text size="lg" fw={600} ff="monospace" c="var(--mantine-color-green-6)">
          {Number(formatEther(balance.value)).toFixed(6)} {balance.symbol}
        </Text>
      </Group>
    </Paper>
  );
};
