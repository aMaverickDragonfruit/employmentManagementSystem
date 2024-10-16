import {
  Typography,
  Form,
  Upload,
  Steps,
  Button,
  message,
  Input,
  Alert,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
const { Step } = Steps;
const { Title, Text } = Typography;
import PageLayout from '../../components/layout/Page';
import {
  FormItem,
  FormList,
  UploadBtn,
  personalInfoFieldsOne,
  personalInfoFieldsTwo,
  addressFields,
  referralAndEmergencyFields,
  ApplicationStatus,
} from './OnboardingFormComponents';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  // fetchCurUserProfile,
  updateCurUserProfile,
} from '../../features/profileSlice';
import dayjs from 'dayjs';
import { commonInputProps } from './ProfileComponents';
import Page500 from '../Page500';
import { AppTitle } from '../../components/components';

const formStyle = {
  // minHeight: '200px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  paddingBottom: '40px',
};

export default function OnboardingForm() {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const { curProfile, loading, error } = useSelector(
    (state) => state.profileSlice
  );

  // useEffect(() => {
  //   dispatch(fetchCurUserProfile());
  // }, [dispatch]);

  const prepareInitialValues = (curProfile) => {
    // Destructure necessary fields from curProfile with default values
    const {
      status,
      email,
      firstName,
      middleName = '',
      lastName,
      preferredName = '',
      gender,
      dateOfBirth,
      ssn = '',
      cellPhone = '',
      addressOne = '',
      addressTwo = '',
      city = '',
      state,
      zipCode = '',
      citizenship,
      workAuthType,
      workAuthStartDate,
      workAuthEndDate,
      reference = null,
      emergencyContacts = [],
      documents = [],
    } = curProfile;

    // Initialize initialValues with common fields
    const initialValues = {
      email,
      firstName,
      middleName,
      lastName,
    };

    // If status is not 'New', add additional fields
    if (status !== 'New') {
      Object.assign(initialValues, {
        preferredName,
        gender,
        dateOfBirth: dateOfBirth ? dayjs(dateOfBirth) : null,
        ssn,
        cellPhone,
        addressOne,
        addressTwo,
        city,
        state,
        zipCode,
        citizenship,
        workAuthType,
        workAuthDuration: [dayjs(workAuthStartDate), dayjs(workAuthEndDate)],
        reference: reference ? [reference] : [],
        emergencyContacts: emergencyContacts.map((contact) => ({ ...contact })),
      });

      // Destructure documents with default empty objects
      const [
        profileDoc = {},
        driverLicenseDoc = {},
        optReceiptDoc = {},
        optEADDoc = {},
        i983Doc = {},
        i20Doc = {},
      ] = documents;

      // Helper function to construct document objects
      const constructDocument = (document, uid) => {
        const { fileUrl, fileName, status } = document;
        if (!fileUrl) return [];

        return [
          {
            uid: uid.toString(),
            name: fileName || 'default.png',
            response: { url: fileUrl },
            fileStatus: status,
            status: 'done',
            url: fileUrl,
          },
        ];
      };

      // Assign documents using the helper function
      initialValues.profilePicture = constructDocument(profileDoc, -1);
      initialValues.driverLicense = constructDocument(driverLicenseDoc, -2);
      initialValues.optReceipt = constructDocument(optReceiptDoc, -3);
      initialValues.optEAD = constructDocument(optEADDoc, -4);
      initialValues.i983 = constructDocument(i983Doc, -5);
      initialValues.i20 = constructDocument(i20Doc, -6);
    }

    return initialValues;
  };

  useEffect(() => {
    if (curProfile) {
      setCitizenship(curProfile.citizenship);
      setWorkVisa(curProfile.workAuthType);
      const initialValues = prepareInitialValues(curProfile);
      form.setFieldsValue(initialValues);
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
    rules: [
      {
        required: true,
        message: 'Please select your citizenship',
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
    rules: [
      {
        required: true,
        message: 'Please select your work authorization',
      },
    ],
    onChange: (value) => setWorkVisa(value),
  };

  const visaInputField = {
    name: 'visaInput',
    placeholder: 'Enter your visa type',
    type: 'input',
    rules: [
      {
        required: true,
        message: 'Please enter your visa type',
      },
    ],
  };

  const workAuthDurationField = {
    name: 'workAuthDuration',
    placeholder: 'Start and End Date',
    type: 'rangePicker',
    rules: [
      {
        required: true,
        message: 'Please enter your work visa duration',
      },
    ],
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

  // changed to check image for demo
  const beforeOPTReceiptUpload = (file) => {
    // console.log(file);
    // Optionally validate file type and size
    // const isPdf = file.type.startsWith('application/pdf');
    // if (!isPdf) {
    //   messageApi.error('You can only upload pdf files!');
    //   return Upload.LIST_IGNORE;
    // }
    // const isLt2M = file.size / 1024 / 1024 < 2;
    // if (!isLt2M) {
    //   messageApi.error('Image must be smaller than 2MB!');
    //   return Upload.LIST_IGNORE;
    //   // return false;
    // }

    // return true;
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
          <div className='flex gap-24'>
            {personalInfoFieldsOne.map((field) => (
              <FormItem
                key={field.name}
                field={field}
              />
            ))}
          </div>
          <div className='flex gap-24'>
            {personalInfoFieldsTwo.map((field) => (
              <FormItem
                key={field.name}
                field={field}
              />
            ))}
            <Form.Item
              label='Upload Driver License'
              name='driverLicense'
              valuePropName='fileList'
              getValueFromEvent={normFile}
              rules={[
                {
                  required: true,
                  message: 'Please upload Driver License',
                },
              ]}
            >
              <Upload {...uploadProps}>
                <Button
                  icon={<UploadOutlined />}
                  {...commonInputProps}
                >
                  Click to Upload
                </Button>
              </Upload>
            </Form.Item>
          </div>
        </div>
      ),
    },
    {
      title: 'Step 3',
      content: (
        <div>
          <Title level={3}>Contact</Title>
          <div className='flex gap-24'>
            <Form.Item
              name='cellPhone'
              label='Phone'
              key='phone'
              rules={[
                {
                  required: true,
                  message: 'Please enter your phone number',
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
              ]}
            >
              <Input
                type='text'
                placeholder='Phone'
                size='large'
              />
            </Form.Item>
            <Form.Item
              name='email'
              label='Email'
              key='email'
            >
              <Input
                type='text'
                size='large'
                disabled
              />
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
          <div className='flex gap-x-24 gap-y-4 flex-wrap'>
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
      title: 'Step 5',
      content: (
        <div>
          <Title level={3}>Work Authorization</Title>
          <div className='flex gap-x-24 gap-y-4 flex-wrap'>
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
            {citizenship === 'others' && workVisa === 'F1' && (
              <Form.Item
                name='optReceipt'
                key='opt-receipt'
                label='Upload your OPT Receipt'
                valuePropName='fileList'
                getValueFromEvent={normFile}
                rules={[
                  {
                    required: true,
                    message: 'Please upload your OPT receipt',
                  },
                ]}
              >
                <Upload
                  {...uploadProps}
                  beforeUpload={beforeOPTReceiptUpload}
                >
                  <Button
                    icon={<UploadOutlined />}
                    size='large'
                  >
                    Click to Upload your OPT receipt
                  </Button>
                </Upload>
              </Form.Item>
            )}
            {citizenship === 'others' && workVisa === 'others' && (
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
      title: 'Step 6',
      content: (
        <div>
          <Title level={3}>Referral (Optional)</Title>
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
          <Title level={3}>Emergency Contacts (Required at least one)</Title>
          <FormList
            listName='emergencyContacts'
            inputFields={referralAndEmergencyFields.slice(0, 5)}
            isReferral={false}
            required
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
      dateOfBirth,
      profilePicture,
      driverLicense,
      optReceipt,
      optEAD,
      i983,
      i20,
      reference,
      workAuthDuration,
      ...rest
    } = values;

    const newDateOfBirth = new Date(dateOfBirth);
    const newReference = reference?.[0] || null;
    const newStartDate = new Date(workAuthDuration[0]);
    const newEndDate = new Date(workAuthDuration[1]);

    const profileName = profilePicture?.[0]?.name;
    const profileLink = profilePicture?.[0]?.response.url;
    const profileStatus = profilePicture?.[0]?.fileStatus;
    const profileFile = {
      fileType: 'profilePicture',
      fileName: profileName,
      fileUrl: profileLink,
      status: profileStatus,
    };

    const driverLicenseName = driverLicense?.[0]?.name;
    const driverLicenseLink = driverLicense?.[0]?.response.url;
    const driverLicenseStatus = driverLicense?.[0]?.fileStatus;
    const driverLicenseFile = {
      fileType: 'driverLicense',
      fileName: driverLicenseName,
      fileUrl: driverLicenseLink,
      status: driverLicenseStatus,
    };

    const optFileName = optReceipt?.[0]?.name;
    const optFileLink = optReceipt?.[0]?.response.url;
    const optFileStatus = optReceipt?.[0]?.fileStatus;
    const optFile = {
      fileType: 'optReceipt',
      fileName: optFileName,
      fileUrl: optFileLink,
      status: optFileStatus,
    };

    const optEADFileName = optEAD?.[0]?.name;
    const optEADFileLink = optEAD?.[0]?.response.url;
    const optEADFileStatus = optEAD?.[0]?.fileStatus;
    const optEADFile = {
      fileType: 'optEAD',
      fileName: optEADFileName,
      fileUrl: optEADFileLink,
      status: optEADFileStatus,
    };

    const i983FileName = i983?.[0]?.name;
    const i983FileLink = i983?.[0]?.response.url;
    const i983FileStatus = i983?.[0]?.fileStatus;
    const i983File = {
      fileType: 'i983',
      fileName: i983FileName,
      fileUrl: i983FileLink,
      status: i983FileStatus,
    };

    const i20FileName = i20?.[0]?.name;
    const i20FileLink = i20?.[0]?.response.url;
    const i20FileStatus = i20?.[0]?.fileStatus;
    const i20File = {
      fileType: 'i20',
      fileName: i20FileName,
      fileUrl: i20FileLink,
      status: i20FileStatus,
    };

    const newDocuments = [
      profileFile,
      driverLicenseFile,
      optFile,
      optEADFile,
      i983File,
      i20File,
    ];

    const data = {
      ...rest,
      dateOfBirth: newDateOfBirth,
      reference: newReference,
      workAuthStartDate: newStartDate,
      workAuthEndDate: newEndDate,
      documents: newDocuments,
      status: 'Pending',
    };

    // console.log(data);
    dispatch(updateCurUserProfile(data));
  };

  const applicationStatus = curProfile.status;
  const hrFeedback = curProfile.feedback;

  if (error) {
    return <Page500 message={error} />;
  }

  return (
    <PageLayout>
      {contextHolder}
      <AppTitle>Onboarding Form</AppTitle>

      <ApplicationStatus applicationStatus={applicationStatus} />
      {applicationStatus === 'Rejected' && (
        <Alert
          message='HR feedback'
          description={hrFeedback}
          type='error'
          showIcon
          style={{ maxWidth: '38%', marginBottom: '20px' }}
        />
      )}

      <Form
        form={form}
        layout='vertical'
        name='onboarding-form'
        onFinish={onSubmit}
        onSubmitCapture={(e) => e.preventDefault()}
        style={formStyle}
      >
        <div className='min-h-80 flex flex-col justify-between pb-10'>
          <div className='steps-content'>{steps[current].content}</div>

          <div
            className='steps-btns flex justify-center gap-96'
            // style={{ marginTop: 24 }}
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
