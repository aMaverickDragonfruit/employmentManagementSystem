import { DownloadOutlined } from '@ant-design/icons';
import { Alert, Upload, Button, Steps, Typography, Form, message } from 'antd';
import { useState } from 'react';
const { Title } = Typography;

export const Message = ({ currentStep, curStatus, feedback }) => {
  if (curStatus === 'Pending') {
    return (
      <Alert
        showIcon
        type='info'
        message='HR is reviewing'
      />
    );
  }

  let file = '';
  switch (currentStep) {
    case 1:
      file = 'EAD Card';
      break;
    case 2:
      file = 'I-983';
      break;
    case 3:
      file = 'I-20';
      break;
    default:
      file = '';
  }

  const type = curStatus === 'Rejected' ? 'error' : 'warning';
  const description = curStatus === 'Rejected' ? feedback : '';

  return (
    <Alert
      message={`Please upload your ${file}`}
      description={description}
      showIcon
      type={type}
      style={{ width: '40%' }}
    />
  );
};

export const VisaSteps = ({ visaDocuments, feedback }) => {
  const stepItems = [
    {
      title: 'OPT Receipt',
    },
    {
      title: 'EAD',
    },
    {
      title: 'I-983',
    },
    {
      title: 'I-20',
    },
  ];

  // no visa documents uploaded yet, start uploading the EAD card
  // if (visaDocuments.length === 1) {
  //   return (
  //     <>
  //       <Alert
  //         message='Please submit your EAD card'
  //         showIcon
  //         type='warning'
  //       />
  //       <FileUpload />
  //       <Steps
  //         items={stepItems}
  //         current={1}
  //         status='process'
  //       />
  //     </>
  //   );
  // }

  // have visa docs uploaded, iterate the list, to check cur status and cur step
  let curStep = 1; // review from the EAD
  let curStatus = visaDocuments[1]?.status || '';
  let curFileName = '';

  for (let i = 1; i < visaDocuments.length; i++) {
    // if cur doc has not been approved, cannot move on next step
    if (visaDocuments[i].status !== 'Approved') {
      curStep = i;
      curStatus = visaDocuments[i].status;
      curFileName = visaDocuments[i].fileName;
      break;
    }
    // move on next step, cur status is approved
    curStep++;
    curStatus = 'Approved';
  }

  // all doc has been submitted and approved
  if (curStep === 4 && curStatus === 'Approved') {
    return (
      <>
        <Alert
          message='All documents has been approved!'
          type='success'
          showIcon
        />
        <Steps
          items={stepItems}
          current={curStep}
          status='finished'
        />
      </>
    );
  }

  // uploaded visa docs, but have not been approved. return message according next step and cur status
  const status = curStatus === 'Rejected' ? 'error' : 'process';
  return (
    <>
      <Message
        currentStep={curStep}
        curStatus={curStatus}
        feedback={feedback}
      />
      {(curStatus === 'New' || curStatus === 'Rejected') && (
        <FileUpload curFileName={curFileName} />
      )}
      {curStep === 2 && curStatus !== 'Pending' && <I983Templates />}
      <Steps
        items={stepItems}
        current={curStep}
        status={status}
      />
    </>
  );
};

const UploadForm = ({ uploadFileName }) => {
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
      console.log(info);
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

  const beforeFileUpload = (file) => {
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
    }

    return true;
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  return (
    <Form
      layout='vertical'
      name='visa-doc-upload'
      onFinish={onSubmit}
      onSubmitCapture={(e) => e.preventDefault()}
      style={{ border: 'solid', minWidth: '25%', padding: '20px' }}
    >
      {contextHolder}
      <Form.Item
        key='visa-doc'
        name={uploadFileName}
        label='Please upload your file'
        valuePropName='fileList'
        getValueFromEvent={normFile}
      >
        <Upload
          {...uploadProps}
          maxCount={1}
          beforeUpload={beforeFileUpload}
        >
          <Button>Choose your file</Button>
        </Upload>
      </Form.Item>

      <Button
        type='primary'
        size='small'
        htmlType='submit'
        style={{ marginTop: '40px' }}
      >
        Upload
      </Button>
    </Form>
  );
};

export const FileUpload = ({ curFileName }) => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);

  return (
    <div className='w-1/3'>
      {!isUploadOpen && (
        <Button onClick={() => setIsUploadOpen(true)}>
          Click here to upload
        </Button>
      )}
      {isUploadOpen && <UploadForm uploadFileName={curFileName} />}{' '}
    </div>
  );
};

const i983FileList = [
  {
    uid: '1',
    name: 'I-983-Template',
    status: 'done',
    url: 'https://www.ice.gov/doclib/sevis/pdf/i983.pdf',
  },
  {
    uid: '2',
    name: 'I-983-Sample',
    status: 'done',
    url: 'https://isss.utah.edu/forms-publications/documents/f-1/f1-form-i-983-sample.pdf',
  },
];

const I983Props = {
  showUploadList: {
    extra: ({}) => (
      <span
        style={{
          color: '#cccccc',
        }}
      ></span>
    ),
    showDownloadIcon: true,
    downloadIcon: <DownloadOutlined />,
    showRemoveIcon: false,
  },
  defaultFileList: i983FileList,
};

export const I983Templates = () => {
  return (
    <>
      <Upload {...I983Props}>
        <Title level={4}>I-983 Samples</Title>
      </Upload>
    </>
  );
};
