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
} from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import { useState } from 'react';
const { Header, Content, Footer, Sider } = Layout;
function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const AuthLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();
  return (
    <Layout
      style={{
        minHeight: '100vh',
      }}
    >
      <Sider collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div
          style={{
            height: 32,
            margin: 16,
            background: 'rgba(255, 255, 255, 0.2)',
          }}
        />
        <Menu
          theme="dark"
          defaultSelectedKeys={['1']}
          mode="inline"
          selectedKeys={[
            location.pathname === '/'
              ? '1'
              : location.pathname === '/staffs'
              ? '2'
              : location.pathname === '/products'
              ? '3'
              : '-1',
          ]}
        >
          <Menu.Item
            key="1"
            icon={<DashboardOutlined />}
            onClick={() => {
              navigate('/');
            }}
          >
            Trang chủ
          </Menu.Item>
          <Menu.Item
            key="2"
            icon={<TeamOutlined />}
            onClick={() => {
              navigate('/staffs');
            }}
          >
            Nhân viên
          </Menu.Item>
          <Menu.Item
            key="3"
            icon={<FileOutlined />}
            onClick={() => {
              navigate('/products');
            }}
          >
            Sản phẩm
          </Menu.Item>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header
          style={{
            padding: 0,
            background: colorBgContainer,
          }}
        />
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
