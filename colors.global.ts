// src/constants/colors.ts

// Paleta base de verdes (monocromática)
const mossGreenPalette = {
  moss50: '#F5F9F2',
  moss100: '#E9F2E2',
  moss200: '#D3E5C5',
  moss300: '#B5D3A0',
  moss400: '#8FBA73',    // Verde musgo principal
  moss500: '#6AA14A',    // Verde primário
  moss600: '#518135',
  moss700: '#3F6728',
  moss800: '#2F4C1D',
  moss900: '#1E3212',
};

// Tons neutros
const neutralPalette = {
  white: '#FFFFFF',
  gray50: '#FAFAFA',
  gray100: '#F5F5F5',
  gray200: '#EEEEEE',
  gray300: '#E0E0E0',
  gray400: '#BDBDBD',
  gray500: '#9E9E9E',
  gray600: '#757575',
  gray700: '#616161',
  gray800: '#424242',
  gray900: '#212121',
  black: '#000000',
};

// Cores semânticas comuns
const commonColors = {
  success: '#4CAF50',
  error: '#F44336',
  warning: '#FFC107',
  info: '#2196F3',
  disabled: '#BDBDBD',
};

// Tema Claro
export const lightColors = {
  // Cores primárias
  primary: mossGreenPalette.moss500,
  primaryLight: mossGreenPalette.moss400,
  primaryDark: mossGreenPalette.moss600,
  
  // Cores de fundo
  backgroundPrimary: neutralPalette.gray50,
  backgroundSecondary: neutralPalette.gray100,
  backgroundTertiary: neutralPalette.gray300,
  backgroundInverse: mossGreenPalette.moss800,
  backgroundWhite: neutralPalette.white,
  
  // Cores de texto
  textPrimary: neutralPalette.gray900,
  textSecondary: neutralPalette.gray700,
  textTertiary: neutralPalette.gray600,
  textInverse: neutralPalette.white,
  textLink: mossGreenPalette.moss600,
  
  // Cores de componentes
  buttonPrimary: mossGreenPalette.moss500,
  buttonPrimaryText: neutralPalette.white,
  buttonSecondary: neutralPalette.gray200,
  buttonSecondaryText: neutralPalette.gray800,
  
  border: neutralPalette.gray300,
  divider: neutralPalette.gray200,
  icon: neutralPalette.gray700,
  iconActive: mossGreenPalette.moss500,
  iconInactive: neutralPalette.gray500,
  
  // Feedback
  ...commonColors,
  
  // Paletas completas para acesso direto
  moss: mossGreenPalette,
  neutral: neutralPalette,
};

// Tema Escuro
export const darkColors = {
  // Cores primárias
  primary: mossGreenPalette.moss400,
  primaryLight: mossGreenPalette.moss300,
  primaryDark: mossGreenPalette.moss500,
  
  // Cores de fundo
  backgroundPrimary: neutralPalette.gray900,
  backgroundSecondary: neutralPalette.gray800,
  backgroundTertiary: neutralPalette.gray700,
  backgroundInverse: mossGreenPalette.moss100,
  backgroundBlack: neutralPalette.black,
  
  // Cores de texto
  textPrimary: neutralPalette.gray100,
  textSecondary: neutralPalette.gray300,
  textTertiary: neutralPalette.gray500,
  textInverse: neutralPalette.gray900,
  textLink: mossGreenPalette.moss300,
  
  // Cores de componentes
  buttonPrimary: mossGreenPalette.moss600,
  buttonPrimaryText: neutralPalette.white,
  buttonSecondary: neutralPalette.gray700,
  buttonSecondaryText: neutralPalette.gray100,
  
  border: neutralPalette.gray700,
  divider: neutralPalette.gray800,
  icon: neutralPalette.gray400,
  iconActive: mossGreenPalette.moss400,
  iconInactive: neutralPalette.gray600,
  
  // Feedback
  ...commonColors,
  
  // Paletas completas para acesso direto
  moss: mossGreenPalette,
  neutral: neutralPalette,
};


// Objeto completo de temas
const colors = {
  light: lightColors,
  dark: darkColors,
};

export default colors;