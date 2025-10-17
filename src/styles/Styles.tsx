import styled from 'styled-components'
import { Link } from 'react-router-dom'

// Navbar
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
  border-top-right-radius: 2rem;
  border-bottom-right-radius: 2rem;

  @media only screen and (max-width: 960px) {
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 6rem;
    padding: 2.4rem 1.6rem;
    position: relative;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`

export const Logo = styled(Link)`
  font-size: 3.2rem;
  font-weight: bold;
  text-align: center;
  color: #fff;
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.1);
    text-decoration: underline;
  }

  @media only screen and (max-width: 767px) {
    margin-bottom: 0;
    width: 100%;
  }
`

export const MenuLinks = styled.ul<{ isOpen: boolean }>`
  list-style: none;
  padding: 0 0 0 45px;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  flex-grow: 1;
  margin-top: 3.2rem;

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
    margin-top: 0;
  }
`

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
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  display: block;
  width: 100%;
`

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
      isOpen ? 'translateY(1rem) rotate(45deg)' : 'translate(0, 0) rotate(0)'};
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
`

export const PageWrapper = styled.div`
  min-height: 100%;
  max-width: 100%;
  padding: 2.4rem;

  @media only screen and (min-width: 960px) {
    margin-left: 24rem;
  }
`

export const PageHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.4rem;
`

export const PageTitle = styled.h1`
  font-size: 3.2rem;
  font-weight: 700;

  @media only screen and (max-width: 767px) {
    font-size: 2.8rem;
  }
`

export const RegularAddButton = styled.button`
  background-color: #00c6ff;
  color: white;
  padding: 1.6rem 2.4rem;
  border: none;
  border-radius: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    filter: brightness(1.1);
  }
`

export const ExamsGrid = styled.section`
  display: flex;
  flex-wrap: wrap;
  gap: 2.4rem;

  @media only screen and (max-width: 767px) {
    justify-content: center;
  }
`

export const StyledExamCard = styled.div`
  background-color: #f0fcff;
  border-radius: 1.6rem;
  padding: 1.6rem;
  width: 22rem;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  box-shadow: 0 0.2rem 0.6rem rgba(0, 0, 0, 0.05);

  @media only screen and (max-width: 767px) {
    width: 90%;
  }
`

export const ExamIcon = styled.div`
  background-color: #00c6ff;
  width: 5rem;
  height: 5rem;
  font-size: 2.4rem;
  text-align: center;
  line-height: 5rem;
  border-radius: 1rem;
  margin-bottom: 1rem;
`

export const ExamInfo = styled.div`
  margin-bottom: 1.2rem;

`

export const ExamInfoTitle = styled.strong`
  font-size: 1.8rem;
    color: #444;

`

export const ExamInfoText = styled.p`
  color: #444;
`

export const ViewButton = styled.button`
  align-self: flex-end;
  background-color: #00c6ff;
  border: none;
  padding: 0.8rem 1.6rem;
  border-radius: 0.8rem;
  cursor: pointer;
  font-weight: 500;
  width: 100%;

  &:hover {
    background-color: #006ea5ff;
  }
`

// Home

export const HomeWrapper = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.homeText};
  font-family: Arial, sans-serif;
  transition: all 0.3s ease-in-out;
  background-image: ${({ theme }) => theme.backgroundImage || "none"};
  background-size: cover;
  background-position: center;
`;

export const HomeHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2rem 5rem;
`;

export const HomeLogo = styled.h1`
  font-size: 3rem;
  font-weight: bold;
`;

export const HomeNav = styled.nav`
  display: flex;
  align-items: center;
  gap: 1.4rem;

  @media only screen and (max-width: 768px) {
    gap: 0.6rem;
  }
`;

export const HomeNavLink = styled(Link)`
  padding: 1.2rem 2.4rem;
  border-radius: 0.8rem;
  border: none;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  font-size: 1.8rem;
  transition: all 0.2s ease-in-out;
  color: ${({ theme }) => theme.homeText};

  &:hover {
    transform: scale(1.1);
    text-decoration: underline;
  }

  @media only screen and (max-width: 425px) {
    display: none;
  }
`;

