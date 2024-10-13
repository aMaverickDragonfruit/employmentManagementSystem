// import { fetchCurUserProfile } from '../../features/profileSlice';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileForm from '../../components/ProfileForm';
import PageLayout from '../../components/layout/Page';
import { Typography } from 'antd';
const { Title } = Typography;

export default function EmployeeProfile() {
  const dispatch = useDispatch();
  const { curProfile, loading, error } = useSelector(
    (state) => state.profileSlice
  );

  // useEffect(() => {
  //   dispatch(fetchCurUserProfile());
  // }, [dispatch]);

  return (
    <PageLayout>
      <Title>Profile</Title>
      <ProfileForm isEditable={true} profile={curProfile} />
    </PageLayout>
  );
}
