import { Typography } from 'antd';
import PageLayout from '../../components/layout/Page';
import {
  Message,
  FileUpload,
  VisaSteps,
  I983Templates,
} from './VisaManagementComponents';
const { Title } = Typography;

const testingDoc = [
  { fileName: 'OPT-receipt', status: 'Approved' },
  { fileName: 'EAD', status: 'Approved' },
  { fileName: 'i983', status: 'Rejected' },
  { fileName: 'i20', status: 'Rejected' },
];

const feedback = 'this is a feedback from hr';

export default function VisaManagement() {
  return (
    <PageLayout>
      <div className='flex flex-col gap-10'>
        <Title>Visa Management</Title>
        {/* <FileUpload /> */}
        <VisaSteps
          visaDocuments={testingDoc}
          feedback={feedback}
        />
        <I983Templates />
      </div>
    </PageLayout>
  );
}
