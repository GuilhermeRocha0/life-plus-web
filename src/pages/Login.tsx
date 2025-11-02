import { LoginContainer, Formulario, CadastroLink } from '../styles/Styles'
import Background from '../components/Background'
import { Link } from 'react-router-dom'

const Login: React.FC = () => {
  return (
    <>
      <Background />
      <LoginContainer>
        <Formulario>
          <h2>Login</h2>
          <form>
            <label htmlFor="email">E-mail:</label>
            <input id="email" type="email" required />

            <label htmlFor="senha">Senha:</label>
            <input id="senha" type="password" required />

            <CadastroLink>
              Esqueceu sua senha?{' '}
              <Link to="/redefinir-senha">Redefina aqui</Link>
            </CadastroLink>

            <button type="submit">Entrar</button>
          </form>

          <CadastroLink>
            Não tem uma conta? <Link to="/cadastro">Crie aqui</Link>
          </CadastroLink>
        </Formulario>
      </LoginContainer>
    </>
  )
}

export default Login
