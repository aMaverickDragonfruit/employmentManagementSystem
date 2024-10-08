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

const RegistrationTable = ({ data }) => {
  const columns = [
    {
      title: 'Last Updated',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
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
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
  ];

  // const dataSource = data.map();
  const dataSource = [];

  return (
    <Table
      dataSource={data}
      columns={columns}
    />
  );
};

export default function EmployeeRegistration() {
  const dispatch = useDispatch();
  const { registrations, loading, error } = useSelector(
    (state) => state.registrationSlice
  );
  const [showInvitation, setShowInvitation] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    dispatch(fetchRegistrations());
  }, [dispatch]);

  console.log(registrations);

  const onSubmit = (data) => {
    dispatch(createRegistration(data));
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
      <RegistrationTable data={registrations} />
    </>
  );
}
