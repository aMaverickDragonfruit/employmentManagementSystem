import { Table, Typography, Tag, Button, message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import PageLayout from '../../components/layout/Page';
const { Title } = Typography;
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileById, fetchProfiles } from '../../features/profileSlice';
import { useEffect, useState } from 'react';
import { ReviewFiles, ViewAllFiles } from './EmployeeVisaStatusComponents';
import { sendMail } from '../../api/mailer';
import Search from '../../components/components';

const EmployeeVisaStatusTable = ({
  data,
  handleReviewDoc,
  handleSendReminder,
  sendingReminder,
  handleViewAllDocuments,
}) => {
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
      title: 'Days Remaining',
      dataIndex: 'daysRemaining',
      key: 'daysRemaining',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, { startDate, endDate }) => {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const millisecondsDifference = end - start;
        const days = millisecondsDifference / (1000 * 60 * 60 * 24);
        const roundedDays = Math.round(days);
        return roundedDays.toLocaleString();
      },
    },
    {
      title: 'Next Step',
      dataIndex: 'nextStep',
      key: 'nextStep',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, { status, curFile }) => {
        let color = 'default';
        let label = 'No File';
        if (status === 'Approved') {
          color = 'success';
          label = 'No Action Needed';
        } else if (status === 'Pending') {
          color = 'processing';
          label = JSON.stringify(`${curFile} waiting for approval`);
        } else if (status === 'Rejected') {
          color = 'error';
          label = `Rejected: ${curFile} waiting for re-submission`;
        } else {
          // status: New
          color = 'warning';
          label = JSON.stringify(`${curFile} waiting for submission`);
        }
        return (
          <Tag
            color={color}
            key={status}
          >
            {label}
          </Tag>
        );
      },
    },
    {
      title: 'Action',
      dataIdex: 'action',
      key: 'action',
      sorter: (a, b) => a.name.localeCompare(b.name),
      render: (_, { status, curFile, key: profileId, name, email }) => {
        if (status === 'Approved') {
          return (
            // view all doc, no reject or approved
            <Button
              type='link'
              onClick={() => handleViewAllDocuments(profileId)}
            >
              View All Documents
            </Button>
          );
        } else if (status === 'Pending') {
          return (
            <Button
              type='link'
              onClick={() => handleReviewDoc(profileId, curFile)}
            >
              Review Document
            </Button>
          );
        } else if (status === 'Rejected') {
          return (
            <Spin
              indicator={<LoadingOutlined spin />}
              size='large'
              spinning={sendingReminder}
            >
              <Button
                key={profileId}
                type='link'
                onClick={() => handleSendReminder({ name, email })}
              >
                Send Reminder
              </Button>
            </Spin>
          );
        } else {
          //  new
          return (
            <Spin
              indicator={<LoadingOutlined spin />}
              size='large'
              spinning={sendingReminder}
            >
              <Button
                type='link'
                onClick={() => handleSendReminder({ name, email })}
              >
                Send Reminder
              </Button>
            </Spin>
          );
        }
      },
    },
  ];

  const dataSource = data.map((profile) => {
    // console.log(profile.documents);
    const visaDocuments = profile.documents.slice(3);
    let visaDocStatus = 'noStatus';
    let curVisaFile = 'noFile';

    for (let visaDoc of visaDocuments) {
      curVisaFile = visaDoc.fileType;

      if (visaDoc.status === 'Approved') {
        visaDocStatus = 'Approved';
        continue;
      } else {
        // non-approved: new, rejected, pending
        visaDocStatus = visaDoc.status;
        break;
      }
    }

    return {
      key: profile._id,
      userId: profile.user,
      name: profile.firstName + ' ' + profile.lastName,
      email: profile.email,
      visaType: profile.workAuthType === 'None' ? 'N/A' : profile.workAuthType,
      startDate: profile.workAuthStartDate || 'None',
      endDate: profile.workAuthEndDate || 'None',
      status: visaDocStatus,
      curFile: curVisaFile,
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
  const [messageApi, contextHolder] = message.useMessage();
  const [sendingReminder, setSendingReminder] = useState(false);
  const dispatch = useDispatch();
  const {
    profiles,
    loading: profilesLoading,
    error,
  } = useSelector((state) => state.profileSlice);

  // console.log(profiles);

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

  const [isViewDoc, setIsViewDoc] = useState(false);
  const [curVisaFile, setCurVisaFile] = useState('');

  const handleOpenDocuments = (profileId, curFile) => {
    // console.log(profileId);
    dispatch(fetchProfileById(profileId));
    setIsViewDoc(true);
    setCurVisaFile(curFile);
  };

  const handleCloseDocuments = () => {
    setIsViewDoc(false);
  };

  const handleSendReminder = async (receiver) => {
    try {
      const subject = 'Reminder';
      setSendingReminder(true);
      await sendMail(receiver, subject);
      setSendingReminder(false);
      messageApi.open({
        type: 'success',
        content: 'Reminder has been sent',
      });
    } catch (error) {
      console.log(error.message);
      messageApi.open({
        type: 'error',
        content: 'Sending reminder failed, Please try again later.',
      });
    }
  };

  const [isViewAllDocs, setIsViewAllDocs] = useState(false);

  const handleViewAllDocuments = (profileId) => {
    dispatch(fetchProfileById(profileId));
    setIsViewAllDocs(true);
  };

  const handleCloseAllDocuments = () => {
    setIsViewAllDocs(false);
  };

  const onSearch = (value) => {
    console.log(value);
  };

  return (
    <PageLayout>
      {contextHolder}
      <Title>Employee Visa Status</Title>
      <Search onSearch={onSearch} />
      <EmployeeVisaStatusTable
        sendingReminder={sendingReminder}
        data={profiles}
        handleReviewDoc={(profileId, curFile) =>
          handleOpenDocuments(profileId, curFile)
        }
        handleSendReminder={(receiver) => handleSendReminder(receiver)}
        handleViewAllDocuments={(profileId) =>
          handleViewAllDocuments(profileId)
        }
      />

      {/* click to show */}
      {isViewDoc && (
        <>
          <div className='absolute top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2'>
            <ReviewFiles
              handleClose={handleCloseDocuments}
              curVisaFile={curVisaFile}
            />
          </div>
          <div
            className='fixed inset-0 bg-slate-500 bg-opacity-50 z-40'
            onClick={handleCloseDocuments}
          ></div>
        </>
      )}
      {isViewAllDocs && (
        <>
          <div className='absolute top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2'>
            <ViewAllFiles handleClose={handleCloseAllDocuments} />
          </div>
          <div
            className='fixed inset-0 bg-slate-500 bg-opacity-50 z-40'
            onClick={handleCloseAllDocuments}
          ></div>
        </>
      )}
    </PageLayout>
  );
}
