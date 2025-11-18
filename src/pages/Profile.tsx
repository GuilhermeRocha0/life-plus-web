import React, { useEffect } from 'react'
import { PageWrapper, PageTitle } from '../styles/Styles'
import ResponsiveNavbar from '../components/ResponsiveNavbar'
import ProfilePage from '../components/ProfilePage'
import { useAuth } from '../hooks/useAuth'

const Profile: React.FC = () => {
  const { user, fetchLoggedUser } = useAuth()

  useEffect(() => {
    fetchLoggedUser()
  }, [])

  return (
    <>
      <ResponsiveNavbar />
      <PageWrapper>
        <PageTitle>Perfil</PageTitle>
        <ProfilePage user={user} />
      </PageWrapper>
    </>
  )
}

export default Profile
