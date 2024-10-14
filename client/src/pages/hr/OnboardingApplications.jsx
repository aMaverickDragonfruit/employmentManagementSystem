import { Typography, Table } from 'antd';
import PageLayout from '../../components/layout/Page';
import { useSelector } from 'react-redux';
import Page500 from '../Page500';
import { AppTitle, AppSkeleton } from '../../components/components';

const OnboardingApplicationsTable = ({ data }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, { name, key: profileId }) => (
        <Typography.Link
          href={`http://localhost:3001/onboarding-applications/${profileId}`}
        >
          {name}
        </Typography.Link>
      ),
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
      render: (_, { key: profileId }) => (
        <Typography.Link
          href={`http://localhost:3001/onboarding-applications/${profileId}`}
        >
          View Application
        </Typography.Link>
      ),
    },
  ];

  const dataSource = data.map((profile) => {
    return {
      key: profile._id,
      name: profile.firstName + ' ' + profile.lastName,
      email: profile.email,
      status: profile.status === 'New' ? 'Pending' : profile.status,
    };
  });

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      scroll={{
        x: 800,
      }}
    />
  );
};

export default function OnboardingApplications() {
  // const dispatch = useDispatch();
  const { profiles, error } = useSelector((state) => state.profileSlice);

  if (error) {
    return <Page500 message={error} />;
  }

  return (
    <PageLayout>
      <AppTitle>Onboarding Applications</AppTitle>
      {profiles.length === 0 ? (
        <AppSkeleton num={3} />
      ) : (
        <OnboardingApplicationsTable data={profiles} />
      )}
    </PageLayout>
  );
}
