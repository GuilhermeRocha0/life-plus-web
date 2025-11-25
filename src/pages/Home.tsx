import React from 'react'
import { useAuth } from '../hooks/useAuth'
import {
  HomeWrapper,
  HomeHeader,
  HomeNav,
  HomeNavLink,
  MainSection,
  MainTitle,
  MainText,
  Buttons,
  PrimaryButtonLink,
  FooterNote,
  Logo
} from '../styles/Styles'

const Home: React.FC = () => {
  const { user } = useAuth()

  return (
    <HomeWrapper>
      <HomeHeader>
        <Logo to="/">Life+</Logo>
        <HomeNav>
          <HomeNavLink to="/faq">FAQ</HomeNavLink>
          <HomeNavLink to={user ? '/perfil' : '/login'}>Entrar</HomeNavLink>
        </HomeNav>
      </HomeHeader>

      <MainSection>
        <MainTitle>Organize sua saúde com o Life+</MainTitle>
        <MainText>
          Gerencie seus medicamentos, receba avisos de horários, armazene exames
          e encontre farmácias próximas.
        </MainText>
        <Buttons>
          <PrimaryButtonLink to={user ? '/perfil' : '/login'}>
            Entrar
          </PrimaryButtonLink>
        </Buttons>
      </MainSection>

      <FooterNote>© 2025 Life+. Todos os direitos reservados.</FooterNote>
    </HomeWrapper>
  )
}

export default Home
