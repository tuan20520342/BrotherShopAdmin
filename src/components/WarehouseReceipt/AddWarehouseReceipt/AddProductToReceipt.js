import React, { useState } from 'react';
import { Form, Input, Button, Space, Row, Select, InputNumber, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import ModalForm from '~/HOC/ModalForm';
import { modalActions } from '~/redux/reducer/ModalReducer';
import { useDispatch, useSelector } from 'react-redux';
import './style/CustomInputNumber.css';

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
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 18,
    },
  },
};

const sizeLayout = {
  labelCol: {
    span: 2,
  },
  wrapperCol: {
    span: 16,
  },
};

const AddProductToReceipt = () => {
  let { products } = useSelector((state) => state.productSlice);
  const dispatch = useDispatch();
  const [productById, setProductById] = useState('');
  const [form] = Form.useForm();

  const optionsProducts = products.map(function (product) {
    return {
      value: product._id,
      label: `${product._id.substring(0, 6).toUpperCase()} - ${product.name}`,
    };
  });

  const onChange = (value) => {
    if (value !== undefined && products !== null) {
      const productById = products.find((item) => item._id == value);
      setProductById(productById);
      form.setFieldsValue({
        name: productById.name,
        price: productById.price,
      });
    }
  };

  const onFinish = (values) => {
    console.log(values);
  };

  const handleClose = () => {
    dispatch(modalActions.hideModal());
  };
  return (
    <Form
      name="add_product_to_receipt"
      form={form}
      onFinish={onFinish}
      initialValues={{
        S: 0,
        M: 0,
        L: 0,
        XL: 0,
      }}
      validateMessages={validateMessages}
      {...formItemLayout}
    >
      <Form.Item
        name="productId"
        label="Mã sản phẩm"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Select
          showSearch
          allowClear
          placeholder="Sản phẩm"
          options={optionsProducts}
          filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
          onChange={onChange}
        ></Select>
      </Form.Item>
      <Form.Item noStyle shouldUpdate={(prevValues, currentValues) => prevValues.productId !== currentValues.productId}>
        {({ getFieldValue }) =>
          getFieldValue('productId') !== undefined ? (
            <>
              <Form.Item name="name" label="Tên sản phẩm">
                <Input disabled />
              </Form.Item>
              <Form.Item name="image" label="Hình ảnh">
                <Image
                  width={100}
                  src={`https://res.cloudinary.com/ddajkcbs2/image/upload/${productById.images.mainImg}`}
                />
              </Form.Item>
              <Form.Item name="price" label="Giá bán">
                <InputNumber
                  className="input-number-right"
                  min={0}
                  addonAfter={<div>VNĐ</div>}
                  placeholder="Giá bán"
                  formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                  parser={(value) => parseInt(value.replace(/\$\s?|(,*)/g, ''))}
                  disabled
                />
              </Form.Item>
            </>
          ) : null
        }
      </Form.Item>
      <Form.Item
        name="importPrice"
        label="Giá nhập"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber
          className="input-number-right"
          min={0}
          addonAfter={<div>VNĐ</div>}
          placeholder="Giá nhập"
          formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={(value) => parseInt(value.replace(/\$\s?|(,*)/g, ''))}
        />
      </Form.Item>
      <Form.Item
        name="Sizes"
        label="Số lượng"
        rules={[
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (getFieldValue('S') + getFieldValue('M') + getFieldValue('L') + getFieldValue('XL') !== 0) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('Phải có ít nhất một sản phẩm!'));
            },
          }),
        ]}
      >
        <Form.Item noStyle>
          <Form.Item name="S" label="S" {...sizeLayout}>
            <InputNumber
              className="input-number-right"
              min={0}
              placeholder="Số lượng"
              formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => parseInt(value.replace(/\$\s?|(,*)/g, ''))}
            />
          </Form.Item>
          <Form.Item name="M" label="M" {...sizeLayout}>
            <InputNumber
              className="input-number-right"
              min={0}
              placeholder="Số lượng"
              formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => parseInt(value.replace(/\$\s?|(,*)/g, ''))}
            />
          </Form.Item>
          <Form.Item name="L" label="L" {...sizeLayout}>
            <InputNumber
              className="input-number-right"
              min={0}
              placeholder="Số lượng"
              formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => parseInt(value.replace(/\$\s?|(,*)/g, ''))}
            />
          </Form.Item>
          <Form.Item name="XL" label="XL" {...sizeLayout}>
            <InputNumber
              className="input-number-right"
              min={0}
              placeholder="Số lượng"
              formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
              parser={(value) => parseInt(value.replace(/\$\s?|(,*)/g, ''))}
            />
          </Form.Item>
        </Form.Item>
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
export default AddProductToReceipt;