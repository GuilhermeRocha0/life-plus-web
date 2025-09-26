import { CadastroContainer, Formulario } from "../styles/Styles";

const Cadastro = () => {
  return (
    <CadastroContainer>
      <Formulario>
        <h2>Criar Conta</h2>
        <form>
          <input type="text" placeholder="Nome completo" required />
          <input type="email" placeholder="E-mail" required />
          <input type="password" placeholder="Senha" required />
          <input type="date" placeholder="Data de Aniversário" required />
          <button type="submit">Cadastrar</button>
        </form>
      </Formulario>
    </CadastroContainer>
  );
};

export default Cadastro;
