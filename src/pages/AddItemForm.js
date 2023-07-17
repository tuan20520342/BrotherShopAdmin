import React from 'react';
import { Typography, Row, Col } from 'antd';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NotFoundPage from './NotFound';
import { role } from '~/util/constants';

const { Title } = Typography;

const AddItemForm = ({ title, form }) => {
  const location = useLocation();
  const { currentUser } = useSelector((state) => state.authenticationSlice);

  if (location.pathname === '/add-staff' && currentUser?.role?.name === role.STAFF) {
    return <NotFoundPage />;
  }

  return (
    <Row>
      <Col span={24}>
        <Title level={2}>{title}</Title>
      </Col>
      <Col span={24}>{form}</Col>
    </Row>
  );
};

export default AddItemForm;
