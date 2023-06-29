/* eslint-disable no-template-curly-in-string */
import React from 'react';
import dayjs from 'dayjs';
import { Form, Input, Button, Select, DatePicker, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Option } = Select;
const { TextArea } = Input;
const dateFormat = 'DD/MM/YYYY';

const validateMessages = {
  required: 'Cần nhập ${label}!',
  types: {
    email: '${label} không hợp lệ!',
    number: '',
  },
  number: {
    min: '${label} phải ít nhất từ ${min} trở lên',
    range: '${label} phải trong khoảng từ ${min} đến ${max}',
  },
};

const CustomerDetailForm = () => {
  const navigate = useNavigate();
  const { customerById } = useSelector((state) => state.customerSlice);
  const [form] = Form.useForm();

  const handleClose = () => {
    navigate('/customers');
  };

  const onFinish = (values) => {};

  return (
    <Form
      name="add_staff_form"
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
        otherInformation: '',
      }}
      validateMessages={validateMessages}
      style={{
        background: 'white',
        padding: '20px',
        borderRadius: '6px',
        filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))',
      }}
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
        <Col xs={24} sm={12} md={24} lg={12} key={2}>
          <Form.Item name="birthday" label="Ngày sinh">
            <DatePicker
              placeholder="Ngày sinh"
              format={dateFormat}
              disabledDate={(current) => current.isAfter(dayjs())}
              disabled={true}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={24} lg={12} key={4}>
          <Form.Item name="gender" label="Giới tính">
            <Select
              placeholder="Giới tính"
              allowClear
              style={{
                width: '60%',
              }}
              disabled={true}
            >
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
        <Col xs={24} sm={12} md={24} lg={12} key={6}>
          <Form.Item name="email" label="Email">
            <Input placeholder="Email" disabled={true} />
          </Form.Item>
        </Col>
        <Col span={24} key={7}>
          <Form.Item label="Địa chỉ">
            <Form.List name="address">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item key={field.key}>
                      <Form.Item {...field} noStyle>
                        <TextArea rows={2} placeholder="Tên loại danh mục" disabled={true} />
                      </Form.Item>
                    </Form.Item>
                  ))}
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
  );
};
export default CustomerDetailForm;
