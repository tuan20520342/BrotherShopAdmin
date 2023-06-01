import React from 'react';
import { Pie } from '@ant-design/plots';

export default function CategoryDataPieChart() {
  const data = [
    {
      type: 'aaa',
      value: 27,
    },
    {
      type: 'bbb',
      value: 25,
    },
    {
      type: 'zzz',
      value: 18,
    },
    {
      type: 'ttt',
      value: 15,
    },
    {
      type: 'fff',
      value: 10,
    },
    {
      type: '111',
      value: 5,
    },
  ];
  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'type',
    radius: 0.75,
    label: {
      type: 'spider',
      labelHeight: 28,
      content: '{name}\n{percentage}',
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
    ],
  };
  return <Pie {...config} />;
}
