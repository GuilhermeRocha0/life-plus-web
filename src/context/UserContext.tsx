import React, { createContext, useState, useContext } from 'react'
import { api } from '../services/api'

interface RegisterData {
  name: string
  email: string
  password: string
  confirmPassword: string
  birthDate: string
}

interface LoginData {
  email: string
  password: string
}

interface UserContextType {
  registerUser: (
    data?: RegisterData | null,
    customMessage?: string,
    messageType?: 'success' | 'error'
  ) => Promise<void>

  loginUser: (
    data?: LoginData | null,
    customMessage?: string,
    messageType?: 'success' | 'error'
  ) => Promise<void>

  loading: boolean
  message: string | null
  messageType: 'success' | 'error' | null
  loginSuccess: boolean
  closeMessage: () => void
}

export const UserContext = createContext<UserContextType>({} as UserContextType)

export const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(
    null
  )
  const [loginSuccess, setLoginSuccess] = useState(false)

  const registerUser = async (data?: RegisterData | null) => {
    try {
      setLoading(true)
      await api.post('/auth/register', data)
      setMessage('Cadastro realizado com sucesso!')
      setMessageType('success')
    } catch (error: any) {
      const msg = error?.response?.data?.details || 'Erro ao registrar usuário.'
      setMessage(msg)
      setMessageType('error')
    } finally {
      setLoading(false)
    }
  }

  const loginUser = async (data?: LoginData | null) => {
    try {
      setLoading(true)
      const response = await api.post('/auth/login', data)

      const token = response.data.token
      localStorage.setItem('token', token)

      setMessage('Login realizado com sucesso!')
      setMessageType('success')
      setLoginSuccess(true)
    } catch (error: any) {
      const msg = error?.response?.data?.details || 'Erro ao fazer login.'
      setMessage(msg)
      setMessageType('error')
      setLoginSuccess(false)
    } finally {
      setLoading(false)
    }
  }

  const closeMessage = () => {
    setMessage(null)
    setMessageType(null)
    setLoginSuccess(false)
  }

  return (
    <UserContext.Provider
      value={{
        registerUser,
        loginUser,
        loading,
        message,
        messageType,
        loginSuccess,
        closeMessage
      }}
    >
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => useContext(UserContext)
