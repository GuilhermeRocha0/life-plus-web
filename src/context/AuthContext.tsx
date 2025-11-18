import React, { createContext, useState, useEffect } from 'react'
import * as authService from '../services/authService'

interface AuthContextType {
  user: any | null
  loading: boolean
  message: string | null
  messageType: 'success' | 'error' | null
  loginSuccess: boolean

  login: (data: { email: string; password: string }) => Promise<void>
  logout: () => void
  register: (data: {
    name: string
    email: string
    password: string
    confirmPassword: string
    birthDate: string
  }) => Promise<void>

  fetchLoggedUser: () => Promise<void>
  closeMessage: () => void
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<string | null>(null)
  const [messageType, setMessageType] = useState<'success' | 'error' | null>(
    null
  )
  const [loginSuccess, setLoginSuccess] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) fetchLoggedUser()
  }, [])

  const fetchLoggedUser = async () => {
    try {
      setLoading(true)
      const data = await authService.getLoggedUser()
      setUser(data)
    } catch (error) {
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (data: { email: string; password: string }) => {
    try {
      setLoading(true)

      const res = await authService.loginUser(data)
      localStorage.setItem('token', res.token)

      setMessage('Login realizado com sucesso!')
      setMessageType('success')
      setLoginSuccess(true)

      await fetchLoggedUser()
    } catch (error: any) {
      const msg = error?.response?.data?.details || 'Erro ao fazer login.'
      setMessage(msg)
      setMessageType('error')
      setLoginSuccess(false)
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    setLoginSuccess(false)
    setMessage(null)
    setMessageType(null)
  }

  const register = async (data: {
    name: string
    email: string
    password: string
    confirmPassword: string
    birthDate: string
  }) => {
    try {
      setLoading(true)
      await authService.registerUser(data)

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

  const closeMessage = () => {
    setMessage(null)
    setMessageType(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        message,
        messageType,
        login,
        logout,
        register,
        closeMessage,
        loginSuccess,
        fetchLoggedUser
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
