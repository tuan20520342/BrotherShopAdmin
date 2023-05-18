import Search from 'antd/lib/input/Search';
import React from 'react';
import { useState } from 'react';
import { Typography, Row, Col } from 'antd';
import TableCustomers from '~/components/Customers/TableCustomers';
const { Title } = Typography;

const CustomersPage = () => {
  const staffs = [
    {
      id: 1,
      email: 'abc123@gmail.com',
      fullname: 'Nguyen Van A',
      birthday: '12/02/2002',
      identityNumber: '1231231',
      gender: 'MALE',
      phoneNumber: '012312313',
      address: 'KONTUM',
      other: 'NONE',
      avatar: '',
      role: 'EMPLOYEE',
      updatedAt: '',
      active: true,
    },
    {
      id: 2,
      email: 'tuan@gmail.com',
      fullname: 'CHRIST',
      birthday: '22/11/1990',
      identityNumber: '1231231231',
      gender: 'FEMALE',
      phoneNumber: '0912031123',
      address: 'HCM',
      other: '',
      avatar: '',
      role: 'MANAGER',
      updatedAt: '',
      active: true,
    },
  ];
  const [keyWord, setKeyWord] = useState('');

  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>Danh sách khách hàng</Title>
        </Col>
        <Col span={24} style={{ marginBottom: '4px', textAlign: 'end' }}>
          <Search
            style={{ width: 'fit-content' }}
            name="search"
            placeholder="Tìm kiếm..."
            allowClear
            onChange={(e) => {
              setKeyWord(e.target.value);
            }}
          />
        </Col>
        <Col span={24}>
          <TableCustomers keyWord={keyWord} data={staffs} />
        </Col>
      </Row>
    </>
  );
};

export default CustomersPage;
