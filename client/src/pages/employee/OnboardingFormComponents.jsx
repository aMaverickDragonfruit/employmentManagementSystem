import { Upload, message, Form, Input, Select, DatePicker, Button } from 'antd';
const { RangePicker } = DatePicker;

import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { useState } from 'react';

const usStates = [
  { value: 'AL', label: 'AL' },
  { value: 'AK', label: 'AK' },
  { value: 'AZ', label: 'AZ' },
  { value: 'AR', label: 'AR' },
  { value: 'CA', label: 'CA' },
  { value: 'CO', label: 'CO' },
  { value: 'CT', label: 'CT' },
  { value: 'DE', label: 'DE' },
  { value: 'FL', label: 'FL' },
  { value: 'GA', label: 'GA' },
  { value: 'HI', label: 'HI' },
  { value: 'ID', label: 'ID' },
  { value: 'IL', label: 'IL' },
  { value: 'IN', label: 'IN' },
  { value: 'IA', label: 'IA' },
  { value: 'KS', label: 'KS' },
  { value: 'KY', label: 'KY' },
  { value: 'LA', label: 'LA' },
  { value: 'ME', label: 'ME' },
  { value: 'MD', label: 'MD' },
  { value: 'MA', label: 'MA' },
  { value: 'MI', label: 'MI' },
  { value: 'MN', label: 'MN' },
  { value: 'MS', label: 'MS' },
  { value: 'MO', label: 'MO' },
  { value: 'MT', label: 'MT' },
  { value: 'NE', label: 'NE' },
  { value: 'NV', label: 'NV' },
  { value: 'NH', label: 'NH' },
  { value: 'NJ', label: 'NJ' },
  { value: 'NM', label: 'NM' },
  { value: 'NY', label: 'NY' },
  { value: 'NC', label: 'NC' },
  { value: 'ND', label: 'ND' },
  { value: 'OH', label: 'OH' },
  { value: 'OK', label: 'OK' },
  { value: 'OR', label: 'OR' },
  { value: 'PA', label: 'PA' },
  { value: 'RI', label: 'RI' },
  { value: 'SC', label: 'SC' },
  { value: 'SD', label: 'SD' },
  { value: 'TN', label: 'TN' },
  { value: 'TX', label: 'TX' },
  { value: 'UT', label: 'UT' },
  { value: 'VT', label: 'VT' },
  { value: 'VA', label: 'VA' },
  { value: 'WA', label: 'WA' },
  { value: 'WV', label: 'WV' },
  { value: 'WI', label: 'WI' },
  { value: 'WY', label: 'WY' },
];

export const personalInfoFieldsOne = [
  {
    name: 'firstName',
    placeholder: 'First Name',
    type: 'text',
    rules: [
      {
        required: true,
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
        required: true,
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

export const personalInfoFieldsTwo = [
  {
    name: 'gender',
    placeholder: 'Gender',
    type: 'select',
    defaultOption: 'Gender',
    options: [
      {
        value: 'male',
        label: 'Male',
      },
      {
        value: 'female',
        label: 'Female',
      },
      {
        value: 'none',
        label: 'Prefer not to answer',
      },
    ],
    rules: [
      {
        required: true,
        message: 'Please select your gender',
      },
    ],
    onChange: (value) => console.log(value),
  },
  {
    name: 'dateOfBirth',
    placeholder: 'Date of Birth',
    type: 'datePicker',
    rules: [
      {
        required: true,
        message: 'Please enter the date of birth',
      },
    ],
    onChange: (date, dateString) => {
      console.log(date, dateString);
    },
  },
  {
    name: 'ssn',
    placeholder: 'SSN',
    type: 'input',
    rules: [
      {
        required: true,
        message: 'Please enter your ssn',
      },
    ],
  },
];

export const addressFields = [
  {
    name: 'addressOne',
    placeholder: 'Street Address',
    type: 'input',
    rules: [
      {
        required: true,
        message: 'Please enter your address',
      },
    ],
  },
  {
    name: 'addressTwo',
    placeholder: 'Street Address Line 2',
    type: 'input',
  },
  {
    name: 'city',
    placeholder: 'City',
    type: 'input',
    rules: [
      {
        required: true,
        message: 'Please enter your city',
      },
    ],
  },
  {
    name: 'state',
    placeholder: 'State',
    type: 'select',
    options: usStates,
    rules: [
      {
        required: true,
        message: 'Please select your state',
      },
    ],
    onChange: (value) => console.log(value),
    onSearch: (value) => console.log(`search: ${value}`),
  },
  {
    name: 'zipCode',
    placeholder: 'Zip Code',
    type: 'input',
    rules: [
      {
        required: true,
        message: 'Please enter your zip code',
      },
    ],
  },
];

export const referralAndEmergencyFields = [
  {
    name: 'firstName',
    placeholder: 'First Name',
    type: 'text',
    rules: [
      {
        required: true,
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
        required: true,
        message: 'Please enter your last name',
      },
    ],
  },
  {
    name: 'phone',
    placeholder: 'Phone',
    type: 'text',
    rules: [
      {
        required: true,
        message: 'Please enter the phone number',
      },
    ],
  },
  {
    name: 'relationship',
    placeholder: 'Relationship',
    type: 'text',
    rules: [
      {
        required: true,
        message: 'Please specify the relationship',
      },
    ],
  },
  {
    name: 'email',
    placeholder: 'Email',
    type: 'text',
    rules: [
      {
        required: true,
        message: 'Please enter email',
      },
    ],
  },
];

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
    style: { minWidth: '200px' },
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
                Add
              </Button>
            ) : (
              <Button
                block
                icon={<PlusOutlined />}
                type='dashed'
                onClick={() => add()}
              >
                Add
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
      // width='10'
      // className='border-2 border-rose-500'
    >
      <InputField field={field} />
    </Form.Item>
  );
};
