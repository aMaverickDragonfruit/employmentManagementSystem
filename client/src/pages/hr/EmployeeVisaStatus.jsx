import { Table, Typography, Tag, Button } from 'antd';
import PageLayout from '../../components/layout/Page';
const { Title } = Typography;
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileById, fetchProfiles } from '../../features/profileSlice';
import { useEffect, useState } from 'react';
import { ReviewFiles } from './EmployeeVisaStatusComponents';
import dayjs from 'dayjs';

const EmployeeVisaStatusTable = ({ data, handleViewDoc }) => {
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
      render: (_, { status, key: profileId }) => {
        let label = 'Send Notification';
        if (status === 'Pending' || status === 'Approved')
          label = 'View Document';
        // wait for complete the link
        return (
          <Button
            type='link'
            onClick={() => handleViewDoc(profileId)}
          >
            View Documents
          </Button>
        );
      },
    },
  ];

  const dataSource = data.map((element) => {
    let status = 'Approved';
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

  // console.log(profiles);

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

  const [isViewDoc, setIsViewDoc] = useState(false);

  const handleOpenDocuments = (profileId) => {
    console.log(profileId);
    dispatch(fetchProfileById(profileId));
    setIsViewDoc(true);
  };

  const handleCloseDocuments = () => {
    setIsViewDoc(false);
  };

  return (
    <PageLayout>
      <Title>Employee Visa Status</Title>
      <EmployeeVisaStatusTable
        data={profiles}
        handleViewDoc={(profileId) => handleOpenDocuments(profileId)}
      />
      {isViewDoc && (
        <>
          <div className='absolute top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2'>
            <ReviewFiles handleClose={handleCloseDocuments} />
          </div>
          <div
            className='fixed inset-0 bg-slate-500 bg-opacity-50 z-40'
            onClick={handleCloseDocuments}
          ></div>
        </>
      )}
    </PageLayout>
  );
}
