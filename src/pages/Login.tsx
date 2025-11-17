import React, { useState, useEffect } from 'react'
import { LoginContainer, Formulario, CadastroLink } from '../styles/Styles'
import Background from '../components/Background'
import { Link, useNavigate } from 'react-router-dom'
import { useUser } from '../context/UserContext'

import LoadingModal from '../components/LoadingModal'
import ModalMessage from '../components/ModalMessage'

const Login: React.FC = () => {
  const {
    loginUser,
    loading,
    message,
    messageType,
    loginSuccess,
    closeMessage
  } = useUser()

  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  useEffect(() => {
    if (loginSuccess) {
      const timer = setTimeout(() => {
        closeMessage()
        navigate('/perfil')
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [loginSuccess])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await loginUser({ email, password })
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
        </Formulario>
      </LoginContainer>
    </>
  )
}

export default Login
