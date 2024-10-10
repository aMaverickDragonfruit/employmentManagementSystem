import {
  Upload,
  message,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Typography,
} from 'antd';
const { Title } = Typography;
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

import React from 'react';
import { useState } from 'react';

const personalInfoFieldsOne = [
  {
    name: 'firstName',
    placeholder: 'First Name',
    type: 'text',
    rules: [
      {
        require: true,
        message: 'Please enter your first name',
      },
    ],
  },
  {
    name: 'middleName',
    placeholder: 'Middle Name',
    type: 'text',
  },
  {
    name: 'lastName',
    placeholder: 'Last Name',
    type: 'text',
    rules: [
      {
        require: true,
        message: 'Please enter your last name',
      },
    ],
  },

  {
    name: 'preferredName',
    placeholder: 'Preferred Name',
    type: 'text',
  },
];

const normFile = (e) => {
  console.log('Upload event:', e);
  if (Array.isArray(e)) {
    return e;
  }
  return e && e.fileList;
};

const UploadBtn = ({ label }) => {
  return (
    <button
      style={{
        border: 0,
        background: 'none',
      }}
      type='button'
    >
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        {label}
      </div>
    </button>
  );
};

const onFinish = (values) => {
  console.log('Success:', values);
};
const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const InputField = ({ field, value, onChange }) => {
  const commonProps = {
    placeholder: field.placeholder,
    size: 'large',
    value,
    onChange,
  };

  switch (field.type) {
    case 'password':
      return <Input.Password {...commonProps} />;
    case 'select':
      return (
        <Select
          {...commonProps}
          showSearch
          options={field.options}
          defaultValue={field.defaultOption}
          onChange={(v) => {
            onChange(v);
            field.onChange && field.onChange(v);
          }}
          onSearch={field.onSearch}
        />
      );
    case 'datePicker':
      return (
        <DatePicker
          {...commonProps}
          onChange={(date, dateString) => {
            onChange(date);
            field.onChange && field.onChange(date, dateString);
          }}
          format='MM-DD-YYYY'
        />
      );
    case 'rangePicker':
      return (
        <RangePicker
          {...commonProps}
          onChange={(date, dateString) => {
            onChange(date);
            field.onChange && field.onChange(date, dateString);
          }}
          format='MM-DD-YYYY'
        />
      );
    default:
      return <Input {...commonProps} />;
  }
};

const FormItem = ({ field }) => {
  return (
    <Form.Item
      label={field.placeholder}
      name={field.name}
      rules={field.rules}
      dependencies={field.dependencies}
      hasFeedback
    >
      <InputField field={field} />
    </Form.Item>
  );
};

const App = () => {
  const beforeUpload = (file) => {
    // console.log(file);
    // Optionally validate file type and size
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
      //   return Upload.LIST_IGNORE;
      return false;
    }

    return true;
  };
  return (
    <Form
      name='basic'
      labelCol={{
        span: 8,
      }}
      wrapperCol={{
        span: 16,
      }}
      style={{
        maxWidth: 600,
      }}
      initialValues={{
        remember: true,
        profilePicture: [
          {
            uid: '1',
            name: 'image.png',
            status: 'done',
            url: 'http://localhost:6173/files/6f684825-352b-4053-92f9-4cd11ae1f341.jpg',
          },
        ],
        firstName: 'Wei',
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item
        name='profilePicture'
        label='Upload'
        valuePropName='fileList'
        getValueFromEvent={normFile}
      >
        <Upload
          action='http://localhost:6173/upload'
          name='file'
          listType='picture-card'
          // fileList={fileList}
          beforeUpload={beforeUpload}
          // onChange={handleChange}
        >
          <UploadBtn label={'Update'} />
        </Upload>
      </Form.Item>

      <Title level={3}>Personal Information</Title>
      <div className='flex'>
        {personalInfoFieldsOne.map((field) => (
          <FormItem key={field.name} field={field} />
        ))}
      </div>

      <Form.Item
        wrapperCol={{
          offset: 8,
          span: 16,
        }}
      >
        <Button type='primary' htmlType='submit'>
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};
export default App;
