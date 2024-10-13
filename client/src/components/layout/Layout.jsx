import { ConfigProvider, Layout, Spin } from 'antd';
const { Content } = Layout;
import Footer from './Footer';
import Home from '../../pages/Home';
import Navbar from './Navbar';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import userSlice from '../../features/userSlice';
import AppMenu from './Menu';
import { fetchCurUserProfile } from '../../features/profileSlice';
import { LoadingOutlined } from '@ant-design/icons';

const layoutStyle = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  minHeight: '100vh',
};

export default function MainLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.userSlice
  );

  const {
    curProfile,
    loading: profileLoading,
    error: profileError,
  } = useSelector((state) => state.profileSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurUserProfile());
  }, [dispatch]);

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
          {user && isAuthenticated ? (
            <Spin
              spinning={profileLoading}
              indicator={<LoadingOutlined spin />}
            >
              <AppMenu
                isHR={user.isHR}
                applicationStatus={curProfile.status}
              />
            </Spin>
          ) : null}
        </div>
        <Content
          style={{
            height: '100%',
            marginTop: '8%',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Spin
            spinning={loading}
            indicator={<LoadingOutlined spin />}
            size='large'
          >
            {currentPath === '/' ? <Home /> : <Outlet />}
          </Spin>
        </Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
}
