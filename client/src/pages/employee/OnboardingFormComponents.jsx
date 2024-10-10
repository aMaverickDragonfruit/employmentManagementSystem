import { Upload, message, Form, Input, Select, DatePicker, Button } from 'antd';
const { RangePicker } = DatePicker;

import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
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

export const FormList = ({ listName, inputFields, isReferral }) => {
  return (
    <Form.List name={listName}>
      {(fields, { add, remove }) => (
        <>
          {fields.map(({ key, name }) => (
            <div
              className='flex'
              key={key}
            >
              {inputFields.map((field) => (
                <Form.Item
                  label={field.placeholder}
                  key={field.name}
                  name={[name, field.name]}
                  rules={field.rules}
                  hasFeedback
                >
                  <Input
                    placeholder={field.placeholder}
                    size='large'
                  />
                </Form.Item>
              ))}

              <MinusCircleOutlined onClick={() => remove(name)} />
            </div>
          ))}

          <Form.Item>
            {isReferral && fields.length >= 1 ? (
              <Button
                block
                icon={<PlusOutlined />}
                type='dashed'
                disabled
                onClick={() => add()}
              >
                Add Referral
              </Button>
            ) : (
              <Button
                block
                icon={<PlusOutlined />}
                type='dashed'
                onClick={() => add()}
              >
                Add Referral
              </Button>
            )}
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export const FormItem = ({ field }) => {
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
