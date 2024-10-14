import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';
import Page500 from '../pages/Page500';

export default function Home() {
  const location = useLocation();

  const { curProfile, loading, error } = useSelector(
    (state) => state.profileSlice
  );

  if (error) {
    return <Page500 message={error} />;
  }

  //   // Handle loading state
  if (loading || !curProfile) {
    // Data is still loading
    return null;
  } else if (curProfile.status === 'Approved') {
    return <div>HOME</div>;
  } else {
    return (
      <Navigate to='/onboarding-form' state={{ from: location }} replace />
    );
  }
}
