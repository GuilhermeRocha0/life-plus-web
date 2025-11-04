// src/App.tsx
import React, { useEffect, useState } from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "./styles/theme";
import Routes from "./router/Routes";
import ThemeToggle from "./components/ThemeToggle";
import UserWayWidget from './components/UserWayWidget';
import { GlobalStyles } from './styles/GlobalStyles'

const App: React.FC = () => {
  // controla se o tema atual é escuro
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem("prefers-dark");
    return saved ? JSON.parse(saved) : false;
  });

  // salva no localStorage quando o usuário alterna
  useEffect(() => {
    localStorage.setItem("prefers-dark", JSON.stringify(isDark));
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyles />
      <BrowserRouter>
        {/* Botão de alternar tema fica fixo em todas as páginas */}
        <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />

        {/* Suas rotas continuam funcionando normalmente */}
        <UserWayWidget />
        <Routes />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;
