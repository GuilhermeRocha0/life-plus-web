import { LoginContainer, Formulario, CadastroLink } from '../styles/Styles'

const Login: React.FC = () => {
  return (
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
  )
}

export default Login
