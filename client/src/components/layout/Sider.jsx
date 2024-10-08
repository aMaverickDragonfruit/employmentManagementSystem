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
import { clearUser } from '../../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';

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
        children: [
          {
            key: '3',
            label: 'Employee Registration',
            onClick: () => navigate('/employee-registration'),
          },
          {
            key: '4',
            label: 'Onboarding Application',
            onClick: () => navigate('/onboarding-applications'),
          },
        ],
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/');
  };

  const menuItems = [
    {
      label: 'Log out',
      icon: <LogoutOutlined />,
      onClick: handleLogout,
    },
  ];
  return <Menu items={menuItems} mode='inline' />;
};

export default function AppSider({ isHR }) {
  return (
    <Sider width='18%' style={siderStyle}>
      <TopMenu isHR={isHR} />
      <BottomMenu />
    </Sider>
  );
}
