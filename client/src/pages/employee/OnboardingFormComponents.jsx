import {
  Typography,
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Steps,
} from 'antd';
const { RangePicker } = DatePicker;
const { Title } = Typography;

import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';

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
    // defaultOption: 'Gender',
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
    placeholder: 'Pick your birthday',
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
      {
        validator: (_, value) => {
          const ssnPattern = /^(?!000|666|9\d{2})\d{3}([- ]?)\d{2}\1\d{4}$/;
          if (value && ssnPattern.test(value)) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('Invalid SSN'));
        },
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
      {
        validator: (_, value) => {
          // Regular expression to match 5-digit or 5+4-digit US ZIP codes
          const zipPattern = /^\d{5}(-\d{4})?$/;

          if (value && zipPattern.test(value)) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('Invalid US ZIP Code'));
        },
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
      {
        validator: (_, value) => {
          const phonePattern =
            /^(\+1\s?)?(\([0-9]{3}\)|[0-9]{3})[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$/;
          if (value && phonePattern.test(value)) {
            return Promise.resolve();
          }
          return Promise.reject(new Error('Invalid US phone number'));
        },
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
    <Form.List
      name={listName}
      rules={
        !isReferral
          ? [
              {
                validator: async (_, names) => {
                  if (!names || names.length < 1) {
                    return Promise.reject(
                      new Error('At least one emergency contact is required')
                    );
                  }
                },
              },
            ]
          : []
      }
    >
      {(fields, { add, remove }, { errors }) => (
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
            <Form.ErrorList errors={errors} />
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

      // width='10'
      // className='border-2 border-rose-500'
    >
      <InputField field={field} />
    </Form.Item>
  );
};

export const TitleAndEdit = ({ title, handleClick }) => {
  return (
    <div className='min-w-full flex justify-between mt-4'>
      <Title level={3}>{title}</Title>
      <Button onClick={handleClick}>Edit</Button>
    </div>
  );
};

const StatusNew = () => {
  return (
    <>
      <CheckCircleOutlined />
    </>
  );
};

export const ApplicationStatus = ({ applicationStatus }) => {
  // console.log(applicationStatus);
  let current = 0;
  let status = 'process';
  switch (applicationStatus) {
    case 'New':
      current = 0;
      break;
    case 'Pending':
      current = 1;
      break;
    case 'Approved':
      current = 2;
      status = 'finish';
      break;
    case 'Rejected':
      current = 2;
      status = 'error';
      break;
    default:
      current = 0;
  }

  const items = [
    {
      title: 'Submitted',
    },
    {
      title: 'HR reviewing',
    },
    {
      title: 'HR approved',
    },
  ];

  return (
    <>
      <Title level={4}>Application Status</Title>
      <Steps
        items={items}
        current={current}
        status={status}
        style={{ paddingTop: '10px', paddingBottom: '20px' }}
      />
    </>
  );
};
