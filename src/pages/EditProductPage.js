import React, { useEffect } from 'react';
import { Typography, Row, Col, Button } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants/constant';
import EditProductForm from '~/components/Products/EditProductForm';
import LoadingSpin from '~/components/UI/LoadingSpin/LoadingSpin';

const { Title } = Typography;

const EditProductPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_PRODUCT_BY_ID_SAGA, id: id });
  }, []);
  let { idLoading } = useSelector((state) => state.productSlice);

  if (idLoading) {
    return <LoadingSpin />;
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>{`Sản phẩm: ${id}`}</Title>
        </Col>
        <Col span={24}>
          <EditProductForm />
        </Col>
      </Row>
    </>
  );
};

export default EditProductPage;
