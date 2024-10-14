import { ConfigProvider, Layout } from 'antd';
const { Content } = Layout;
import Footer from './Footer';
import Home from '../../pages/Home';
import Navbar from './Navbar';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import AppMenu from './Menu';
import Page500 from '../../pages/Page500';

const layoutStyle = {
  position: 'relative',
  overflow: 'hidden',
  width: '100%',
  minHeight: '100vh',
};

export default function MainLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  const {
    user,
    isAuthenticated,
    error: userError,
  } = useSelector((state) => state.userSlice);

  const { curProfile, error: profileError } = useSelector(
    (state) => state.profileSlice
  );

  if (userError || profileError) {
    return <Page500 message={userError ? userError : profileError} />;
  }

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
            <AppMenu isHR={user.isHR} applicationStatus={curProfile.status} />
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
          {currentPath === '/' ? <Home /> : <Outlet />}
        </Content>
        <Footer />
      </Layout>
    </ConfigProvider>
  );
}
