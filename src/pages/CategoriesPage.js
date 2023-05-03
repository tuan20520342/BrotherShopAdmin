import Search from 'antd/lib/input/Search';
import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Row, Col, Button, Modal, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Toolbar from '~/components/UI/Toolbar';
import { useNavigate } from 'react-router-dom';
import TableCategories from '~/components/Categories/TableCategories';
import ModalForm from '~/HOC/ModalForm';
import { modalActions } from '~/redux/reducer/ModalReducer';
import { useDispatch, useSelector } from 'react-redux';
import AddCategoryForm from '~/components/Categories/AddCategoryForm';
import * as SagaActionTypes from '~/redux/constants/constant';

const { Title } = Typography;

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categorySlice);

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_CATEGORIES_SAGA });
  }, []);

  const [keyWord, setKeyWord] = useState('');

  const handleAddCategory = () => {
    dispatch(
      modalActions.showModal({
        title: 'Thêm danh mục sản phẩm',
        ComponentContent: <AddCategoryForm />,
      }),
    );
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>Danh mục sản phẩm</Title>
        </Col>
        <Col span={24}>
          <Toolbar title={'Thêm danh mục'} setKeyWord={setKeyWord} handleAdd={handleAddCategory} />
        </Col>
        <Col span={24}>
          <TableCategories data={categories} keyWord={keyWord} loading={loading} />
        </Col>
      </Row>
      <ModalForm />
    </>
  );
};

export default CategoriesPage;
