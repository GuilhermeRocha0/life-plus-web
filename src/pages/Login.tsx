import { LoginContainer, Formulario, CadastroLink } from '../styles/Styles'
// import styled from "styled-components";
// const BackgroundVideo = styled.video`
//   position: fixed;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   z-index: -1; /* deixa o vídeo atrás do conteúdo */
//   filter: brightness(1.05) contrast(1.05); /* dá um boost leve */
// `;
const Login: React.FC = () => {
  return (
    <>
     {/* <BackgroundVideo preload="auto" autoPlay loop muted playsInline>
        <source src="/videos/fundoDark.webm" type="video/webm" />
        Seu navegador não suporta vídeos em HTML5.
      </BackgroundVideo> */}
    <LoginContainer>
      <Formulario>
        <h2>Login</h2>
        <form>
          <label htmlFor="email">E-mail:</label>
          <input id="email" type="email" required />

          <label htmlFor="senha">Senha:</label>
          <input id="senha" type="password" required />

          <button type='submit'>Entrar</button>
        </form>

        <CadastroLink>
          Não tem uma conta? <a href="/cadastro">Crie aqui</a>
        </CadastroLink>
      </Formulario>
    </LoginContainer>
    
    </>
  )
}

export default Login
