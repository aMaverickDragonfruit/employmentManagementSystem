import { Typography, Table } from 'antd';
import PageLayout from '../../components/layout/Page';
const { Title } = Typography;

const OnboardingApplicationsTable = ({ data }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, { record }) => (
        <Typography.Link>{record.name}</Typography.Link>
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
      render: (_, { userId }) => (
        <Typography.Link
          href={`http://localhost:3001/profiles/users/${userId}`}
        >
          View Application
        </Typography.Link>
      ),
    },
  ];

  const sourceData = data;

  return (
    <Table
      columns={columns}
      sourceData={sourceData}
    ></Table>
  );
};

export default function OnboardingApplications() {
  return (
    <PageLayout>
      <Title>Onboarding Applications</Title>
      <OnboardingApplicationsTable data={[]} />
    </PageLayout>
  );
}
