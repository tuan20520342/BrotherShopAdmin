import React, { useState } from 'react';
import { Layout, Menu, Popconfirm, Row } from 'antd';
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
  MoneyCollectOutlined,
  ShoppingCartOutlined,
  AppstoreOutlined,
  SkinOutlined,
  SnippetsOutlined,
} from '@ant-design/icons';
import { useHistory, useLocation, useNavigate } from 'react-router-dom';
import Sider from 'antd/es/layout/Sider';

const MainLayoutSider = ({ collapsed, setCollapsed, setVisibleButton }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [hidden, setHidden] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      breakpoint="md"
      onBreakpoint={(broken) => {
        //gia tri broken thay doi khi qua breakpoint
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
        defaultSelectedKeys={['1']}
        mode="inline"
        selectedKeys={[
          location.pathname === '/'
            ? '1'
            : location.pathname === '/staffs' || location.pathname === '/add-staff'
            ? '2'
            : location.pathname === '/customers'
            ? '3'
            : location.pathname === '/products' ||
              location.pathname === '/add-product' ||
              location.pathname.includes('/products')
            ? '4'
            : location.pathname === '/categories'
            ? '5'
            : location.pathname === '/warehouse-receipt' || location.pathname === '/add-warehouse-receipt'
            ? '6'
            : location.pathname === '/orders'
            ? '7'
            : '-1',
        ]}
      >
        <Menu.Item
          key="1"
          icon={<DashboardOutlined />}
          onClick={() => {
            navigate('/');
          }}
          title=""
        >
          Trang chủ
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<UserOutlined />}
          onClick={() => {
            navigate('/staffs');
          }}
          title=""
        >
          Nhân viên
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<TeamOutlined />}
          onClick={() => {
            navigate('/customers');
          }}
          title=""
        >
          Khách hàng
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<SkinOutlined />}
          onClick={() => {
            navigate('/products');
          }}
          title=""
        >
          Sản phẩm
        </Menu.Item>
        <Menu.Item
          key="5"
          icon={<AppstoreOutlined />}
          onClick={() => {
            navigate('/categories');
          }}
          title=""
        >
          Danh mục sản phẩm
        </Menu.Item>
        <Menu.Item
          key="6"
          icon={<SnippetsOutlined />}
          onClick={() => {
            navigate('/warehouse-receipt');
          }}
          title=""
        >
          Phiếu nhập kho
        </Menu.Item>
        <Menu.Item
          key="7"
          icon={<ShoppingCartOutlined />}
          onClick={() => {
            navigate('/orders');
          }}
          title=""
        >
          Đơn hàng
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default MainLayoutSider;
