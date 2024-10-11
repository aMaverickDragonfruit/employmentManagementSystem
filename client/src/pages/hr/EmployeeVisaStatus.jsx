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

  const dataSource = data.map((profile) => {
    // console.log(profile.documents);

    const requiredDocTypes = ['optReceipt', 'i983', 'optEAD'];

    const requiredDocuments = profile.documents.filter((doc) =>
      requiredDocTypes.includes(doc.fileType)
    );

    console.log(requiredDocuments);

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
      visaType: profile.workAuthType === 'None' ? 'N/A' : profile.workAuthType,
      startDate: profile.workAuthStartDate || 'None',
      endDate: profile.workAuthEndDate || 'None',
      status: status,
    };
  });

  return <Table columns={columns} dataSource={dataSource}></Table>;
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

  return (
    <PageLayout>
      <Title>Employee Visa Status</Title>
      <EmployeeVisaStatusTable data={profiles} />
    </PageLayout>
  );
}
