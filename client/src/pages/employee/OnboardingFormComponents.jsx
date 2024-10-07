import { Upload, message, Form, Input, Select } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useState } from 'react';

const InputLabel = ({ children }) => {
  return <div style={{ marginTop: 8 }}>{children}</div>;
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

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export const ProfilePictureUpload = () => {
  const [fileList, setFileList] = useState([]);

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

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
    <div>
      <Upload
        action='https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload'
        name='profilePicture'
        listType='picture-card'
        fileList={fileList}
        beforeUpload={beforeUpload}
        onChange={handleChange}
        maxCount={1}
      >
        {fileList.length === 0 ? (
          <UploadBtn label={'Upload'} />
        ) : (
          <UploadBtn label={'Update'} />
        )}
      </Upload>
      <InputLabel>Upload Profile Picture</InputLabel>
    </div>
  );
};

const InputField = ({ field }) => {
  if (field.type === 'password') {
    return (
      <Input.Password
        placeholder={field.placeholder}
        size='large'
      />
    );
  } else if (field.type === 'select') {
    return (
      <Select
        placeholder={field.placeholder}
        options={field.options}
        defaultValue={field.defaultOption}
        onChange={field.onChange}
      />
    );
  } else {
    return (
      <Input
        placeholder={field.placeholder}
        size='large'
      />
    );
  }
};

export const FormItem = ({ field }) => {
  return (
    <Form.Item
      name={field.name}
      rules={field.rules}
      dependencies={field.dependencies}
      hasFeedback
    >
      <div>
        <InputField field={field} />
        <InputLabel>{field.placeholder}</InputLabel>
      </div>
    </Form.Item>
  );
};
