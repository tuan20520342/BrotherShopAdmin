/* eslint-disable no-template-curly-in-string */
import React from 'react';
import { Form, Input, Button, Space, Row, InputNumber, DatePicker, Select } from 'antd';

import { modalActions } from '~/redux/reducer/ModalReducer';
import * as SagaActionTypes from '~/redux/constants';
import { useDispatch, useSelector } from 'react-redux';
const { RangePicker } = DatePicker;

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

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const AddPromoForm = () => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const { categories } = useSelector((state) => state.categorySlice);
  const types = [];
  categories.forEach((element) => {
    if (element.types.length > 0) {
      types.push(...element.types);
    } else {
      types.push(element);
    }
  });
  console.log(types);

  const categoryOptions = types.map(function (type) {
    return { value: JSON.stringify(type), label: type?.type || type?.name };
  });

  const onFinish = (values) => {
    console.log(values);
  };

  const handleClose = () => {
    dispatch(modalActions.hideModal());
  };

  return (
    <Form
      name="add_promo_form"
      form={form}
      onFinish={onFinish}
      initialValues={{}}
      validateMessages={validateMessages}
      {...formItemLayout}
    >
      <Form.Item
        name="promo"
        label="Tên khuyến mãi"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Tên khuyến mãi" />
      </Form.Item>
      <Form.Item
        name="category"
        label="Danh mục áp dụng"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select showSearch placeholder="Danh mục" allowClear options={categoryOptions}></Select>
      </Form.Item>
      <Form.Item
        name="discount"
        label="Phần trăm ưu đãi"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber
          className="rounded"
          min={0}
          max={100}
          addonAfter={<div>%</div>}
          placeholder="Phần trăm ưu đãi"
          parser={(value) => parseInt(value.replace(/\$\s?|(,*)/g, ''))}
        />
      </Form.Item>
      <Form.Item
        name="expire"
        label="Thời hạn"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <RangePicker
          placeholder={['Bắt đầu', 'Kết thúc']}
          showTime={{
            format: 'HH:mm',
          }}
          format="YYYY-MM-DD HH:mm"
        />
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
export default AddPromoForm;
