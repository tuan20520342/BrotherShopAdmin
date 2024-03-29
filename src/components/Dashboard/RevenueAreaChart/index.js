import React, { useEffect, useState } from 'react';
import { Area } from '@ant-design/plots';
import { Card, Typography } from 'antd';
import AlertCustom from '~/components/UI/Notification/Alert';
import { DashboardService } from '~/services/api/DashboardAPI';
import SelectTime from './SelectTime';
import { printNumberWithCommas } from '~/util/shared';
import RevenueChartSkeleton from './RevenueChartSkeleton';

const formatChartLabel = (value) => {
  return printNumberWithCommas(value);
};

const RevenueAreaChart = () => {
  const [data, setData] = useState();

  useEffect(() => {
    getRevenue(7);
  }, []);

  const getRevenue = async (days) => {
    try {
      const res = await DashboardService.getRevenue(days);
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

  const config = {
    data,
    xField: 'date',
    yField: 'revenue',
    xAxis: {
      tickCount: 5,
    },
    yAxis: {
      label: {
        formatter: formatChartLabel,
      },
    },
    animation: false,
    slider: {
      start: 0,
      end: 1,
      trendCfg: {
        isArea: true,
      },
    },
    meta: {
      revenue: {
        alias: 'Doanh thu',
        formatter: formatChartLabel,
      },
    },
  };

  if (!data) {
    return <RevenueChartSkeleton />;
  }

  return (
    <Card
      title="Doanh thu bán hàng"
      extra={<SelectTime onTimeChange={getRevenue} />}
      bodyStyle={{ padding: '1rem' }}
      style={{ marginTop: '30px' }}
    >
      {data.length === 0 ? (
        <Typography.Title style={{ fontSize: '20px', textAlign: 'center' }}>Không có dữ liệu</Typography.Title>
      ) : (
        <Area {...config} />
      )}
    </Card>
  );
};

export default RevenueAreaChart;
