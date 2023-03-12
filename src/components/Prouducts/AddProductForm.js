import React, { useState } from 'react';
import dayjs from 'dayjs';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
  Space,
  Modal,
  Row,
  Col,
} from 'antd';
import { useNavigate } from 'react-router-dom';

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

const AddProductForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [imageChange, setImageChange] = useState('');
  const handleClose = () => {
    navigate('/products');
  };
  const onFinish = (values) => {
    // let newStaff = {
    //   fullname: values.staff_name,
    //   birthday: values.staff_birth.toISOString(),
    //   identityNumber: values.staff_cccd,
    //   gender: values.staff_gender,
    //   phoneNumber: values.staff_phone_number,
    //   email: values.staff_email,
    //   address: values.staff_address,
    //   other: values.staff_other_information,
    //   password: '12345678',
    //   avatar: imageChange,
    //   role: 'EMPLOYEE',
    //   active: true,
    // };
    // console.log(newStaff);
  };
  return (
    <Form
      name="add_staff_form"
      form={form}
      onFinish={onFinish}
      initialValues={{
        staff_other_information: '',
      }}
      validateMessages={validateMessages}
      style={{ background: 'white', padding: '20px', borderRadius: '6px' }}
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
          <Form.Item
            name="staff_name"
            label="Tên sản phẩm"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Tên sản phẩm" />
          </Form.Item>
        </Col>
        <Col span={24} key={7}>
          <Form.Item name="staff_address" label="Mô tả" rules={[{ required: true }]}>
            <TextArea rows={2} placeholder="Mô tả" />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="end">
        <Space>
          <Button size="large" type="primary" htmlType="submit">
            Xác nhận
          </Button>
          <Button size="large" type="primary" danger onClick={handleClose}>
            Đóng
          </Button>
        </Space>
      </Row>
    </Form>
  );
};
export default AddProductForm;
