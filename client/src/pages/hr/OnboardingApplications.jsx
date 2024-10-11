import { Typography, Table } from 'antd';
import PageLayout from '../../components/layout/Page';
const { Title } = Typography;
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfiles } from '../../features/profileSlice';
import { useEffect } from 'react';

const OnboardingApplicationsTable = ({ data }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => <Typography.Link>{record.name}</Typography.Link>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      // is this correct ?
      render: (_, { userId }) => (
        <Typography.Link
          href={`http://localhost:3001/profiles/users/${userId}`}
        >
          View Application
        </Typography.Link>
      ),
    },
  ];

  const dataSource = data.map((profile) => {
    return {
      key: profile._id,
      userId: profile.user,
      name: profile.firstName + ' ' + profile.lastName,
      email: profile.email,
      status: profile.status === 'New' ? 'Pending' : profile.status,
    };
  });

  return <Table columns={columns} dataSource={dataSource}></Table>;
};

export default function OnboardingApplications() {
  const dispatch = useDispatch();
  const { profiles, curProfile, loading, error } = useSelector(
    (state) => state.profileSlice
  );

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

  return (
    <PageLayout>
      <Title>Onboarding Applications</Title>
      <OnboardingApplicationsTable data={profiles} />
    </PageLayout>
  );
}
