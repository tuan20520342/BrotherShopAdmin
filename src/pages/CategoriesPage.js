import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Row, Col } from 'antd';
import Toolbar from '~/components/UI/Toolbar';
import TableCategories from '~/components/Categories/TableCategories';
import ModalForm from '~/HOC/ModalForm';
import { modalActions } from '~/redux/reducer/ModalReducer';
import { useDispatch, useSelector } from 'react-redux';
import AddCategoryForm from '~/components/Categories/AddCategoryForm';
import * as SagaActionTypes from '~/redux/constants';

const { Title } = Typography;

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const { categories, loading } = useSelector((state) => state.categorySlice);

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_CATEGORIES_SAGA });
  }, [dispatch]);

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
