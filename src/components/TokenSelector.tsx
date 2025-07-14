import { Group, Avatar, Text, Box } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import type { Token } from '../services/tokenService';
import { useThemeStyles } from '../hooks/useThemeStyles';

interface TokenSelectorProps {
  tokens: Token[];
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  variant?: 'default' | 'seamless';
  onClick?: () => void;
}

export const TokenSelector = ({
  tokens,
  value,
  placeholder = 'Select token',
  variant = 'default',
  onClick,
}: TokenSelectorProps) => {
  const selectedToken = tokens.find((token) => token.symbol === value);
  const themeStyles = useThemeStyles();

  const seamlessStyles =
    variant === 'seamless'
      ? {
          backgroundColor: 'transparent',
          border: 'none',
          padding: '12px 16px',
          borderRadius: '12px',
          color: 'white',
          minWidth: '120px',
          fontSize: '16px',
          fontWeight: 600,
          cursor: 'pointer',
        }
      : {
          padding: '8px 12px',
          borderRadius: '8px',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
          cursor: 'pointer',
        };

  return (
    <Box
      onClick={onClick}
      style={{
        ...seamlessStyles,
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'all 0.2s ease',
        '&:hover': {
          backgroundColor:
            variant === 'seamless'
              ? 'rgba(255, 255, 255, 0.05)'
              : 'rgba(255, 255, 255, 0.1)',
        },
      }}
    >
      {selectedToken ? (
        <Group gap="sm" wrap="nowrap">
          <Avatar
            src={selectedToken.logoURI}
            size={variant === 'seamless' ? 'md' : 'sm'}
            radius="xl"
          />
          <Text
            size={variant === 'seamless' ? 'md' : 'sm'}
            fw={600}
            c={themeStyles.primaryText}
            style={{ lineHeight: 1 }}
          >
            {selectedToken.symbol}
          </Text>
          <IconChevronDown
            size={16}
            style={{
              color: themeStyles.primaryText,
              marginLeft: 'auto',
            }}
          />
        </Group>
      ) : (
        <Group gap="sm" wrap="nowrap">
          <Text
            size={variant === 'seamless' ? 'md' : 'sm'}
            c={themeStyles.placeholderText}
            style={{ lineHeight: 1 }}
          >
            {placeholder}
          </Text>
          <IconChevronDown
            size={16}
            style={{
              color: themeStyles.placeholderText,
              marginLeft: 'auto',
            }}
          />
        </Group>
      )}
    </Box>
  );
};
