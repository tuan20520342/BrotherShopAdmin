/* eslint-disable no-template-curly-in-string */
import React from 'react';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { Row, Col, Button, Form, Input, DatePicker, Space } from 'antd';
import Toolbar from '~/components/UI/Toolbar';
import { useNavigate } from 'react-router-dom';
import ModalForm from '~/HOC/ModalForm';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '~/redux/reducer/ModalReducer';
import AddProductToReceipt from './AddProductToReceipt';
import * as SagaActionTypes from '~/redux/constants';
import LoadingSpin from '~/components/UI/LoadingSpin/LoadingSpin';
import ProductsWarehouseTable from './ProductsWarehouseTable';
import AlertCustom from '~/components/UI/Notification/Alert';

const dateFormat = 'DD/MM/YYYY';

const AddWarehouseReceipt = ({ receiptById }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [keyWord, setKeyWord] = useState('');
  const { loading } = useSelector((state) => state.productSlice);
  const [disabled, setDisabled] = useState(receiptById ? true : false);

  const productInReceiptById = receiptById?.products?.map((product) => {
    const {
      productId: { images, _id, name, price },
      importPrice,
      sizes,
    } = product;
    const mappedProduct = {
      images,
      _id,
      name,
      price,
      importPrice,
      sizes: sizes.map((sizes) => ({ name: sizes.name, quantity: sizes.quantity })),
    };
    return mappedProduct;
  });

  const [products, setProducts] = useState(productInReceiptById ?? []);
  const currentUser = useSelector((state) => state.authenticationSlice.currentUser);

  const isCreateReceiptSucceeded = useSelector((state) => state.receiptSlice.isCreateReceiptSucceeded);

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

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_PRODUCTS_SAGA });
  }, [dispatch]);

  useEffect(() => {
    if (isCreateReceiptSucceeded) {
      navigate('/warehouse-receipt', { replace: true });
    }
  }, [isCreateReceiptSucceeded, navigate]);

  const handleAddProduct = (newProduct) => {
    const updatedProducts = [...products, newProduct];
    setProducts(updatedProducts);
  };

  const handleEditProduct = (editedProduct) => {
    const updatedProducts = [...products];
    const existingProductIndex = updatedProducts.findIndex((product) => product._id === editedProduct._id);

    if (existingProductIndex !== -1) {
      updatedProducts[existingProductIndex].importPrice = editedProduct.importPrice;
      updatedProducts[existingProductIndex].sizes.forEach((size, index) => {
        size.quantity = editedProduct.sizes[index].quantity;
      });

      setProducts(updatedProducts);
    }
  };

  const handleRemoveProduct = (removeProduct) => {
    const updatedProducts = [...products];
    const filteredProducts = updatedProducts.filter((item) => item._id !== removeProduct._id);
    setProducts(filteredProducts);
  };

  const handleShowModalAddProduct = () => {
    dispatch(
      modalActions.showModal({
        title: 'Thêm sản phẩm',
        ComponentContent: <AddProductToReceipt onAddProduct={handleAddProduct} listProducts={products} />,
      }),
    );
  };

  const handleEnableModify = () => {
    setDisabled(false);
  };

  const handleFormCancel = () => {
    setDisabled(true);
    onReset();
    setProducts(productInReceiptById);
  };

  const onReset = () => {
    form.resetFields();
  };

  const handleClose = () => {
    navigate('/warehouse-receipt');
  };

  const handleSubmit = () => {
    form.submit();
  };

  const onFinish = (values) => {
    if (products.length === 0) {
      AlertCustom({ type: 'error', title: 'Cần ít nhất một sản phẩm' });
    } else if (!receiptById) {
      const formattedProducts = products.map((product) => ({
        productId: product._id,
        sizes: product.sizes,
        importPrice: product.importPrice,
      }));
      const newReceipt = { ...values, products: formattedProducts, staff: currentUser._id };

      dispatch({ type: SagaActionTypes.CREATE_RECEIPT_SAGA, newReceipt });
    } else {
      const { staff, ...rest } = values;
      const formattedProducts = products.map((product) => ({
        productId: product._id,
        sizes: product.sizes,
        importPrice: product.importPrice,
      }));
      const updateReceipt = {
        ...rest,
        products: formattedProducts,
        receiptId: receiptById._id,
        staff: receiptById.staff._id,
      };

      dispatch({ type: SagaActionTypes.UPDATE_RECEIPT_SAGA, updateReceipt });
    }
  };
  if (loading) {
    return <LoadingSpin />;
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <Form
            name="add_reciept_form"
            form={form}
            onFinish={onFinish}
            initialValues={{
              staff: receiptById ? receiptById?.staff?.name : currentUser.name,
              date: receiptById ? dayjs(receiptById?.date) : '',
              supplier: receiptById ? receiptById?.supplier : '',
              deliver: receiptById ? receiptById?.deliver : '',
            }}
            validateMessages={validateMessages}
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '6px',
              filter: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))',
              marginBottom: '10px',
            }}
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
              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                  name="date"
                  label="Ngày nhập hàng"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="Ngày nhập hàng"
                    format={dateFormat}
                    disabledDate={(current) => current.isAfter(dayjs())}
                    disabled={disabled}
                    style={{ width: '100%' }}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item name="staff" label="Nhân viên nhập hàng">
                  <Input
                    placeholder="Nhân viên"
                    // value={currentUser.name}
                    // filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    // onChange={onChange}
                    disabled
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                  name="supplier"
                  label="Nhà cung cấp"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Nhà cung cấp" disabled={disabled} />
                </Form.Item>
              </Col>
              <Col xs={24} sm={24} md={24} lg={12}>
                <Form.Item
                  name="deliver"
                  label="Người giao hàng"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Người giao hàng" disabled={disabled} />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={24}>
          <Toolbar
            title={'Thêm sản phẩm'}
            setKeyWord={setKeyWord}
            handleAdd={handleShowModalAddProduct}
            buttonDisability={disabled}
          />
        </Col>
        <Col span={24}>
          <ProductsWarehouseTable
            keyWord={keyWord}
            data={products}
            onEditProduct={handleEditProduct}
            onRemoveProduct={handleRemoveProduct}
            editDisability={disabled}
          />
        </Col>
        <Col span={24}></Col>
      </Row>
      <Row justify="end" style={{ marginTop: '8px', marginBottom: '8px' }}>
        {receiptById ? (
          disabled ? (
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
              <Button size="large" type="primary" onClick={handleSubmit}>
                Lưu
              </Button>
            </Space>
          )
        ) : (
          <Space>
            <Button size="large" type="primary" onClick={handleSubmit}>
              Xác nhận
            </Button>
            <Button size="large" type="primary" danger onClick={handleClose}>
              Đóng
            </Button>
          </Space>
        )}
      </Row>
      <ModalForm />
    </>
  );
};

export default AddWarehouseReceipt;
