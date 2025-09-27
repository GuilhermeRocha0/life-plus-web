import React, { useState } from 'react';
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
  StatValue,
} from "../styles/Styles";

// --- Tipagens ---
export interface UserProfile {
  id: string;
  fullName: string;
  job: string;
  avatarUrl?: string;
  location?: string;
  email?: string;
  cautions?: string;
  phone?: string;
  medicine?: string;
  joinedAt?: string; // ISO date
}

// --- Componente principal ---
export default function ProfilePage({ user }: { user?: UserProfile }) {
  // Exemplo de dados default (apenas quando não receber props)
  const defaultUser: UserProfile = {
    id: 'u_001',
    fullName: 'Cleiton Rasta',
    job: 'Pedreiro',
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    location: 'São Paulo, Brasil',
    email: 'renan@example.com',
    cautions: 'Pressão Alta, Diabetes',
    medicine: 'Paracetamol, Insulina, Tibolona, Lozartana',
    phone: '+55 11 9 9999-9999',
    joinedAt: '2023-04-15',
  };

  const [profile, setProfile] = useState<UserProfile>(user ?? defaultUser);
  const [isEditing, setIsEditing] = useState(false);
  const [formState, setFormState] = useState<UserProfile>(profile);

  function openEdit() {
    setFormState(profile);
    setIsEditing(true);
  }

  function saveEdit() {
    setProfile(formState);
    setIsEditing(false);
  }

  function onChange<K extends keyof UserProfile>(key: K, value: UserProfile[K]) {
    setFormState(prev => ({ ...prev, [key]: value }));
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
        <SectionContent>
          {profile.cautions}
        </SectionContent>

        <SectionTitle>Pastas de Exames</SectionTitle>
        <ExamsWrapper>
          {["Exame de Sangue", "Raio-x", "Dieta"].map((exams) => (
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
);

}


// function Card({ title, children }: { title: string; children: React.ReactNode }) {
//   return (
//     <div className="p-4 bg-white dark:bg-neutral-800 border rounded-lg">
//       <h3 className="font-medium text-sm text-neutral-700 dark:text-neutral-200">{title}</h3>
//       <div className="mt-3 text-sm text-neutral-600 dark:text-neutral-300">{children}</div>
//     </div>
//   );
// }

// function Input({ label, value, onChange }: { label: string; value?: string; onChange: (v: string) => void }) {
//   return (
//     <label className="flex flex-col text-sm">
//       <span className="text-neutral-600 dark:text-neutral-300 text-xs mb-1">{label}</span>
//       <input
//         value={value ?? ''}
//         onChange={(e) => onChange(e.target.value)}
//         className="px-3 py-2 rounded-md border bg-transparent outline-none text-sm"
//       />
//     </label>
//   );
// }

// function Textarea({ label, value, onChange }: { label: string; value?: string; onChange: (v: string) => void }) {
//   return (
//     <label className="flex flex-col text-sm col-span-1 md:col-span-2">
//       <span className="text-neutral-600 dark:text-neutral-300 text-xs mb-1">{label}</span>
//       <textarea
//         value={value ?? ''}
//         onChange={(e) => onChange(e.target.value)}
//         rows={4}
//         className="px-3 py-2 rounded-md border bg-transparent outline-none text-sm resize-vertical"
//       />
//     </label>
//   );
// }
