import React, {
  useState,
  type ChangeEvent,
  type KeyboardEvent,
  type ClipboardEvent,
  type FormEvent
} from 'react'
import { useNavigate } from 'react-router-dom'
import ModalMessage from '../components/ModalMessage'
import LoadingModal from '../components/LoadingModal'
import {
  ResetPasswordPage,
  ResetPasswordContainer,
  ResetPasswordForm,
  ResetPasswordInput,
  ResetPasswordButton,
  ResetPasswordCancel,
  ResetPasswordCodeContainer,
  ResetPasswordCodeInput,
  ResetPasswordTitle
} from '../styles/Styles'

const ResetPassword: React.FC = () => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [code, setCode] = useState<string[]>(['', '', '', '', '', ''])
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [modalOpen, setModalOpen] = useState(false)
  const [modalTitle, setModalTitle] = useState('')
  const [modalMessage, setModalMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const openModal = (title: string, message: string) => {
    setModalTitle(title)
    setModalMessage(message)
    setModalOpen(true)
  }

  const closeModal = () => setModalOpen(false)

  const handleSendCode = async (e: FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      setLoading(false)
      openModal('success', 'Código enviado para seu e-mail!')
      setStep(2)
    }, 2000)
  }

  const handleVerifyCode = (e: FormEvent) => {
    e.preventDefault()
    const codeString = code.join('')
    if (codeString.length === 6) {
      openModal('success', 'Código verificado com sucesso!')
      setStep(3)
    } else {
      openModal('error', 'O código deve conter 6 dígitos.')
    }
  }

  const handleResetPassword = (e: FormEvent) => {
    e.preventDefault()
    if (newPassword !== confirmPassword) {
      openModal('error', 'As senhas não coincidem.')
      return
    }

    openModal('success', 'Senha redefinida com sucesso!')
    setTimeout(() => navigate('/login'), 2000)
  }

  const handleCodeChange = (value: string, index: number) => {
    if (/^\d?$/.test(value)) {
      const newCode = [...code]
      newCode[index] = value
      setCode(newCode)
      if (value && index < 5) {
        document.getElementById(`code-${index + 1}`)?.focus()
      }
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      document.getElementById(`code-${index - 1}`)?.focus()
    }
  }

  const handlePaste = (e: ClipboardEvent<HTMLDivElement>) => {
    const paste = e.clipboardData.getData('text')
    if (/^\d{6}$/.test(paste)) {
      const newCode = paste.split('')
      setCode(newCode)
      setTimeout(() => {
        document.getElementById('code-5')?.focus()
      }, 0)
    }
  }

  return (
    <ResetPasswordPage>
      <ResetPasswordContainer>
        <ResetPasswordTitle>Redefinir Senha</ResetPasswordTitle>

        {step === 1 && (
          <ResetPasswordForm onSubmit={handleSendCode}>
            <label>Email</label>
            <ResetPasswordInput
              type="email"
              value={email}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setEmail(e.target.value)
              }
              required
            />
            <ResetPasswordButton type="submit">
              Enviar Código
            </ResetPasswordButton>
            <ResetPasswordCancel
              type="button"
              onClick={() => navigate('/login')}
            >
              Cancelar
            </ResetPasswordCancel>
          </ResetPasswordForm>
        )}

        {step === 2 && (
          <ResetPasswordForm onSubmit={handleVerifyCode}>
            <label>Código</label>
            <ResetPasswordCodeContainer onPaste={handlePaste}>
              {code.map((digit, index) => (
                <ResetPasswordCodeInput
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={e => handleCodeChange(e.target.value, index)}
                  onKeyDown={e => handleKeyDown(e, index)}
                  required
                />
              ))}
            </ResetPasswordCodeContainer>
            <ResetPasswordButton type="submit">
              Verificar Código
            </ResetPasswordButton>
            <ResetPasswordCancel
              type="button"
              onClick={() => navigate('/login')}
            >
              Cancelar
            </ResetPasswordCancel>
          </ResetPasswordForm>
        )}

        {step === 3 && (
          <ResetPasswordForm onSubmit={handleResetPassword}>
            <label>Nova Senha</label>
            <ResetPasswordInput
              type="password"
              value={newPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setNewPassword(e.target.value)
              }
              placeholder="Nova senha"
              required
            />
            <label>Confirmar Nova Senha</label>
            <ResetPasswordInput
              type="password"
              value={confirmPassword}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setConfirmPassword(e.target.value)
              }
              placeholder="Confirme a nova senha"
              required
            />
            <ResetPasswordButton type="submit">
              Redefinir Senha
            </ResetPasswordButton>
            <ResetPasswordCancel
              type="button"
              onClick={() => navigate('/login')}
            >
              Cancelar
            </ResetPasswordCancel>
          </ResetPasswordForm>
        )}
      </ResetPasswordContainer>

      <LoadingModal isOpen={loading} />
      <ModalMessage
        isOpen={modalOpen}
        title={modalTitle}
        message={modalMessage}
        onClose={closeModal}
      />
    </ResetPasswordPage>
  )
}

export default ResetPassword
