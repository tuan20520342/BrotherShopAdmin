import React, { useEffect } from 'react';
import { useState } from 'react';
import { Typography, Row, Col } from 'antd';
import Toolbar from '~/components/UI/Toolbar';
import { useNavigate } from 'react-router-dom';
import TableWarehouseReceipts from '~/components/WarehouseReceipt/TableWarehouseReceipts';
import { useDispatch, useSelector } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants';
const { Title } = Typography;

const WarehouseReceiptsPage = () => {
  const [keyWord, setKeyWord] = useState('');
  const { items, loading } = useSelector((state) => state.receiptSlice);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_RECEIPTS_SAGA });
  }, [dispatch]);

  const handleAddWearhouseReceipt = () => {
    navigate('/add-warehouse-receipt');
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>Danh sách phiếu nhập kho</Title>
        </Col>
        <Col span={24}>
          <Toolbar title={'Thêm phiếu nhập kho'} setKeyWord={setKeyWord} handleAdd={handleAddWearhouseReceipt} />
        </Col>
        <Col span={24}>
          <TableWarehouseReceipts keyWord={keyWord} data={items} loading={loading} />
        </Col>
      </Row>
    </>
  );
};

export default WarehouseReceiptsPage;
