import { Button, Table } from 'antd';
import { useState, useEffect } from 'react';
import AuthFields from '../../components/auth/AuthFields';
import AuthForm from '../../components/auth/AuthForm';
import {
  createRegistration,
  fetchRegistrations,
} from '../../features/registrationSlice';
import { useDispatch, useSelector } from 'react-redux';

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

const RegistrationTable = ({ setErr, data }) => {
  const dispatch = useDispatch();

  const handleSendReminder = (record) => {
    const data = {
      email: record.email,
    };
    dispatch(createRegistration(data)).then((action) => {
      if (createRegistration.fulfilled.match(action)) {
        dispatch(fetchRegistrations());
      } else if (createRegistration.rejected.match(action)) {
        setErr(action.payload);
      }
    });
  };
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
        <a
          href={record.registrationLink}
          target='_blank'
          rel='noopener noreferrer'
        >
          Registration Link
        </a>
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
          return <a onClick={() => handleSendReminder(record)}>{action}</a>;
        } else if (action) {
          return <span>{action}</span>;
        } else {
          return null;
        }
      },
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
  ];

  // const dataSource = [];
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

  return (
    <Table
      dataSource={dataSource}
      columns={columns}
    />
  );
};

export default function EmployeeRegistration() {
  const [err, setErr] = useState(null);

  const dispatch = useDispatch();
  const { registrations, loading, error } = useSelector(
    (state) => state.registrationSlice
  );
  const [showInvitation, setShowInvitation] = useState(false);

  useEffect(() => {
    dispatch(fetchRegistrations());
  }, [dispatch]);

  console.log(registrations);

  const onSubmit = (data) => {
    dispatch(createRegistration(data)).then((action) => {
      if (createRegistration.fulfilled.match(action)) {
        dispatch(fetchRegistrations());
      } else if (createRegistration.rejected.match(action)) {
        setErr(action.payload);
      }
    });
  };

  const onClose = () => {
    setShowInvitation(false);
  };

  if (loading) return <p>Loading</p>;

  return (
    <>
      <Button
        type='primary'
        onClick={() => setShowInvitation(true)}
      >
        Invite Registration
      </Button>
      {showInvitation && (
        <InvitationForm
          onSubmit={onSubmit}
          onClose={onClose}
        />
      )}
      <RegistrationTable
        setErr={setErr}
        data={registrations}
      />
    </>
  );
}
