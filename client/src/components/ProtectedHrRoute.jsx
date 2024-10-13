import { Navigate, useLocation } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import { useMemo } from 'react';
import Page403 from '../pages/Page403';

export default function ProtectedHrRoute({ children }) {
  const token = useMemo(() => localStorage.getItem('token'), []);
  const location = useLocation();

  if (!token) {
    return <Navigate to='/login' state={{ from: location }} replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const { user, exp } = decoded;

    const currentTime = Date.now() / 1000;

    if (exp < currentTime) {
      localStorage.removeItem('token');
      return <Navigate to='/login' state={{ from: location }} replace />;
    }

    if (user.isHR) {
      return <>{children}</>;
    } else {
      return <Page403 />;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
}
