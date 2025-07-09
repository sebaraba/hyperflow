import { Select, Group, Avatar, Text } from '@mantine/core';
import { IconChevronDown } from '@tabler/icons-react';

interface TokenOption {
  value: string;
  label: string;
  symbol: string;
  icon: string;
}

interface TokenSelectorProps {
  tokens: TokenOption[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const TokenSelector = ({ tokens, value, onChange, placeholder }: TokenSelectorProps) => {
  const selectedToken = tokens.find(token => token.value === value);

  const handleChange = (newValue: string | null) => {
    if (newValue) {
      onChange(newValue);
    }
  };

  return (
    <Select
      value={value}
      onChange={handleChange}
      placeholder={placeholder || 'Select token'}
      data={tokens}
      searchable
      nothingFoundMessage="No tokens found"
      leftSection={
        selectedToken ? (
          <Avatar src={selectedToken.icon} size="sm" radius="xl" />
        ) : null
      }
      rightSection={<IconChevronDown size={16} />}
      renderOption={({ option }) => {
        const tokenOption = option as TokenOption;
        return (
          <Group gap="sm">
            <Avatar src={tokenOption.icon} size="sm" radius="xl" />
            <div>
              <Text size="sm" fw={500}>{tokenOption.symbol}</Text>
              <Text size="xs" c="dimmed">{tokenOption.label}</Text>
            </div>
          </Group>
        );
      }}
    />
  );
};
