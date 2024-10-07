import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Menu } from 'antd';
const { Sider } = Layout;
import {
  TeamOutlined,
  IdcardOutlined,
  UsergroupAddOutlined,
  ProfileOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const siderStyle = {
  textAlign: 'left',
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#fff',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

const TopMenu = ({ isHR }) => {
  const navigate = useNavigate();
  let menuItems = [];
  if (isHR) {
    menuItems = [
      {
        label: 'Employee Profiles',
        key: '0',
        icon: <TeamOutlined />,
        onClick: () => navigate('/employee-profiles'),
      },
      {
        label: 'Employee Visa Management',
        key: '1',
        icon: <IdcardOutlined />,
        onClick: () => navigate('/employee-visa-status'),
      },
      {
        label: 'Hiring management',
        key: '2',
        icon: <UsergroupAddOutlined />,
        onClick: () => navigate('/employee-registration'),
      },
    ];
  } else {
    menuItems = [
      {
        label: 'Profile',
        key: '0',
        icon: <ProfileOutlined />,
        onClick: () => navigate('/profile'),
      },
      {
        label: 'Visa Management',
        key: '1',
        icon: <IdcardOutlined />,
        onClick: () => navigate('/visa-management'),
      },
    ];
  }

  return (
    <Menu
      items={menuItems}
      mode='inline'
      style={{ height: '90%', paddingTop: '5%' }}
    />
  );
};

const BottomMenu = () => {
  const menuItems = [
    {
      label: 'Log out',
      icon: <LogoutOutlined />,
      onClick: () => console.log('log out'),
    },
  ];
  return (
    <Menu
      items={menuItems}
      mode='inline'
    />
  );
};

export default function AppSider() {
  const [isHR, setIsHR] = useState(true);

  return (
    <Sider
      width='18%'
      style={siderStyle}
    >
      <TopMenu isHR={isHR} />
      <BottomMenu />
    </Sider>
  );
}
