import React, { useEffect, useState } from 'react';
import { Line } from '@ant-design/plots';
import { DashboardService } from '~/services/api/DashboardAPI';
import AlertCustom from '~/components/UI/Notification/Alert';
import { Card } from 'antd';
import TrendLineSkeleton from './TrendLineSkeleton';
import { blue } from '@ant-design/colors';

export default function TrendOfCategoryLineChart() {
  const [data, setData] = useState();

  useEffect(() => {
    const getTrendOfCategories = async () => {
      try {
        const res = await DashboardService.getTrendOfCategories();
        const { status, data } = res;

        if (status === 200) {
          setData(data.data);
        } else {
          AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
        }
      } catch (error) {
        AlertCustom({ type: 'error', title: error?.toString() || 'Có lỗi xảy ra, vui lòng thử lại' });
      }
    };

    getTrendOfCategories();
  }, []);

  const config = {
    data,
    xField: 'date',
    yField: 'sold',
    seriesField: 'category',
    label: true,
    point: {
      size: 5,
      shape: 'circle',
      style: {
        fill: 'white',
        stroke: '#5B8FF9',
        lineWidth: 2,
      },
    },
    tooltip: {
      showMarkers: false,
    },
    state: {
      active: {
        style: {
          shadowBlur: 4,
          stroke: '#000',
          fill: blue[2],
        },
      },
    },
  };

  if (!data) {
    return <TrendLineSkeleton />;
  }

  return (
    <Card title="Xu hướng mua hàng theo danh mục" style={{ marginTop: '30px' }}>
      <Line {...config} />
    </Card>
  );
}
