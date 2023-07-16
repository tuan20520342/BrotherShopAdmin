import { Form, Button, Select, Space, Row, Col, Typography, Divider } from 'antd';
import { CalendarOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import dayjs from 'dayjs';
import InfoCard from './InfoCards';
import TableProductsInOrder from './TableProductsInOrder';
import { useState } from 'react';
import Search from 'antd/lib/input/Search';
import { useNavigate } from 'react-router-dom';
import * as SagaActionTypes from '~/redux/constants';
import { printNumberWithCommas } from '~/util/shared';
import FormContainer from '~/components/UI/Container/FormContainer';
import { orderPaymentStatuses, orderShippingStatuses } from '~/util/constants';

const { Option } = Select;
const { Text } = Typography;
const dateFormat = 'DD/MM/YYYY HH:mm';

const OrderDetails = () => {
  const [keyWord, setKeyWord] = useState('');
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const { orderById, editLoading } = useSelector((state) => state.orderSlice);

  const dispatch = useDispatch();

  const handleClose = () => {
    navigate('/orders');
  };

  const onFinish = (values) => {
    dispatch({
      type: SagaActionTypes.UPDATE_ORDER_STATUS,
      orderId: orderById._id,
      shippingStatus: values.shippingStatus,
      paymentStatus: values.paymentStatus,
    });
  };

  return (
    <FormContainer>
      <Form
        name="order_details"
        form={form}
        onFinish={onFinish}
        initialValues={{
          shippingStatus: orderById.shippingStatus,
          paymentStatus: orderById.paymentStatus,
        }}
      >
        <Row justify="space-between" style={{ gap: 16 }}>
          <Col
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
            }}
          >
            <CalendarOutlined style={{ fontSize: 24 }} />
            <Text style={{ fontSize: 16, marginLeft: '12px' }} strong>
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
              size="middle"
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
                    width: '150px',
                  }}
                  placeholder="Trạng thái"
                >
                  {Object.values(orderShippingStatuses).map((status) => (
                    <Option key={status} value={status}>
                      {status}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="paymentStatus"
                label={<Text style={{ fontSize: 16 }}>Tình trạng thanh toán</Text>}
                style={{
                  marginBottom: 0,
                }}
              >
                <Select
                  style={{
                    width: '150px',
                  }}
                  placeholder="Tình trạng thanh toán"
                >
                  {Object.values(orderPaymentStatuses).map((status) => (
                    <Option key={status} value={status}>
                      {status}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Space>
                <Button type="primary" htmlType="submit" loading={editLoading}>
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
          <Col span={24} style={{ textAlign: 'end' }}>
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
          <Text style={{ fontSize: 20 }} strong>{`Tổng tiền: ${printNumberWithCommas(
            orderById?.totalProductsPrice || '',
          )} VNĐ`}</Text>
        </Row>
      </Form>
    </FormContainer>
  );
};
export default OrderDetails;
