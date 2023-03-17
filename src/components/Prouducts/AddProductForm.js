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
  Typography,
} from 'antd';
import { useNavigate } from 'react-router-dom';
const { Title } = Typography;

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
      name="add_product_form"
      form={form}
      onFinish={onFinish}
      initialValues={{
        staff_other_information: '',
      }}
      validateMessages={validateMessages}
      layout="vertical"
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={16} md={24} lg={16}>
          <div style={{ background: 'white', borderRadius: '6px', marginBottom: '16px', padding: '0 20px' }}>
            <Row>
              <Col span={24}>
                <Title level={4}>Thông tin sản phẩm</Title>
              </Col>
              <Col span={24}>
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
              <Col span={24}>
                <Form.Item name="staff_address" label="Mô tả" rules={[{ required: true }]}>
                  <TextArea rows={2} placeholder="Mô tả" />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div style={{ background: 'white', borderRadius: '6px', marginBottom: '16px', padding: '0 20px' }}>
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col span={24}>
                <Title level={4}>Giá sản phẩm</Title>
              </Col>

              <Col xs={24} sm={12} md={24} lg={12}>
                <Form.Item
                  name="cost"
                  label="Giá nhập"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber
                    className="rounded"
                    min={0}
                    addonAfter={<div>VNĐ</div>}
                    placeholder="Giá nhập"
                    formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => parseInt(value.replace(/\$\s?|(,*)/g, ''))}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={24} lg={12}>
                <Form.Item
                  name="price"
                  label="Giá bán"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber
                    className="rounded"
                    min={0}
                    addonAfter={<div>VNĐ</div>}
                    placeholder="Giá bán"
                    formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => parseInt(value.replace(/\$\s?|(,*)/g, ''))}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div style={{ background: 'white', borderRadius: '6px', marginBottom: '16px', padding: '0 20px' }}>
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

              <Col span={12}>
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
              <Col span={12}>
                <Form.Item name="staff_address" label="Mô tả" rules={[{ required: true }]}>
                  <TextArea rows={2} placeholder="Mô tả" />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div style={{ background: 'white', borderRadius: '6px', marginBottom: '16px', padding: '0 20px' }}>
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

              <Col span={12}>
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
              <Col span={12}>
                <Form.Item name="staff_address" label="Mô tả" rules={[{ required: true }]}>
                  <TextArea rows={2} placeholder="Mô tả" />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div style={{ background: 'white', borderRadius: '6px', padding: '0 20px' }}>
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col span={24}>
                <Title level={4}>Hình ảnh</Title>
              </Col>

              <Col span={12}>
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
              <Col span={12}>
                <Form.Item name="staff_address" label="Mô tả" rules={[{ required: true }]}>
                  <TextArea rows={2} placeholder="Mô tả" />
                </Form.Item>
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={24} sm={8} md={24} lg={8}>
          <Row
            style={{
              background: 'white',
              borderRadius: '6px',
              // filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))',
            }}
            // gutter={{
            //   xs: 8,
            //   sm: 16,
            //   md: 24,
            //   lg: 32,
            // }}
          >
            <Col span={24}>
              <Title level={4}>Thông tin sản phẩm</Title>
            </Col>
            <Col span={24}>
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
            <Col span={24}>
              <Form.Item name="staff_address" label="Mô tả" rules={[{ required: true }]}>
                <TextArea rows={2} placeholder="Mô tả" />
              </Form.Item>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* <Row justify="end">
        <Space>
          <Button size="large" type="primary" htmlType="submit">
            Xác nhận
          </Button>
          <Button size="large" type="primary" danger onClick={handleClose}>
            Đóng
          </Button>
        </Space>
      </Row> */}
    </Form>
  );
};
export default AddProductForm;
