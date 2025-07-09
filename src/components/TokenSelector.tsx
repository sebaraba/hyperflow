import { Select, Group, Avatar, Text, Box } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';
import type { Token } from '../services/tokenService';

interface TokenSelectorProps {
  tokens: Token[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  variant?: 'default' | 'seamless';
}

export const TokenSelector = ({
  tokens,
  value,
  onChange,
  placeholder = 'Select token',
  variant = 'default',
}: TokenSelectorProps) => {
  const selectedToken = tokens.find((token) => token.symbol === value);

  const handleChange = (newValue: string | null) => {
    if (newValue) {
      onChange(newValue);
    }
  };

  const selectData = tokens.map((token) => ({
    value: token.symbol,
    label: token.name,
    symbol: token.symbol,
    logoURI: token.logoURI,
  }));

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
        }
      : {};

  return (
    <Select
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
      data={selectData}
      searchable
      nothingFoundMessage="No tokens found"
      leftSection={
        selectedToken ? (
          <Avatar
            src={selectedToken.logoURI}
            size={variant === 'seamless' ? 'md' : 'sm'}
            radius="xl"
          />
        ) : null
      }
      rightSection={
        <IconChevronDown
          size={16}
          style={{ color: variant === 'seamless' ? 'white' : undefined }}
        />
      }
      styles={{
        input: {
          ...seamlessStyles,
          '&:focus': {
            borderColor:
              variant === 'seamless' ? 'rgba(255, 255, 255, 0.3)' : undefined,
          },
        },
        section: {
          color: variant === 'seamless' ? 'white' : undefined,
        },
      }}
      renderOption={({ option }) => {
        const tokenOption = option as (typeof selectData)[0];
        return (
          <Group gap="sm" p="sm">
            <Avatar src={tokenOption.logoURI} size="sm" radius="xl" />
            <Box>
              <Text size="sm" fw={600}>
                {tokenOption.symbol}
              </Text>
              <Text size="xs" c="dimmed">
                {tokenOption.label}
              </Text>
            </Box>
          </Group>
        );
      }}
    />
  );
};
