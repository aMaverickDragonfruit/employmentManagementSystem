import { useNavigate } from 'react-router-dom';
import { Children, lazy, useState } from 'react';
import { Typography, Layout, Badge, Avatar, Menu, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
const { Header } = Layout;
const { Text } = Typography;

const headerStyle = {
  backgroundColor: '#0F172A',
  color: '#F8FAFC',
  display: 'flex',
  justifyContent: 'space-between',
};

const textStyle = {
  color: '#F8FAFC',
  paddingLeft: 16,
  cursor: 'pointer',
};

const menuStyle = {};

const Logo = ({ handleClick, className }) => {
  return (
    <div
      className={`w-fit cursor-pointer${className}`}
      onClick={handleClick}
    >
      <span className='text-xl font-bold'>
        {/* Display on large screens */}
        <span className='hidden lg:inline'>Management</span>
        {/* Display on smaller screens */}
        <span className='inline lg:hidden'>M</span>
        <span className='text-sm'>&nbsp;chuwa</span>
      </span>
    </div>
  );
};

const UserAvatar = () => {
  return (
    <Avatar
      size='middle'
      style={{ backgroundColor: '#3730A3' }}
      icon={<UserOutlined />}
    />
  );
};

const User = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [isHR, setIsHR] = useState(true);
  const [userName, setUserName] = useState('user first name');
  const navigate = useNavigate();

  const menuItems = [
    {
      label: 'Log out',
      key: 'userLogout',
      onClick: () => console.log('log out'),
    },
  ];

  if (!isAuthenticated) {
    return (
      <div>
        <UserAvatar />
        <Text
          style={textStyle}
          onClick={() => navigate('/login')}
        >
          Log in
        </Text>
      </div>
    );
  }

  return (
    <div className='flex items-center'>
      {isHR ? (
        <Badge
          count={'HR'}
          size='small'
        >
          <UserAvatar />
        </Badge>
      ) : (
        <UserAvatar />
      )}
      <Dropdown
        menu={{ items: menuItems }}
        placement='bottomRight'
      >
        <Text style={textStyle}>{userName}</Text>
      </Dropdown>
    </div>
  );
};

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Header style={headerStyle}>
      <Logo handleClick={() => navigate('./Home')} />
      <User />
    </Header>
  );
}
