import React from "react";
import {  HomeWrapper, HomeHeader, HomeLogo, HomeNav, HomeNavLink, MainSection, MainTitle, MainText, Buttons, PrimaryButtonLink, 
  OutlineButtonLink, FooterNote} from "../styles/Styles";

const Home: React.FC = () => {
  return (
    <HomeWrapper>
      <HomeHeader>
        <HomeLogo>Life+</HomeLogo>
        <HomeNav>
          <HomeNavLink to="/login">Entrar</HomeNavLink>
          <HomeNavLink to="/cadastro">Criar Conta</HomeNavLink>
        </HomeNav>
      </HomeHeader>

      <MainSection>
        <MainTitle>Organize sua saúde com o PlusLife+</MainTitle>
        <MainText>
          Gerencie seus medicamentos, receba avisos de horários, armazene exames e encontre farmácias próximas.
        </MainText>
        <Buttons>
          <PrimaryButtonLink to="/login">Entrar</PrimaryButtonLink>
          <OutlineButtonLink to="/cadastro">Criar Conta</OutlineButtonLink>
        </Buttons>
      </MainSection>

      <FooterNote>
        © 2025 PlusLife+. Todos os direitos reservados.
      </FooterNote>
    </HomeWrapper>
  );
};

export default Home;
