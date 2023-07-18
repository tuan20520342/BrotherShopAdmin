import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Form, Input, Button, Select, DatePicker, Space, Row, Col, Typography, Divider } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants';
import { validateMessages } from '~/util/constants';
import FormContainer from '../UI/Container/FormContainer';
import ChangePasswordForm from './ChangePassword';

const { Option } = Select;
const { TextArea } = Input;
const { Title } = Typography;
const dateFormat = 'DD/MM/YYYY';

const ProfileForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [enableModify, setEnableModify] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [loading, setLoading] = useState(false);
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

  const onEditLoading = () => {
    setLoading(false);
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    setLoading(true);
    const editUser = {
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
      onEditLoading,
    });
  };

  return (
    <FormContainer>
      <Title level={3} style={{ marginTop: 0 }}>
        Cập nhật thông tin tài khoản
      </Title>
      <Form
        name="add_staff_form"
        form={form}
        onFinish={onFinish}
        initialValues={{
          name: currentUser.name,
          birthday: dayjs(currentUser.birthday),
          gender: currentUser.gender,
          phone: currentUser.phone,
          email: currentUser.email,
          address: currentUser.address,
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
          <Col xs={24} sm={12} md={12} lg={6} key={2}>
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
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col xs={24} sm={12} md={12} lg={6} key={4} offset={0}>
            <Form.Item
              name="gender"
              label="Giới tính"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Select placeholder="Giới tính" allowClear disabled={componentDisabled}>
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
          <Col xs={24} sm={24} md={24} lg={12} key={6}>
            <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true }]}>
              <Input placeholder="Email" disabled={true} />
            </Form.Item>
          </Col>
          <Col span={24} key={7}>
            <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}>
              <TextArea rows={2} placeholder="Địa chỉ" disabled={componentDisabled} />
            </Form.Item>
          </Col>
        </Row>
        <Row justify="end">
          {enableModify === false ? (
            <Space>
              <Button size="large" type="primary" onClick={() => handleEnableModify()}>
                Chỉnh sửa
              </Button>
              <Button size="large" type="primary" danger onClick={handleClose}>
                Đóng
              </Button>
            </Space>
          ) : (
            <Space>
              <Button size="large" type="primary" danger onClick={handleFormCancel}>
                Hủy
              </Button>
              <Button loading={loading} size="large" type="primary" htmlType="submit">
                Lưu
              </Button>
            </Space>
          )}
        </Row>
      </Form>
      <Divider />
      <Title level={3}>Thay đổi mật khẩu</Title>
      <ChangePasswordForm />
    </FormContainer>
  );
};
export default ProfileForm;
