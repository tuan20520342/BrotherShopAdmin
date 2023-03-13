import React from 'react';
import { Drawer, Menu, Popconfirm, Row } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  SettingOutlined,
  SolutionOutlined,
  ExportOutlined,
  DashboardOutlined,
  ShopOutlined,
  LineChartOutlined,
  BookOutlined,
  RetweetOutlined,
  ExpandOutlined,
  AppstoreAddOutlined,
  EnterOutlined,
  RollbackOutlined,
  FileOutlined,
} from '@ant-design/icons';
import { useLocation, useHistory, useNavigate } from 'react-router-dom';
import './styles/customdrawer.css';

const MainLayoutDrawer = ({ setCollapsed, collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const onClose = () => {
    setCollapsed(false);
  };

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
        <Menu.Item
          key="4"
          icon={<FileOutlined />}
          onClick={() => {
            navigate('/orders');
          }}
        >
          Đơn hàng
        </Menu.Item>
      </Menu>
    </Drawer>
  );
};

export default MainLayoutDrawer;
