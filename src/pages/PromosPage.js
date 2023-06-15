import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Row, Col } from 'antd';
import Toolbar from '~/components/UI/Toolbar';
import { useNavigate } from 'react-router-dom';
import * as SagaActionTypes from '~/redux/constants';
import { useDispatch, useSelector } from 'react-redux';
import openSocket from 'socket.io-client';
import TablePromos from '~/components/Promos/TablePromos';
import { modalActions } from '~/redux/reducer/ModalReducer';
import ModalForm from '~/HOC/ModalForm';
import AddPromoForm from '~/components/Promos/AddPromoForm';
const { Title } = Typography;

const PromosPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [keyWord, setKeyWord] = useState('');

  const handleAddPromo = () => {
    dispatch(
      modalActions.showModal({
        title: 'Thêm khuyến mãi',
        ComponentContent: <AddPromoForm />,
      }),
    );
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>Danh sách khuyến mãi</Title>
        </Col>
        <Col span={24}>
          <Toolbar title={'Thêm khuyến mãi'} setKeyWord={setKeyWord} handleAdd={handleAddPromo} />
        </Col>
        <Col span={24}>
          <TablePromos keyWord={keyWord} />
        </Col>
      </Row>
      <ModalForm />
    </>
  );
};

export default PromosPage;
