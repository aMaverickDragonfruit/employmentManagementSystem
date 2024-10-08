import { Button } from 'antd';
import { useState } from 'react';
import AuthFields from '../../components/auth/AuthFields';
import AuthForm from '../../components/auth/AuthForm';
import { createRegistration } from '../../features/registrationSlice';
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

export default function EmployeeRegistration() {
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.registrationSlice);
  const [showInvitation, setShowInvitation] = useState(false);

  const [err, setErr] = useState(null);

  const onSubmit = (data) => {
    dispatch(createRegistration(data));
  };

  const onClose = () => {
    setShowInvitation(false);
  };

  if (loading) return <p>Loading</p>;

  return (
    <>
      <Button type='primary' onClick={() => setShowInvitation(true)}>
        Invite Registration
      </Button>
      {showInvitation && (
        <InvitationForm onSubmit={onSubmit} onClose={onClose} />
      )}
    </>
  );
}
