import { ConfigProvider, Layout } from 'antd';
const { Content } = Layout;
import Footer from './Footer';
import Home from '../../pages/Home';
import Navbar from './Navbar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../../features/userSlice';
import AppMenu from './Menu';

const layoutStyle = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  minHeight: '100vh',
};

export default function MainLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  // const [isAuthenticated, setIsAuthenticated] = useState(true);
  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.userSlice
  );

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: 'rgb(79 70 229)', // Tailwind's bg-indigo-500 color
        },
      }}
    >
      <Layout style={layoutStyle}>
        <div className='app-header fixed top-0 w-full z-50'>
          <Navbar />
          {user && isAuthenticated ? <AppMenu isHR={user.isHR} /> : null}
        </div>
        <Content
          style={{
            height: '100%',
            marginTop: '8%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          {currentPath === '/' ? <Home /> : <Outlet />}
        </Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
}
