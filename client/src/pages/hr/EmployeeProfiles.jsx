import { Table, Typography } from 'antd';
const { Title } = Typography;
import PageLayout from '../../components/layout/Page';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfiles } from '../../features/profileSlice';
import { useEffect } from 'react';
import Search from '../../components/components';

const ProfilesTable = ({ data }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      //to be completed
      render: (_, record) => <Typography.Link>{record.name}</Typography.Link>,
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

  const dataSource = data.map((element) => {
    return {
      key: element._id,
      name: element.firstName + ' ' + element.lastName,
      ssn: element.ssn || 'N/A',
      workAuthorization:
        element.workAuthType === 'None' ? 'N/A' : element.workAuthType,
      phone: element.cellPhone || 'N/A',
      email: element.email,
    };
  });

  return <Table dataSource={dataSource} columns={columns} />;
};

export default function EmployeeProfiles() {
  const dispatch = useDispatch();
  const { profiles, curProfile, loading, error } = useSelector(
    (state) => state.profileSlice
  );

  console.log(profiles);

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

  const onSearch = (value) => {
    console.log(value);
  };

  return (
    <PageLayout>
      <Title>Employee Profiles</Title>
      <Search onSearch={onSearch} />
      <ProfilesTable data={profiles} />
    </PageLayout>
  );
}
