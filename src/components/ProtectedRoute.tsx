import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export const ProtectedRoute = () => {
  const { isAuthenticated, user, authChecked } = useSelector((state: RootState) => state.auth);

  if (!authChecked) return null; 

  if (!isAuthenticated || !user?.isEmailVerified) {
    return <Navigate to="/signIn" replace />;
  }

  return <Outlet />;
};