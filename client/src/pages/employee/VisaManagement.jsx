import { Typography } from 'antd';
import PageLayout from '../../components/layout/Page';
import { VisaSteps } from './VisaManagementComponents';
import { useSelector } from 'react-redux';
import { AppTitle } from '../../components/components';
const { Title } = Typography;

export default function VisaManagement() {
  const { curProfile } = useSelector((state) => state.profileSlice);
  const userDocuments = curProfile.documents.slice(2);
  // console.log(userDocuments);

  return (
    <PageLayout>
      <div className='flex flex-col gap-10'>
        <AppTitle>Visa Management</AppTitle>
        <VisaSteps visaDocuments={userDocuments} />
      </div>
    </PageLayout>
  );
}
