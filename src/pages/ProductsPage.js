import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Row, Col } from 'antd';
import Toolbar from '~/components/UI/Toolbar';
import { useNavigate } from 'react-router-dom';
import TableProducts from '~/components/Products/TableProducts';
import * as SagaActionTypes from '~/redux/constants';
import { useDispatch, useSelector } from 'react-redux';
import openSocket from 'socket.io-client';
import { productActions } from '~/redux/reducer/ProductReducer';
const { Title } = Typography;

const ProductsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { products, loading } = useSelector((state) => state.productSlice);

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_PRODUCTS_SAGA });
    const socket = openSocket('http://localhost:3001');
    socket.on('products', (data) => {
      if (data.action === 'create') {
        dispatch(productActions.addProduct({ product: data.product }));
      }
    });
  }, [dispatch]);

  const [keyWord, setKeyWord] = useState('');

  const handleAddProduct = () => {
    navigate('/add-product');
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>Danh sách sản phẩm</Title>
        </Col>
        <Col span={24}>
          <Toolbar title={'Thêm sản phẩm'} setKeyWord={setKeyWord} handleAdd={handleAddProduct} />
        </Col>
        <Col span={24}>
          <TableProducts data={products} keyWord={keyWord} loading={loading} />
        </Col>
      </Row>
    </>
  );
};

export default ProductsPage;
