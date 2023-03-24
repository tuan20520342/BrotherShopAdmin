import React, { useState } from 'react';
import { Form, Input, Button, Space, Row } from 'antd';
import { useNavigate } from 'react-router-dom';

import ModalForm from '~/HOC/ModalForm';
import { modalActions } from '~/redux/reducer/ModalReducer';
import { useDispatch, useSelector } from 'react-redux';

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

const AddCategoryForm = () => {
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };
  const handleClose = () => {
    dispatch(modalActions.hideModal());
  };
  return (
    <Form
      name="add_category_form"
      form={form}
      onFinish={onFinish}
      initialValues={{
        staff_other_information: '',
      }}
      validateMessages={validateMessages}
    >
      <Form.Item
        name="category"
        label="Tên danh mục"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Tên danh mục" />
      </Form.Item>
      <Row justify="end">
        <Space>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
          <Button type="primary" danger onClick={handleClose}>
            Đóng
          </Button>
        </Space>
      </Row>
    </Form>
  );
};
export default AddCategoryForm;
