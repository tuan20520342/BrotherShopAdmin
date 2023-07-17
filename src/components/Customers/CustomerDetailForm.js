import React from 'react';
import dayjs from 'dayjs';
import { Form, Input, Button, Select, DatePicker, Row, Col, Typography } from 'antd';
import { EnvironmentOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { validateMessages } from '~/util/constants';
import FormContainer from '../UI/Container/FormContainer';

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;
const dateFormat = 'DD/MM/YYYY';

const CustomerDetailForm = () => {
  const navigate = useNavigate();
  const { customerById } = useSelector((state) => state.customerSlice);
  const [form] = Form.useForm();

  const handleClose = () => {
    navigate('/customers');
  };

  const onFinish = (values) => {};

  return (
    <FormContainer>
      <Form
        form={form}
        onFinish={onFinish}
        initialValues={{
          name: customerById.name,
          birthday: dayjs(customerById.birthday),
          gender: customerById.gender,
          phone: customerById.phone,
          email: customerById.email,
          address: customerById?.address?.map(
            (item) => `${item.name}, ${item.phone}, ${item.detail}, ${item.ward}, ${item.district}, ${item.city}`,
          ),
        }}
        validateMessages={validateMessages}
        layout="vertical"
      >
        <Row
          gutter={{
            xs: 8,
            sm: 16,
            md: 24,
            lg: 32,
          }}
        >
          <Col xs={24} sm={12} md={24} lg={12} key={1}>
            <Form.Item name="name" label="Họ và tên">
              <Input placeholder="Họ và tên" disabled={true} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} key={2}>
            <Form.Item name="birthday" label="Ngày sinh">
              <DatePicker
                placeholder="Ngày sinh"
                format={dateFormat}
                disabledDate={(current) => current.isAfter(dayjs())}
                disabled={true}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} key={4}>
            <Form.Item name="gender" label="Giới tính">
              <Select placeholder="Giới tính" allowClear disabled={true}>
                <Option value="Nam">Nam</Option>
                <Option value="Nữ">Nữ</Option>
                <Option value="Khác">Khác</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={24} lg={12} key={5}>
            <Form.Item
              name="phone"
              label="Số Điện Thoại"
              rules={[
                {
                  pattern: /^[\d]{10,10}$/,
                  message: 'Số Điện Thoại không hợp lệ',
                },
              ]}
            >
              <Input placeholder="Số điện thoại" disabled={true} />
            </Form.Item>
          </Col>
          <Col xs={24} sm={24} md={24} lg={12} key={6}>
            <Form.Item name="email" label="Email">
              <Input placeholder="Email" disabled={true} />
            </Form.Item>
          </Col>
          <Col span={24} key={7}>
            <Form.Item label="Địa chỉ">
              <Form.List name="address">
                {(fields, { add, remove }, { errors }) => (
                  <>
                    {fields.length > 0 ? (
                      fields.map((field, index) => (
                        <Form.Item key={field.key}>
                          <Form.Item {...field} noStyle>
                            <TextArea rows={2} disabled={true} />
                          </Form.Item>
                        </Form.Item>
                      ))
                    ) : (
                      <Col justify="center" align="middle">
                        <EnvironmentOutlined style={{ fontSize: 50 }} />
                        <Title level={5}>Khách hàng chưa có địa chỉ giao hàng</Title>
                      </Col>
                    )}
                  </>
                )}
              </Form.List>
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          <Button type="primary" size="large" danger onClick={handleClose}>
            Đóng
          </Button>
        </Row>
      </Form>
    </FormContainer>
  );
};
export default CustomerDetailForm;
