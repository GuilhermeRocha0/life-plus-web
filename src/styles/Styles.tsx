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
    padding: 0 2.4rem;
    position: relative;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }
`

export const Logo = styled.div`
  font-size: 3.2rem;
  font-weight: bold;
  margin-bottom: 3.2rem;
  text-align: center;

  @media only screen and (max-width: 960px) {
    margin-bottom: 0;
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
      isOpen ? 'translateY(-1rem) rotate(-45deg)' : 'translate(0, 0) rotate(0)'};
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
  background-color: #dff6fc;
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
`

export const ExamInfoText = styled.p`
  color: #444;
`

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
`

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
`

export const HomeHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 50px;
`

export const HomeLogo = styled.h1`
  font-size: 3.0rem;
  font-weight: bold;
`

export const HomeNav = styled.nav`
  display: flex;
  align-items: center;
`

export const HomeNavLink = styled(Link)`
  margin-left: 2rem;
  color: #000000;
  padding: 12px 25px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  background: #f3f4f6;
`

export const MainSection = styled.main`
  text-align: center;
  max-width: 80rem;
  margin: auto;
  padding: 2rem;
`

export const MainTitle = styled.h2`
  font-size: 4.1rem;
  font-weight: bold;
  margin-bottom: 2rem;
`

export const MainText = styled.p`
  font-size: 1.4rem;
  margin-bottom: 30px;
`

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  gap: 1.6rem;
  outline: none;
`

export const PrimaryButtonLink = styled(Link)`
  background: white;
  color: #000000;
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
`

export const OutlineButtonLink = styled(Link)`
  background: transparent;
  color: white;
  padding: 1.2rem 2.4rem;
  border: 0.2rem solid white;
  border-radius: 0.8rem;
  cursor: pointer;
  font-weight: bold;
  text-decoration: none;
  transition: all 0.2s;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: scale(1.05);
  }
`

export const FooterNote = styled.footer`
  text-align: center;
  padding: 15px;
  font-size: 1.1rem;
  background: transparent;
`

// Login
export const LoginContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  background-size: cover;
  background-image: url('./public/fundo.svg');
  padding-left: 700px;
`

export const FormularioLog = styled.div`
  background: rgba(255, 255, 255, 0.95);
  padding: 40px 50px;
  border-radius: 20px;
  width: 500px;
  min-height: auto;
  box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);

  h2 {
    margin-bottom: 20px;
    color: #000;
    font-size: 44px;
    text-align: center;
  }

  form {
    display: flex;
    flex-direction: column;

    label {
      margin-top: 10px;
      margin-bottom: 5px;
      font-size: 16px;
      font-weight: 600;
      color: #1f1f1f;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    }

    input {
      width: 100%;
      padding: 14px;
      margin-bottom: 10px;
      border: 1px solid #ccc;
      border-radius: 12px;
      font-size: 16px;
      box-sizing: border-box;

      &:focus {
        outline: none;
      }
    }

    button {
      width: 100%;
      padding: 16px;
      margin-top: 20px;
      border: none;
      border-radius: 8px;
      background: #00b4d8;
      color: white;
      font-size: 18px;
      font-weight: bold;
      cursor: pointer;
      transition: 0.3s ease;

      &:hover {
        background: #0096c7;
      }

      &:focus {
        outline: none;
      }
    }
  }
`

export const CadastroLink = styled.p`
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
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
