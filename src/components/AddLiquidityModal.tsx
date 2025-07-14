import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
  Stack,
  Text,
  Box,
  Group,
  Avatar,
  NumberInput,
  Button,
  ActionIcon,
  Title,
} from '@mantine/core';
import { IconX } from '@tabler/icons-react';
import { useThemeStyles } from '../hooks/useThemeStyles';
import type { LiquidityPool } from './mockPools';

interface AddLiquidityModalProps {
  opened: boolean;
  onClose: () => void;
  pool: LiquidityPool;
}

export const AddLiquidityModal = ({
  opened,
  onClose,
  pool,
}: AddLiquidityModalProps) => {
  const themeStyles = useThemeStyles();
  const [amount0, setAmount0] = useState('');
  const [amount1, setAmount1] = useState('');

  // Handle ESC key press
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    if (opened) {
      document.addEventListener('keydown', handleEsc);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [opened, onClose]);

  if (!opened) return null;

  const modalContent = (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: themeStyles.modalOverlay,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: themeStyles.cardBackground,
          border: `1px solid ${themeStyles.cardBorder}`,
          borderRadius: '24px',
          boxShadow: themeStyles.cardShadow,
          backdropFilter: 'blur(20px)',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '90vh',
          overflow: 'auto',
          padding: '24px',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <Group justify="space-between" mb="lg">
          <Title order={3} c={themeStyles.primaryText}>
            Add Liquidity
          </Title>
          <ActionIcon
            variant="subtle"
            size="lg"
            onClick={onClose}
            style={{
              borderRadius: '50%',
              background: themeStyles.buttonBackground,
              border: `1px solid ${themeStyles.cardBorder}`,
            }}
          >
            <IconX size={18} color={themeStyles.primaryText} />
          </ActionIcon>
        </Group>
      <Stack gap="md">
        <Text size="sm" c={themeStyles.secondaryText}>
          Add liquidity to {pool.token0.symbol}/{pool.token1.symbol} pool
        </Text>

        {/* Token 0 Input */}
        <Box
          style={{
            background: themeStyles.sectionBackground,
            borderRadius: '16px',
            padding: '16px',
            border: `1px solid ${themeStyles.cardBorder}`,
          }}
        >
          <Group justify="space-between" mb="xs">
            <Text size="sm" c={themeStyles.secondaryText} fw={500}>
              {pool.token0.symbol}
            </Text>
            <Text size="xs" c="dimmed">
              Balance: 0.00
            </Text>
          </Group>
          <Group gap="md" align="center">
            <Group gap="xs">
              <Avatar size={20} radius="xl" style={{ backgroundColor: '#4F46E5' }}>
                <Text size="xs" c="white" fw={600}>
                  {pool.token0.symbol.charAt(0)}
                </Text>
              </Avatar>
              <Text size="sm" fw={500} c={themeStyles.primaryText}>
                {pool.token0.symbol}
              </Text>
            </Group>
            <NumberInput
              value={amount0}
              onChange={(value) => setAmount0(String(value))}
              placeholder="0.0"
              hideControls
              size="lg"
              styles={{
                input: {
                  background: 'transparent',
                  border: 'none',
                  color: themeStyles.primaryText,
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  textAlign: 'right',
                  padding: '0',
                  '&::placeholder': {
                    color: themeStyles.placeholderText,
                  },
                },
              }}
              style={{ flex: 1 }}
            />
          </Group>
        </Box>

        {/* Token 1 Input */}
        <Box
          style={{
            background: themeStyles.sectionBackground,
            borderRadius: '16px',
            padding: '16px',
            border: `1px solid ${themeStyles.cardBorder}`,
          }}
        >
          <Group justify="space-between" mb="xs">
            <Text size="sm" c={themeStyles.secondaryText} fw={500}>
              {pool.token1.symbol}
            </Text>
            <Text size="xs" c="dimmed">
              Balance: 0.00
            </Text>
          </Group>
          <Group gap="md" align="center">
            <Group gap="xs">
              <Avatar size={20} radius="xl" style={{ backgroundColor: '#06B6D4' }}>
                <Text size="xs" c="white" fw={600}>
                  {pool.token1.symbol.charAt(0)}
                </Text>
              </Avatar>
              <Text size="sm" fw={500} c={themeStyles.primaryText}>
                {pool.token1.symbol}
              </Text>
            </Group>
            <NumberInput
              value={amount1}
              onChange={(value) => setAmount1(String(value))}
              placeholder="0.0"
              hideControls
              size="lg"
              styles={{
                input: {
                  background: 'transparent',
                  border: 'none',
                  color: themeStyles.primaryText,
                  fontSize: '1.5rem',
                  fontWeight: 600,
                  textAlign: 'right',
                  padding: '0',
                  '&::placeholder': {
                    color: themeStyles.placeholderText,
                  },
                },
              }}
              style={{ flex: 1 }}
            />
          </Group>
        </Box>

        {/* Pool Share Preview */}
        <Box
          style={{
            background: themeStyles.infoBackground,
            borderRadius: '12px',
            padding: '12px 16px',
            border: `1px solid ${themeStyles.infoBorder}`,
          }}
        >
          <Group justify="space-between" mb="xs">
            <Text size="sm" c={themeStyles.secondaryText}>
              Share of pool
            </Text>
            <Text size="sm" c={themeStyles.primaryText} fw={500}>
              0.00%
            </Text>
          </Group>
          <Group justify="space-between">
            <Text size="xs" c={themeStyles.secondaryText}>
              Estimated APR
            </Text>
            <Text size="xs" c={themeStyles.secondaryText}>
              {pool.apr.toFixed(1)}%
            </Text>
          </Group>
        </Box>

        {/* Add Liquidity Button */}
        <Button
          size="lg"
          fullWidth
          disabled={!amount0 || !amount1}
          style={{
            background: (!amount0 || !amount1)
              ? themeStyles.buttonBackground
              : 'linear-gradient(45deg, #4F46E5, #06B6D4)',
            border: 'none',
            height: '56px',
            borderRadius: '16px',
            fontSize: '18px',
            fontWeight: 600,
            marginTop: '8px',
          }}
        >
          Add Liquidity
        </Button>
      </Stack>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
};

