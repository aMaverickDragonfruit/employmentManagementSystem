import { Typography } from 'antd';
const { Title, Text } = Typography;

export default function Testing() {
  return (
    <>
      Style guide
      <div>
        <Title className='border-2'>Title 1</Title>
        <Text className='border-2'>Text default</Text>
      </div>
      <div>
        <p>main-bg-color: bg-slate-900 == #0F172A</p>
        <div className='border-2 w-20 h-20 bg-slate-900'></div>
      </div>
    </>
  );
}
