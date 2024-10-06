import { Layout } from 'antd';
const { Footer } = Layout;
import {
  YoutubeFilled,
  TwitterCircleFilled,
  FacebookFilled,
} from '@ant-design/icons';

const footerStyle = {
  backgroundColor: '#0F172A',
  color: '#F8FAFC',
  display: 'flex',
  justifyContent: 'space-between',
};

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
    <Footer style={footerStyle}>
      <p>@2022 All Right Reserved</p>

      <Options
        options={icons}
        optionsStyle={''}
        itemsStyle={'text-xl'}
      ></Options>

      <Options
        options={services}
        optionsStyle={''}
      ></Options>
    </Footer>
  );
}
