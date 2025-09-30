import { CadastroContainer, Formulario, LoginText } from "../styles/Styles";

const Cadastro: React.FC = () => {
  return (
    <CadastroContainer>
      <Formulario>
        <h2>Criar Conta</h2>
        <form>
          <label htmlFor="nome">Nome:</label>
          <input id="nome" type="text" required />

          <label htmlFor="sobrenome">Sobrenome:</label>
          <input id="sobrenome" type="text" required />

          <label htmlFor="email">E-mail:</label>
          <input id="email" type="email" required />

          <label htmlFor="senha">Senha:</label>
          <input id="senha" type="password" required />

          <label htmlFor="data">Data de Nascimento:</label>
          <input id="data" type="date" required />

          <button type="submit">Cadastrar</button>
        </form>

        <LoginText>
          Já tem uma conta? <a href="/login">Clique aqui</a>
        </LoginText>

      </Formulario>
    </CadastroContainer>
  );
};

export default Cadastro;