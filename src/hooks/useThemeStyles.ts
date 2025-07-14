import { useMantineColorScheme } from '@mantine/core';

export const useThemeStyles = () => {
  const { colorScheme } = useMantineColorScheme();
  const isDark = colorScheme === 'dark';

  return {
    // Background gradients
    cardBackground: isDark 
      ? 'linear-gradient(135deg, #1a1b23, #2d3748)'
      : 'linear-gradient(135deg, #e2e8f0, #cfd8e3)',
    
    // Border colors
    cardBorder: isDark
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.15)',
    
    // Text colors
    primaryText: isDark 
      ? 'white'
      : '#2d3748',
    
    secondaryText: isDark
      ? 'rgba(255, 255, 255, 0.7)'
      : 'rgba(45, 55, 72, 0.7)',
    
    mutedText: isDark
      ? 'rgba(255, 255, 255, 0.5)'
      : 'rgba(45, 55, 72, 0.5)',
    
    placeholderText: isDark
      ? 'rgba(255, 255, 255, 0.4)'
      : 'rgba(45, 55, 72, 0.4)',
    
    // Input backgrounds
    inputBackground: isDark
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(0, 0, 0, 0.05)',
    
    // Button backgrounds
    buttonBackground: isDark
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.1)',
    
    buttonHoverBackground: isDark
      ? 'rgba(255, 255, 255, 0.2)'
      : 'rgba(0, 0, 0, 0.2)',
    
    // Modal overlay
    modalOverlay: isDark
      ? 'rgba(0, 0, 0, 0.7)'
      : 'rgba(0, 0, 0, 0.5)',
    
    // Section backgrounds (for from/to sections)
    sectionBackground: isDark
      ? 'rgba(255, 255, 255, 0.05)'
      : 'rgba(0, 0, 0, 0.03)',
    
    // Hover states
    hoverBackground: isDark
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.05)',
    
    // Selected state
    selectedBackground: isDark
      ? 'rgba(79, 70, 229, 0.2)'
      : 'rgba(79, 70, 229, 0.1)',
    
    selectedBorder: isDark
      ? 'rgba(79, 70, 229, 0.4)'
      : 'rgba(79, 70, 229, 0.3)',
    
    // Focus states
    focusBorder: isDark
      ? 'rgba(79, 70, 229, 0.5)'
      : 'rgba(79, 70, 229, 0.6)',
    
    // Info section background
    infoBackground: isDark
      ? 'rgba(79, 70, 229, 0.1)'
      : 'rgba(79, 70, 229, 0.07)',
    
    infoBorder: isDark
      ? 'rgba(79, 70, 229, 0.2)'
      : 'rgba(79, 70, 229, 0.15)',
    
    // Scrollbar
    scrollbarTrack: isDark
      ? 'rgba(255, 255, 255, 0.1)'
      : 'rgba(0, 0, 0, 0.1)',
    
    scrollbarThumb: isDark
      ? 'rgba(255, 255, 255, 0.3)'
      : 'rgba(0, 0, 0, 0.3)',
    
    scrollbarThumbHover: isDark
      ? 'rgba(255, 255, 255, 0.5)'
      : 'rgba(0, 0, 0, 0.5)',
    
    // Shadows
    cardShadow: isDark
      ? '0 25px 50px -12px rgba(0, 0, 0, 0.8)'
      : '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
    
    // Utility
    isDark,
    isLight: !isDark,
  };
};
