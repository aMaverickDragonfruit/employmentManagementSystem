import {
  Typography,
  Form,
  Upload,
  message,
  Select,
  DatePicker,
  Input,
  Button,
  Image,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import {
  UploadBtn,
  FormItem,
  personalInfoFieldsOne,
  addressFields,
  FormList,
  referralAndEmergencyFields,
} from '../pages/employee/OnboardingFormComponents';
import {
  commonInputProps,
  formInputsStyle,
  genderSelectProps,
} from '../pages/employee/ProfileComponents';
const { Title } = Typography;
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateCurUserProfile } from '../features/profileSlice';
import dayjs from 'dayjs';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default function ProfileForm({ isEditable, profile }) {
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

  // changed for demo
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

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
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

  // for work visa fields
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

  // for work visa input fields
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

  // for work visa input fields
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

  const dispatch = useDispatch();

  const prepareInitialValues = (profile) => {
    // Destructure necessary fields from profile with default values
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
      reference,
      emergencyContacts = [],
      documents = [],
    } = profile;

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

      initialValues.uploadedFiles = documents.map((document) => ({
        uid: document._id,
        name: document.fileType,
        fileStatus: document.status,
        status: 'done',
        url: document.fileUrl,
      }));

      // Assign documents using the helper function
      initialValues.profilePicture = constructDocument(profileDoc, -1);
      initialValues.driverLicense = constructDocument(driverLicenseDoc, -2);
      initialValues.optReceipt = constructDocument(optReceiptDoc, -3);
      initialValues.optEAD = constructDocument(optEADDoc, -4);
      initialValues.i983 = constructDocument(i983Doc, -5);
      initialValues.i20 = constructDocument(i20Doc, -6);
    }

    console.log(initialValues);
    return initialValues;
  };

  useEffect(() => {
    if (profile) {
      setCitizenship(profile.citizenship);
      setWorkVisa(profile.workAuthType);
      const initialValues = prepareInitialValues(profile);
      form.setFieldsValue(initialValues);
    }
  }, [profile, form]);

  const onSubmit = (values) => {
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
    // console.log(newDocuments);

    const data = {
      ...rest,
      dateOfBirth: newDateOfBirth,
      reference: newReference,
      workAuthStartDate: newStartDate,
      workAuthEndDate: newEndDate,
      documents: newDocuments,
      status: 'Pending',
    };

    console.log(data);
    dispatch(updateCurUserProfile(data));
  };

  return (
    <>
      {contextHolder}
      {isEditable && disabled && (
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
        style={{ marginBottom: '50px' }}
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
        <Title level={4}>Work Authorization</Title>
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
            onPreview={handlePreview}
          />
        </Form.Item>
        {previewImage && (
          <Image
            wrapperStyle={{
              display: 'none',
            }}
            preview={{
              visible: previewOpen,
              onVisibleChange: (visible) => setPreviewOpen(visible),
              afterOpenChange: (visible) => !visible && setPreviewImage(''),
            }}
            src={previewImage}
          />
        )}
      </Form>
    </>
  );
}
