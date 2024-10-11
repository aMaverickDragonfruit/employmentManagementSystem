import { ConfigProvider, Layout } from 'antd';
const { Content } = Layout;
import Footer from './Footer';
import Home from '../../pages/Home';
import Navbar from './Navbar';
import Sider from './Sider';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../../features/userSlice';

const layoutStyle = {
  overflow: 'hidden',
  width: '100%',
  height: '100vh',
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
        {/* <Header style={headerStyle}>Header</Header> */}
        <Navbar />
        <Layout>
          {user && isAuthenticated ? <Sider isHR={user.isHR} /> : null}
          <Content style={{ height: '100%' }}>
            {currentPath === '/' ? <Home /> : <Outlet />}
          </Content>
        </Layout>
        <Footer />
        {/* <Footer style={footerStyle}>Footer</Footer> */}
      </Layout>
    </ConfigProvider>
  );
}
