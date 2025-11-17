import React, { useState } from 'react'
import { CadastroContainer, Formulario, LoginText } from '../styles/Styles'
import Background from '../components/Background'
import LoadingModal from '../components/LoadingModal'
import ModalMessage from '../components/ModalMessage'
import { useUser } from '../hooks/useUser'

const Register: React.FC = () => {
  const { registerUser, loading, message, messageType, closeMessage } =
    useUser()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    birthDate: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (form.password !== form.confirmPassword) {
      return registerUser(
        null,
        'A senha e a confirmação não coincidem.',
        'error'
      )
    }

    await registerUser({
      name: form.name,
      email: form.email,
      password: form.password,
      confirmPassword: form.confirmPassword,
      birthDate: form.birthDate
    })
  }

  return (
    <>
      <Background />
      <LoadingModal isOpen={loading} />

      <ModalMessage
        isOpen={!!message}
        title={messageType === 'error' ? 'Erro' : 'Sucesso'}
        message={message || ''}
        onClose={closeMessage}
      />

      <CadastroContainer>
        <Formulario>
          <h2>Criar Conta</h2>

          <form onSubmit={handleSubmit}>
            <label>Nome Completo:</label>
            <input
              type="text"
              value={form.name}
              onChange={e => setForm({ ...form, name: e.target.value })}
              required
            />

            <label>E-mail:</label>
            <input
              type="email"
              value={form.email}
              onChange={e => setForm({ ...form, email: e.target.value })}
              required
            />

            <label>Senha:</label>
            <input
              type="password"
              value={form.password}
              onChange={e => setForm({ ...form, password: e.target.value })}
              required
            />

            <label>Confirmar Senha:</label>
            <input
              type="password"
              value={form.confirmPassword}
              onChange={e =>
                setForm({ ...form, confirmPassword: e.target.value })
              }
              required
            />

            <label>Data de Nascimento:</label>
            <input
              type="date"
              value={form.birthDate}
              onChange={e => setForm({ ...form, birthDate: e.target.value })}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Carregando...' : 'Cadastrar'}
            </button>
          </form>

          <LoginText>
            Já tem uma conta? <a href="/login">Clique aqui</a>
          </LoginText>
        </Formulario>
      </CadastroContainer>
    </>
  )
}

export default Register
