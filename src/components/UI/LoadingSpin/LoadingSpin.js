import { Spin, Col, Row } from 'antd';

const LoadingSpin = () => {
  return (
    <>
      <Row style={{ minHeight: '200px' }} justify="center">
        <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <Spin size="large" tip="Loading..." />
        </Col>
      </Row>
    </>
  );
};

export default LoadingSpin;
