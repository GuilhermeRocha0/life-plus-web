import React, { useState, useEffect } from 'react'
import {
  ProfileContainer,
  ProfileCard,
  ProfileHeader,
  ProfileAvatar,
  ProfileInfo,
  ProfileName,
  ProfileDetails,
  AboutSection,
  SectionTitle,

} from '../styles/Styles'
import defaultAvatar from '../assets/default-avatar.png'

export interface UserProfile {
  id: string
  fullName: string
  avatarUrl?: string
  email?: string
  birthDate?: string
  cautions?: string
  medicine?: string
  joinedAt?: string
}

export default function ProfilePage({ user }: { user?: any }) {
  const [profile, setProfile] = useState<UserProfile | null>(null)

  useEffect(() => {
    if (user) {
      setProfile({
        id: user._id,
        fullName: user.name,
        email: user.email,
        birthDate: user.birthDate || '',
        cautions: user.cautions ?? '',
        medicine: user.medicines ?? '',
        avatarUrl: user.avatar ?? defaultAvatar,
        joinedAt: user.createdAt
      })
    }
  }, [user])

  if (!profile) return <p>Carregando perfil...</p>

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileHeader>
          <ProfileAvatar src={profile.avatarUrl} alt={profile.fullName} />
          <ProfileInfo>
            <ProfileName>{profile.fullName}</ProfileName>

            <ProfileDetails>
              <span>{profile.email}</span>
            </ProfileDetails>
          </ProfileInfo>
        </ProfileHeader>

        <AboutSection>
          <SectionTitle>Problemas</SectionTitle>

          <SectionTitle>Pastas de Exames</SectionTitle>


          <SectionTitle>Remédios Acabando</SectionTitle>

        </AboutSection>
      </ProfileCard>
    </ProfileContainer>
  )
}
