import { Upload, message, Form, Input, Select, DatePicker, Button } from 'antd';
const { RangePicker } = DatePicker;

import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';

export const UploadBtn = ({ label }) => {
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
            <div className='flex' key={key}>
              {inputFields.map((field) => (
                <Form.Item
                  label={field.placeholder}
                  key={field.name}
                  name={[name, field.name]}
                  rules={field.rules}
                  hasFeedback
                >
                  <Input placeholder={field.placeholder} size='large' />
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
