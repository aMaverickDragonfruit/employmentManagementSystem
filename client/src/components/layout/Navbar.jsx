import { useNavigate } from 'react-router-dom';
import { Typography, Layout, Badge, Avatar, Dropdown } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { clearUser } from '../../features/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import AppMenu from './Menu';

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
      className={`w-fit cursor-pointer ${className}`}
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
      style={{ backgroundColor: '#4F46E5' }}
      icon={<UserOutlined />}
    />
  );
};

const User = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.userSlice
  );

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/');
  };

  const menuItems = [
    {
      label: 'Log out',
      key: 'userLogout',
      onClick: handleLogout,
    },
  ];

  if (user && isAuthenticated) {
    return (
      <div className='flex items-center'>
        {user.isHR ? (
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
          <Text style={textStyle}>{user.firstName}</Text>
        </Dropdown>
      </div>
    );
  }
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
};

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <Header style={headerStyle}>
      <Logo handleClick={() => navigate('/')} />
      <User />
    </Header>
  );
}
