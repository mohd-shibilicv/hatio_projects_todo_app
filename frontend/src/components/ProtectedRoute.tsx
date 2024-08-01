import React from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Navigate } from 'react-router-dom';

const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  return isAuthenticated ? children : <Navigate to='/login' />;
}

export default ProtectedRoute;