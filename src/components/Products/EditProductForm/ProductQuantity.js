import { Col, Row, Typography } from 'antd';
import Container from '~/components/UI/Container/Container';
import TableProductSizes from '../TableProductSizes';

const { Title } = Typography;

function ProductQuantity({ sizes }) {
  return (
    <Container>
      <Row
        gutter={{
          xs: 8,
          sm: 16,
          md: 24,
          lg: 32,
        }}
      >
        <Col span={24}>
          <Title level={4}>Số lượng sản phẩm</Title>
        </Col>
        <Col span={24}>
          <TableProductSizes data={sizes} />
        </Col>
      </Row>
    </Container>
  );
}

export default ProductQuantity;
