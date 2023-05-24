import React, { useEffect } from 'react';
import { Typography, Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants/constant';
import LoadingSpin from '~/components/UI/LoadingSpin/LoadingSpin';

const { Title } = Typography;

const WarehouseReceiptDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_RECEIPT_BY_ID_SAGA, id: id });
  }, [dispatch, id]);

  const { idLoading, receiptById } = useSelector((state) => state.receiptSlice);

  if (idLoading) {
    return <LoadingSpin />;
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>{`Phiếu nhập kho: ${receiptById?._id?.slice(0, 8).toUpperCase()}`}</Title>
        </Col>
        <Col span={24}>{/* <CustomerDetailForm /> */}</Col>
      </Row>
    </>
  );
};

export default WarehouseReceiptDetailsPage;
