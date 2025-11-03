import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    background: string;
    text: string;
    buttonPrimary: string;
    buttonPrimaryText: string;
    buttonOutlineHover: string;
    backgroundImage?: string;
    primary: string; 
    homeText: string;
    buttonThemePrimaryText: string;
    homeButtonPrimaryText: string;
    buttonSecondary: string;
    buttonSecondaryText: string;
    buttonSecondaryHover: string;
    buttonPrimaryHover: string;
    textPrimary: string;
    textSecondary: string;
    cardBackground: string;
    inputBackground: string;
    inputBorder: string;
    backgroundSecondary: string;
    card: string;
    border: string;
    success: string;
    error: string;
    textPlaceholder: string;
  }
}
