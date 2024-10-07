import AuthFields from '../../components/auth/AuthFields';
import AuthForm from '../../components/auth/AuthForm';
import AuthLayout from '../../components/auth/AuthLayout';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [err, setErr] = useState(null);
  const fields = [
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

  const onSubmit = (data) => {
    console.log(data);
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
