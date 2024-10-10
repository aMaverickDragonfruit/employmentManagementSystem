import {
  Typography,
  Form,
  Upload,
  Steps,
  Button,
  message,
  Input,
  Space,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Step } = Steps;
const { Title, Text } = Typography;
import PageLayout from '../../components/layout/Page';
import { FormItem, FormList, UploadBtn } from './OnboardingFormComponents';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCurUserProfile,
  updateCurUserProfile,
} from '../../features/profileSlice';
import dayjs from 'dayjs';

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
    rules: [
      {
        require: true,
        message: 'Please select your gender',
      },
    ],
    onChange: (value) => console.log(value),
  },
  {
    name: 'dateOfBirth',
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
    rules: [
      {
        require: true,
        message: 'Please enter your ssn',
      },
    ],
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
    name: 'phone',
    placeholder: 'Phone',
    type: 'text',
    rules: [
      {
        require: true,
        message: 'Please enter the phone number',
      },
    ],
  },
  {
    name: 'relationship',
    placeholder: 'Relationship',
    type: 'text',
  },
  {
    name: 'email',
    placeholder: 'Email',
    type: 'text',
  },
];

export default function OnboardingForm() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { curProfile, loading, error } = useSelector(
    (state) => state.profileSlice
  );

  useEffect(() => {
    dispatch(fetchCurUserProfile());
  }, [dispatch]);

  const prepareInitialValues = (curProfile) => {
    const initialValues = {
      email: curProfile.email,
      firstName: curProfile.firstName,
      middleName: curProfile.middleName || '',
      lastName: curProfile.lastName,
      preferredName: curProfile.preferredName || '',
      gender: curProfile.gender || '',
      dateOfBirth: dayjs(curProfile.dateOfBirth),
      ssn: curProfile.ssn || '',
      cellPhone: curProfile.cellPhone || '',
      addressOne: curProfile.addressOne || '',
      addressTwo: curProfile.addressTwo || '',
      city: curProfile.city || '',
      state: curProfile.state || '',
      zipCode: curProfile.zipCode || '',
      citizenship: curProfile.citizenship || '',
      workAuthType: curProfile.workAuthType || '',
      workAuthDuration: [
        dayjs(curProfile.workAuthStartDate),
        dayjs(curProfile.workAuthEndDate),
      ],
      reference: curProfile.reference ? [curProfile.reference] : [],
      emergencyContacts: curProfile.emergencyContacts
        ? curProfile.emergencyContacts.map((contact) => ({
            ...contact,
          }))
        : [],
    };

    if (curProfile.documents && curProfile.documents.length > 0) {
      initialValues.profilePicture = [
        {
          uid: curProfile.documents[0].uid || '-1',
          name: curProfile.documents[0].name || 'image.png',
          response: { url: curProfile.documents[0].file || '' },
          status: 'done',
          url: curProfile.documents[0].file || '',
        },
      ];
      initialValues.optReceipt = [
        {
          uid: curProfile.documents[1].uid || '-2',
          name: curProfile.documents[1].name || 'image.png',
          response: { url: curProfile.documents[1].file || '' },

          status: 'done',
          url: curProfile.documents[1].file || '',
        },
      ];
    }

    return initialValues;
  };

  useEffect(() => {
    if (curProfile) {
      setCitizenship(curProfile.citizenship);
      setWorkVisa(curProfile.workAuthType);
      const initialValues = prepareInitialValues(curProfile);
      form.setFieldsValue(initialValues);

      // form.setFieldsValue({
      //   email: curProfile.email,
      //   firstName: curProfile.firstName,
      //   middleName: curProfile.middleName || '',
      //   lastName: curProfile.lastName,
      //   preferredName: curProfile.preferredName || '',
      //   gender: curProfile.gender,
      //   dateOfBirth: dayjs(curProfile.dateOfBirth),
      //   ssn: curProfile.ssn,
      //   cellPhone: curProfile.cellPhone,
      //   addressOne: curProfile.addressOne,
      //   addressTwo: curProfile.addressTwo,
      //   city: curProfile.city,
      //   state: curProfile.state,
      //   zipCode: curProfile.zipCode,
      //   citizenship: curProfile.citizenship,
      //   workAuthType: curProfile.workAuthType,
      //   optReceipt: [
      //     curProfile.documents.length > 0
      //       ? {
      //           uid: '1',
      //           name: 'OPT-Receipt.pdf',
      //           status: 'done',
      //           response: { url: curProfile.documents?.[1]?.file ?? '' },
      //           url: curProfile.documents?.[1]?.file ?? '',
      //         }
      //       : {},
      //   ],
      //   workAuthDuration: [
      //     dayjs(curProfile.workAuthStartDate),
      //     dayjs(curProfile.workAuthEndDate),
      //   ],
      //   reference: curProfile.reference ? [curProfile.reference] : [],
      //   emergencyContacts: curProfile.emergencyContacts
      //     ? curProfile.emergencyContacts.map((contact) => ({
      //         ...contact,
      //       }))
      //     : [],
      // });
    }
  }, [curProfile, form]);

  const [messageApi, contextHolder] = message.useMessage();
  const uploadProps = {
    name: 'file',
    action: 'http://localhost:6173/upload',
    headers: {
      authorization: 'authorization-text',
    },
    onChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        messageApi.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        messageApi.error(`${info.file.name} file upload failed.`);
      }
    },
  };

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
    name: 'workAuthType',
    placeholder: 'Work Authorization',
    type: 'select',
    options: [
      { label: 'H1-B', value: 'H1B' },
      { label: 'L2', value: 'L2' },
      { label: 'F1(OPT/CPT)', value: 'F1' },
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

  const beforeProfileUpload = (file) => {
    // console.log(file);
    // Optionally validate file type and size
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      messageApi.error('You can only upload image files!');
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      messageApi.error('Image must be smaller than 2MB!');
      return Upload.LIST_IGNORE;
      // return false;
    }

    return true;
  };
  const beforeOPTReceiptUpload = (file) => {
    // console.log(file);
    // Optionally validate file type and size
    const isPdf = file.type.startsWith('application/pdf');
    if (!isPdf) {
      messageApi.error('You can only upload pdf files!');
      return Upload.LIST_IGNORE;
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      messageApi.error('Image must be smaller than 2MB!');
      return Upload.LIST_IGNORE;
      // return false;
    }

    return true;
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

  const steps = [
    {
      title: 'Step 1',
      content: (
        <div>
          <Title level={3}>Profile Picture</Title>
          <Form.Item
            key='profilePicture'
            name='profilePicture'
            label='Upload here'
            valuePropName='fileList'
            getValueFromEvent={normFile}
          >
            <Upload
              {...uploadProps}
              listType='picture-card'
              beforeUpload={beforeProfileUpload}
            >
              <UploadBtn label={'Update'} />
            </Upload>
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
              <FormItem key={field.name} field={field} />
            ))}
          </div>
          <div className='flex'>
            {personalInfoFieldsTwo.map((field) => (
              <FormItem key={field.name} field={field} />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'Step 3',
      content: (
        <div>
          <Title level={3}>Contact</Title>
          <div className='flex'>
            <Form.Item name='cellPhone' label='Phone' key='phone'>
              <Input type='text' placeholder='Phone' size='large' />
            </Form.Item>
            <Form.Item name='email' label='Email' key='email'>
              <Input type='text' size='large' disabled />
            </Form.Item>
          </div>
        </div>
      ),
    },
    {
      title: 'Step 4',
      content: (
        <div>
          <Title level={3}>Address</Title>
          <div className='flex'>
            {addressFields.map((field) => (
              <FormItem key={field.name} field={field} />
            ))}
          </div>
        </div>
      ),
    },
    {
      title: 'Step 5',
      content: (
        <div>
          <Title level={3}>Work Authorization</Title>
          <div className='flex'>
            <FormItem key={citizenshipField.name} field={citizenshipField} />
            {citizenship === 'others' && (
              <FormItem key={workVisaField.name} field={workVisaField} />
            )}
            {workVisa === 'F1' && (
              <Form.Item
                name='optReceipt'
                key='opt-receipt'
                label='Upload your OPT Receipt'
                valuePropName='fileList'
                getValueFromEvent={normFile}
              >
                <Upload {...uploadProps} beforeUpload={beforeOPTReceiptUpload}>
                  <Button icon={<UploadOutlined />} size='large'>
                    Click to Upload your OPT receipt
                  </Button>
                </Upload>
              </Form.Item>
            )}
            {workVisa === 'others' && (
              <FormItem key={visaInputField.name} field={visaInputField} />
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
      title: 'Step 6',
      content: (
        <div>
          <Title level={3}>Referral</Title>
          <FormList
            listName='reference'
            inputFields={referralAndEmergencyFields}
            isReferral={true}
          />
        </div>
      ),
    },
    {
      title: 'Step 7',
      content: (
        <div>
          <Title level={3}>Emergency Contacts (Optional)</Title>
          <FormList
            listName='emergencyContacts'
            inputFields={referralAndEmergencyFields.slice(0, 5)}
            isReferral={false}
          />
        </div>
      ),
    },
  ];

  const [current, setCurrent] = useState(0);

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

    const {
      citizenship,
      dateOfBirth,
      optReceipt,
      profilePicture,
      reference,
      workAuthDuration,
      ...rest
    } = values;

    const newDateOfBirth = new Date(dateOfBirth);
    const newReference = reference[0] || [];
    const newStartDate = new Date(workAuthDuration[0]);
    const newEndDate = new Date(workAuthDuration[1]);
    const profileLink = profilePicture[0].response.url;
    const profileFile = { fileName: 'profilePicture', file: profileLink };
    const optLink = optReceipt[0].response.url;
    const optFile = { fileName: 'optReceipt', file: optLink };
    const newDocuments = [profileFile, optFile];

    const data = {
      ...rest,
      dateOfBirth: newDateOfBirth,
      reference: newReference,
      workAuthStartDate: newStartDate,
      workAuthEndDate: newEndDate,
      documents: newDocuments,
    };

    dispatch(updateCurUserProfile(data));

    // console.log(values);
  };

  return (
    <PageLayout>
      {contextHolder}
      <Title>Onboarding Form</Title>
      <Form
        form={form}
        layout='vertical'
        name='onboarding-form'
        onFinish={onSubmit}
        onSubmitCapture={(e) => e.preventDefault()}
        className='border-2 border-rose-400'
        style={formStyle}
        // initialValues={
        //   {
        //     profilePicture: [
        //       {
        //         uid: '1',
        //         name: 'image.png',
        //         status: 'done',
        //         url: 'http://localhost:6173/files/6f684825-352b-4053-92f9-4cd11ae1f341.jpg',
        //       },
        //     ],
        //     firstName: curProfile.firstName,
        //   }
        //   // initFormFields
        // }
      >
        <div>
          <div className='steps-content'>{steps[current].content}</div>

          <div className='steps-btns' style={{ marginTop: 24 }}>
            {current > 0 && (
              <Button style={{ margin: '0 8px' }} onClick={() => prev()}>
                Previous
              </Button>
            )}
            {current < steps.length - 1 && (
              <Button type='primary' onClick={() => next()}>
                Next
              </Button>
            )}
            {current === steps.length - 1 && (
              <Button type='primary' htmlType='submit'>
                Submit
              </Button>
            )}
          </div>
        </div>
        <Steps size='small' current={current} style={{ marginTop: 24 }}>
          {steps.map((item) => (
            <Step key={item.title} title={item.title} />
          ))}
        </Steps>
      </Form>
    </PageLayout>
  );
}
