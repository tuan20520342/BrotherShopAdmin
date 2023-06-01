import { Col, Form, Row, Select, Typography } from 'antd';
import Container from '~/components/UI/Container/Container';

const { Title } = Typography;
const { Option } = Select;

function ProductSelectCategory({ types, onChange, currentType, product }) {
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
          <Title level={4}>Danh mục sản phẩm</Title>
        </Col>

        <Col span={24}>
          <Form.Item
            name="categories"
            label="Danh mục"
            rules={[
              {
                required: true,
              },
            ]}
            initialValue={currentType?.type || product.category.name}
          >
            <Select
              showSearch
              placeholder="Danh mục"
              allowClear
              optionLabelProp="label"
              onChange={(value) => onChange(value)}
            >
              {types.map((type) => (
                <Option key={type._id} value={JSON.stringify(type)} label={type?.type || type?.name}>
                  <Typography>{type?.type || type?.name}</Typography>
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
    </Container>
  );
}

export default ProductSelectCategory;
