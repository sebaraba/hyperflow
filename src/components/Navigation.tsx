import {
  AppShell,
  Group,
  Text,
  ActionIcon,
  useMantineColorScheme,
  UnstyledButton,
  Button,
  Box,
} from '@mantine/core';
import { IconSun, IconMoon, IconArrowsExchange } from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';
import { useAccount, useConnect, useDisconnect } from 'wagmi';
import { Routes } from '../constants/routes';
import { useThemeStyles } from '../hooks/useThemeStyles';

export const Navigation = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const { connectors, connect } = useConnect();
  const { isConnected } = useAccount();
  const { disconnect } = useDisconnect();
  const location = useLocation();
  const themeStyles = useThemeStyles();

  const handleConnect = () => {
    const connector =
      connectors.find((c) => c.name === 'MetaMask') || connectors[0];
    if (connector) {
      connect({ connector });
    }
  };

  const navItems = [
    { label: 'Dashboard', route: Routes.Dashboard },
    { label: 'Swap', route: Routes.Swap },
    { label: 'Liquidity', route: Routes.Liquidity },
    { label: 'Vote', route: Routes.Vote },
    { label: 'Lock', route: Routes.Lock },
    { label: 'Incentivize', route: Routes.Incentivize },
  ];

  return (
    <AppShell.Header h={80} p={0}>
      <Box
        style={{
          background: themeStyles.cardBackground,
          border: `1px solid ${themeStyles.cardBorder}`,
          borderRadius: '16px',
          backdropFilter: 'blur(10px)',
          boxShadow: themeStyles.cardShadow,
          padding: '0 32px',
          display: 'flex',
          alignItems: 'center',
          margin: '16px',
          height: 'calc(100% - 32px)',
        }}
      >
        <Group justify="space-between" h="100%" w="100%">
          {/* Left section: Logo and page links */}
          <Group>
            <Group gap="sm">
              <IconArrowsExchange size={32} color="#4F46E5" />
              <Text
                size="xl"
                fw={700}
                component={Link}
                to={Routes.Dashboard}
                style={{ 
                  textDecoration: 'none', 
                  color: themeStyles.primaryText,
                  cursor: 'pointer'
                }}
              >
                HyperFlow DEX
              </Text>
            </Group>
            
            <Group ml="40px" gap="xs">
              {navItems.map((item) => {
                const isActive = location.pathname === item.route;
                return (
                  <UnstyledButton
                    key={item.route}
                    component={Link}
                    to={item.route}
                    style={{
                      padding: '8px 16px',
                      borderRadius: '12px',
                      background: isActive 
                        ? themeStyles.selectedBackground
                        : 'transparent',
                      border: isActive 
                        ? `1px solid ${themeStyles.selectedBorder}`
                        : '1px solid transparent',
                      color: isActive 
                        ? themeStyles.primaryText
                        : themeStyles.secondaryText,
                      fontSize: '14px',
                      fontWeight: isActive ? 600 : 500,
                      transition: 'all 0.2s ease',
                      cursor: 'pointer',
                    }}
                    onMouseEnter={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = themeStyles.hoverBackground;
                        e.currentTarget.style.color = themeStyles.primaryText;
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isActive) {
                        e.currentTarget.style.background = 'transparent';
                        e.currentTarget.style.color = themeStyles.secondaryText;
                      }
                    }}
                  >
                    {item.label}
                  </UnstyledButton>
                );
              })}
            </Group>
          </Group>

          {/* Right section: Wallet and theme toggle */}
          <Group gap="sm">
            <Button
              variant="filled"
              color={isConnected ? 'red' : 'blue'}
              size="sm"
              radius="lg"
              onClick={() => (isConnected ? disconnect() : handleConnect())}
              style={{
                background: isConnected 
                  ? 'linear-gradient(135deg, #ef4444, #dc2626)' 
                  : 'linear-gradient(135deg, #4F46E5, #3B82F6)',
                border: 'none',
                fontWeight: 600,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-1px)';
                e.currentTarget.style.boxShadow = '0 8px 25px rgba(79, 70, 229, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {isConnected ? 'Disconnect Wallet' : 'Connect Wallet'}
            </Button>
            
            <ActionIcon
              onClick={toggleColorScheme}
              size="lg"
              radius="lg"
              aria-label="Toggle color scheme"
              style={{
                background: themeStyles.buttonBackground,
                color: themeStyles.primaryText,
                border: `1px solid ${themeStyles.cardBorder}`,
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = themeStyles.buttonHoverBackground;
                e.currentTarget.style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = themeStyles.buttonBackground;
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              {colorScheme === 'dark' ? (
                <IconSun size={20} />
              ) : (
                <IconMoon size={20} />
              )}
            </ActionIcon>
          </Group>
        </Group>
      </Box>
    </AppShell.Header>
  );
};
