import { Typography } from 'antd';
const { Title, Text } = Typography;
import styled from 'styled-components';

const debugStyle = {
  border: '2px',
  border: 'solid',
  borderColor: 'red',
};

const ColorRow = ({ description, colorClass }) => (
  <div className='flex gap-10 w-2/3 justify-between'>
    <p>{description}</p>
    <div className={`w-1/3 ${colorClass}`}></div>
  </div>
);

export default function Styles() {
  return (
    <div className='w-80% mt-20 mx-20'>
      <Title style={{ textAlign: 'center', paddingBottom: '20px' }}>
        Style guide
      </Title>

      <div className='typography'>
        <Title>Typography</Title>
        <Title style={''}>Main Title: default title</Title>
        <Title
          style={''}
          level={3}
        >
          Other Title: title level 3
        </Title>
        <div className='text flex flex-col'>
          <Text style={''}>Text (default)</Text>
          <Text
            style={''}
            type='secondary'
          >
            Text (secondary)
          </Text>
        </div>
      </div>
      <div className='color'>
        <Title>Color</Title>
        <ColorRow
          description={'main-bg-color: bg-slate-900 == #0F172A'}
          colorClass={'bg-slate-900'}
        />
        <ColorRow
          description={
            'secondary-color/text/icons/... : bg-slate-400 == #94A3B8'
          }
          colorClass={'bg-slate-400'}
        />
        <ColorRow
          description={'primary color... : bg-indigo-500 == #4F46E5'}
          colorClass={'bg-indigo-500'}
        />
      </div>
    </div>
  );
}
