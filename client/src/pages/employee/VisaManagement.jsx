import { Typography } from 'antd';
import PageLayout from '../../components/layout/Page';
import { VisaSteps } from './VisaManagementComponents';
import { useSelector } from 'react-redux';
const { Title } = Typography;

export default function VisaManagement() {
  const { curProfile } = useSelector((state) => state.profileSlice);
  const userDocuments = curProfile.documents.slice(2);
  // console.log(userDocuments);

  return (
    <PageLayout>
      <div className='flex flex-col gap-10'>
        <Title>Visa Management</Title>
        <VisaSteps visaDocuments={userDocuments} />
      </div>
    </PageLayout>
  );
}
