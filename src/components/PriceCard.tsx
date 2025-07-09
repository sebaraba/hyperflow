import { Card, Text, Group, Stack, Badge } from '@mantine/core';
import { IconTrendingUp, IconTrendingDown } from '@tabler/icons-react';

interface PriceCardProps {
  tokenSymbol: string;
  price: string;
  change24h: number;
  volume24h: string;
}

export const PriceCard = ({ tokenSymbol, price, change24h, volume24h }: PriceCardProps) => {
  const isPositive = change24h >= 0;
  
  return (
    <Card shadow="sm" p="lg" radius="lg">
      <Stack gap="md">
        <Group justify="space-between">
          <Text size="lg" fw={600}>{tokenSymbol}/USD</Text>
          <Badge 
            color={isPositive ? 'green' : 'red'} 
            variant="light"
            leftSection={isPositive ? <IconTrendingUp size={12} /> : <IconTrendingDown size={12} />}
          >
            {isPositive ? '+' : ''}{change24h.toFixed(2)}%
          </Badge>
        </Group>
        
        <Group justify="space-between">
          <Text size="xl" fw={700} c={isPositive ? 'green' : 'red'}>
            ${price}
          </Text>
        </Group>
        
        <Group justify="space-between">
          <Text size="xs" c="dimmed">24h Volume</Text>
          <Text size="sm" fw={500}>${volume24h}</Text>
        </Group>
      </Stack>
    </Card>
  );
};

