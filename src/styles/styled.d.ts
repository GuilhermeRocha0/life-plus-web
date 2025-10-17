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
    

  }
}
