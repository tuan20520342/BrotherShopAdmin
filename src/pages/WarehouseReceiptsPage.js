import Search from 'antd/lib/input/Search';
import React from 'react';
import { useState, useEffect } from 'react';
import TableStaffs from '~/components/Staffs/TableStaffs';
import { Typography, Row, Col, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Toolbar from '~/components/UI/Toolbar';
import { useNavigate } from 'react-router-dom';
import TableProducts from '~/components/Prouducts/TableProducts';
import TableWarehouseReceipts from '~/components/WarehouseReceipt/TableWarehouseReceipts';
const { Title } = Typography;

const WarehouseReceiptsPage = () => {
  const navigate = useNavigate();
  //   const staffs = [
  //     {
  //       id: 1,
  //       email: 'abc123@gmail.com',
  //       fullname: 'Nguyen Van A',
  //       birthday: '12/02/2002',
  //       identityNumber: '1231231',
  //       gender: 'MALE',
  //       phoneNumber: '012312313',
  //       address: 'KONTUM',
  //       other: 'NONE',
  //       avatar: '',
  //       role: 'EMPLOYEE',
  //       updatedAt: '',
  //       active: true,
  //     },
  //     {
  //       id: 2,
  //       email: 'tuan@gmail.com',
  //       fullname: 'CHRIST',
  //       birthday: '22/11/1990',
  //       identityNumber: '1231231231',
  //       gender: 'FEMALE',
  //       phoneNumber: '0912031123',
  //       address: 'HCM',
  //       other: '',
  //       avatar: '',
  //       role: 'MANAGER',
  //       updatedAt: '',
  //       active: true,
  //     },
  //   ];
  const [keyWord, setKeyWord] = useState('');

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
          <TableWarehouseReceipts keyWord={keyWord} />
        </Col>
      </Row>
    </>
  );
};

export default WarehouseReceiptsPage;
