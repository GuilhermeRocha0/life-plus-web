import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ResponsiveNavbar from '../components/ResponsiveNavbar'
import { useUser } from '../hooks/useUser'
import LoadingModal from '../components/LoadingModal'
import MessageModal from '../components/MessageModal'
import ConfirmModal from '../components/ConfirmModal'
import {
  PageWrapper,
  SettingsContainer,
  SettingsContent,
  SettingsRow,
  SectionTitle,
  SectionText,
  ActionButton,
  InputGroup,
  Label,
  Input,
  SubmitButton,
  CancelButton
} from '../styles/Styles'

type ActiveSection = 'profile' | 'email' | 'password' | 'accessibility' | null

const Settings: React.FC = () => {
  const { user, updateProfile, updateEmail, updatePassword, deleteAccount } =
    useUser()
  const navigate = useNavigate()

  const [activeSection, setActiveSection] = useState<ActiveSection>(null)
  const [loading, setLoading] = useState(false)
  const [modalMessage, setModalMessage] = useState<{
    title?: string
    message: string
    disableClose?: boolean
  } | null>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [redirectAfterDelete, setRedirectAfterDelete] = useState(false)

  const [profileData, setProfileData] = useState({ name: '', birthDate: '' })
  const [emailData, setEmailData] = useState({ newEmail: '' })
  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const formatDateForInput = (isoDate: string) => {
    if (!isoDate) return ''
    const date = new Date(isoDate)
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')
    return `${year}-${month}-${day}`
  }

  useEffect(() => {
    if (activeSection === 'profile' && user) {
      setProfileData({
        name: user.name || '',
        birthDate: formatDateForInput(user.birthDate)
      })
    }
  }, [activeSection, user])

  useEffect(() => {
    if (redirectAfterDelete) {
      const timer = setTimeout(() => {
        navigate('/')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [redirectAfterDelete, navigate])

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateProfile(profileData)
      setModalMessage({
        title: 'Sucesso',
        message: 'Perfil atualizado com sucesso!'
      })
      setActiveSection(null)
    } catch (err: any) {
      setModalMessage({
        title: 'Erro',
        message: err.message || 'Erro ao atualizar perfil.'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updateEmail({ newEmail: emailData.newEmail })
      setModalMessage({
        title: 'Sucesso',
        message: 'E-mail atualizado com sucesso!'
      })
      setActiveSection(null)
    } catch (err: any) {
      setModalMessage({
        title: 'Erro',
        message: err.message || 'Erro ao atualizar e-mail.'
      })
    } finally {
      setLoading(false)
    }
  }

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await updatePassword(passwordData)
      setModalMessage({
        title: 'Sucesso',
        message: 'Senha atualizada com sucesso!'
      })
      setActiveSection(null)
    } catch (err: any) {
      setModalMessage({
        title: 'Erro',
        message: err.message || 'Erro ao atualizar senha.'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = async () => {
    setShowDeleteModal(false)
    setLoading(true)
    try {
      await deleteAccount()
      setModalMessage({
        title: 'Sucesso',
        message: 'Conta excluída com sucesso!',
        disableClose: true // somente aqui é true
      })
      setActiveSection(null)
      setRedirectAfterDelete(true)
    } catch (err: any) {
      setModalMessage({
        title: 'Erro',
        message: err.message || 'Erro ao excluir conta.',
        disableClose: true
      })
    } finally {
      setLoading(false)
    }
  }

  const renderSectionForm = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <form onSubmit={handleProfileSubmit}>
            <SectionTitle>Alterar Perfil</SectionTitle>
            <InputGroup>
              <Label>Nome:</Label>
              <Input
                type="text"
                value={profileData.name}
                onChange={e =>
                  setProfileData({ ...profileData, name: e.target.value })
                }
              />
            </InputGroup>
            <InputGroup>
              <Label>Data de Nascimento:</Label>
              <Input
                type="date"
                value={profileData.birthDate}
                onChange={e =>
                  setProfileData({ ...profileData, birthDate: e.target.value })
                }
              />
            </InputGroup>
            <SubmitButton type="submit">Salvar</SubmitButton>
            <CancelButton type="button" onClick={() => setActiveSection(null)}>
              Voltar
            </CancelButton>
          </form>
        )
      case 'email':
        return (
          <form onSubmit={handleEmailSubmit}>
            <SectionTitle>Alterar E-mail</SectionTitle>
            <InputGroup>
              <Label>Novo E-mail:</Label>
              <Input
                type="email"
                value={emailData.newEmail}
                onChange={e => setEmailData({ newEmail: e.target.value })}
              />
            </InputGroup>
            <SubmitButton type="submit">Salvar</SubmitButton>
            <CancelButton type="button" onClick={() => setActiveSection(null)}>
              Voltar
            </CancelButton>
          </form>
        )
      case 'password':
        return (
          <form onSubmit={handlePasswordSubmit}>
            <SectionTitle>Alterar Senha</SectionTitle>
            <InputGroup>
              <Label>Senha Atual:</Label>
              <Input
                type="password"
                value={passwordData.oldPassword}
                onChange={e =>
                  setPasswordData({
                    ...passwordData,
                    oldPassword: e.target.value
                  })
                }
              />
            </InputGroup>
            <InputGroup>
              <Label>Nova Senha:</Label>
              <Input
                type="password"
                value={passwordData.newPassword}
                onChange={e =>
                  setPasswordData({
                    ...passwordData,
                    newPassword: e.target.value
                  })
                }
              />
            </InputGroup>
            <InputGroup>
              <Label>Confirmar Senha:</Label>
              <Input
                type="password"
                value={passwordData.confirmPassword}
                onChange={e =>
                  setPasswordData({
                    ...passwordData,
                    confirmPassword: e.target.value
                  })
                }
              />
            </InputGroup>
            <SubmitButton type="submit">Salvar</SubmitButton>
            <CancelButton type="button" onClick={() => setActiveSection(null)}>
              Voltar
            </CancelButton>
          </form>
        )
      case 'accessibility':
        return (
          <div>
            <SectionTitle>Configurações de Acessibilidade</SectionTitle>
            <p>Aqui futuramente estarão opções de acessibilidade.</p>
            <CancelButton type="button" onClick={() => setActiveSection(null)}>
              Voltar
            </CancelButton>
          </div>
        )
      default:
        return (
          <>
            <SettingsRow>
              <div>
                <SectionTitle>Alterar Perfil</SectionTitle>
                <SectionText>
                  Atualize seus dados pessoais como nome e data de nascimento.
                </SectionText>
              </div>
              <ActionButton onClick={() => setActiveSection('profile')}>
                Alterar Perfil
              </ActionButton>
            </SettingsRow>
            <SettingsRow>
              <div>
                <SectionTitle>Alterar E-mail</SectionTitle>
                <SectionText>
                  Atualize seu endereço de e-mail para receber notificações.
                </SectionText>
              </div>
              <ActionButton onClick={() => setActiveSection('email')}>
                Alterar E-mail
              </ActionButton>
            </SettingsRow>
            <SettingsRow>
              <div>
                <SectionTitle>Alterar Senha</SectionTitle>
                <SectionText>
                  Altere sua senha para manter sua conta segura.
                </SectionText>
              </div>
              <ActionButton onClick={() => setActiveSection('password')}>
                Alterar Senha
              </ActionButton>
            </SettingsRow>
            <SettingsRow>
              <div>
                <SectionTitle>Acessibilidade</SectionTitle>
                <SectionText>
                  Configure opções de acessibilidade da aplicação.
                </SectionText>
              </div>
              <ActionButton onClick={() => setActiveSection('accessibility')}>
                Configurar
              </ActionButton>
            </SettingsRow>
            <SettingsRow>
              <div>
                <SectionTitle>Excluir Conta</SectionTitle>
                <SectionText>
                  Ao excluir sua conta, todos os seus dados serão removidos.
                </SectionText>
              </div>
              <ActionButton
                style={{ backgroundColor: '#f44336' }}
                onClick={() => setShowDeleteModal(true)}
              >
                Excluir Conta
              </ActionButton>
            </SettingsRow>
          </>
        )
    }
  }

  return (
    <>
      <ResponsiveNavbar />
      <PageWrapper>
        <SettingsContainer>
          <SettingsContent>{renderSectionForm()}</SettingsContent>
        </SettingsContainer>
      </PageWrapper>

      <LoadingModal isOpen={loading} />
      {modalMessage && (
        <MessageModal
          isOpen={!!modalMessage}
          title={modalMessage.title}
          message={modalMessage.message}
          onClose={() => setModalMessage(null)}
        />
      )}

      <ConfirmModal
        isOpen={showDeleteModal}
        title="Excluir Conta"
        message="Deseja realmente excluir sua conta?"
        onConfirm={handleDeleteAccount}
        onCancel={() => setShowDeleteModal(false)}
      />
    </>
  )
}

export default Settings
