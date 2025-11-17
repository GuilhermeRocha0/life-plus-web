import React from 'react'
import { Routes, Route } from 'react-router-dom'

import Profile from '../pages/Profile.tsx'
import Exams from '../pages/Exams.tsx'
import Medicines from '../pages/Medicines.tsx'
import Home from '../pages/Home.tsx'
import Login from '../pages/Login.tsx'
import Register from '../pages/Register.tsx'
import ResetPassword from '../pages/ResetPassword.tsx'
import Faq from '../pages/Faq.tsx'
import PrivateRoute from './PrivateRoute'

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/redefinir-senha" element={<ResetPassword />} />
      <Route path="/cadastro" element={<Register />} />

      <Route
        path="/perfil"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />

      <Route
        path="/exames"
        element={
          <PrivateRoute>
            <Exams />
          </PrivateRoute>
        }
      />

      <Route
        path="/remedios"
        element={
          <PrivateRoute>
            <Medicines />
          </PrivateRoute>
        }
      />

      <Route path="/faq" element={<Faq />} />

      <Route
        path="*"
        element={
          <PrivateRoute>
            <Profile />
          </PrivateRoute>
        }
      />
    </Routes>
  )
}

export default AppRoutes
