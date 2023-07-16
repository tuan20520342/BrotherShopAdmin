import React, { useEffect } from 'react';
import { Typography, Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants';
import LoadingSpin from '~/components/UI/LoadingSpin/LoadingSpin';
import OrderDetails from '~/components/Orders/OrderDetails';

const { Title } = Typography;

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_ORDER_BY_ID_SAGA, id: id });
  }, [dispatch, id]);

  const { idLoading, orderById } = useSelector((state) => state.orderSlice);

  if (idLoading) {
    return <LoadingSpin />;
  }

  return (
    <Row>
      <Col span={24}>
        <Title level={2}>{`Đơn hàng: ${orderById?._id?.slice(0, 8).toUpperCase()}`}</Title>
      </Col>
      <Col span={24}>
        <OrderDetails />
      </Col>
    </Row>
  );
};

export default OrderDetailsPage;
