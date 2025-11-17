import React, { useState } from 'react'
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

// --- Tipagens ---
export interface UserProfile {
  id: string
  fullName: string
  job: string
  avatarUrl?: string
  location?: string
  email?: string
  cautions?: string
  phone?: string
  medicine?: string
  joinedAt?: string // ISO date
}

// --- Componente principal ---
export default function ProfilePage({ user }: { user?: UserProfile }) {
  // Exemplo de dados default (apenas quando não receber props)
  const defaultUser: UserProfile = {
    id: 'u_001',
    fullName: 'Cleiton Rasta',
    job: 'Desempregado',
    avatarUrl: 'https://i.pravatar.cc/150?img=11',
    location: 'São Paulo, Brasil',
    email: 'cleiton@example.com',
    cautions: 'Pressão Alta, Diabetes',
    medicine: 'Paracetamol, Tibolona, Lozartana',
    phone: '+55 11 9 9999-9999',
    joinedAt: '2023-04-15'
  }

  const [profile, setProfile] = useState<UserProfile>(user ?? defaultUser)
  const [isEditing, setIsEditing] = useState(false)
  const [formState, setFormState] = useState<UserProfile>(profile)

  function openEdit() {
    setFormState(profile)
    setIsEditing(true)
  }

  function saveEdit() {
    setProfile(formState)
    setIsEditing(false)
  }

  function onChange<K extends keyof UserProfile>(
    key: K,
    value: UserProfile[K]
  ) {
    setFormState(prev => ({ ...prev, [key]: value }))
  }

  return (
    <ProfileContainer>
      <ProfileCard>
        <ProfileHeader>
          <ProfileAvatar src={profile.avatarUrl} alt={profile.fullName} />
          <ProfileInfo>
            <ProfileName>{profile.fullName}</ProfileName>
            <ProfileJob>Trabalho: {profile.job}</ProfileJob>
            <ProfileCautions>{profile.phone}</ProfileCautions>
            <ProfileDetails>
              <span>{profile.location}</span>
              <span>{profile.email}</span>
            </ProfileDetails>
          </ProfileInfo>
        </ProfileHeader>

        <StatsWrapper>
          <StatCard>
            <StatLabel>Remédios</StatLabel>
            <StatValue>{profile.medicine}</StatValue>
          </StatCard>
          ...
        </StatsWrapper>

        <AboutSection>
          <SectionTitle>Problemas</SectionTitle>
          <SectionContent>{profile.cautions}</SectionContent>

          <SectionTitle>Pastas de Exames</SectionTitle>
          <ExamsWrapper>
            {['Exame de Sangue', 'Raio-x', 'Dieta'].map(exams => (
              <ExamsTag key={exams}>{exams}</ExamsTag>
            ))}
          </ExamsWrapper>

          <SectionTitle>Remedios Acabando</SectionTitle>
          <MedicineList>
            <li>Tibolona</li>
            <li>Lozartana</li>
          </MedicineList>
        </AboutSection>
      </ProfileCard>
    </ProfileContainer>
  )
}
