// Direla Brand Colors
export const COLORS = {
  lightGrey: '#F6F6F6',
  darkGrey: '#1E1E1E',
  green: '#006A4E',
  yellow: '#FFD403',
  white: '#FFFFFF',
  black: '#000000',
  
  // Semantic colors
  primary: '#006A4E',      // Green
  secondary: '#FFD403',    // Yellow
  background: '#F6F6F6',   // Light Grey
  text: '#1E1E1E',         // Dark Grey
  textLight: '#666666',
  border: '#E0E0E0',
  
  // Status colors
  success: '#006A4E',
  warning: '#FFD403',
  error: '#FF3B30',
  info: '#0088cc',
  
  // Opacity variants
  greenLight: '#006A4E20',
  yellowLight: '#FFD40320',
};

export const CURRENCY = {
  symbol: 'R',
  code: 'ZAR',
  name: 'South African Rand',
};

export const formatCurrency = (amount) => {
  return `R ${parseFloat(amount).toLocaleString('en-ZA', { 
    minimumFractionDigits: 2,
    maximumFractionDigits: 2 
  })}`;
};
