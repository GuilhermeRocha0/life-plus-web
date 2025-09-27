import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Navbar = styled.nav`
  background: linear-gradient(to bottom, #00c6ff, #0072ff);
  color: white;
  position: fixed;
  top: 0;
  left: 0;
  width: 24rem;
  height: 100vh;
  display: flex;
  flex-direction: column;
  padding: 2.4rem 1.6rem;
  box-sizing: border-box;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  

  @media only screen and (max-width: 960px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 6rem;
    padding: 0 2.4rem;
    position: relative;
  }
`;

export const Logo = styled.div`
  font-size: 3.2rem;
  font-weight: bold;
  margin-bottom: 3.2rem;
  text-align: center;

  @media only screen and (max-width: 960px) {
    margin-bottom: 0;
  }
`;

export const MenuLinks = styled.ul<{ isOpen: boolean }>`
  list-style: none;
  padding: 0 0 0 45px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex-grow: 1;

  @media only screen and (max-width: 960px) {
    position: fixed;
    top: 6rem;
    left: 0;
    width: 100%;
    height: calc(100vh - 6rem);
    background: linear-gradient(to bottom, #00c6ff, #0072ff);
    padding: 3.2rem 2.4rem;
    transform: ${({ isOpen }) =>
      isOpen ? 'translateX(0)' : 'translateX(-100%)'};
    transition: transform 0.3s ease-in-out;
    flex-direction: column;
    gap: 2rem;
    z-index: 9;
  }
`;

export const MenuItem = styled.li`
  cursor: pointer;
  transition: transform 0.2s ease-in-out, color 0.2s ease-in-out;
  font-size: 1.8rem;
  transform-origin: left center;

  &:hover {
    filter: brightness(1.5);
    transform: scale(1.1);
    font-weight: 500;
  }
`;

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
`;

export const Hamburger = styled.button<{ isOpen: boolean }>`
  display: none;
  flex-direction: column;
  justify-content: center;
  width: 3rem;
  height: 3rem;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  z-index: 10;

  @media only screen and (max-width: 960px) {
    display: flex;
  }

  div {
    background-color: white;
    height: 0.3rem;
    margin: 0.4rem 0;
    width: 100%;
    border-radius: 0.3rem;
    transition: all 0.3s ease-in-out;
    transform-origin: center center;
  }

  div:nth-child(1) {
    transform: ${({ isOpen }) =>
      isOpen
        ? 'translateY(1rem) rotate(45deg)'
        : 'translate(0, 0) rotate(0)'};
  }

  div:nth-child(2) {
    opacity: ${({ isOpen }) => (isOpen ? 0 : 1)};
  }

  div:nth-child(3) {
    transform: ${({ isOpen }) =>
      isOpen
        ? 'translateY(-1rem) rotate(-45deg)'
        : 'translate(0, 0) rotate(0)'};
  }
`;

export const PageWrapper = styled.div`
  min-height: 100%;
  max-width: 100%;
  padding: 2.4rem;
  
  @media only screen and (min-width: 960px) {
    margin-left: 24rem;
  }
`;

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
`;

export const PageTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;

  @media only screen and (max-width: 767px) {
    font-size: 2.8rem;
  }
`;

export const RegularAddButton = styled.button`
  background-color: #00c6ff;
  color: white;
  padding: 1.6rem 2.4rem;
  border: none;
  border-radius: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: 0.2s ease-in-out;

  &:hover {
    filter: brightness(1.1);
  }
`;

export const ExamsGrid = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 2.4rem;

  @media only screen and (max-width: 767px) {
      justify-content: center;
  }
`;

export const StyledExamCard = styled.div`
  background-color: #f0fcff;
  border-radius: 1.6rem;
  padding: 1.6rem;
  width: 22rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  box-shadow: 0 0.2rem 0.6rem rgba(0,0,0,0.05);

  @media only screen and (max-width: 767px) {
      width: 90%
  }
`;

export const ExamIcon = styled.div`
  background-color: #dff6fc;
  width: 5rem;
  height: 5rem;
  font-size: 2.4rem;
  text-align: center;
  line-height: 5rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
`;

export const ExamInfo = styled.div`
  margin-bottom: 1.2rem;
`;

export const ExamInfoTitle = styled.strong`
  font-size: 1.8rem;
`;

export const ExamInfoText = styled.p`
  color: #444;
`;

export const ViewButton = styled.button`
  align-self: flex-end;
  background-color: #dff6fc;
  border: none;
  padding: 0.8rem 1.6rem;
  border-radius: 0.8rem;
  cursor: pointer;
  font-weight: 500;
  width: 100%;

  &:hover {
      background-color: #d1f0ff;
  }
`;

// Home

export const HomeWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-image: url('fundo.svg');
  color: white;
  font-family: Arial, sans-serif;
`;

export const HomeHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
`;

export const HomeLogo = styled.h1`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const HomeNav = styled.nav`
  display: flex;
  align-items: center;
