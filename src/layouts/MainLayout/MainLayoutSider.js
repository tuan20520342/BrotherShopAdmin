import React, { useState } from 'react';
import { Menu, Row } from 'antd';
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
import Sider from 'antd/es/layout/Sider';
import { useSelector } from 'react-redux';
import { role } from '~/util/constants';

const MainLayoutSider = ({ collapsed, setCollapsed, setVisibleButton }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);
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
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      breakpoint="md"
      onBreakpoint={(broken) => {
        if (broken) {
          setHidden(true);
          setVisibleButton(true);
        } else {
          setVisibleButton(false);
          setHidden(false);
        }
      }}
      hidden={hidden}
    >
      <Row justify="center">
        <img
          style={{ objectFit: 'cover', width: '80%', maxWidth: '80px', height: 'auto', margin: '20px' }}
          src={require('~/assets/clothing-shop.png')}
          alt="icon avatar"
        ></img>
      </Row>
      <Menu
        theme="dark"
        items={items}
        defaultSelectedKeys={['1']}
        mode="inline"
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
    </Sider>
  );
};

export default MainLayoutSider;
