import React, { useState, useEffect } from 'react'
import { LoginContainer, Formulario, CadastroLink } from '../styles/Styles'
import Background from '../components/Background'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import LoadingModal from '../components/LoadingModal'
import ModalMessage from '../components/MessageModal'

const Login: React.FC = () => {
  const { login, loading, message, messageType, loginSuccess, closeMessage } =
    useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (messageType === 'success') {
      const timer = setTimeout(() => {
        closeMessage()
        navigate('/perfil')
      }, 600)

      return () => clearTimeout(timer)
    }
  }, [messageType])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login({ email, password })
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
        disableClose={loginSuccess}
      />

      <LoginContainer>
        <Formulario>
          <h2>Login</h2>

          <form onSubmit={handleSubmit}>
            <label>E-mail:</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />

            <label>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />

            <CadastroLink>
              Esqueceu sua senha?{' '}
              <Link to="/redefinir-senha">Redefina aqui</Link>
            </CadastroLink>

            <button type="submit" disabled={loading}>
              {loading ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <CadastroLink>
            Não tem uma conta? <Link to="/cadastro">Crie aqui</Link>
          </CadastroLink>

          <CadastroLink>
            <Link to="/">Voltar para a Home</Link>
          </CadastroLink>
        </Formulario>
      </LoginContainer>
    </>
  )
}

export default Login