`;

export const HomeNavLink = styled(Link)`
  margin-left: 20px;
  color: white;
  text-decoration: none;
  font-weight: 500;

  &:hover {
    text-decoration: underline;
  }
`;

export const MainSection = styled.main`
  text-align: center;
  max-width: 800px;
  margin: auto;
  padding: 20px;
`;

export const MainTitle = styled.h2`
  font-size: 3.5rem;
  font-weight: bold;
  margin-bottom: 20px;
`;

export const MainText = styled.p`
  font-size: 1.2rem;
  margin-bottom: 30px;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 15px;
  outline: none;
`;

export const PrimaryButtonLink = styled(Link)`
  background: white;
  color: #000000;
  padding: 12px 25px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
  text-decoration: none;

  &:hover {
    background: #f3f4f6;
  }
`;

export const OutlineButtonLink = styled(Link)`
  background: transparent;
  color: white;
  padding: 12px 25px;
  border: 2px solid white;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
  text-decoration: none;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

export const FooterNote = styled.footer`
  text-align: center;
  padding: 15px;
  font-size: 0.9rem;
  background: transparent;
`;

// Perfil

export const LoginContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  background-size: cover;
  background-image: url('./fundo.svg');
  padding-left: 1200px;
`;

export const FormularioLog = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 80px;
  border-radius: 2px;
  width: 450px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  padding-left: -20px;

  h2 {
    margin-bottom: 20px;
    color: #333;
    font-size: 38px;
    text-align: center;
  }

  form {
    input {
      width: 100%;
      padding: 12px;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 10px;
      font-size: 14px;
    }

    button {
      width: 100%;
      padding: 12px;
      margin-top: 15px;
      border: none;
      border-radius: 6px;
      background: #00b4d8;
      color: white;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s ease;

      &:hover {
        background: #0096c7;
      }
    }
  }
`;

// Cadastro

export const CadastroContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  background-size: cover;
  background-image: url('./public/fundo.svg');
  padding-left: 190px;
`;

export const Formulario = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 80px;
  border-radius: 2px;
  width: 450px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  padding-left: -20px;

  h2 {
    margin-bottom: 20px;
    color: #333;
    font-size: 32px;
    text-align: center;
  }

  form {
    input {
      width: 100%;
      padding: 12px;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 10px;
      font-size: 14px;
    }

    button {
      width: 100%;
      padding: 12px;
      margin-top: 15px;
      border: none;
      border-radius: 6px;
      background: #00b4d8;
      color: white;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s ease;
      margin-left: 15px;

      &:hover {
        background: #0096c7;
      }
    }
  }
`;

// Perfil

// Container principal da página
export const ProfileContainer = styled.div`
  min-height: 85vh;
  background-color: #0096c7;
  padding: 24px;
  display: flex;
  justify-content: center;
  border-radius: 10px;
  margin-top: 10px;
  max-width: 100vw;
  
`;

// Card central com perfil
export const ProfileCard = styled.div`
  width: 100%;
  max-width: 900px;
  background-color: #ffffffff;
  border-radius: 16px 0 16px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

// Cabeçalho do perfil (avatar + infos)
export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  padding: 32px;
`;

// Avatar
export const ProfileAvatar = styled.img`
  width: 128px;
  height: 128px;
  border-radius: 50%;
  object-fit: cover;
  border: 4px solid #fff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
`;

// Nome e username
export const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
  font-size: 50px;
`;

export const ProfileName = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  color: #222;
`;

export const ProfileJob = styled.p`
  font-size: 1.5rem;
  color: #777;
`;

// Bio
export const ProfileCautions = styled.p`
  margin-top: 12px;
  font-size: 1.2rem;
  color: #444;
  line-height: 1.4;
`;

// Localização, email etc.
export const ProfileDetails = styled.div`
  margin-top: 16px;
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  font-size: 1.1rem;
  color: #666;
`;

// Estatísticas
export const StatsWrapper = styled.div`
  margin: 24px 32px;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 16px;
`;

export const StatCard = styled.div`
  padding: 16px;
  border-radius: 12px;
  background: #fafafa;
  border: 1px solid #eee;
  text-align: center;
`;

export const StatLabel = styled.div`
  font-size: 1.85rem;
  color: #777;
`;

export const StatValue = styled.div`
  margin-top: 8px;
  font-size: 1.4rem;
  font-weight: bold;
  color: #222;
`;

// Área sobre + seções
export const AboutSection = styled.div`
  padding: 0 32px 32px 32px;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 12px;
  color: #222;
`;

export const SectionContent = styled.div`
  font-size: 1.3rem;
  color: #555;
  line-height: 1.5;
  padding-bottom: 20px;
`;

export const ExamsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
`;

export const ExamsTag = styled.span`
  background: #f1f1f1;
  padding: 6px 12px ;
  border-radius: 20px;
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 15px;
`;

export const MedicineList = styled.ul`
  list-style: disc;
  padding-left: 20px;
  font-size: 1.2rem;
  color: #444;

  li {
    margin-bottom: 6px;
  }
`;
