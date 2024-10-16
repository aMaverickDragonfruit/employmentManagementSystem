import { Typography, Button, Table, message, Spin } from 'antd';
const { Title } = Typography;
import { LoadingOutlined } from '@ant-design/icons';
import { useState, useEffect } from 'react';
import AuthFields from '../../components/auth/AuthFields';
import AuthForm from '../../components/auth/AuthForm';
import {
  createRegistration,
  fetchRegistrations,
} from '../../features/registrationSlice';
import { useDispatch, useSelector } from 'react-redux';
import PageLayout from '../../components/layout/Page';
import Page500 from '../Page500';
import { AppTitle, AppSkeleton } from '../../components/components';

const InvitationForm = ({ onSubmit, onClose, err }) => {
  const invitationFields = [
    {
      placeholder: 'First name',
      name: 'firstName',
      type: 'text',
      rules: [
        {
          required: true,
          message: 'Invalid Email Input!',
        },
      ],
    },
    {
      placeholder: 'Middle name',
      name: 'middleName',
      type: 'text',
    },
    {
      placeholder: 'Last name',
      name: 'lastName',
      type: 'text',
      rules: [
        {
          required: true,
          message: 'Invalid Email Input!',
        },
      ],
    },
    {
      placeholder: 'Email',
      name: 'email',
      type: 'text',
      rules: [
        {
          required: true,
          message: 'Invalid Email Input!',
        },
      ],
    },
  ];

  return (
    <AuthForm>
      <AuthFields
        fields={invitationFields}
        title={'Invite Registration'}
        buttonText={'Send Invitation'}
        onSubmit={onSubmit}
        onClose={onClose}
        err={err}
      />
    </AuthForm>
  );
};

const RegistrationTable = ({ setErr, data, messageApi }) => {
  const columns = [
    {
      title: 'Last Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (text) => {
        const date = new Date(text);
        return date.toLocaleString();
      },
      sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt),
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Registration Link',
      dataIndex: 'registrationLink',
      key: 'registrationLink',
      render: (_, record) => (
        <Typography.Link
          href={record.registrationLink}
          target='_blank'
          rel='noopener noreferrer'
        >
          Registration Link
        </Typography.Link>
      ),
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
      render: (action, record) => {
        if (action === 'Send Reminder') {
          return (
            <Typography.Link onClick={() => handleSendReminder(record)}>
              {action}
            </Typography.Link>
          );
        } else if (action) {
          return <span>{action}</span>;
        } else {
          return null;
        }
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
  ];

  const dataSource = data.map((element) => {
    return {
      key: element._id,
      updatedAt: element.updatedAt,
      name: element.name,
      email: element.email,
      registrationLink: element.registrationLink,
      status: element.status ? 'Accepted' : 'Pending',
      action: element.status ? 'N/A' : 'Send Reminder',
    };
  });

  const dispatch = useDispatch();

  const handleSendReminder = async (record) => {
    const data = {
      email: record.email,
    };
    try {
      await dispatch(createRegistration(data)).unwrap();

      await dispatch(fetchRegistrations()).unwrap();
      messageApi.open({
        type: 'success',
        content: 'Reminder has been sent',
      });
    } catch (error) {
      setErr(error);
      messageApi.open({
        type: 'error',
        content: 'Sending reminder failed, Please try again later.',
      });
    }
  };

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

export default function EmployeeRegistration() {
  const [err, setErr] = useState(null);
  const [messageApi, contextHolder] = message.useMessage();

  const dispatch = useDispatch();
  const { registrations, loading, error } = useSelector(
    (state) => state.registrationSlice
  );
  const [showInvitation, setShowInvitation] = useState(false);

  useEffect(() => {
    dispatch(fetchRegistrations());
  }, [dispatch]);

  const onSubmit = async (data) => {
    try {
      await dispatch(createRegistration(data)).unwrap();

      await dispatch(fetchRegistrations()).unwrap();
    } catch (error) {
      setErr(error);
    }
  };

  const handleInvitationClose = () => {
    setShowInvitation(false);
  };

  if (error) {
    return <Page500 message={error} />;
  }
  if (err) {
    return <Page500 message={err} />;
  }

  return (
    <PageLayout>
      {contextHolder}
      <AppTitle>Employee Registrations</AppTitle>
      <div className='mt-10 mb-4 flex justify-between'>
        <Title level={3}>Registration History</Title>
        <Button type='primary' onClick={() => setShowInvitation(true)}>
          Invite Registration
        </Button>
      </div>
      {registrations.length === 0 ? (
        <AppSkeleton num={4} />
      ) : (
        <Spin indicator={<LoadingOutlined />} size='large' spinning={loading}>
          <RegistrationTable
            setErr={setErr}
            data={registrations}
            messageApi={messageApi}
          />
        </Spin>
      )}
      {showInvitation && (
        <>
          <div className='absolute top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2'>
            <InvitationForm
              onSubmit={onSubmit}
              onClose={handleInvitationClose}
            />
          </div>
          <div
            className='fixed inset-0 bg-slate-500 bg-opacity-50 z-40'
            onClick={handleInvitationClose}
          ></div>
        </>
      )}
    </PageLayout>
  );
}
