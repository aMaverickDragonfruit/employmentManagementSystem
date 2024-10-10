import { Table, Typography } from 'antd';
import PageLayout from '../../components/layout/Page';
const { Title } = Typography;

const ProfilesTable = (data) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (_, record) => {
        <Typography.Link>{record.name}</Typography.Link>;
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'SSN',
      dataIndex: 'ssn',
      key: 'ssn',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Work Authorization',
      dataIndex: 'workAuthorization',
      key: 'workAuthorization',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
  ];

  const dataSource = [];

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
    />
  );
};

export default function EmployeeProfiles() {
  return (
    <PageLayout>
      <Title>Employee Profiles</Title>
      <ProfilesTable />
    </PageLayout>
  );
}
