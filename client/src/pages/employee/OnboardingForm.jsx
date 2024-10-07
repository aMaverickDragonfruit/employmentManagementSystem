import { Typography, Form, Upload } from 'antd';
const { Title } = Typography;
import { ProfilePictureUpload, FormItem } from './OnboardingFormComponents';

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
        value: 'undefine',
        label: 'Undefine',
      },
    ],
    onChange: () => console.log(value),
  },
];

export default function OnboardingForm() {
  const [form] = Form.useForm();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <>
      <Title>Onboarding Form</Title>
      <Form
        form={form}
        name='onboarding-form'
        autoComplete='off'
        onFinish={onSubmit}
        onSubmitCapture={(e) => e.preventDefault()}
      >
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
          <div>
            {personalInfoFieldsTwo.map((field) => (
              <FormItem
                key={field.name}
                field={field}
              />
            ))}
          </div>
        </div>
      </Form>
    </>
  );
}
