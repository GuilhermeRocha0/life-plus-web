import type { DefaultTheme } from "styled-components";

export const lightTheme: DefaultTheme = {
  background: "#ffffff",
  homeText: "#ffffffff",
  text: "#000000ff",
  buttonPrimary: "#ffffff",
  buttonThemePrimaryText: "#000000ff",
  buttonPrimaryText: "#ffffffff",
  homeButtonPrimaryText: "#000000ff",
  buttonOutlineHover: "rgba(0, 0, 0, 0.1)",
  backgroundImage: "url('fundo.svg')",
  primary: "#007bff" // azul claro
};

export const darkTheme: DefaultTheme = {
  background: "#121212",
  homeText: "#ffffffff",
  text: "#ffffff",
  buttonPrimary: "#1f1f1f",
  buttonThemePrimaryText: "#ffffffff",
  buttonPrimaryText: "#ffffff",
  homeButtonPrimaryText: "#ffffff",
  buttonOutlineHover: "rgba(255, 255, 255, 0.2)",
  backgroundImage: "none",
  primary: "#3399ff" // azul escuro

};
