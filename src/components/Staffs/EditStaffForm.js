/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
import dayjs from 'dayjs';
import { Form, Input, Button, Select, DatePicker, Space, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants';
import { validateMessages } from '~/util/constants';

const { Option } = Select;
const { TextArea } = Input;
const dateFormat = 'DD/MM/YYYY';

const EditStaffForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [enableModify, setEnableModify] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(true);
  const { staffById } = useSelector((state) => state.staffSlice);
  const [form] = Form.useForm();

  const handleEnableModify = () => {
    setEnableModify(true);
    setComponentDisabled(false);
  };

  const handleClose = () => {
    navigate('/staffs');
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
    let editStaff = {
      staffId: staffById._id,
      name: values.name,
      address: values.address,
      phone: values.phone,
      gender: values.gender,
      birthday: values.birthday.toDate(),
      email: values.email,
      status: values.status,
    };
    dispatch({
      type: SagaActionTypes.PUT_STAFF_SAGA,
      editStaff: editStaff,
    });
  };

  return (
    <Form
      name="add_staff_form"
      form={form}
      onFinish={onFinish}
      initialValues={{
        name: staffById.name,
        birthday: dayjs(staffById.birthday),
        cccd: '111111111111',
        gender: staffById.gender,
        phone: staffById.phone,
        email: staffById.email,
        address: staffById.address,
        otherInformation: '',
        status: staffById.status,
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
                width: '60%',
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
                pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
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
          <Form.Item
            name="status"
            label="Tình trạng"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Tình trạng"
              allowClear
              style={{
                width: '40%',
              }}
              disabled={componentDisabled}
            >
              <Option value="active">Đang làm</Option>
              <Option value="nonactive">Đã nghỉ</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col span={24} key={8}>
          <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}>
            <TextArea rows={2} placeholder="Địa chỉ" disabled={componentDisabled} />
          </Form.Item>
        </Col>
      </Row>
      <Row justify="end">
        {enableModify === false ? (
          <Space>
            <Button type="primary" size="large" onClick={() => handleEnableModify()}>
              Chỉnh sửa
            </Button>
            <Button type="primary" size="large" danger onClick={handleClose}>
              Đóng
            </Button>
          </Space>
        ) : (
          <Space>
            <Button type="primary" size="large" danger onClick={handleFormCancel}>
              Hủy
            </Button>
            <Button type="primary" size="large" htmlType="submit">
              Lưu
            </Button>
          </Space>
        )}
      </Row>
    </Form>
  );
};
export default EditStaffForm;
