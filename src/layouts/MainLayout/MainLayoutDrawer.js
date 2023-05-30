import React from 'react';
import { Drawer, Menu, Row } from 'antd';
import { TeamOutlined, DashboardOutlined, FileOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles/customdrawer.css';

const MainLayoutDrawer = ({ setCollapsed, collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const onClose = () => {
    setCollapsed(false);
  };

  const routes = [
    {
      key: '1',
      icon: <DashboardOutlined />,
      navigateTo: '/',
      title: 'Trang chủ',
    },
    {
      key: '2',
      icon: <TeamOutlined />,
      navigateTo: '/staffs',
      title: 'Nhân viên',
    },
    {
      key: '3',
      icon: <FileOutlined />,
      navigateTo: '/products',
      title: 'Sản phẩm',
    },
    {
      key: '4',
      icon: <FileOutlined />,
      navigateTo: '/orders',
      title: 'Đơn hàng',
    },
  ];

  return (
    <Drawer
      className="custom-drawer"
      onClose={onClose}
      open={collapsed}
      placement="left"
      width={200}
      closable={false}
      style={{ background: '#001529' }}
    >
      <Row justify="center" style={{ background: '#001529', padding: 0 }}>
        <img
          style={{ objectFit: 'cover', width: '80%', maxWidth: '80px', height: 'auto', margin: '20px' }}
          src={require('~/assets/clothing-shop.png')}
          alt="icon avatar"
        ></img>
      </Row>
      <Menu
        theme="dark"
        defaultSelectedKeys={['1']}
        mode="inline"
        selectedKeys={[
          location.pathname === '/'
            ? '1'
            : location.pathname === '/staffs' || location.pathname === '/add-staff'
            ? '2'
            : location.pathname === '/products' || location.pathname === '/add-product'
            ? '3'
            : location.pathname === '/orders'
            ? '4'
            : '-1',
        ]}
      >
        {routes.map((route) => (
          <Menu.Item
            key={route.key}
            icon={route.icon}
            onClick={() => {
              navigate(route.navigateTo);
            }}
          >
            {route.title}
          </Menu.Item>
        ))}
      </Menu>
    </Drawer>
  );
};

export default MainLayoutDrawer;
