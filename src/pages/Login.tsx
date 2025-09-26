import { LoginContainer, FormularioLog } from "../styles/Styles";

const Login = () => {
  return (
    <LoginContainer>
      <FormularioLog>
        <h2>Entre</h2>
        <form>
          <input type="email" placeholder="E-mail" required />
          <input type="password" placeholder="Senha" required />
          <button type="submit">Entrar</button>
        </form>
      </FormularioLog>
    </LoginContainer>
  );
};

export default Login;
