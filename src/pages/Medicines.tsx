import React from 'react';
import { PageWrapper, PageTitle } from '../styles/Styles'
import ResponsiveNavbar from '../components/ResponsiveNavbar';
import MedicinesPage from '../components/MedicinesPage';

const Medicines: React.FC = () => {
  return (
    <>
      <ResponsiveNavbar />
      <PageWrapper>
        <PageTitle>Remédios</PageTitle>
        <MedicinesPage />
      </PageWrapper>
    </>
  );
};

export default Medicines;
