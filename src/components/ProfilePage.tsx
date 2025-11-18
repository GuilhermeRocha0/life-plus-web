import React, { useState, useEffect } from 'react'
import {
  ProfileContainer,
  ProfileCard,
  ProfileHeader,
  ProfileAvatar,
  ProfileInfo,
  ProfileName,
  ProfileJob,
  ProfileCautions,
  ProfileDetails,
  StatsWrapper,
  AboutSection,
  SectionTitle,
  SectionContent,
  ExamsWrapper,
  ExamsTag,
  MedicineList,
  StatCard,
  StatLabel,
  StatValue
} from '../styles/Styles'
import defaultAvatar from '../assets/default-avatar.png'

export interface UserProfile {
  id: string
  fullName: string
  avatarUrl?: string
  email?: string
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
        cautions: user.cautions ?? '',
        medicine: user.medicines ?? '',
        avatarUrl: user.avatar ?? defaultAvatar,
        joinedAt: user.createdAt
      })
    }
    console.log('User data:', user)
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

        {/* <StatsWrapper>
          <StatCard>
            <StatLabel>Remédios</StatLabel>
            <StatValue>{profile.medicine}</StatValue>
          </StatCard>
        </StatsWrapper> */}

        <AboutSection>
          <SectionTitle>Problemas</SectionTitle>
          {/* <SectionContent>{profile.cautions}</SectionContent> */}

          <SectionTitle>Pastas de Exames</SectionTitle>
          {/* <ExamsWrapper>
            {['Exame de Sangue', 'Raio-x', 'Dieta'].map(exams => (
              <ExamsTag key={exams}>{exams}</ExamsTag>
            ))}
          </ExamsWrapper> */}

          <SectionTitle>Remédios Acabando</SectionTitle>
          {/* <MedicineList>
            <li>Tibolona</li>
            <li>Lozartana</li>
          </MedicineList> */}
        </AboutSection>
      </ProfileCard>
    </ProfileContainer>
  )
}
