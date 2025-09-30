import React, { useState } from 'react'
import {
  Navbar,
  Logo,
  MenuLinks,
  MenuItem,
  StyledLink,
  Hamburger
} from '../styles/Styles'

const ResponsiveNavbar: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState<boolean>(false)

  const toggleMenu = () => setMenuOpen(prev => !prev)

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
      </MenuLinks>
    </Navbar>
  )
}

export default ResponsiveNavbar
