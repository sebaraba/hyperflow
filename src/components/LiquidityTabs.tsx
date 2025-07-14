import { useState } from 'react';
import {
  Tabs,
  Stack,
  Text,
  Center,
} from '@mantine/core';
import {
  IconCoins,
  IconTrendingUp,
  IconDroplet,
} from '@tabler/icons-react';
import { PoolCard } from './PoolCard';
import { mockPools } from './mockPools';
import { useThemeStyles } from '../hooks/useThemeStyles';

export const LiquidityTabs = () => {
  const themeStyles = useThemeStyles();
  const [activeTab, setActiveTab] = useState('pools');

  const handleTabChange = (value: string | null) => {
    if (value) {
      setActiveTab(value);
    }
  };

  return (
    <Tabs value={activeTab} onChange={handleTabChange}>
      <Tabs.List>
        <Tabs.Tab value="pools" leftSection={<IconCoins size={16} />}>
          All Pools
        </Tabs.Tab>
        <Tabs.Tab value="positions" leftSection={<IconTrendingUp size={16} />}>
          My Positions
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="pools">
        <Stack gap="sm" mt="md">
          <Text size="sm" c={themeStyles.secondaryText}>
            Provide liquidity to earn trading fees from swaps.
          </Text>
          <Stack gap="sm">
            {mockPools.map((pool) => (
              <PoolCard key={pool.id} pool={pool} />
            ))}
          </Stack>
        </Stack>
      </Tabs.Panel>

      <Tabs.Panel value="positions">
        <Stack gap="sm" mt="md">
          <Text size="sm" c={themeStyles.secondaryText}>
            Your active liquidity positions.
          </Text>
          <Stack gap="sm">
            {mockPools
              .filter((pool) => pool.userLiquidity)
              .map((pool) => (
                <PoolCard key={pool.id} pool={pool} />
              ))}
          </Stack>
          {mockPools.filter((pool) => pool.userLiquidity).length === 0 && (
            <Center py="xl">
              <Stack align="center" gap="sm">
                <IconDroplet size={48} color={themeStyles.secondaryText} />
                <Text size="lg" fw={500} c={themeStyles.primaryText}>
                  No positions yet
                </Text>
                <Text size="sm" c={themeStyles.secondaryText} ta="center">
                  Start earning by providing liquidity to pools
                </Text>
              </Stack>
            </Center>
          )}
        </Stack>
      </Tabs.Panel>
    </Tabs>
  );
};

