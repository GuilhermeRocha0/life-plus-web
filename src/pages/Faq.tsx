import React from 'react';
import {
  HomeWrapper,
  HomeHeader,
  HomeNav,
  HomeNavLink,
  FooterNote,
  Logo
} from '../styles/Styles';
import {
  FaqSection,
  FaqTitle,
  FaqList,
  FaqItem,
  Question,
  Answer
}  from '../styles/Styles';

const Faq: React.FC = () => {
  return (
    <HomeWrapper>
      <HomeHeader>
        <Logo to="/">Life+</Logo>
        <HomeNav>
          <HomeNavLink to="/login">Entrar</HomeNavLink>
          <HomeNavLink to="/cadastro">Criar Conta</HomeNavLink>
        </HomeNav>
      </HomeHeader>

      <FaqSection>
        <FaqTitle>Perguntas Frequentes</FaqTitle>
        <FaqList>
          <FaqItem>
            <Question>O que é o Life+?</Question>
            <Answer>
              O Life+ é uma plataforma que ajuda você a gerenciar sua saúde,
              armazenar exames, controlar medicamentos e localizar farmácias próximas.
            </Answer>
          </FaqItem>

          <FaqItem>
            <Question>O Life+ é gratuito?</Question>
            <Answer>
              Sim! O uso básico do Life+ é totalmente gratuito. Futuramente,
              poderão existir planos premium com funções extras.
            </Answer>
          </FaqItem>

          <FaqItem>
            <Question>Meus dados estão seguros?</Question>
            <Answer>
              Sim. Todos os seus dados são armazenados de forma segura, com criptografia
              e seguindo as normas da LGPD.
            </Answer>
          </FaqItem>

          <FaqItem>
            <Question>Posso acessar o Life+ em diferentes dispositivos?</Question>
            <Answer>
              Pode sim! Basta fazer login na sua conta em qualquer celular ou computador
              conectado à internet.
            </Answer>
          </FaqItem>
        </FaqList>
      </FaqSection>

      <FooterNote>© 2025 Life+. Todos os direitos reservados.</FooterNote>
    </HomeWrapper>
  );
};

export default Faq;
