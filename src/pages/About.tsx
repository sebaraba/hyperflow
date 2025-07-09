import { Container, Title, Text, List, Card, Group, Badge, Stack } from '@mantine/core';
import { IconCheck, IconCode, IconNetwork } from '@tabler/icons-react';

export const About = () => {
  return (
    <Container size="md">
      <Stack gap="xl">
        <Stack align="center" gap="md" py="xl">
          <Title size="h1" ta="center" c="blue">
            About HyperFlow DEX
          </Title>
          <Text size="lg" ta="center" c="dimmed" maw={600}>
            A modern, professional DEX built with cutting-edge technology for HyperEVM
          </Text>
        </Stack>

        <Card shadow="md" p="xl" radius="lg">
          <Stack gap="lg">
            <Group gap="sm">
              <IconCode size={24} color="var(--mantine-color-blue-6)" />
              <Title order={2}>Tech Stack</Title>
            </Group>

            <List
              spacing="md"
              size="md"
              icon={<IconCheck size={16} color="var(--mantine-color-green-6)" />}
            >
              <List.Item>
                <Group gap="sm">
                  <Text fw={500}>React 19 + TypeScript</Text>
                  <Badge variant="light" color="blue">Frontend</Badge>
                </Group>
                <Text size="sm" c="dimmed">Modern React with full TypeScript support</Text>
              </List.Item>

              <List.Item>
                <Group gap="sm">
                  <Text fw={500}>Wagmi v2 + Viem</Text>
                  <Badge variant="light" color="green">Web3</Badge>
                </Group>
                <Text size="sm" c="dimmed">Type-safe Web3 React hooks for Ethereum</Text>
              </List.Item>

              <List.Item>
                <Group gap="sm">
                  <Text fw={500}>TanStack Query</Text>
                  <Badge variant="light" color="purple">Data</Badge>
                </Group>
                <Text size="sm" c="dimmed">Powerful data fetching and caching</Text>
              </List.Item>

              <List.Item>
                <Group gap="sm">
                  <Text fw={500}>Mantine UI</Text>
                  <Badge variant="light" color="orange">Design</Badge>
                </Group>
                <Text size="sm" c="dimmed">Professional component library with dark mode</Text>
              </List.Item>

              <List.Item>
                <Group gap="sm">
                  <Text fw={500}>ESLint + Prettier</Text>
                  <Badge variant="light" color="gray">Quality</Badge>
                </Group>
                <Text size="sm" c="dimmed">Code quality and formatting tools</Text>
              </List.Item>
            </List>
          </Stack>
        </Card>

        <Card shadow="md" p="xl" radius="lg">
          <Stack gap="lg">
            <Group gap="sm">
              <IconNetwork size={24} color="var(--mantine-color-green-6)" />
              <Title order={2}>HyperEVM Integration</Title>
            </Group>

            <List
              spacing="md"
              size="md"
              icon={<IconCheck size={16} color="var(--mantine-color-green-6)" />}
            >
              <List.Item>
                <Text fw={500}>HyperEVM Testnet Support</Text>
                <Text size="sm" c="dimmed">Native integration with HyperEVM blockchain</Text>
              </List.Item>

              <List.Item>
                <Text fw={500}>Multiple Wallet Connectors</Text>
                <Text size="sm" c="dimmed">MetaMask, WalletConnect, and more</Text>
              </List.Item>

              <List.Item>
                <Text fw={500}>Real-time Balance Tracking</Text>
                <Text size="sm" c="dimmed">Automatic balance updates and caching</Text>
              </List.Item>

              <List.Item>
                <Text fw={500}>Smart Contract Ready</Text>
                <Text size="sm" c="dimmed">Built-in support for DEX contract interactions</Text>
              </List.Item>
            </List>
          </Stack>
        </Card>
      </Stack>
    </Container>
  );
};
