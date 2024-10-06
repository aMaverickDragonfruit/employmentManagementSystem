import { ConfigProvider, Layout } from 'antd';
const { Content } = Layout;
import Footer from './Footer';
import Home from '../../pages/Home';
import Navbar from './Navbar';
import Sider from './Sider';
import { Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';

// const contentStyle = {
//   textAlign: 'center',
//   minHeight: '100%',
//   lineHeight: '120px',
//   color: '#fff',
//   backgroundColor: '#0958d9',
// };

const layoutStyle = {
  overflow: 'hidden',
  width: '100%',
  height: '100vh',
};

export default function MainLayout() {
  const location = useLocation();
  const currentPath = location.pathname;

  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
          {isAuthenticated ? <Sider /> : <></>}
          <Content>{currentPath === '/' ? <Home /> : <Outlet />}</Content>
        </Layout>
        <Footer />
        {/* <Footer style={footerStyle}>Footer</Footer> */}
      </Layout>
    </ConfigProvider>
  );
}
