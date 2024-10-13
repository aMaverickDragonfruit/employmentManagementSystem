import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function ProtectedApprovedRoute({ children }) {
  const { curProfile, loading, error } = useSelector(
    (state) => state.profileSlice
  );
  const location = useLocation();

  //   // Handle loading state
  if (loading || !curProfile.status) {
    // Data is still loading
    return <div></div>;
  } else if (curProfile.status === 'Approved') {
    return <>{children}</>;
  } else {
    return <Navigate to='/' state={{ from: location }} />;
  }
}
