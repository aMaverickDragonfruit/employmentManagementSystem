import { Typography } from 'antd';
import PageLayout from '../components/layout/Page';
const { Title } = Typography;
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
    return (
    <PageLayout>
      <Title>Welcome to Chuwa Management</Title>
      <img
        src='/asset/kun.jpg'
        alt=''
        style={{ width: '400px', height: '400px' }}
      />
    </PageLayout>
  );
  } else {
    return (
      <Navigate to='/onboarding-form' state={{ from: location }} replace />
    );
  }

}
