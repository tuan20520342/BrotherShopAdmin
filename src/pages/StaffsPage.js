import React from 'react';
import { useState, useEffect } from 'react';
import TableStaffs from '~/components/Staffs/TableStaffs';
import { Typography, Row, Col } from 'antd';
import Toolbar from '~/components/UI/Toolbar';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants/constant';
const { Title } = Typography;

const StaffsPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { staffs, loading } = useSelector((state) => state.staffSlice);
  const [keyWord, setKeyWord] = useState('');

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_STAFFS_SAGA });
  }, [dispatch]);

  const handleAddStaff = () => {
    navigate('/add-staff');
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>Danh sách nhân viên</Title>
        </Col>
        <Col span={24}>
          <Toolbar title={'Thêm nhân viên'} setKeyWord={setKeyWord} handleAdd={handleAddStaff} />
        </Col>
        <Col span={24}>
          <TableStaffs keyWord={keyWord} data={staffs} loading={loading} />
        </Col>
      </Row>
    </>
  );
};

export default StaffsPage;
