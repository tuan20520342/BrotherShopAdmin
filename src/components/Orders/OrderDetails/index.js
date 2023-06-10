import { Form, Input, Button, Select, DatePicker, Upload, Space, Modal, Row, Col, Typography, Divider } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';
import InfoCard from './InfoCards';
import TableProductsInOrder from './TableProductsInOrder';
import { useState } from 'react';
import Search from 'antd/lib/input/Search';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;
const { Title, Text } = Typography;
const dateFormat = 'DD/MM/YYYY HH:mm';

const OrderDetails = () => {
  const [keyWord, setKeyWord] = useState('');
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const { orderById } = useSelector((state) => state.orderSlice);
  console.log(orderById);

  const handleClose = () => {
    navigate(`/orders`);
  };

  return (
    <Form
      name="order_details"
      form={form}
      // onFinish={onFinish}
      initialValues={{
        shippingStatus: orderById.shippingStatus,
      }}
      style={{
        background: 'white',
        padding: '20px',
        marginBottom: '20px',
        borderRadius: '6px',
        filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))',
      }}
    >
      <Row justify="space-between">
        <Col
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
          }}
        >
          <CalendarOutlined style={{ fontSize: 24 }} />
          <Text style={{ fontSize: 16 }} strong>
            {dayjs(orderById?.createdAt).format(dateFormat).toString()}
          </Text>
        </Col>
        <Col
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Space
            style={{
              flexWrap: 'wrap',
            }}
          >
            <Form.Item
              name="shippingStatus"
              label={<Text style={{ fontSize: 16 }}>Trạng thái</Text>}
              style={{
                marginBottom: 0,
              }}
            >
              <Select
                style={{
                  width: '132px',
                }}
                placeholder="Trạng thái"
              >
                <Option value="Đang chuẩn bị">Đang chuẩn bị</Option>
                <Option value="Đang giao">Đang giao</Option>
                <Option value="Đã nhận">Đã nhận</Option>
                <Option value="Đã hủy">Đã hủy</Option>
              </Select>
            </Form.Item>
            <Space>
              <Button type="primary" htmlType="submit">
                Xác nhận
              </Button>
              <Button type="primary" danger onClick={handleClose}>
                Đóng
              </Button>
            </Space>
          </Space>
        </Col>
      </Row>
      <Divider />
      <Row gutter={[8, 16]}>
        <InfoCard order={orderById} />
        <Divider />
        <Col span={24} style={{ marginBottom: '4px', textAlign: 'end' }}>
          <Search
            style={{ width: 'fit-content' }}
            name="search"
            placeholder="Tìm kiếm..."
            allowClear
            onChange={(e) => {
              setKeyWord(e.target.value);
            }}
          />
        </Col>
        <Col span={24}>
          <TableProductsInOrder data={orderById.products} keyWord={keyWord} />
        </Col>
      </Row>
      <Row justify="end">
        <Text style={{ fontSize: 20 }} strong>{`Tổng tiền: ${orderById?.totalProductsPrice
          ?.toString()
          .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')} VNĐ`}</Text>
      </Row>
    </Form>
  );
};
export default OrderDetails;
