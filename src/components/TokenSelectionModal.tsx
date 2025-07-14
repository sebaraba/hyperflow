import { useState, useMemo, useEffect } from 'react';
import { createPortal } from 'react-dom';
import type { Token } from '../services/tokenService';
import { useThemeStyles } from '../hooks/useThemeStyles';

interface TokenSelectionModalProps {
  opened: boolean;
  onClose: () => void;
  tokens: Token[];
  onTokenSelect: (token: Token) => void;
  selectedToken?: Token;
  title?: string;
}

export const TokenSelectionModal = ({
  opened,
  onClose,
  tokens,
  onTokenSelect,
  selectedToken,
  title = 'Select Token',
}: TokenSelectionModalProps) => {
  const [searchValue, setSearchValue] = useState('');
  const themeStyles = useThemeStyles();

  // Handle ESC key to close modal
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && opened) {
        onClose();
      }
    };

    if (opened) {
      document.addEventListener('keydown', handleEscKey);
      // Prevent body scroll when modal is open
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscKey);
      document.body.style.overflow = 'unset';
    };
  }, [opened, onClose]);

  const filteredTokens = useMemo(() => {
    if (!searchValue.trim()) {
      return tokens;
    }

    const searchLower = searchValue.toLowerCase();
    return tokens.filter(
      (token) =>
        token.symbol.toLowerCase().includes(searchLower) ||
        token.name.toLowerCase().includes(searchLower),
    );
  }, [tokens, searchValue]);

  const handleTokenClick = (token: Token) => {
    onTokenSelect(token);
    onClose();
    setSearchValue(''); // Reset search on close
  };

  if (!opened) {
    return null;
  }

  const modalContent = (
    <>
      {/* Custom Modal Overlay */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: themeStyles.modalOverlay,
          backdropFilter: 'blur(4px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
        }}
        onClick={onClose}
      >
        {/* Modal Content */}
        <div
          style={{
            background: themeStyles.cardBackground,
            border: `1px solid ${themeStyles.cardBorder}`,
            borderRadius: '24px',
            padding: '24px',
            width: '480px',
            maxWidth: '90vw',
            maxHeight: '80vh',
            overflow: 'hidden',
            position: 'relative',
            boxShadow: themeStyles.cardShadow,
            fontFamily:
              'Inter, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif',
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close button */}
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '16px',
              right: '16px',
              background: themeStyles.buttonBackground,
              border: 'none',
              borderRadius: '50%',
              width: '32px',
              height: '32px',
              minWidth: '32px',
              minHeight: '32px',
              fontSize: '18px',
              cursor: 'pointer',
              color: themeStyles.secondaryText,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s ease',
              padding: '0',
              lineHeight: '1',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = themeStyles.buttonHoverBackground;
              e.currentTarget.style.color = themeStyles.primaryText;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = themeStyles.buttonBackground;
              e.currentTarget.style.color = themeStyles.secondaryText;
            }}
          >
            ×
          </button>

          {/* Title */}
          <h2
            style={{
              marginTop: 0,
              marginBottom: '24px',
              color: themeStyles.primaryText,
              fontSize: '20px',
              fontWeight: 600,
              lineHeight: 1.2,
            }}
          >
            {title}
          </h2>

          {/* Search Input */}
          <div style={{ marginBottom: '20px', position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: '16px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: themeStyles.mutedText,
                pointerEvents: 'none',
                fontSize: '16px',
              }}
            >
              🔍
            </div>
            <input
              type="text"
              placeholder="Search tokens..."
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 16px 12px 44px',
                backgroundColor: themeStyles.inputBackground,
                border: `1px solid ${themeStyles.cardBorder}`,
                borderRadius: '12px',
                color: themeStyles.primaryText,
                fontSize: '14px',
                fontFamily: 'inherit',
                outline: 'none',
                transition: 'all 0.2s ease',
              }}
              onFocus={(e) => {
                e.target.style.borderColor = themeStyles.focusBorder;
              }}
              onBlur={(e) => {
                e.target.style.borderColor = themeStyles.cardBorder;
              }}
            />
            <style>
              {`
                input::placeholder {
                  color: ${themeStyles.placeholderText};
                }
              `}
            </style>
          </div>

          {/* Token List */}
          <div
            style={{
              maxHeight: '400px',
              overflowY: 'auto',
              paddingRight: '4px',
            }}
            className="token-list-scroll"
          >
            <style>
              {`
                .token-list-scroll::-webkit-scrollbar {
                  width: 6px;
                }
                .token-list-scroll::-webkit-scrollbar-track {
                  background: ${themeStyles.scrollbarTrack};
                  border-radius: 3px;
                }
                .token-list-scroll::-webkit-scrollbar-thumb {
                  background: ${themeStyles.scrollbarThumb};
                  border-radius: 3px;
                }
                .token-list-scroll::-webkit-scrollbar-thumb:hover {
                  background: ${themeStyles.scrollbarThumbHover};
                }
                
                .token-list-scroll {
                  scrollbar-width: thin;
                  scrollbar-color: ${themeStyles.scrollbarThumb} transparent;
                }
              `}
            </style>
            {filteredTokens.length === 0 ? (
              <div
                style={{
                  textAlign: 'center',
                  padding: '40px 20px',
                  color: themeStyles.mutedText,
                  fontSize: '14px',
                }}
              >
                No tokens found
              </div>
            ) : (
              filteredTokens.map((token) => (
                <div
                  key={token.symbol}
                  onClick={() => handleTokenClick(token)}
                  style={{
                    padding: '16px',
                    margin: '0 0 8px 0',
                    backgroundColor:
                      selectedToken?.symbol === token.symbol
                        ? themeStyles.selectedBackground
                        : themeStyles.sectionBackground,
                    border: '1px solid',
                    borderColor:
                      selectedToken?.symbol === token.symbol
                        ? themeStyles.selectedBorder
                        : themeStyles.cardBorder,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                  }}
                  onMouseEnter={(e) => {
                    if (selectedToken?.symbol !== token.symbol) {
                      e.currentTarget.style.backgroundColor =
                        themeStyles.hoverBackground;
                      e.currentTarget.style.borderColor =
                        themeStyles.buttonBackground;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedToken?.symbol !== token.symbol) {
                      e.currentTarget.style.backgroundColor =
                        themeStyles.sectionBackground;
                      e.currentTarget.style.borderColor =
                        themeStyles.cardBorder;
                    }
                  }}
                >
                  {/* Token Logo */}
                  <img
                    src={token.logoURI}
                    alt={token.symbol}
                    style={{
                      width: '40px',
                      height: '40px',
                      borderRadius: '50%',
                      border: `1px solid ${themeStyles.cardBorder}`,
                      objectFit: 'cover',
                    }}
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />

                  {/* Token Info */}
                  <div style={{ flex: 1 }}>
                    <div
                      style={{
                        color: themeStyles.primaryText,
                        fontSize: '16px',
                        fontWeight: 600,
                        lineHeight: 1.2,
                        marginBottom: '2px',
                      }}
                    >
                      {token.symbol}
                    </div>
                    <div
                      style={{
                        color: themeStyles.secondaryText,
                        fontSize: '14px',
                        lineHeight: 1.2,
                      }}
                    >
                      {token.name}
                    </div>
                  </div>

                  {/* Selected Indicator */}
                  {selectedToken?.symbol === token.symbol && (
                    <div
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: '#4F46E5',
                      }}
                    />
                  )}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
};
