import React from 'react';
import { PageWrapper, PageTitle } from '../styles/Styles';
import ResponsiveNavbar from '../components/ResponsiveNavbar';
import ProfilePage from '../components/ProfilePage'; 

const Profile: React.FC = () => {
  return (
    <>
      <ResponsiveNavbar />
      <PageWrapper>
        <PageTitle>Perfil</PageTitle>
        <ProfilePage />
      </PageWrapper>
    </>
  );
};

export default Profile;
