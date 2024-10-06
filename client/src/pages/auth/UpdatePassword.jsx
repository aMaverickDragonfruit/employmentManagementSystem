import { useNavigate } from 'react-router-dom';
import AuthFields from '../../components/auth/AuthFields';
import AuthForm from '../../components/auth/AuthForm';
import AuthLayout from '../../components/auth/AuthLayout';

export default function UpdatePassword() {
  const navigate = useNavigate();
  const fields = [
    {
      placeholder: 'Email',
      name: 'Email',
      type: 'text',
    },
  ];

  const onSubmit = () => {
    navigate('/password-updated');
  };

  const onClosed = () => {
    navigate('/login');
  };

  return (
    <AuthLayout>
      <AuthForm>
        <AuthFields
          buttonText='Update password'
          onSubmit={onSubmit}
          onClose={onClosed}
          title='Update your password'
          fields={fields}
        />
        <p>Enter your email, we will send you the recovery link</p>
      </AuthForm>
    </AuthLayout>
  );
}
