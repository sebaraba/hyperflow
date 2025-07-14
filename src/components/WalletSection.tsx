import { Stack, Group, Title, Card } from '@mantine/core';
import { IconWallet } from '@tabler/icons-react';
import { WalletConnection } from './WalletConnection';
import { useThemeStyles } from '../hooks/useThemeStyles';

export const WalletSection = () => {
  const themeStyles = useThemeStyles();

  return (
    <Card
      shadow="xl"
      p="xl"
      radius="xl"
      style={{
        background: themeStyles.cardBackground,
        border: `1px solid ${themeStyles.cardBorder}`,
        boxShadow: themeStyles.cardShadow,
        backdropFilter: 'blur(10px)',
      }}
    >
      <Stack gap="lg">
        <Group gap="sm">
          <IconWallet size={24} color="#4F46E5" />
          <Title order={2} c={themeStyles.primaryText}>
            Wallet Connection
          </Title>
        </Group>
        <WalletConnection />
      </Stack>
    </Card>
  );
};
