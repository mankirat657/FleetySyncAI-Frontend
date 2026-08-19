import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../store/store';

export const PublicRoutes = () => {
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);

  const isFullyAuthenticated = isAuthenticated && user?.isEmailVerified;

  return !isFullyAuthenticated ? <Outlet /> : <Navigate to="/" replace />;
};