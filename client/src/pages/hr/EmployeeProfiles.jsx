import { Table, Typography } from 'antd';
import PageLayout from '../../components/layout/Page';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { AppSearch, AppTitle, AppSkeleton } from '../../components/components';
import Page500 from '../Page500/';

const ProfilesTable = ({ data }) => {
  console.log(data);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      //to be completed
      render: (_, { name, key: profileId }) => (
        <Typography.Link
          href={`http://localhost:3001/employee-profiles/${profileId}`}
        >
          {name}
        </Typography.Link>
      ),
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

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
      scroll={{
        x: 800,
      }}
    />
  );
};

export default function EmployeeProfiles() {
  const { profiles, error } = useSelector((state) => state.profileSlice);
  const [filteredProfiles, setFilteredProfiles] = useState(profiles);

  useEffect(() => {
    setFilteredProfiles(profiles);
  }, [profiles]);

  const onSearch = (value) => {
    const filtered = profiles.filter((profile) =>
      `${profile.firstName} ${profile.lastName}`
        .toLowerCase()
        .includes(value.toLowerCase())
    );
    setFilteredProfiles(filtered);
  };

  if (error) return <Page500 message={error} />;

  return (
    <PageLayout>
      <AppTitle>Employee Profiles</AppTitle>
      <AppSearch onSearch={onSearch} />
      {filteredProfiles?.length === 0 ? (
        <AppSkeleton num={3} />
      ) : (
        <ProfilesTable data={filteredProfiles} />
      )}
    </PageLayout>
  );
}
