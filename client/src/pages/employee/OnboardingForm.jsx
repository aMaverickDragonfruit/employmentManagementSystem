import { Typography, Form, Upload, Steps, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Step } = Steps;
const { Title, Text } = Typography;
import PageLayout from '../../components/layout/Page';
import {
  ProfilePictureUpload,
  FormItem,
  FormList,
} from './OnboardingFormComponents';
import { useState } from 'react';

const formStyle = {
  minHeight: '100%',
};

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

const personalInfoFieldsTwo = [
  {
    name: 'gender',
    placeholder: 'Gender',
    type: 'select',
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
    onChange: (value) => console.log(value),
  },
  {
    name: 'birthDate',
    placeholder: 'Date of Birth',
    type: 'datePicker',
    onChange: (date, dateString) => {
      console.log(date, dateString);
    },
  },
  {
    name: 'ssn',
    placeholder: 'SSN',
    type: 'input',
  },
];

const addressFields = [
  {
    name: 'addressOne',
    placeholder: 'Street Address',
    type: 'input',
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
  },
  {
    name: 'state',
    placeholder: 'State',
    type: 'select',
    options: usStates,
    onChange: (value) => console.log(value),
    onSearch: (value) => console.log(`search: ${value}`),
  },
  {
    name: 'zipCode',
    placeholder: 'Zip Code',
    type: 'input',
  },
];

const referralAndEmergencyFields = [
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
    name: 'relationship',
    placeholder: 'Relationship',
    type: 'text',
  },
];

const props = {
  name: 'file',
  action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
  headers: {
    authorization: 'authorization-text',
  },
  onChange(info) {
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
};

export default function OnboardingForm() {
  const [citizenship, setCitizenship] = useState(null);
  const citizenshipField = {
    name: 'citizenship',
    placeholder: 'Citizenship',
    type: 'select',
    options: [
      {
        value: 'usCitizen',
        label: 'US Citizen',
      },
      {
        value: 'greenCard',
        label: 'Green Card Holder',
      },
      {
        value: 'others',
        label: 'Others',
      },
    ],
    onChange: (value) => setCitizenship(value),
  };

  const [workVisa, setWorkVisa] = useState(null);
  const workVisaField = {
    name: 'workVisaField',
    placeholder: 'Work Authorization',
    type: 'select',
    options: [
      { label: 'H1-B', value: 'h1b' },
      { label: 'L2', value: 'l2' },
      { label: 'F1(OPT/CPT)', value: 'f1' },
      { label: 'Others', value: 'others' },
    ],
    onChange: (value) => setWorkVisa(value),
  };

  const visaInputField = {
    name: 'visaInput',
    placeholder: 'Enter your visa type',
    type: 'input',
  };

  const workAuthDurationField = {
    name: 'workAuthDuration',
    placeholder: 'Start and End Date',
    type: 'rangePicker',
    onChange: (value) =>
      console.log(`start: ${new Date(value[0])} end: ${new Date(value[1])}`),
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const steps = [
    {
      title: 'Step 1',
      content: (
        <div>
          <Title level={3}>Profile Picture</Title>
          <Form.Item
            name='profilePicture'
            valuePropName='fileList'
            getValueFromEvent={normFile}
          >
            <ProfilePictureUpload />
          </Form.Item>
        </div>
      ),
    },
    {
      title: 'Step 2',
      content: (
        <div>
          <Title level={3}>Personal Information</Title>
          <div className='flex'>
            {personalInfoFieldsOne.map((field) => (
              <FormItem
                key={field.name}
                field={field}
              />
            ))}
          </div>
          <div className='flex'>
            {personalInfoFieldsTwo.map((field) => (
              <FormItem
                key={field.name}
                field={field}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'Step 3',
      content: (
        <div>
          <Title level={3}>Address</Title>
          <div className='flex'>
            {addressFields.map((field) => (
              <FormItem
                key={field.name}
                field={field}
              />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'Step 4',
      content: (
        <div>
          <Title level={3}>Work Authorization</Title>
          <div className='flex'>
            <FormItem
              key={citizenshipField.name}
              field={citizenshipField}
            />
            {citizenship === 'others' && (
              <FormItem
                key={workVisaField.name}
                field={workVisaField}
              />
            )}
            {workVisa === 'f1' && (
              <Form.Item
                key='opt-receipt'
                label='Upload your OPT Receipt'
              >
                <Upload {...props}>
                  <Button
                    icon={<UploadOutlined />}
                    size='large'
                  >
                    Click to Upload your OPT receipt
                  </Button>
                </Upload>
              </Form.Item>
            )}
            {workVisa === 'others' && (
              <FormItem
                key={visaInputField.name}
                field={visaInputField}
              />
            )}
            {citizenship === 'others' && (
              <FormItem
                key={workAuthDurationField.name}
                field={workAuthDurationField}
              />
            )}
          </div>
        </div>
      ),
    },
    {
      title: 'Step 5',
      content: (
        <div>
          <Title level={3}>Referral</Title>
          <FormList
            listName='referralList'
            inputFields={referralAndEmergencyFields}
            isReferral={true}
          />
        </div>
      ),
    },
    {
      title: 'Step 6',
      content: (
        <div>
          <Title level={3}>Emergency Contacts (Optional)</Title>
          <FormList
            listName='emergencyList'
            inputFields={referralAndEmergencyFields}
            isReferral={false}
          />
        </div>
      ),
    },
    {
      title: 'Step 7',
      content: (
        <div>
          <Title level={3}>Review Application</Title>
          <Text>Uploaded files</Text>
        </div>
      ),
    },
  ];

  const [current, setCurrent] = useState(0);

  const [form] = Form.useForm();

  const next = () => {
    form
      .validateFields()
      .then(() => {
        setCurrent(current + 1);
      })
      .catch((info) => {
        console.log('Validation Failed:', info);
      });
  };

  const prev = () => {
    setCurrent(current - 1);
  };

  const onSubmit = () => {
    const values = form.getFieldsValue(true);

    console.log(values);
  };

  return (
    <PageLayout>
      <Title>Onboarding Form</Title>
      <Form
        form={form}
        layout='vertical'
        name='onboarding-form'
        onFinish={onSubmit}
        onSubmitCapture={(e) => e.preventDefault()}
        className='border-2 border-rose-400'
        style={formStyle}
      >
        <div>
          <div className='steps-content'>{steps[current].content}</div>

          <div
            className='steps-btns'
            style={{ marginTop: 24 }}
          >
            {current > 0 && (
              <Button
                style={{ margin: '0 8px' }}
                onClick={() => prev()}
              >
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button
                type='primary'
                onClick={() => next()}
              >
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button
                type='primary'
                htmlType='submit'
              >
                Submit
              </Button>
            )}
          </div>
        </div>
        <Steps
          size='small'
          current={current}
          style={{ marginTop: 24 }}
        >
          {steps.map((item) => (
            <Step
              key={item.title}
              title={item.title}
            />
          ))}
        </Steps>
      </Form>
    </PageLayout>
  );
}
