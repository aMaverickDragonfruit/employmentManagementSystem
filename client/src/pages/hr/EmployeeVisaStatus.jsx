import { Table, Typography, Tag } from 'antd';
import PageLayout from '../../components/layout/Page';
const { Title } = Typography;
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfiles } from '../../features/profileSlice';
import { useEffect } from 'react';
import dayjs from 'dayjs';

const EmployeeVisaStatusTable = ({ data }) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      //to be completed profiles/:id link
      render: (_, record) => <Typography.Link>{record.name}</Typography.Link>,
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Work Visa Type',
      dataIndex: 'visaType',
      key: 'visaType',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Work Authorization Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => {
        const date = new Date(text);
        return date.toLocaleDateString();
      },
    },
    {
      title: 'Work Authorization End Date',
      dataIndex: 'endDate',
      key: 'endDate',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (text) => {
        const date = new Date(text);
        return date.toLocaleDateString();
      },
    },
    {
      title: 'Next Step',
      dataIndex: 'nextStep',
      key: 'nextStep',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, { status }) => {
        let color = 'red';
        let label = 'Waiting for submission';
        if (status === 'Pending') {
          color = 'green';
          label = 'Waiting for Approval';
        } else if (status === 'Approved') {
          color = 'blue';
          label = 'No action needed';
        }
        return (
          <Tag
            color={color}
            key={status}
          >
            {label.toUpperCase()}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      dataIdex: 'action',
      key: 'action',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, { status, userId }) => {
        let label = 'Send Notification';
        if (status === 'Pending' || status === 'Approved')
          label = 'View Document';
        // wait for complete the link
        return (
          <Typography.Link
            href={`http://localhost:3001/profiles/users/${userId}`}
          >
            {label}
          </Typography.Link>
        );
      },
    },
  ];

  const dataSource = data.map((element) => {
    let status = 'Approval';
    // if no document
    if (element.documents.length === 0) {
      status = 'Reject';
    } else if (
      element.documents.length === 1 &&
      element.documents[0].fileName === 'ProfilePicture'
    ) {
      status = 'Reject';
    } else {
      for (let i = 0; i < element.documents.length; i++) {
        if (element.documents[i].status === 'Reject') {
          status = 'Reject';
        } else if (element.documents[i].status === 'Pending') {
          status = 'Pending';
        } else {
          continue;
        }
      }
    }

    // if (!element.documents[0]) {
    //   status = 'Reject';
    // } else {
    // element.documents.slice(1).forEach((element) => {
    //   console.log(element.status);
    //   if (element.status === 'Rejected') {
    //     status = 'Reject';
    //   }
    // });
    // },

    return {
      key: element._id,
      userId: element.user,
      name: element.firstName + ' ' + element.lastName,
      visaType: element.workAuthType,
      startDate: element.workAuthStartDate || 'None',
      endDate: element.workAuthEndDate || 'None',
      status: status,
    };
  });

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
    ></Table>
  );
};

export default function EmployeeVisaStatus() {
  const dispatch = useDispatch();
  const { profiles, curProfile, loading, error } = useSelector(
    (state) => state.profileSlice
  );

  console.log(profiles);

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

  return (
    <PageLayout>
      <Title>Employee Visa Status</Title>
      <EmployeeVisaStatusTable data={profiles} />
    </PageLayout>
  );
}
