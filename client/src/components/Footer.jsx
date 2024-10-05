import { Layout } from 'antd';
const { Footer } = Layout;
import {
  YoutubeFilled,
  TwitterCircleFilled,
  FacebookFilled,
} from '@ant-design/icons';

const Options = ({ options, optionsStyle, itemsStyle }) => {
  return (
    <div className={`flex gap-4 flex-nowrap ${optionsStyle}`}>
      {options.map((option, index) => (
        <div
          key={index}
          className={`${itemsStyle}`}
        >
          {option}
        </div>
      ))}
    </div>
  );
};

export default function AppFooter() {
  const icons = [
    <YoutubeFilled />,
    <TwitterCircleFilled />,
    <FacebookFilled />,
  ];

  const services = ['Contact us', 'Privacy Police', 'Help'];

  return (
    <Footer className='flex gap-2 flex-wrap md:flex-nowrap flex-col md:flex-row items-center md:justify-between px-16 py-4 w-full h-auto bg-slate-900 text-slate-50 '>
      <p className='order-3 md:order-1'>@2022 All Right Reserved</p>

      <Options
        options={icons}
        optionsStyle={'order-1 md:order-2'}
        itemsStyle={'text-xl mr-2'}
      ></Options>

      <Options
        options={services}
        optionsStyle={'order-2 md:order-3'}
      ></Options>
    </Footer>
  );
}
