import {
  AppShell,
  Group,
  Text,
  ActionIcon,
  useMantineColorScheme,
  Anchor,
} from '@mantine/core';
import { IconSun, IconMoon, IconArrowsExchange } from '@tabler/icons-react';
import { Link } from 'react-router-dom';

export const Navigation = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <AppShell.Header h={70} p="md">
      <Group justify="space-between" h="100%">
        <Group>
          <IconArrowsExchange size={32} color="var(--mantine-color-blue-6)" />
          <Text
            size="xl"
            fw={700}
            component={Link}
            to="/"
            style={{ textDecoration: 'none', color: 'inherit' }}
          >
            HyperFlow DEX
          </Text>
        </Group>

        <Group>
          <Anchor
            component={Link}
            to="/"
            size="md"
            fw={500}
            style={{ textDecoration: 'none' }}
          >
            Trade
          </Anchor>
          <Anchor
            component={Link}
            to="/about"
            size="md"
            fw={500}
            style={{ textDecoration: 'none' }}
          >
            About
          </Anchor>
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
