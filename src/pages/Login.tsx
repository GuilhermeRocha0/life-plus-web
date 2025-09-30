import { LoginContainer, FormularioLog, CadastroLink } from "../styles/Styles";

const Login: React.FC = () => {
  return (
    <LoginContainer>
      <FormularioLog>
        <h2>Login</h2>
        <form>
          <label htmlFor="email">E-mail:</label>
          <input id="email" type="email" required />

          <label htmlFor="senha">Senha:</label>
          <input id="senha" type="password" required />

          <button type="submit">Entrar</button>
        </form>

        <CadastroLink>
          Não tem uma conta? <a href="/cadastro">Crie aqui</a>
        </CadastroLink>
      </FormularioLog>
    </LoginContainer>
  );
};

export default Login;