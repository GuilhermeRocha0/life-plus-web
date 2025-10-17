import React from 'react';
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
  OutlineButtonLink,
  FooterNote,
  Logo
} from '../styles/Styles';

const Home: React.FC = () => {
  return (
    <HomeWrapper>
      <HomeHeader>
        <Logo to="/">Life+</Logo>
        <HomeNav>
          <HomeNavLink to="/login">Entrar</HomeNavLink>
          <HomeNavLink to="/cadastro">Criar Conta</HomeNavLink>
        </HomeNav>
      </HomeHeader>

      <MainSection>
        <MainTitle>Organize sua saúde com o Life+</MainTitle>
        <MainText>
          Gerencie seus medicamentos, receba avisos de horários, armazene exames
          e encontre farmácias próximas.
        </MainText>
        <Buttons>
          <PrimaryButtonLink to="/login">Entrar</PrimaryButtonLink>
          <OutlineButtonLink to="/cadastro">Criar Conta</OutlineButtonLink>
        </Buttons>
      </MainSection>

      <FooterNote>© 2025 Life+. Todos os direitos reservados.</FooterNote>
    </HomeWrapper>
  );
};

export default Home;
