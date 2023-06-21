import React, { useEffect, useState } from 'react';
import { Typography, Row, Col } from 'antd';
import Search from 'antd/lib/input/Search';
import TableOrders from '~/components/Orders/TableOrders';
import * as SagaActionTypes from '~/redux/constants';
import { useDispatch, useSelector } from 'react-redux';
import openSocket from 'socket.io-client';
import { orderActions } from '~/redux/reducer/OrderReducer';

const { Title } = Typography;

const OrdersPage = () => {
  const [keyWord, setKeyWord] = useState('');
  const { orders, loading } = useSelector((state) => state.orderSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_ORDERS_SAGA });

    const socket = openSocket(process.env.REACT_APP_DEV_BE_URL);
    socket.on('orders', (data) => {
      const { action } = data;

      if (action === 'edit') {
        dispatch(orderActions.editOrderStatus({ orderId: data.orderId, orderStatus: data.orderStatus }));
      }
    });
  }, [dispatch]);

  return (
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
  );
};

export default OrdersPage;
