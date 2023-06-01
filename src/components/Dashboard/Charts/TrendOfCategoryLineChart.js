import React from 'react';
import { Line } from '@ant-design/plots';

export default function TrendOfCategoryLineChart() {
  const data = [
    {
      year: '2020',
      value: 30,
      category: 'aaa',
    },
    {
      year: '2020',
      value: 100,
      category: 'bbb',
    },
    {
      year: '2020',
      value: 200,
      category: 'ccc',
    },
    {
      year: '2021',
      value: 40,
      category: 'aaa',
    },
    {
      year: '2021',
      value: 120,
      category: 'bbb',
    },
    {
      year: '2021',
      value: 300,
      category: 'ccc',
    },
    {
      year: '2022',
      value: 80,
      category: 'ccc',
    },
    {
      year: '2023',
      value: 500,
      category: 'bbb',
    },
    {
      year: '2022',
      value: 100,
      category: 'aaa',
    },
  ];

  const config = {
    data,
    xField: 'year',
    yField: 'value',
    seriesField: 'category',
    xAxis: {
      type: 'time',
    },
    yAxis: {
      label: {
        // 数值格式化为千分位
        formatter: (v) => `${v}`.replace(/\d{1,3}(?=(\d{3})+$)/g, (s) => `${s},`),
      },
    },
  };

  return <Line {...config} />;
}
