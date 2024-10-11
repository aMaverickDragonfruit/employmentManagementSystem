import {
  Typography,
  Form,
  Upload,
  message,
  Select,
  DatePicker,
  Input,
  Button,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import PageLayout from '../../components/layout/Page';
import {
  UploadBtn,
  TitleAndEdit,
  FormItem,
  personalInfoFieldsOne,
  addressFields,
  FormList,
  referralAndEmergencyFields,
} from './OnboardingFormComponents';
import {
  commonInputProps,
  formInputsStyle,
  genderSelectProps,
} from './ProfileComponents';
const { Title } = Typography;
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCurUserProfile,
  updateCurUserProfile,
} from '../../features/profileSlice';
import dayjs from 'dayjs';

export default function Profile() {
  const [form] = Form.useForm();

  // for uploading file fields
  const [messageApi, contextHolder] = message.useMessage();

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e && e.fileList;
  };

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

  // for work authorization fields
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

  const [disabled, setDisable] = useState(true);

  const { curProfile, loading, error } = useSelector(
    (state) => state.profileSlice
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurUserProfile());
  }, [dispatch]);

  const prepareInitialValues = (curProfile) => {
    let initialValues = {
      email: curProfile.email,
      firstName: curProfile.firstName,
      middleName: curProfile.middleName,
      lastName: curProfile.lastName,
      preferredName: curProfile.preferredName,
      gender: curProfile.gender,
      dateOfBirth: dayjs(curProfile.dateOfBirth),
      ssn: curProfile.ssn,
      cellPhone: curProfile.cellPhone,
      addressOne: curProfile.addressOne,
      addressTwo: curProfile.addressTwo,
      city: curProfile.city,
      state: curProfile.state,
      zipCode: curProfile.zipCode,
      citizenship: curProfile.citizenship,
      workAuthType: curProfile.workAuthType || null,
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
          name: curProfile.documents[0].fileName || 'profile.png',
          response: { url: curProfile.documents[0].fileUrl || '' },
          status: 'done',
          url: curProfile.documents[0].fileUrl || '',
        },
      ];
      initialValues.driverLicense = [
        {
          uid: curProfile.documents[1].uid || '-2',
          name: curProfile.documents[1].fileName || 'driver-license.png',
          response: { url: curProfile.documents[1].fileUrl || '' },
          status: 'done',
          url: curProfile.documents[1].fileUrl || '',
        },
      ];
      initialValues.optReceipt = [
        {
          uid: curProfile.documents[2].uid || '-3',
          name: curProfile.documents[2].fileName || 'OPT-Receipt.pdf',
          response: { url: curProfile.documents[2].fileUrl || '' },

          status: 'done',
          url: curProfile.documents[2].fileUrl || '',
        },
      ];

      initialValues.uploadedFiles = [
        {
          uid: curProfile.documents[0].uid || '-4',
          name: curProfile.documents[0].fileName || 'profile.png',
          response: { url: curProfile.documents[0].fileUrl || '' },
          status: 'done',
          url: curProfile.documents[0].fileUrl || '',
        },
        {
          uid: curProfile.documents[1].uid || '-5',
          name: curProfile.documents[1].fileName || 'driver-license.png',
          response: { url: curProfile.documents[1].fileUrl || '' },
          status: 'done',
          url: curProfile.documents[1].fileUrl || '',
        },
        {
          uid: curProfile.documents[2].uid || '-6',
          name: curProfile.documents[2].fileName || 'OPT-Receipt.pdf',
          response: { url: curProfile.documents[2].fileUrl || '' },

          status: 'done',
          url: curProfile.documents[2].fileUrl || '',
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
    }
  }, [curProfile, form]);

  const onSubmit = (values) => {
    const {
      dateOfBirth,
      optReceipt,
      driverLicense,
      profilePicture,
      reference,
      workAuthDuration,
      ...rest
    } = values;

    const newDateOfBirth = new Date(dateOfBirth);
    const newReference = reference[0] || [];
    const newStartDate = new Date(workAuthDuration[0]);
    const newEndDate = new Date(workAuthDuration[1]);
    const profileLink = profilePicture?.[0]?.response.url;
    const profileName = profilePicture?.[0]?.name;
    const profileFile = {
      fileType: 'profilePicture',
      fileName: profileName,
      fileUrl: profileLink,
      status: 'Approved',
    };
    const driverLicenseLink = driverLicense?.[1]?.response.url;
    const driverLicenseName = driverLicense?.[1]?.name;
    const driverLicenseFile = {
      fileType: 'driverLicense',
      fileName: driverLicenseName,
      fileUrl: driverLicenseLink,
      status: 'Approved',
    };
    const optLink = optReceipt[0].response.url;
    const optFileName = optReceipt[0].name;
    const optFile = {
      fileType: 'optReceipt',
      fileName: optFileName,
      fileUrl: optLink,
    };

    const newDocuments = [profileFile, driverLicenseFile, optFile];

    const data = {
      ...rest,
      dateOfBirth: newDateOfBirth,
      reference: newReference,
      workAuthStartDate: newStartDate,
      workAuthEndDate: newEndDate,
      documents: newDocuments,
      status: 'Pending',
    };

    dispatch(updateCurUserProfile(data));
  };

  return (
    <PageLayout>
      {contextHolder}
      <Title>Profile</Title>
      {disabled && (
        <Button
          variant='outlined'
          size='large'
          style={{ width: '100px', marginBottom: '1rem' }}
          onClick={() => setDisable(false)}
        >
          Edit
        </Button>
      )}
      <Form
        form={form}
        disabled={disabled}
        name='profile-form'
        layout='vertical'
        autoComplete='off'
        onFinish={onSubmit}
        onSubmitCapture={(e) => e.preventDefault()}
        style={{ marginBottom: '200px' }}
      >
        {/* Buttons */}
        {!disabled && (
          <div className='flex pb-4 space-x-20'>
            <Button
              htmlType='submit'
              type='primary'
              size='large'
              style={{ width: '100px' }}
            >
              Save
            </Button>
            <Button
              size='large'
              style={{ width: '100px' }}
              onClick={() => setDisable(true)}
            >
              Cancel
            </Button>
          </div>
        )}

        <Title level={4}>Profile Picture</Title>
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
        <Title level={4}>Personal Information</Title>
        <div style={formInputsStyle}>
          {personalInfoFieldsOne.map((field) => (
            <FormItem
              key={field.name}
              field={field}
            />
          ))}
        </div>
        <div style={formInputsStyle}>
          <Form.Item
            label='Gender'
            name='gender'
            rules={[
              {
                required: true,
                message: 'Please select your gender',
              },
            ]}
          >
            <Select
              {...commonInputProps}
              {...genderSelectProps}
              // defaultValue='Gender'
              onChange={(val) => console.log(val)}
            />
          </Form.Item>
          <Form.Item
            label='Date of Birth'
            name='dateOfBirth'
            rules={[
              {
                required: true,
                message: 'Please select your birthday',
              },
            ]}
          >
            <DatePicker {...commonInputProps} />
          </Form.Item>
          <Form.Item
            label='SSN'
            name='ssn'
            rules={[
              {
                required: true,
                message: 'Please enter SSN',
              },
              {
                validator: (_, value) => {
                  const ssnPattern =
                    /^(?!000|666|9\d{2})\d{3}([- ]?)\d{2}\1\d{4}$/;
                  if (value && ssnPattern.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Invalid SSN'));
                },
              },
            ]}
          >
            <Input {...commonInputProps} />
          </Form.Item>
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
        <Title level={4}>Contact</Title>
        <div style={formInputsStyle}>
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
              {...commonInputProps}
              placeholder='Phone'
            />
          </Form.Item>
          <Form.Item
            name='email'
            label='Email'
            key='email'
          >
            <Input
              {...commonInputProps}
              disabled
            />
          </Form.Item>
        </div>
        <Title level={4}>Address</Title>
        <div style={formInputsStyle}>
          {addressFields.map((field) => (
            <FormItem
              key={field.name}
              field={field}
            />
          ))}
        </div>
        {/* Work Authorization */}
        <Title>Work Authorization</Title>
        <div style={formInputsStyle}>
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
          {workVisa === 'F1' && (
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
        {/* Reference */}
        <Title level={4}>Reference</Title>
        <div className='flex flex-col'>
          <FormList
            listName='reference'
            inputFields={referralAndEmergencyFields}
            isReferral={true}
          />
        </div>
        {/* Emergency Contact */}
        <Title level={4}>Emergency Contacts</Title>
        <div className='flex flex-col'>
          <FormList
            listName='emergencyContacts'
            inputFields={referralAndEmergencyFields.slice(0, 5)}
            isReferral={false}
          />
        </div>
        <Title level={4}>Upload files</Title>
        {/* Uploaded Files */}
        <Form.Item
          name='uploadedFiles'
          key='uploaded files'
          valuePropName='fileList'
        >
          <Upload
            {...uploadProps}
            disabled
          ></Upload>
        </Form.Item>
      </Form>
    </PageLayout>
  );
}
