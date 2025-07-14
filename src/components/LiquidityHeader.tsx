import { Group, Title, Button } from '@mantine/core';
import { IconDroplet, IconChartBar, IconPlus } from '@tabler/icons-react';
import { useThemeStyles } from '../hooks/useThemeStyles';

export const LiquidityHeader = () => {
  const themeStyles = useThemeStyles();

  return (
    <Group justify="space-between" align="center">
      <Group gap="sm">
        <IconDroplet size={24} color="#4F46E5" />
        <Title order={2} c={themeStyles.primaryText} size="h3">
          Liquidity
        </Title>
      </Group>
      <Group gap="sm">
        <Button
          variant="outline"
          leftSection={<IconChartBar size={16} />}
          color="blue"
        >
          Analytics
        </Button>
        <Button
          variant="filled"
          leftSection={<IconPlus size={16} />}
          style={{
            background: 'linear-gradient(45deg, #4F46E5, #06B6D4)',
            border: 'none',
          }}
        >
          Create Pool
        </Button>
      </Group>
    </Group>
  );
};
