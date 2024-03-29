import React, { useState } from 'react';
import { Form, Input, Button, Space, Row, Select, InputNumber, Image } from 'antd';
import { modalActions } from '~/redux/reducer/ModalReducer';
import { useDispatch, useSelector } from 'react-redux';
import './style/CustomInputNumber.css';
import { validateMessages } from '~/util/constants';
import { printNumberWithCommas } from '~/util/shared';

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

const AddProductToReceipt = ({ onAddProduct, onEditProduct, product, listProducts, editDisability }) => {
  const { products } = useSelector((state) => state.productSlice);
  const dispatch = useDispatch();
  const [productById, setProductById] = useState('');
  const [disabled, setDisabled] = useState(product ? true : false);

  const [form] = Form.useForm();

  const optionsProducts = products
    .filter((item) => listProducts?.findIndex((listItem) => listItem._id === item._id) === -1)
    .map(function (product) {
      return {
        value: product._id,
        label: `${product._id.substring(0, 6).toUpperCase()} - ${product.name}`,
      };
    });

  const onChange = (value) => {
    if (value !== undefined && products !== null) {
      const productById = products.find((item) => item._id === value);
      setProductById(productById);

      form.setFieldsValue({
        name: productById.name,
        price: productById.price,
      });
    }
  };

  const handleEnableModify = () => {
    setDisabled(false);
  };

  const handleFormCancel = () => {
    setDisabled(true);
    onReset();
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    const { productId, name, price, importPrice, S, M, L, XL } = values;

    const newProduct = {
      images: {
        mainImg: product ? product.images.mainImg : productById.images.mainImg,
      },
      _id: productId,
      name: name,
      price: price,
      importPrice: importPrice,
      sizes: [
        { name: 'S', quantity: S },
        { name: 'M', quantity: M },
        { name: 'L', quantity: L },
        { name: 'XL', quantity: XL },
      ],
    };

    if (product) {
      onEditProduct(newProduct);
    } else {
      onAddProduct(newProduct);
    }
    handleClose();
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
        S: product?.sizes[0].quantity || 0,
        M: product?.sizes[1].quantity || 0,
        L: product?.sizes[2].quantity || 0,
        XL: product?.sizes[3].quantity || 0,
        productId: product?._id,
        name: product?.name,
        price: product?.price,
        importPrice: product?.importPrice,
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
          disabled={product}
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
                <>
                  <Image
                    width={100}
                    src={`https://res.cloudinary.com/ddajkcbs2/image/upload/${
                      product ? product.images.mainImg : productById.images.mainImg
                    }`}
                  />
                  <span style={{ margin: '6px' }}></span>
                  <Image
                    width={100}
                    src={`https://res.cloudinary.com/ddajkcbs2/image/upload/${
                      product ? product.images.subImg : productById.images.subImg
                    }`}
                  />
                </>
              </Form.Item>
              <Form.Item name="price" label="Giá bán">
                <InputNumber
                  className="input-number-right"
                  min={0}
                  addonAfter={<div>VNĐ</div>}
                  placeholder="Giá bán"
                  formatter={(value) => printNumberWithCommas(value)}
                  parser={(value) => parseInt(value.replace(/\$\s?|(,*)/g, ''))}
                  disabled
                  style={{ width: '100%' }}
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
          formatter={(value) => printNumberWithCommas(value)}
          parser={(value) => parseInt(value.replace(/\$\s?|(,*)/g, ''))}
          disabled={disabled}
          style={{ width: '100%' }}
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
              formatter={(value) => printNumberWithCommas(value)}
              parser={(value) => parseInt(value.replace(/\$\s?|(,*)/g, ''))}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item name="M" label="M" {...sizeLayout}>
            <InputNumber
              className="input-number-right"
              min={0}
              placeholder="Số lượng"
              formatter={(value) => printNumberWithCommas(value)}
              parser={(value) => parseInt(value.replace(/\$\s?|(,*)/g, ''))}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item name="L" label="L" {...sizeLayout}>
            <InputNumber
              className="input-number-right"
              min={0}
              placeholder="Số lượng"
              formatter={(value) => printNumberWithCommas(value)}
              parser={(value) => parseInt(value.replace(/\$\s?|(,*)/g, ''))}
              disabled={disabled}
            />
          </Form.Item>
          <Form.Item name="XL" label="XL" {...sizeLayout}>
            <InputNumber
              className="input-number-right"
              min={0}
              placeholder="Số lượng"
              formatter={(value) => printNumberWithCommas(value)}
              parser={(value) => parseInt(value.replace(/\$\s?|(,*)/g, ''))}
              disabled={disabled}
            />
          </Form.Item>
        </Form.Item>
      </Form.Item>
      <Row justify="end">
        {product ? (
          disabled ? (
            <Space>
              {!editDisability && (
                <Button type="primary" onClick={() => handleEnableModify()}>
                  Chỉnh sửa
                </Button>
              )}
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
          )
        ) : (
          <Space>
            <Button type="primary" htmlType="submit">
              Xác nhận
            </Button>
            <Button type="primary" danger onClick={handleClose}>
              Đóng
            </Button>
          </Space>
        )}
      </Row>
    </Form>
  );
};
export default AddProductToReceipt;
