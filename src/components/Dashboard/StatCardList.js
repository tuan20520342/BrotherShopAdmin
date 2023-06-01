import { Col } from 'antd';
import { ShopOutlined, UserOutlined, TeamOutlined, ShoppingOutlined } from '@ant-design/icons';
import { blue, green, orange, yellow } from '@ant-design/colors';
import StatCardItem from '~/components/Dashboard/StatCardItem';
import { useDispatch, useSelector } from 'react-redux';
import { selectStatCardData } from '~/redux/reducer/DashboardReducer';
import { useEffect } from 'react';
import * as SagaActionTypes from '~/redux/constants';

function StatCardList() {
  const dispatch = useDispatch();
  const statCardData = useSelector(selectStatCardData);
  const { products, staffs, customers, orders } = statCardData;

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_STAT_CARD_DATA });
  }, [dispatch]);

  return (
    <>
      <Col xs={24} sm={12} md={6}>
        <StatCardItem
          color={blue[5]}
          icon={<ShopOutlined style={{ color: 'white', fontSize: '20px' }} />}
          value={products}
          title="Sản phẩm"
        />
      </Col>
      <Col xs={24} sm={12} md={6}>
        <StatCardItem
          color={green[5]}
          icon={<UserOutlined style={{ color: 'white', fontSize: '20px' }} />}
          value={staffs}
          title="Nhân viên"
        />
      </Col>
      <Col xs={24} sm={12} md={6}>
        <StatCardItem
          color={orange[5]}
          icon={<TeamOutlined style={{ color: 'white', fontSize: '20px' }} />}
          value={customers}
          title="Khách hàng"
        />
      </Col>
      <Col xs={24} sm={12} md={6}>
        <StatCardItem
          color={yellow[6]}
          icon={<ShoppingOutlined style={{ color: 'white', fontSize: '20px' }} />}
          value={orders}
          title="Đơn đặt hàng"
        />
      </Col>
    </>
  );
}

export default StatCardList;
