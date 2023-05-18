import React, { useEffect } from 'react';
import { Typography, Row, Col } from 'antd';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants/constant';
import EditProductForm from '~/components/Products/EditProductForm';
import LoadingSpin from '~/components/UI/LoadingSpin/LoadingSpin';
import EditStaffForm from '~/components/Staffs/EditStaffForm';

const { Title } = Typography;

const EditStaffPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_STAFF_BY_ID_SAGA, id: id });
  }, []);
  const { idLoading } = useSelector((state) => state.staffSlice);

  if (idLoading) {
    return <LoadingSpin />;
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>{`Nhân viên: ${id.substring(0, 6).toUpperCase()}`}</Title>
        </Col>
        <Col span={24}>
          <EditStaffForm />
        </Col>
      </Row>
    </>
  );
};

export default EditStaffPage;
