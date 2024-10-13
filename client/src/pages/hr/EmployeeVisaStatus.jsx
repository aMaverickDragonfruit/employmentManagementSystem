import { Table, Typography, Tag, Button, message, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import PageLayout from '../../components/layout/Page';
const { Title } = Typography;
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileById, fetchProfiles } from '../../features/profileSlice';
import { useEffect, useState } from 'react';
import { ReviewFiles } from './EmployeeVisaStatusComponents';
import { sendMail } from '../../api/mailer';

const EmployeeVisaStatusTable = ({
  data,
  handleViewDoc,
  handleSendReminder,
  sendingReminder,
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
          <Tag color={color} key={status}>
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
      render: (_, { status, key: profileId, name, email }) => {
        if (status === 'Pending' || status === 'Approved') {
          return (
            <Button type='link' onClick={() => handleViewDoc(profileId)}>
              View Documents
            </Button>
          );
        } else {
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
        // wait for complete the link
      },
    },
  ];

  const dataSource = data.map((profile) => {
    // console.log(profile.documents);

    const requiredDocTypes = ['optReceipt', 'i983', 'optEAD'];

    const requiredDocuments = profile.documents.filter((doc) =>
      requiredDocTypes.includes(doc.fileType)
    );

    // console.log(requiredDocuments);

    let status = 'Approved';
    let hasPending = false;

    // Iterate through the required documents to determine the overall status
    for (let doc of requiredDocuments) {
      if (doc.status === 'Rejected') {
        status = 'Rejected';
        break; // No need to check further if any document is rejected
      } else if (doc.status === 'Pending') {
        hasPending = true; // Mark that there's at least one pending document
      }
    }
    // If no rejection but at least one pending, set status to 'Pending'

    if (status !== 'Rejected' && hasPending) {
      status = 'Pending';
    }
    // Handle cases where required documents are missing
    if (requiredDocuments.length === 0) {
      // No required documents uploaded yet
      status = 'Rejected';
    } else {
      // Check if all required documents are uploaded
      const uploadedDocTypes = requiredDocuments.map((doc) => doc.fileType);
      const allDocsUploaded = requiredDocTypes.every((type) =>
        uploadedDocTypes.includes(type)
      );

      if (!allDocsUploaded && status === 'Approved') {
        // If some required documents are missing and no rejections or pendings
        status = 'Rejected';
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
      status: status,
    };
  });

  return <Table columns={columns} dataSource={dataSource}></Table>;
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

  const handleOpenDocuments = (profileId) => {
    // console.log(profileId);
    dispatch(fetchProfileById(profileId));
    setIsViewDoc(true);
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

  return (
    <PageLayout>
      {contextHolder}
      <Title>Employee Visa Status</Title>
      <EmployeeVisaStatusTable
        sendingReminder={sendingReminder}
        data={profiles}
        handleViewDoc={(profileId) => handleOpenDocuments(profileId)}
        handleSendReminder={(receiver) => handleSendReminder(receiver)}
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
