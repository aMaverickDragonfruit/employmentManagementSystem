import PageLayout from '../../components/layout/Page';
import { Typography, Upload, Button, Select, Input, Form } from 'antd';
const { TextArea } = Input;
const { Title } = Typography;
import { CloseOutlined, DownloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';
import { useState } from 'react';

const CloseIcon = styled(CloseOutlined)`
  font-size: 150%;
  cursor: pointer;
  color: #94a3b8;
  &:hover {
    color: #0f172a;
  }
`;

const reviewFileFormStyle = {
  maxWidth: '30rem',
  padding: '1.5rem',
  border: '0.5px solid #94A3B8',
  borderRadius: '4px',
  backgroundColor: 'white',
  minWidth: '500px',
  minHeight: '560px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
};

const selectProps = {
  placeholder: 'Select the comment file',
  style: { width: '160px' },
  size: 'middle',
  options: [
    {
      value: 'optReceipt',
      label: 'OPT Receipt',
    },
    {
      value: 'i985',
      label: 'I-985',
    },
    {
      value: 'ead',
      label: 'EAD',
    },
  ],
};

const props = {
  onChange({ file, fileList }) {
    if (file.status !== 'uploading') {
      console.log(file, fileList);
    }
  },
  fileList: [
    {
      uid: '1',
      name: 'xxx.png',
      status: 'uploading',
      url: 'http://www.baidu.com/xxx.png',
      percent: 33,
    },
    {
      uid: '2',
      name: 'yyy.png',
      status: 'done',
      url: 'http://www.baidu.com/yyy.png',
    },
    {
      uid: '3',
      name: 'zzz.png',
      status: 'error',
      response: 'Server Error 500',
      // custom error message to show
      url: 'http://www.baidu.com/zzz.png',
    },
  ],
  showUploadList: {
    extra: ({ size = 0 }) => (
      <span
        style={{
          color: '#cccccc',
        }}
      >
        ({(size / 1024 / 1024).toFixed(2)}MB)
      </span>
    ),
    showDownloadIcon: true,
    downloadIcon: <DownloadOutlined />,
    showRemoveIcon: false,
  },
};

export const ReviewFiles = ({ handleClose }) => {
  const [form] = Form.useForm();

  const [showSelect, setShowSelect] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [submitAction, setSubmitAction] = useState();

  const handleRejectBtn = () => {
    setShowSelect(true);
    setShowFeedback(true);
    setSubmitAction('Reject');
  };

  const handleApproveBtn = () => {
    setShowSelect(true);
    setSubmitAction('Approve');
  };

  const onSubmit = (value) => {
    console.log(submitAction);
    console.log(value);
  };
  return (
    <PageLayout>
      <Form
        form={form}
        name='review-upload-file-form'
        layout='vertical'
        autoComplete='off'
        onFinish={onSubmit}
        onSubmitCapture={(e) => e.preventDefault()}
        style={reviewFileFormStyle}
      >
        <div>
          <div className='flex w-full justify-between align-middle'>
            <Title level={3}>Review Files</Title>
            <CloseIcon onClick={handleClose} />
          </div>
          <Form.Item
            // name='unloadedFile'
            label='Uploaded Files'
          >
            <Upload {...props}></Upload>
          </Form.Item>
          {/* Select file */}
          {showSelect && (
            <Form.Item
              name='fileType'
              label='Select the file'
              rules={[
                {
                  required: true,
                  message: 'Please select a file below',
                },
              ]}
            >
              <Select {...selectProps} />
            </Form.Item>
          )}
          {/* Provide feedback */}
          {showFeedback && (
            <Form.Item
              name='feedback'
              label='Provide the feedback'
              rules={[
                {
                  required: true,
                  message: 'Please provide feedback',
                },
              ]}
            >
              <TextArea rows={6} />
            </Form.Item>
          )}
        </div>
        <Form.Item>
          <div className='flex justify-between'>
            {submitAction ? (
              <Button
                type='primary'
                htmlType='submit'
              >
                Submit
              </Button>
            ) : (
              <>
                <Button onClick={handleRejectBtn}>Click to Reject</Button>
                <Button
                  type='primary'
                  onClick={handleApproveBtn}
                >
                  Click to Approve
                </Button>
              </>
            )}
          </div>
        </Form.Item>
      </Form>
    </PageLayout>
  );
};
