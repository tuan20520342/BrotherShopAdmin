import Search from 'antd/lib/input/Search';
import React from 'react';
import { useState, useEffect } from 'react';
import TableStaffs from '~/components/Staffs/TableStaffs';
import { Typography, Row, Col, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
const { Title } = Typography;

const StaffsPage = () => {
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

  const handleAddStaff = () => {};

  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>Danh sách nhân viên</Title>
        </Col>
      </Row>
      <Row wrap={true} gutter={8} justify="end">
        <Col
          //   sm={4}
          //   xs={{
          //     span: 24,
          //   }}
          style={{ marginBottom: '4px' }}
        >
          <Search
            style={{
              width: 'fit-content',
            }}
            name="search"
            placeholder="Tìm kiếm..."
            allowClear
            // onSearch={(value) => {
            //   setKeyWord(value);
            // }}
            onChange={(e) => {
              setKeyWord(e.target.value);
            }}
          />
        </Col>
        <Col style={{ marginBottom: '4px' }}>
          <Button type="primary" onClick={handleAddStaff} icon={<PlusOutlined />}>
            {/* <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-4 h-4 mr-3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg> */}
            Thêm nhân viên
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <TableStaffs keyWord={keyWord} data={staffs} />
        </Col>
      </Row>
    </>
  );
};

export default StaffsPage;
