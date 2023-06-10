import React, { useEffect, useState } from 'react';
import { Typography, Row, Col } from 'antd';
import Search from 'antd/lib/input/Search';
import TableOrders from '~/components/Orders/TableOrders';
import * as SagaActionTypes from '~/redux/constants/constant';
import { useDispatch, useSelector } from 'react-redux';

const { Title } = Typography;

const OrdersPage = () => {
  const [keyWord, setKeyWord] = useState('');
  const { orders, loading } = useSelector((state) => state.orderSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_ORDERS_SAGA });
  }, [dispatch]);

  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>Danh sách đơn hàng</Title>
        </Col>
        <Col span={24} style={{ marginBottom: '4px', textAlign: 'end' }}>
          <Search
            style={{ width: 'fit-content' }}
            name="search"
            placeholder="Tìm kiếm..."
            allowClear
            onChange={(e) => {
              setKeyWord(e.target.value);
            }}
          />
        </Col>
        <Col span={24}>
          <TableOrders keyWord={keyWord} data={orders} loading={loading} />
        </Col>
      </Row>
    </>
  );
};

export default OrdersPage;
