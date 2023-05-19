import Search from 'antd/lib/input/Search';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Typography, Row, Col } from 'antd';
import TableCustomers from '~/components/Customers/TableCustomers';
import { useDispatch, useSelector } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants/constant';

const { Title } = Typography;

const CustomersPage = () => {
  const dispatch = useDispatch();
  const { customers, loading } = useSelector((state) => state.customerSlice);
  const [keyWord, setKeyWord] = useState('');

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_CUSTOMERS_SAGA });
  }, [dispatch]);

  console.log(customers);

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
          <TableCustomers keyWord={keyWord} data={customers} loading={loading} />
        </Col>
      </Row>
    </>
  );
};

export default CustomersPage;
