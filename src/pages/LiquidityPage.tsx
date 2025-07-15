import { Card, Stack, Box } from '@mantine/core';
import { LiquidityHeader } from '../components/LiquidityHeader';
import { LiquidityTabs } from '../components/LiquidityTabs';
import { useThemeStyles } from '../hooks/useThemeStyles';

export const LiquidityPage = () => {
  const themeStyles = useThemeStyles();

  return (
    <Box
      style={{
        width: '85%',
        margin: '0 auto',
        padding: '8px',
        marginTop: '16px',
      }}
    >
      <Card
        shadow="xl"
        p="lg"
        radius="xl"
        style={{
          background: themeStyles.cardBackground,
          border: `1px solid ${themeStyles.cardBorder}`,
          backdropFilter: 'blur(10px)',
        }}
      >
        <Stack gap="lg">
          <LiquidityHeader />
          <LiquidityTabs />
        </Stack>
      </Card>
    </Box>
  );
};
