import { Typography } from 'antd';
import PageLayout from '../components/layout/Page';
const { Title } = Typography;

export default function Home() {
  return (
    <PageLayout>
      <Title>Welcome to Chuwa Management</Title>
      <img
        src='/asset/kun.jpg'
        alt=''
        style={{ width: '400px', height: '400px' }}
      />
    </PageLayout>
  );
}
