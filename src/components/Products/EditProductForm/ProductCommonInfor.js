import { Form, Input, Space, Typography } from 'antd';
import Container from '~/components/UI/Container/Container';

const { Title } = Typography;
const { TextArea } = Input;

function ProductCommonInfor({ disabled }) {
  return (
    <Container>
      <Space
        direction="vertical"
        style={{
          display: 'flex',
        }}
      >
        <Title level={4}>Thông tin sản phẩm</Title>
        <Form.Item
          name="name"
          label="Tên sản phẩm"
          rules={[
            {
              required: true,
            },
          ]}
        >
          <Input placeholder="Tên sản phẩm" disabled={disabled} />
        </Form.Item>

        <Form.Item name="description" label="Mô tả" rules={[{ required: true }]}>
          <TextArea rows={6} placeholder="Mô tả" disabled={disabled} />
        </Form.Item>
      </Space>
    </Container>
  );
}

export default ProductCommonInfor;
