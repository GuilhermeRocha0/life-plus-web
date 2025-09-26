import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Profile from '../pages/Profile.tsx'
import Exams from '../pages/Exams.tsx'
import Medicines from '../pages/Medicines.tsx'
import Home from '../pages/Home.tsx';
import Login from '../pages/Login.tsx';
import Cadastro from '../pages/Register.tsx';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cadastro" element={<Cadastro />} />
      <Route path="/perfil" element={<Profile />} />
      <Route path="/exames" element={<Exams />} />
      <Route path="/remedios" element={<Medicines />} />
      {/* Rota padrão */}
      <Route path="*" element={<Profile />} />
    </Routes>
  );
};

export default AppRoutes;
