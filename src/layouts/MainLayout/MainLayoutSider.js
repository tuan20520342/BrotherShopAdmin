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
  EnterOutlined,
  RollbackOutlined,
  FileOutlined,
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
          title=""
        >
          Trang chủ
        </Menu.Item>
        <Menu.Item
          key="2"
          icon={<TeamOutlined />}
          onClick={() => {
            navigate('/staffs');
          }}
          title=""
        >
          Nhân viên
        </Menu.Item>
        <Menu.Item
          key="3"
          icon={<FileOutlined />}
          onClick={() => {
            navigate('/products');
          }}
          title=""
        >
          Sản phẩm
        </Menu.Item>
        <Menu.Item
          key="4"
          icon={<FileOutlined />}
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
