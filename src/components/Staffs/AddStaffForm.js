/* eslint-disable no-template-curly-in-string */
import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, Select, DatePicker, Upload, Space, Modal, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants';

const { Option } = Select;
const { TextArea } = Input;
const dateFormat = 'DD/MM/YYYY';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

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

const AddStaffForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isCreateStaffSucceeded } = useSelector((state) => state.staffSlice);
  const [form] = Form.useForm();

  useEffect(() => {
    if (isCreateStaffSucceeded) {
      navigate('/staffs', { replace: true });
    }
  }, [isCreateStaffSucceeded, navigate]);

  const handleClose = () => {
    navigate('/staffs');
  };

  const onFinish = (values) => {
    let newStaff = {
      role: '643f6259007149b3f3d19340',
      name: values.staff_name,
      address: values.staff_address,
      phone: values.staff_phone_number,
      gender: values.staff_gender,
      birthday: values.staff_birth.toDate(),
      email: values.staff_email,
    };
    dispatch({
      type: SagaActionTypes.POST_STAFF_SAGA,
      newStaff: newStaff,
    });
    console.log(newStaff);
  };

  return (
    <Form
      name="add_staff_form"
      form={form}
      onFinish={onFinish}
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
          <Form.Item
            name="staff_name"
            label="Họ và tên"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Họ và tên" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={24} lg={12} key={2}>
          <Form.Item
            name="staff_birth"
            label="Ngày sinh"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker
              placeholder="Ngày sinh"
              format={dateFormat}
              disabledDate={(current) => current.isAfter(dayjs())}
            />
          </Form.Item>
        </Col>

        <Col xs={24} sm={12} md={24} lg={12} key={4}>
          <Form.Item
            name="staff_gender"
            label="Giới tính"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Giới tính"
              allowClear
              style={{
                width: '60%',
              }}
            >
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
              <Option value="Khác">Khác</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={24} lg={12} key={5}>
          <Form.Item
            name="staff_phone_number"
            label="Số Điện Thoại"
            rules={[
              {
                pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
                message: 'Số Điện Thoại không hợp lệ',
              },
              { required: true },
            ]}
          >
            <Input placeholder="Số điện thoại" />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={24} lg={12} key={6}>
          <Form.Item name="staff_email" label="Email" rules={[{ type: 'email', required: true }]}>
            <Input placeholder="Email" />
          </Form.Item>
        </Col>
        <Col span={24} key={7}>
          <Form.Item name="staff_address" label="Địa chỉ" rules={[{ required: true }]}>
            <TextArea rows={2} placeholder="Địa chỉ" />
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
export default AddStaffForm;
