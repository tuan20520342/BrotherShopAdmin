import { Card, Col, Row } from 'antd';

function StatCardItem({ color, icon, value, title }) {
  return (
    <Card style={{ backgroundColor: color }}>
      <Row type="flex" align="middle" justify="start">
        <Col>
          <h6 style={{ color: 'white', fontSize: '24px', margin: 0 }}>{value}</h6>
          <small style={{ color: '#ece1e1', fontSize: '14px' }}>{title}</small>
        </Col>
        <span style={{ marginRight: 'auto' }} />
        {icon}
      </Row>
    </Card>
  );
}

export default StatCardItem;
