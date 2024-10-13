import { useNavigate, useParams } from 'react-router-dom';
import {
  fetchProfileById,
  updateProfileById,
} from '../../features/profileSlice';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ProfileForm from '../../components/ProfileForm';
import PageLayout from '../../components/layout/Page';
import { Typography, Button, Form, Input } from 'antd';
const { Title } = Typography;
const { TextArea } = Input;

export default function EmployeeProfile() {
  const { id: profileId } = useParams();
  const dispatch = useDispatch();
  const { selectedProfile, loading, error } = useSelector(
    (state) => state.profileSlice
  );

  const { firstName, lastName } = selectedProfile;
  const fullName = `${firstName} ${lastName}`;

  useEffect(() => {
    dispatch(fetchProfileById(profileId));
  }, [dispatch]);

  const [isReject, setIsReject] = useState(false);
  const navigate = useNavigate();

  const handleApprove = async () => {
    const reqData = {
      id: profileId,
      data: { status: 'Approved' },
    };

    await dispatch(updateProfileById(reqData)).unwrap();
    navigate('/onboarding-applications');
  };

  const handleReject = async (value) => {
    const reqData = {
      id: profileId,
      data: { feedback: value.feedback, status: 'Rejected' },
    };

    await dispatch(updateProfileById(reqData)).unwrap();
    navigate('/onboarding-applications');
  };

  return (
    <PageLayout>
      <Title>{fullName} Onboarding Application</Title>
      <ProfileForm
        isEditable={false}
        profile={selectedProfile}
      />

      <Title level={4}>HR Feedback</Title>
      <div className='mb-10 flex flex-col'>
        {/* reject and approve btn */}
        <div className='flex justify-around'>
          {!isReject && (
            <>
              <Button
                size='large'
                onClick={() => setIsReject(true)}
              >
                Reject
              </Button>
              <Button
                type='primary'
                size='large'
                onClick={handleApprove}
              >
                Approve
              </Button>
            </>
          )}
        </div>

        {/* Reject employee application form */}
        {isReject && (
          <Form
            name='feedback-form'
            onFinish={handleReject}
            autoComplete='off'
            layout='vertical'
            onSubmitCapture={(e) => e.preventDefault()}
          >
            <Form.Item
              label='Reject Feedback'
              name='feedback'
              rules={[
                {
                  required: true,
                  message: 'Please enter your feedback',
                },
              ]}
            >
              <TextArea
                placeholder='provide your feedback'
                rows={4}
              />
            </Form.Item>
            <Button
              htmlType='submit'
              type='primary'
              size='large'
            >
              Send reject feedback
            </Button>
          </Form>
        )}
      </div>
    </PageLayout>
  );
}
