import React from 'react';
import { Alert, Button, Form, Input, Typography } from 'antd';
const { Title } = Typography;
import { CloseIcon } from '../CloseIcon';

export default function AuthFields({
  fields,
  title,
  buttonText,
  onSubmit,
  onClose,
  err,
}) {
  return (
    <div className='relative'>
      <CloseIcon onClick={onClose} />
      <Title
        style={{ textAlign: 'center' }}
        level={3}
      >
        {title}
      </Title>
      <Form
        name='auth-form'
        layout='vertical'
        autoComplete='off'
        onFinish={onSubmit}
        onSubmitCapture={(e) => e.preventDefault()}
      >
        {fields.map((field) => (
          <Form.Item
            key={field.name}
            label={field.placeholder}
            name={field.name}
            rules={field.rules}
            dependencies={field.dependencies}
            hasFeedback
          >
            {field.type === 'password' ? (
              <Input.Password
                placeholder={field.placeholder}
                size='large'
              />
            ) : (
              <Input
                placeholder={field.placeholder}
                size='large'
              />
            )}
          </Form.Item>
        ))}
        <Form.Item>
          <Button
            style={{ width: '100%' }}
            type='primary'
            htmlType='submit'
            size='large'
          >
            {buttonText}
          </Button>
        </Form.Item>
      </Form>
      {err ? (
        <Alert
          style={{ marginBottom: '10px' }}
          message={err}
          type='error'
          showIcon
        />
      ) : (
        <></>
      )}
    </div>
  );
}
