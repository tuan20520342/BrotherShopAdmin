/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Form, Input, Button, Select, DatePicker, Space, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants';

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

const ProfileForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [enableModify, setEnableModify] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(true);
  const { currentUser } = useSelector((state) => state.authenticationSlice);
  const [form] = Form.useForm();

  const handleEnableModify = () => {
    setEnableModify(true);
    setComponentDisabled(false);
  };

  const handleClose = () => {
    navigate('/');
  };

  const handleFormCancel = () => {
    setEnableModify(false);
    setComponentDisabled(true);
    onReset();
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    let editUser = {
      staffId: currentUser._id,
      role: currentUser.role._id,
      name: values.name,
      address: values.address,
      phone: values.phone,
      gender: values.gender,
      birthday: values.birthday.toDate(),
      email: values.email,
      status: currentUser.status,
    };
    dispatch({
      type: SagaActionTypes.PUT_CURRENT_USER_SAGA,
      editUser: editUser,
    });
  };

  return (
    <Form
      name="add_staff_form"
      form={form}
      onFinish={onFinish}
      initialValues={{
        name: currentUser.name,
        birthday: dayjs(currentUser.birthday),
        cccd: '111111111111',
        gender: currentUser.gender,
        phone: currentUser.phone,
        email: currentUser.email,
        address: currentUser.address,
        otherInformation: '',
        // status: currentUser.status,
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
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Họ và tên" disabled={componentDisabled} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={24} lg={12} key={2}>
          <Form.Item
            name="birthday"
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
              disabled={componentDisabled}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={24} lg={12} key={3}>
          <Form.Item
            name="cccd"
            label="CCCD"
            rules={[
              {
                pattern: /^[\d]{12,12}$/,
                message: 'CCCD không hợp lệ',
              },
              { required: true },
            ]}
          >
            <Input placeholder="CCCD" disabled={true} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={24} lg={12} key={4}>
          <Form.Item
            name="gender"
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
                width: '40%',
              }}
              disabled={componentDisabled}
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
              { required: true },
            ]}
          >
            <Input placeholder="Số điện thoại" disabled={componentDisabled} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={24} lg={12} key={6}>
          <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true }]}>
            <Input placeholder="Email" disabled={true} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={24} lg={12} key={7}>
          <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}>
            <TextArea rows={2} placeholder="Địa chỉ" disabled={componentDisabled} />
          </Form.Item>
        </Col>

        <Col xs={24} key={8}>
          <Form.Item name="otherInformation" label="Khác">
            <TextArea rows={2} placeholder="Khác" disabled={componentDisabled} />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="end">
        {enableModify === false ? (
          <Space>
            <Button type="primary" onClick={() => handleEnableModify()}>
              Chỉnh sửa
            </Button>
            <Button type="primary" danger onClick={handleClose}>
              Đóng
            </Button>
          </Space>
        ) : (
          <Space>
            <Button type="primary" danger onClick={handleFormCancel}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Space>
        )}
      </Row>
    </Form>
  );
};
export default ProfileForm;
