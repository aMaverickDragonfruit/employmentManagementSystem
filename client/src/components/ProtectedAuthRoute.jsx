import { Navigate, useLocation } from 'react-router-dom';
import { useMemo } from 'react';
import { jwtDecode } from 'jwt-decode';

export default function ProtectedAuthRoute({ children }) {
  const token = useMemo(() => localStorage.getItem('token'), []);
  const location = useLocation();

  if (!token) {
    return <Navigate to='/login' state={{ from: location }} />;
  }

  try {
    const decoded = jwtDecode(token);
    const { exp } = decoded;

    const currentTime = Date.now() / 1000;

    if (exp < currentTime) {
      localStorage.removeItem('token');
      return <Navigate to='/login' state={{ from: location }} replace />;
    } else {
      return <>{children}</>;
    }
  } catch (error) {
    console.error('Error decoding token:', error);
    return <Navigate to='/login' state={{ from: location }} replace />;
  }
}
