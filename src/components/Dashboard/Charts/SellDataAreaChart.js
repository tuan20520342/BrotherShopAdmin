import React, { useEffect } from 'react';
import { Area } from '@ant-design/plots';
import { useDispatch, useSelector } from 'react-redux';

import * as SagaActionTypes from '~/redux/constants';
import { selectRevenueSevenDaysAgo } from '~/redux/reducer/DashboardReducer';
import { Card, Dropdown, Typography } from 'antd';
import { EllipsisOutlined } from '@ant-design/icons';

const SellDataColumnChart = () => {
  const revenue = useSelector(selectRevenueSevenDaysAgo);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_REVENUE, days: 7 });
  }, [dispatch]);

  const config = {
    data: revenue,
    xField: 'date',
    yField: 'revenue',
    xAxis: {
      tickCount: 5,
    },
    animation: false,
    slider: {
      start: 0,
      end: 1,
      trendCfg: {
        isArea: true,
      },
    },
  };

  const items = [
    {
      label: '7 ngày qua',
      key: '1',
      onClick: () => {
        dispatch({ type: SagaActionTypes.GET_REVENUE, days: 7 });
      },
    },
    {
      label: '1 tháng qua',
      key: '2',
      onClick: () => {
        dispatch({ type: SagaActionTypes.GET_REVENUE, days: 30 });
      },
    },
    {
      label: '6 tháng qua',
      key: '3',
      onClick: () => {
        dispatch({ type: SagaActionTypes.GET_REVENUE, days: 180 });
      },
    },
    {
      label: '1 năm qua',
      key: '4',
      onClick: () => {
        dispatch({ type: SagaActionTypes.GET_REVENUE, days: 365 });
      },
    },
  ];

  return (
    <Card
      title="Doanh thu bán hàng"
      extra={
        <Dropdown menu={{ items }} placement="bottom">
          <EllipsisOutlined style={{ fontSize: '20px' }} />
        </Dropdown>
      }
      bodyStyle={{ padding: '1rem' }}
      style={{ marginTop: '30px' }}
    >
      {revenue.length === 0 ? (
        <Typography.Title style={{ fontSize: '20px', textAlign: 'center' }}>Không có dữ liệu</Typography.Title>
      ) : (
        <Area {...config} />
      )}
    </Card>
  );
};

export default SellDataColumnChart;
