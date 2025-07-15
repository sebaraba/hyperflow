import { useState } from 'react';
import {
  Stack,
  Text,
  Box,
  Group,
  UnstyledButton,
} from '@mantine/core';
import {
  IconChevronUp,
  IconChevronDown,
} from '@tabler/icons-react';
import { PoolCard } from './PoolCard';
import { mockPools } from './mockPools';
import { useThemeStyles } from '../hooks/useThemeStyles';

type SortField = 'pair' | 'apr' | 'tvl' | 'volume24h' | 'fees24h';
type SortDirection = 'asc' | 'desc';

export const LiquidityTabs = () => {
  const themeStyles = useThemeStyles();
  const [sortField, setSortField] = useState<SortField>('tvl');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const sortedPools = [...mockPools].sort((a, b) => {
    let aValue: number | string;
    let bValue: number | string;

    switch (sortField) {
      case 'pair':
        aValue = `${a.token0.symbol}/${a.token1.symbol}`;
        bValue = `${b.token0.symbol}/${b.token1.symbol}`;
        break;
      case 'apr':
        aValue = a.apr;
        bValue = b.apr;
        break;
      case 'tvl':
        aValue = a.tvl;
        bValue = b.tvl;
        break;
      case 'volume24h':
        aValue = a.volume24h;
        bValue = b.volume24h;
        break;
      case 'fees24h':
        aValue = a.fees24h;
        bValue = b.fees24h;
        break;
      default:
        aValue = a.tvl;
        bValue = b.tvl;
    }

    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }

    return sortDirection === 'asc' 
      ? (aValue as number) - (bValue as number)
      : (bValue as number) - (aValue as number);
  });

  const SortableHeader = ({ field, children, width }: { field: SortField; children: React.ReactNode; width: string }) => {
    const isActive = sortField === field;
    const Icon = isActive && sortDirection === 'asc' ? IconChevronUp : IconChevronDown;
    
    return (
      <UnstyledButton
        onClick={() => handleSort(field)}
        style={{
          width,
          padding: '12px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          borderRadius: '8px',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = themeStyles.sectionBackground;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        <Text size="sm" fw={600} c={themeStyles.primaryText}>
          {children}
        </Text>
        <Icon 
          size={14} 
          color={isActive ? '#4F46E5' : themeStyles.secondaryText}
          style={{ opacity: isActive ? 1 : 0.5 }}
        />
      </UnstyledButton>
    );
  };

  return (
    <Stack gap="lg" mt="md">
      <Text size="md" c={themeStyles.secondaryText} fw={500}>
        Provide liquidity to earn trading fees from swaps.
      </Text>
      
      {/* Table Header */}
      <Box
        style={{
          background: themeStyles.sectionBackground,
          borderRadius: '12px',
          padding: '8px',
          border: `1px solid ${themeStyles.cardBorder}`,
        }}
      >
        <Group justify="space-between" align="center" wrap="nowrap" style={{ width: '100%' }}>
          <SortableHeader field="pair" width="25%">
            Pool
          </SortableHeader>
          <SortableHeader field="apr" width="15%">
            APR
          </SortableHeader>
          <SortableHeader field="tvl" width="20%">
            TVL
          </SortableHeader>
          <SortableHeader field="volume24h" width="20%">
            Volume 24H
          </SortableHeader>
          <SortableHeader field="fees24h" width="20%">
            Fees 24H
          </SortableHeader>
          <Box style={{ width: '15%' }}>
            <Text size="sm" fw={600} c={themeStyles.primaryText} ta="right">
              Actions
            </Text>
          </Box>
        </Group>
      </Box>

      {/* Pool Cards */}
      <Stack gap="xs">
        {sortedPools.map((pool) => (
          <PoolCard key={pool.id} pool={pool} />
        ))}
      </Stack>
    </Stack>
  );
};