export const MainSection = styled.main`
  text-align: center;
  max-width: 80rem;
  margin: auto;
  padding: 2rem;
`;

export const MainTitle = styled.h2`
  font-size: 5.6rem;
  font-weight: bold;
  margin-bottom: 2rem;
`;

export const MainText = styled.p`
  font-size: 2rem;
  margin-bottom: 3rem;
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.6rem;
  outline: none;
`;

export const PrimaryButtonLink = styled(Link)`
  background: ${({ theme }) => theme.buttonPrimary};
  color: ${({ theme }) => theme.homeButtonPrimaryText};
  padding: 1.2rem 2.4rem;
  border-radius: 0.8rem;
  border: none;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.2s ease-in-out;

  &:hover {
    filter: brightness(0.8);
    transform: scale(1.05);
  }
`;

export const OutlineButtonLink = styled(Link)`
  background: transparent;
  color: ${({ theme }) => theme.homeText};
  padding: 1.2rem 2.4rem;
  border: 0.2rem solid ${({ theme }) => theme.text};
  border-radius: 0.8rem;
  cursor: pointer;
  font-weight: bold;
  transition: all 0.2s ease-in-out;
  text-decoration: none;

  &:hover {
    background: ${({ theme }) => theme.buttonOutlineHover};
    transform: scale(1.05);
  }
`;

export const FooterNote = styled.footer`
  text-align: center;
  padding: 1.6rem;
  font-size: 1.1rem;
  background: transparent;
`;

// Cadastro
export const CadastroLink = styled.p`
  margin-top: 1rem;
  color: ${({ theme }) => theme.text};
  font-size: 0.9rem;
  text-align: center;

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    font-weight: bold;
    margin-left: 4px;

    &:hover {
      text-decoration: underline;
    }
  }
`;

export const CadastroContainer = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-size: cover;
  background-image: ${({ theme }) => theme.backgroundImage || "none"};  padding: 3.2rem;

  @media only screen and (max-width: 768px) {
    background-color: ${({ theme }) => theme.background};
    background-image: none;
    padding-left: 2.4rem;
    justify-content: center;
  }
`;

export const LoginContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: ${({ theme }) => theme.background};
  background-image: ${({ theme }) => theme.backgroundImage || "none"};
`;

export const Formulario = styled.div`
  background: ${({ theme }) => theme.buttonPrimary};
  padding: 3.2rem 3.2rem;
  border-radius: 2rem;
  width: 50rem;
  min-height: auto;
  box-shadow: 0 1.2rem 3rem rgba(0, 0, 0, 0.25);

  h2 {
    margin-bottom: 1.2rem;
    color: ${({ theme }) => theme.text};
    font-size: 3.6rem;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-top: 1rem;
    margin-bottom: 0.6rem;
    font-size: 1.6rem;
    font-weight: 600;
    color: ${({ theme }) => theme.text};
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  input {
    width: 100%;
    padding: 1.4rem;
    margin-bottom: 1rem;
    border: 0.1rem solid ${({ theme }) => theme.text};
    border-radius: 1.2rem;
    font-size: 1.6rem;
    box-sizing: border-box;
    outline: none;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
  }

  button {
    width: 100%;
    padding: 1.6rem;
    margin-top: 4rem;
    border: none;
    border-radius: 0.8rem;
    background: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.buttonPrimaryText};
    font-size: 1.8rem;
    font-weight: bold;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      filter: brightness(0.9);
    }
  }

  @media only screen and (max-width: 768px) {
    height: 100%;
    box-shadow: none;
    padding: 2.4rem;
  }
`;


// Perfil

// Container principal da página  
export const ProfileContainer = styled.div`
  min-height: 85vh;
  background-color: ${({ theme }) => theme.background};
  padding: 2.4rem;
  display: flex;
  justify-content: center;
  border-radius: 1rem;
  margin-top: 1rem;
  max-width: 100vw;
`;

// Card central com perfil
export const ProfileCard = styled.div`
  width: 100%;
  max-width: 90rem;
  background-color: ${({ theme }) => theme.buttonPrimary};
  border-radius: 1.6rem 0 1.6rem 0;
  box-shadow: 0 0.4rem 1.2rem rgba(0, 0, 0, 0.08);
  overflow: hidden;
`;

