import { DownloadOutlined } from '@ant-design/icons';
import { Alert, Upload, Button, Steps } from 'antd';

export const Message = ({ curStep, curStatus, feedback }) => {
  let file = '';
  switch (curStep) {
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

  const type = curStatus === 'Rejected' ? 'error' : 'info';
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

const uploadProps = {
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

export const FileUpload = () => {
  return (
    <Upload {...uploadProps}>
      <Button>Click here to upload</Button>
    </Upload>
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

  let curStep = 1; // once user able to view this page opt receipt has been approved
  let curStatus = '';
  console.log(`init cur step: ${curStep}`);

  // no visa documents uploaded
  if (visaDocuments.length === 1) {
    curStep = 1;
  } else {
    // any visa docs uploaded, iterate the list
    for (let i = 1; i < visaDocuments.length; i++) {
      // current step stop at not approved file
      if (visaDocuments[i].status !== 'Approved') {
        curStep = i;
        curStatus = visaDocuments[i].status;
        break;
      }
      curStep++;
    }
  }

  // if cur status is rejected step status set to error, else set to process
  const status = curStatus === 'Rejected' ? 'error' : 'process';

  console.log(`curStep: ${curStep}`);
  console.log(`curStatus: ${curStep}`);

  return (
    <>
      <Message
        curStep={curStep}
        curStatus={curStatus}
        feedback={feedback}
      />
      {curStep < 4 && <FileUpload />}
      <Steps
        items={stepItems}
        current={curStep}
        status={status}
      />
    </>
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
  previewFile(file) {
    console.log('Your upload file:', file);
    // Your process logic. Here we just mock to the same file
    return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
      method: 'POST',
      body: file,
    })
      .then((res) => res.json())
      .then(({ thumbnail }) => thumbnail);
  },
};

export const I983Templates = () => {
  return <Upload {...I983Props}></Upload>;
};
