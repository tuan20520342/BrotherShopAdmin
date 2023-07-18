import { Outlet } from 'react-router';
import { MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Row, theme, Col } from 'antd';
import { useEffect, useState } from 'react';
import MainLayoutSider from './MainLayoutSider';
import MainLayoutDrawer from './MainLayoutDrawer';
import DropDownAvatar from './DropDownAvatar';
import { useDispatch, useSelector } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants';
import LoadingSpin from '~/components/UI/LoadingSpin/LoadingSpin';
const { Header, Content } = Layout;

const MainLayout = () => {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [drawerCollapsed, setDrawerCollapsed] = useState(false);
  const [visibleButton, setVisibleButton] = useState(false);
  const { currentUser, loading } = useSelector((state) => state.authenticationSlice);

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_CURRENT_USER_SAGA });
    dispatch({ type: SagaActionTypes.GET_CATEGORIES_SAGA });
  }, [dispatch]);

  const {
    token: { colorBgContainer },
  } = theme.useToken();

  if (loading) {
    return (
      <Row style={{ minHeight: '100vh', backgroundColor: colorBgContainer }} justify="center">
        <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <LoadingSpin />;
        </Col>
      </Row>
    );
  }

  return (
    <Layout
      style={{
        minHeight: '100vh',
        minWidth: '100px',
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
          <Row justify="space-between" style={{ marginLeft: '10px', marginRight: '10px' }}>
            <Col>
              {visibleButton && (
                <MenuUnfoldOutlined
                  style={{ fontSize: '24px', lineHeight: '28px' }}
                  onClick={() => setDrawerCollapsed(!drawerCollapsed)}
                />
              )}
            </Col>
            <Col>
              <DropDownAvatar visibleText={!visibleButton} user={currentUser} />
            </Col>
          </Row>
        </Header>
        <Content
          style={{
            margin: '0 16px',
          }}
        >
          <div
            style={{
              margin: '24px 16px 0',
            }}
          >
            <Outlet />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};
export default MainLayout;
