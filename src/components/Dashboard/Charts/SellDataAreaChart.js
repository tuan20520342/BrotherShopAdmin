import React from 'react';
import { Area } from '@ant-design/plots';

const SellDataColumnChart = () => {
  const data = [
    {
      date: '2021-03',
      revenue: 1000,
    },
    {
      date: '2021-04',
      revenue: 5000,
    },
    {
      date: '2021-05',
      revenue: 5000,
    },
  ];

  const config = {
    data,
    xField: 'date',
    yField: 'revenue',
    xAxis: {
      tickCount: 5,
    },
    animation: false,
    slider: {
      start: 0.1,
      end: 0.9,
      trendCfg: {
        isArea: true,
      },
    },
  };

  return <Area {...config} />;
};

export default SellDataColumnChart;
