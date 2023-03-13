import { Outlet } from 'react-router';
import { useNavigate, useLocation } from 'react-router-dom';

// const AuthLayout = () => {
//   return <Outlet />;
// };

// export default AuthLayout;

import {
  FileOutlined,
  PieChartOutlined,
  UserOutlined,
  DesktopOutlined,
  TeamOutlined,
  DashboardOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, Row, theme } from 'antd';
import { useState } from 'react';
import MainLayoutSider from './MainLayoutSider';
import MainLayoutDrawer from './MainLayoutDrawer';
const { Header, Content, Footer, Sider } = Layout;

const AuthLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerCollapsed, setDrawerCollapsed] = useState(false);
  const [visibleButton, setVisibleButton] = useState(false);

  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <MainLayoutSider collapsed={collapsed} setCollapsed={setCollapsed} setVisibleButton={setVisibleButton} />
      <MainLayoutDrawer collapsed={drawerCollapsed} setCollapsed={setDrawerCollapsed} />
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        >
          {visibleButton && (
            <MenuUnfoldOutlined
              style={{ marginLeft: '8px', fontSize: '24px', lineHeight: '28px' }}
              onClick={() => setDrawerCollapsed(!drawerCollapsed)}
            />
          )}
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          {/* <Breadcrumb
            style={{
              margin: '16px 0',
            }}
          >
            <Breadcrumb.Item>User</Breadcrumb.Item>
            <Breadcrumb.Item>Bill</Breadcrumb.Item>
          </Breadcrumb> */}
          <div
            style={{
              // margin: '16px 0',
              // padding: 24,
              // minHeight: 360,
              // background: colorBgContainer,
              margin: '24px 16px 0',
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer
          style={{
            textAlign: 'center',
          }}
        >
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};
export default AuthLayout;