// Cabeçalho do perfil (avatar + infos)
export const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 2.4rem;
  padding: 3.2rem;
`;

// Avatar
export const ProfileAvatar = styled.img`
  width: 12.8rem;
  height: 12.8rem;
  border-radius: 50%;
  object-fit: cover;
  border: 0.4rem solid ${({ theme }) => theme.buttonPrimary};
  box-shadow: 0 0.2rem 0.6rem rgba(0, 0, 0, 0.15);
`;

// Nome e username
export const ProfileInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  font-size: 6rem;
`;

export const ProfileName = styled.h1`
  font-size: 1.8rem;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

export const ProfileJob = styled.p`
  font-size: 1.5rem;
  color: ${({ theme }) => theme.text};
`;

// Bio
export const ProfileCautions = styled.p`
  margin-top: 1.2rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.4;
`;

// Localização, email etc.
export const ProfileDetails = styled.div`
  margin-top: 1.6rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1.2rem;
  font-size: 1.1rem;
  color: ${({ theme }) => theme.text};
`;

// Estatísticas
export const StatsWrapper = styled.div`
  margin: 2.4rem 3.2rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(12rem, 1fr));
  gap: 1.6rem;
`;

export const StatCard = styled.div`
  padding: 1.6rem;
  border-radius: 1.2rem;
  background: ${({ theme }) => theme.buttonPrimary};
  border: 0.1rem solid ${({ theme }) => theme.text};
  text-align: center;
`;

export const StatLabel = styled.div`
  font-size: 1.85rem;
  color: ${({ theme }) => theme.text};
`;

export const StatValue = styled.div`
  margin-top: 0.8rem;
  font-size: 1.4rem;
  font-weight: bold;
  color: ${({ theme }) => theme.text};
`;

// Área sobre + seções
export const AboutSection = styled.div`
  padding: 0 3.2rem 3.2rem 3.2rem;
`;

export const SectionTitle = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 1.2rem;
  color: ${({ theme }) => theme.text};
`;

export const SectionContent = styled.div`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.text};
  line-height: 1.5;
  padding-bottom: 2rem;
`;

export const ExamsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.8rem;
`;

export const ExamsTag = styled.span`
  background: ${({ theme }) => theme.buttonOutlineHover};
  padding: 0.6rem 1.2rem;
  border-radius: 2rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};
  margin-bottom: 1.6rem;
`;

export const MedicineList = styled.ul`
  list-style: disc;
  padding-left: 2rem;
  font-size: 1.2rem;
  color: ${({ theme }) => theme.text};

  li {
    margin-bottom: 0.6rem;
  }
`;

// Remédio

export const MedicinesContainer = styled.div`
  display: flex;
  justify-content: center;
  padding: 2rem;
  width: 
  min-height: 85vh;
  max-width: 100vw;
`

export const MedicinesCard = styled.div`
  background: #fff;
  border-radius: 1.6rem;
  box-shadow: 0 0.4rem 0.8rem rgba(0, 0, 0, 0.1);
  padding: 2rem;
  width: 100%;
  max-width: 60rem;
`

export const MedicinesHeader = styled.div`
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    color: black;
  }
  hr {
    margin-bottom: 1rem;
  }
`

export const LoginText = styled.p`
  margin-top: 1rem;
  text-align: center;
  font-size: 1.4rem;
  color: #333;

  a {
    color: #00b4d8;
    font-weight: bold;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
      color: #0096c7;
    }
  }
`

export const MedicinesListHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  color: black;
`

export const MedicinesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  color: black;
`

export const MedicineItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  border: 0.1rem solid #e5e5e5;
  border-radius: 1.2rem;
`

export const MedicineInfo = styled.div`
  h3 {
    font-size: 1.5rem;
    font-weight: bold;
  }
  p {
    font-size: 1.1rem;
    color: #666;
  }
`

export const BtnAdd = styled.button`
  background: #4caf50;
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;

  &:hover {
    background: #43a047;
  }
`

export const BtnStatus = styled.button<{ taken: boolean }>`
  background: ${props => (props.taken ? '#2196f3' : '#f44336')};
  color: white;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.8rem;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`
