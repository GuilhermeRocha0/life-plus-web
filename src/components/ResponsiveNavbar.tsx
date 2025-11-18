import React, { useState } from 'react'
import {
  Navbar,
  Logo,
  MenuLinks,
  MenuItem,
  StyledLink,
  Hamburger,
  LogOutMenuItem
} from '../styles/Styles'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'

const ResponsiveNavbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const toggleMenu = () => setMenuOpen(prev => !prev)

  const handleLogout = () => {
    logout()
    navigate('/')
    setMenuOpen(false)
  }

  return (
    <Navbar>
      <Logo to="/">
        <StyledLink to="/">Life+</StyledLink>
      </Logo>
      <Hamburger
        onClick={toggleMenu}
        isOpen={menuOpen}
        aria-label={menuOpen ? 'Fechar menu' : 'Abrir menu'}
      >
        <div />
        <div />
        <div />
      </Hamburger>
      <MenuLinks isOpen={menuOpen}>
        <MenuItem>
          <StyledLink to="/perfil" onClick={() => setMenuOpen(false)}>
            Perfil
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/exames" onClick={() => setMenuOpen(false)}>
            Exames
          </StyledLink>
        </MenuItem>
        <MenuItem>
          <StyledLink to="/remedios" onClick={() => setMenuOpen(false)}>
            Remédios
          </StyledLink>
        </MenuItem>

        {user && (
          <LogOutMenuItem onClick={handleLogout}>
            <span style={{ cursor: 'pointer', color: 'white' }}>Sair</span>
          </LogOutMenuItem>
        )}
      </MenuLinks>
    </Navbar>
  )
}

export default ResponsiveNavbar
