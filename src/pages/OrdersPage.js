import React from 'react';
import { Typography, Row, Col } from 'antd';
const { Title } = Typography;

const OrdersPage = () => {
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

  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>Danh sách đơn hàng</Title>
        </Col>
        <Col span={24}>
          {/* <Toolbar title={'Thêm sản phẩm'} setKeyWord={setKeyWord} handleAdd={handleAddProduct} /> */}
        </Col>
        <Col span={24}>{/* <TableProducts keyWord={keyWord} /> */}</Col>
      </Row>
    </>
  );
};

export default OrdersPage;
