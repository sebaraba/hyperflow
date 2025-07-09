import {
  AppShell,
  Group,
  Text,
  ActionIcon,
  useMantineColorScheme,
  Anchor,
  Button,
} from '@mantine/core';
import { IconSun, IconMoon, IconArrowsExchange } from '@tabler/icons-react';
import { Link } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Routes } from '../constants/routes';

export const Navigation = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { connectors, connect } = useConnect();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const handleConnect = () => {
    const connector =
      connectors.find((c) => c.name === 'MetaMask') || connectors[0];
    if (connector) {
      connect({ connector });
    }
  };

  return (
    <AppShell.Header h={70} p="md">
      <Group justify="space-between" h="100%">
        {/* Left side: Logo and links */}
        <Group>
          <IconArrowsExchange size={40} color="var(--mantine-color-blue-6)" />
          <Text
            size="xl"
            fw={700}
            component={Link}
            to={Routes.Dashboard}
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            HyperFlow DEX
          </Text>
          <Group ml="40px">
            <Anchor
              component={Link}
              to={Routes.Dashboard}
              size="md"
              fw={400}
              style={{ textDecoration: 'none' }}
            >
              Dashboard
            </Anchor>
            <Anchor
              component={Link}
              to={Routes.Swap}
              size="md"
              fw={400}
              style={{ textDecoration: 'none' }}
            >
              Swap
            </Anchor>
            <Anchor
              component={Link}
              to={Routes.Liquidity}
              size="md"
              fw={400}
              style={{ textDecoration: 'none' }}
            >
              Liquidity
            </Anchor>
            <Anchor
              component={Link}
              to={Routes.Vote}
              size="md"
              fw={400}
              style={{ textDecoration: 'none' }}
            >
              Vote
            </Anchor>
            <Anchor
              component={Link}
              to={Routes.Lock}
              size="md"
              fw={400}
              style={{ textDecoration: 'none' }}
            >
              Lock
            </Anchor>
            <Anchor
              component={Link}
              to={Routes.Incentivize}
              size="md"
              fw={400}
              style={{ textDecoration: 'none' }}
            >
              Incentivize
            </Anchor>
          </Group>
        </Group>

        {/* Right side: Theme toggle and Connect Wallet button */}
        <Group>
          <Button
            variant={'outline'}
            color={isConnected ? 'red' : 'blue'}
            size="sm"
            onClick={() => (isConnected ? disconnect() : handleConnect())}
          >
            {isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
          </Button>
          <ActionIcon
            onClick={toggleColorScheme}
            variant="default"
            size="lg"
            aria-label="Toggle color scheme"
          >
            {colorScheme === 'dark' ? (
              <IconSun size={20} />
            ) : (
              <IconMoon size={20} />
            )}
          </ActionIcon>
        </Group>
      </Group>
    </AppShell.Header>
  );
};
