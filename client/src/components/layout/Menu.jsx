import { useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import {
  TeamOutlined,
  IdcardOutlined,
  UsergroupAddOutlined,
  ProfileOutlined,
  FileOutlined,
} from '@ant-design/icons';

const AppMenu = ({ isHR, applicationStatus }) => {
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
  } else if (!isHR && applicationStatus !== 'Approved') {
    menuItems = [
      {
        label: 'Onboarding Form',
        key: '0',
        icon: <FileOutlined />,
        onClick: () => navigate('/onboarding-form'),
      },
    ];
  } else {
    menuItems = [
      {
        label: 'Profile',
        key: '1',
        icon: <ProfileOutlined />,
        onClick: () => navigate('/profile'),
      },
      {
        label: 'Visa Management',
        key: '2',
        icon: <IdcardOutlined />,
        onClick: () => navigate('/visa-management'),
      },
    ];
  }

  return (
    <Menu
      items={menuItems}
      mode='horizontal'
      style={{ paddingLeft: '2%', backgroundColor: 'white' }}
    />
  );
};

export default AppMenu;
