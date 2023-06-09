import React, { useState, useEffect } from 'react';
import { Bar } from '@ant-design/plots';
import AlertCustom from '~/components/UI/Notification/Alert';
import { DashboardService } from '~/services/api/DashboardAPI';
import { Card } from 'antd';

export default function SoldQuantityProductsColumnChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const getSoldQuantity = async () => {
      try {
        const res = await DashboardService.getSoldQuantityProducts();
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

    getSoldQuantity();
  }, []);

  const config = {
    data,
    xField: 'sold',
    yField: 'name',
    xAxis: {
      label: {
        autoRotate: true,
      },
    },
    scrollbar: {
      type: 'vertical',
    },
    meta: {
      sold: {
        alias: 'Đã bán',
      },
    },
  };

  return (
    <Card title="Sản phẩm đã bán" style={{ marginTop: '30px' }}>
      <Bar {...config} />
    </Card>
  );
}
