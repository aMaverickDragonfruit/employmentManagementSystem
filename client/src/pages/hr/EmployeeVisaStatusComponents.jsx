import PageLayout from '../../components/layout/Page';
import { Typography, Upload, Button, Select, Input, Form, Spin } from 'antd';
const { TextArea } = Input;
const { Title } = Typography;
import {
  CloseOutlined,
  DownloadOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfileById } from '../../features/profileSlice';

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
      value: 'optEAD',
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
};

export const ReviewFiles = ({ handleClose }) => {
  const dispatch = useDispatch();
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

  const { selectedProfile, loading, error } = useSelector(
    (state) => state.profileSlice
  );

  let fileList = [];
  const documents = selectedProfile.documents;
  if (documents?.length > 0) {
    fileList = documents.map((document) => ({
      uid: document._id,
      name: document.fileType,
      status: 'done',
      url: document.fileUrl,
    }));
  }

  const onSubmit = (value) => {
    const fileTypeMap = new Map([
      ['profilePicture', 0],
      ['driverLicense', 1],
      ['optReceipt', 2],
      ['i983', 3],
      ['optEAD', 4],
    ]);
    const profileId = selectedProfile._id;
    let documents = [...selectedProfile.documents];
    const fileIndex = fileTypeMap.get(value.fileType);
    let updatedDocument = { ...documents[fileIndex] };
    if (submitAction === 'Approve') {
      updatedDocument.status = 'Approved';
      updatedDocument.feedback = 'Great!';
      updatedDocument.updatedAt = new Date().toISOString();
    } else if (submitAction === 'Reject') {
      updatedDocument.status = 'Rejected';
      updatedDocument.feedback = value.feedback;
      updatedDocument.updatedAt = new Date().toISOString();
    }
    documents[fileIndex] = updatedDocument;

    console.log(selectedProfile.documents);
    console.log(profileId);
    console.log(documents);
    const reqData = {
      id: profileId,
      data: { documents },
    };

    // console.log(reqData);
    dispatch(updateProfileById(reqData));
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
            <Spin
              spinning={loading}
              indicator={<LoadingOutlined spin />}
              size='large'
            >
              <Upload
                {...props}
                fileList={fileList}
              ></Upload>
            </Spin>
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
