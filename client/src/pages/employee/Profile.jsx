// import { fetchCurUserProfile } from '../../features/profileSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileForm from '../../components/ProfileForm';
import PageLayout from '../../components/layout/Page';
import { Typography } from 'antd';
import Page500 from '../Page500';
import { AppTitle } from '../../components/components';

const { Title } = Typography;

export default function EmployeeProfile() {
  const { curProfile, loading, error } = useSelector(
    (state) => state.profileSlice
  );

  if (error) {
    return <Page500 message={error} />;
  }

  return (
    <PageLayout>
      <AppTitle>Profile</AppTitle>
      <ProfileForm
        isEditable={true}
        profile={curProfile}
      />
    </PageLayout>
  );
}
