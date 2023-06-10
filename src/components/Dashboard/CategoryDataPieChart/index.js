import React, { useEffect, useState } from 'react';
import { Pie } from '@ant-design/plots';
import { Card, Typography } from 'antd';
import { DashboardService } from '~/services/api/DashboardAPI';
import AlertCustom from '~/components/UI/Notification/Alert';

export default function CategoryDataPieChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getPercentageCategories = async () => {
      try {
        const res = await DashboardService.getPercentageCategories();
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

    getPercentageCategories();
  }, []);

  const config = {
    appendPadding: 10,
    data,
    angleField: 'value',
    colorField: 'name',
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

  return (
    <Card title="Sản phẩm đã bán theo danh mục" style={{ marginTop: '30px' }}>
      {data.length === 0 ? (
        <Typography.Title style={{ fontSize: '20px', textAlign: 'center' }}>Không có dữ liệu</Typography.Title>
      ) : (
        <Pie {...config} />
      )}
    </Card>
  );
}
