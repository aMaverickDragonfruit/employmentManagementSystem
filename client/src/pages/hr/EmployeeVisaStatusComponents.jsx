import PageLayout from '../../components/layout/Page';
import { Typography, Upload, Button, Input, Form, Spin, Image } from 'antd';
const { TextArea } = Input;
const { Title } = Typography;
import {
  CloseOutlined,
  DownloadOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import styled from 'styled-components';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfiles } from '../../features/profileSlice';
import { updateProfileDocStatusByUserId } from '../../api/profile';
import Page500 from '../Page500';

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

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

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

export const ReviewFiles = ({ handleClose, curVisaFile }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [showFeedback, setShowFeedback] = useState(false);
  const [submitAction, setSubmitAction] = useState();

  const handleRejectBtn = () => {
    setShowFeedback(true);
    setSubmitAction('Reject');
  };

  const handleApproveBtn = () => {
    setSubmitAction('Approve');
  };

  const { selectedProfile, loading, error } = useSelector(
    (state) => state.profileSlice
  );

  let fileList = [];
  const curReviewFile = selectedProfile?.documents?.filter(
    (doc) => doc.fileType === curVisaFile
  );
  if (curReviewFile?.length > 0) {
    fileList = [
      {
        uid: curReviewFile?.[0]?._id,
        name: curReviewFile?.[0]?.fileType,
        status: 'done',
        url: curReviewFile?.[0]?.fileUrl,
      },
    ];
  }
  // console.log(fileList);

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  const onSubmit = async (value) => {
    const fileType = curVisaFile;
    const userId = selectedProfile.user;
    let status = 'none';
    let feedback = value.feedback ? '' : value.feedback;
    if (submitAction === 'Approve') {
      status = 'Approved';
    } else if (submitAction === 'Reject') {
      status = 'Rejected';
    }

    await updateProfileDocStatusByUserId({
      userId,
      fileType,
      newStatus: status,
      feedback,
    });

    dispatch(fetchProfiles());
    handleClose();
  };

  if (error) {
    return <Page500 message={error} />;
  }

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
          {/* file list */}
          <Form.Item
            name='unloadedFile'
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
                onPreview={handlePreview}
              />
              {previewImage && (
                <Image
                  wrapperStyle={{
                    display: 'none',
                  }}
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(''),
                  }}
                  src={previewImage}
                />
              )}
            </Spin>
          </Form.Item>

          {/* feedback field */}
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

        {/* Buttons */}
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

const reviewAllFileFormStyle = { ...reviewFileFormStyle };
reviewAllFileFormStyle.justifyContent = 'justify-start';

export const ViewAllFiles = ({ handleClose }) => {
  const { selectedProfile, loading, error } = useSelector(
    (state) => state.profileSlice
  );
  const allDocuments = selectedProfile?.documents;
  let fileList = [];

  if (allDocuments?.length > 0) {
    fileList = allDocuments.map((document) => ({
      uid: document._id,
      name: document.fileType,
      status: 'done',
      url: document.fileUrl,
    }));
  }

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
  };

  return (
    <div
      style={reviewAllFileFormStyle}
      className='justify-start'
    >
      <div className='flex w-full justify-between align-middle'>
        <Title level={3}>All Approved Files</Title>
        <CloseIcon onClick={handleClose} />
      </div>
      <Spin
        spinning={loading}
        indicator={<LoadingOutlined spin />}
        size='large'
      >
        <Upload
          {...props}
          fileList={fileList}
          onPreview={handlePreview}
        />
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
      </Spin>
    </div>
  );
};
