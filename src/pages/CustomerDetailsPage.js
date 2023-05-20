import React, { useEffect } from 'react';
import { Typography, Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants/constant';
import LoadingSpin from '~/components/UI/LoadingSpin/LoadingSpin';
import CustomerDetailForm from '~/components/Customers/CustomerDetailForm';

const { Title } = Typography;

const CustomerDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_CUSTOMER_BY_ID_SAGA, id: id });
  }, [dispatch, id]);

  const { idLoading, customerById } = useSelector((state) => state.customerSlice);

  if (idLoading) {
    return <LoadingSpin />;
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>{`Khách hàng: ${customerById.name}`}</Title>
        </Col>
        <Col span={24}>
          <CustomerDetailForm />
        </Col>
      </Row>
    </>
  );
};

export default CustomerDetailsPage;
