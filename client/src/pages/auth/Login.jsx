import { useNavigate, useLocation } from 'react-router-dom';
import AuthFields from '../../components/auth/AuthFields';
import AuthForm from '../../components/auth/AuthForm';
import AuthLayout from '../../components/auth/AuthLayout';
import { useState } from 'react';
import { loginUser } from '../../features/userSlice';
import { useDispatch } from 'react-redux';

const fields = [
  {
    placeholder: 'Email',
    name: 'userName',
    type: 'text',
  },
  {
    placeholder: 'Password',
    name: 'password',
    type: 'password',
  },
];

export default function LogIn() {
  const [err, setErr] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const from = location.state?.from?.pathname || '/';

  const onSubmit = async (data) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      navigate(from, { replace: true });
    } catch (error) {
      setErr(error);
    }
  };

  const onClosed = () => {
    console.log('closed');
  };

  return (
    <AuthLayout>
      <AuthForm>
        <AuthFields
          buttonText='Sign In'
          onSubmit={onSubmit}
          onClose={onClosed}
          title='Sign in'
          fields={fields}
          err={err}
        />
        <div className='flex flex-col md:flex-row items-center md:justify-between'>
          <p
            className='text-indigo-500 cursor-pointer'
            onClick={() => navigate('/forgot-password')}
          >
            Forgot password?
          </p>
        </div>
      </AuthForm>
    </AuthLayout>
  );
}
