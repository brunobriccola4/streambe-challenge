// AppRoutes.tsx
import React, { useContext } from 'react';
import { Routes, Route } from 'react-router-dom';
import LoginPage from '../pages/LoginPage';
import DashboardPage from '../pages/DashboardPage';
import ProtectedRoute from './protectedRoutes';  
import { AuthContext } from '../context/AuthContext';

const AppRoutes: React.FC = () => {
  const { authState } = useContext(AuthContext);
  const {isAuthenticated} = authState
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/dashboard" element={
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <DashboardPage />
        </ProtectedRoute>
      } />
    </Routes>
  );
};

export default AppRoutes;