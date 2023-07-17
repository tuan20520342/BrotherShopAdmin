import React from 'react';
import { Drawer, Menu, Row } from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  DashboardOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  SkinOutlined,
  SnippetsOutlined,
  PercentageOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import './styles/customdrawer.css';
import { useSelector } from 'react-redux';
import { role } from '~/util/constants';

const MainLayoutDrawer = ({ setCollapsed, collapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const onClose = () => {
    setCollapsed(false);
  };
  const { currentUser } = useSelector((state) => state.authenticationSlice);

  const items = [
    {
      label: 'Trang chủ',
      key: '1',
      onClick: () => {
        navigate('/');
      },
      icon: <DashboardOutlined />,
      title: '',
    },
    {
      label: 'Nhân viên',
      key: '2',
      onClick: () => {
        navigate('/staffs');
      },
      icon: <UserOutlined />,
      title: '',
    },
    {
      label: 'Khách hàng',
      key: '3',
      onClick: () => {
        navigate('/customers');
      },
      icon: <TeamOutlined />,
      title: '',
    },
    {
      label: 'Sản phẩm',
      key: '4',
      onClick: () => {
        navigate('/products');
      },
      icon: <SkinOutlined />,
      title: '',
    },
    {
      label: 'Danh mục sản phẩm',
      key: '5',
      onClick: () => {
        navigate('/categories');
      },
      icon: <AppstoreOutlined />,
      title: '',
    },
    {
      label: 'Phiếu nhập kho',
      key: '6',
      onClick: () => {
        navigate('/warehouse-receipt');
      },
      icon: <SnippetsOutlined />,
      title: '',
    },
    {
      label: 'Đơn hàng',
      key: '7',
      onClick: () => {
        navigate('/orders');
      },
      icon: <ShoppingCartOutlined />,
      title: '',
    },
    {
      label: 'Khuyến mãi',
      key: '8',
      onClick: () => {
        navigate('/promos');
      },
      icon: <PercentageOutlined />,
      title: '',
    },
  ];

  if (currentUser?.role?.name === role.STAFF) items.splice(1, 1);

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
        items={items}
        selectedKeys={[
          location.pathname === '/'
            ? '1'
            : location.pathname === '/staffs' ||
              location.pathname === '/add-staff' ||
              location.pathname.includes('/staffs')
            ? '2'
            : location.pathname === '/customers' || location.pathname.includes('/customers')
            ? '3'
            : location.pathname === '/products' ||
              location.pathname === '/add-product' ||
              location.pathname.includes('/products')
            ? '4'
            : location.pathname === '/categories'
            ? '5'
            : location.pathname === '/warehouse-receipt' ||
              location.pathname === '/add-warehouse-receipt' ||
              location.pathname.includes('/warehouse-receipt')
            ? '6'
            : location.pathname === '/orders' || location.pathname.includes('/orders')
            ? '7'
            : location.pathname === '/promos'
            ? '8'
            : '-1',
        ]}
      />
    </Drawer>
  );
};

export default MainLayoutDrawer;
