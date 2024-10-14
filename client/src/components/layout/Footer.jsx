import { Layout } from 'antd';
const { Footer } = Layout;
import {
  YoutubeFilled,
  TwitterCircleFilled,
  FacebookFilled,
} from '@ant-design/icons';

import styled from 'styled-components';

const StyledFooter = styled(Footer)`
  background-color: #0f172a;
  color: #f8fafc;
  display: flex;
  justify-content: space-between;

  @media (max-width: 800px) {
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
`;

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
    <StyledFooter>
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
    </StyledFooter>
  );
}
