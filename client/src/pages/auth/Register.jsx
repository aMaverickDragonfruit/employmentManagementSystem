import AuthFields from '../../components/auth/AuthFields';
import AuthForm from '../../components/auth/AuthForm';
import AuthLayout from '../../components/auth/AuthLayout';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { signupUser } from '../../features/userSlice';
import { useDispatch } from 'react-redux';

const fields = [
  {
    placeholder: 'Email',
    name: 'userName',
    type: 'text',
    rules: [
      {
        required: true,
        message: 'Invalid Email Input!',
      },
    ],
  },
  {
    placeholder: 'Password',
    name: 'password',
    type: 'password',
    rules: [
      {
        required: true,
        message: 'Invalid Password Input!',
      },
    ],
  },
  {
    placeholder: 'Confirm Password',
    name: 'confirm',
    type: 'password',
    dependencies: ['password'],
    rules: [
      {
        required: true,
        message: 'Please confirm your password!',
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve();
          }
          return Promise.reject(
            new Error('The new password that you entered do not match!')
          );
        },
      }),
    ],
  },
];
export default function Register() {
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const dispatch = useDispatch();

  const { registerToken } = useParams();

  // console.log(registerToken);

  const onSubmit = async (data) => {
    const credentials = {
      userName: data.userName,
      password: data.password,
      registerToken,
    };
    // console.log(credentials);
    try {
      await dispatch(signupUser(credentials)).unwrap();
      navigate('/login');
    } catch (err) {
      setErr(err);
    }
  };

  const onClose = () => {
    console.log('close sign up form');
  };

  return (
    <AuthLayout>
      <AuthForm>
        <AuthFields
          fields={fields}
          title={'Sign up'}
          buttonText={'Register'}
          onSubmit={onSubmit}
          onClose={onClose}
          err={err}
        />
        <p>
          Already have an account.{' '}
          <span
            className='text-indigo-500 cursor-pointer'
            onClick={() => navigate('/login')}
          >
            Sign in
          </span>
        </p>
      </AuthForm>
    </AuthLayout>
  );
}
