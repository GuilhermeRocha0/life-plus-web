import React from 'react';
import { PageWrapper, PageTitle } from '../styles/Styles'
import ResponsiveNavbar from '../components/ResponsiveNavbar';

const Profile: React.FC = () => {
  return (
    <>
      <ResponsiveNavbar />
      <PageWrapper>
        <PageTitle>Perfil</PageTitle>
      </PageWrapper>
    </>
  );
};

export default Profile;
