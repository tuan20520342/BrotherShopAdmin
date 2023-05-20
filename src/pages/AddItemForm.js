import React from 'react';
import { Typography, Row, Col } from 'antd';
const { Title } = Typography;

const AddItemForm = ({ title, form }) => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>{title}</Title>
        </Col>
        <Col span={24}>{form}</Col>
      </Row>
    </>
  );
};

export default AddItemForm;
