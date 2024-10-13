import { useSelector } from 'react-redux';
import Page403 from '../pages/Page403';

export default function ProtectedApprovedRoute({ children }) {
  const { curProfile, loading, error } = useSelector(
    (state) => state.profileSlice
  );

  //   // Handle loading state
  if (loading || !curProfile) {
    // Data is still loading
    return null;
  } else if (curProfile.status === 'Approved') {
    return <>{children}</>;
  } else {
    return <Page403 />;
  }
}
