import { Container, Stack } from '@mantine/core';
import { PositionsSection } from '../components/PositionsSection';
import { WalletSection } from '../components/WalletSection';

export const Dashboard = () => {
  return (
    <Container size="lg">
      <Stack gap="xl" py="md">
        <PositionsSection />
        <WalletSection />
      </Stack>
    </Container>
  );
};
