import React, { useEffect, useState } from 'react'
import { BrowserRouter } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import { lightTheme, darkTheme } from './styles/theme'
import Routes from './routes/Routes'
import ThemeToggle from './components/ThemeToggle'
import UserWayWidget from './components/UserWayWidget'
import { GlobalStyles } from './styles/GlobalStyles'
import { AuthProvider } from './context/AuthContext'
import { UserProvider } from './context/UserContext' // <- import do UserProvider

const App: React.FC = () => {
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('prefers-dark')
    return saved ? JSON.parse(saved) : false
  })

  useEffect(() => {
    localStorage.setItem('prefers-dark', JSON.stringify(isDark))
  }, [isDark])

  const toggleTheme = () => setIsDark(prev => !prev)

  return (
    <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
      <GlobalStyles />
      <BrowserRouter>
        <AuthProvider>
          <UserProvider>
            <ThemeToggle isDark={isDark} toggleTheme={toggleTheme} />
            <UserWayWidget />
            <Routes />
          </UserProvider>
        </AuthProvider>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App
