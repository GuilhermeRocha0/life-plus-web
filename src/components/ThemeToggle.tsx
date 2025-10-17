import React from "react";
import styled from "styled-components";

const Toggle = styled.button`
  position: fixed;
  bottom: 12px;
  right: 12px;
  padding: 8px 12px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 700;
  z-index: 999;
  background: ${({ theme }) => theme.buttonPrimary};
  color: ${({ theme }) => theme.buttonThemePrimaryText};
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.12);

  &:hover {
    background: ${({ theme }) => theme.buttonOutlineHover};
  }
`;

type Props = {
  isDark: boolean;
  toggleTheme: () => void;
};

const ThemeToggle: React.FC<Props> = ({ isDark, toggleTheme }) => {
  return <Toggle onClick={toggleTheme}>{isDark ? "Claro" : "Escuro"}</Toggle>;
};

export default ThemeToggle;
