import React, { useState } from 'react'
import {
  Navbar,
  LogoContainer,
  Logo,
  MenuLinks,
  MenuItem,
  StyledLink,
  Hamburger,
  LogOutButton,
  MenuDivider
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
      <LogoContainer>
        <Logo to="/">Life+</Logo>
      </LogoContainer>
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
        <MenuDivider>
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
          <MenuItem>
            <StyledLink to="/relatorios" onClick={() => setMenuOpen(false)}>
              Relatórios
            </StyledLink>
          </MenuItem>
        </MenuDivider>

        <MenuDivider>
          <MenuItem>
            <StyledLink to="/configuracoes" onClick={() => setMenuOpen(false)}>
              Configurações
            </StyledLink>
          </MenuItem>
          {user && <LogOutButton onClick={handleLogout}>Sair</LogOutButton>}
        </MenuDivider>
      </MenuLinks>
    </Navbar>
  )
}

export default ResponsiveNavbar
