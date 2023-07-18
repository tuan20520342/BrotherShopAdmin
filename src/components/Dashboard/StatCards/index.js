import { Col } from 'antd';
import { ShopOutlined, UserOutlined, TeamOutlined, ShoppingOutlined } from '@ant-design/icons';
import StatCardItem from '~/components/Dashboard/StatCards/StatCardItem';
import { useEffect, useState } from 'react';
import { DashboardService } from '~/services/api/DashboardAPI';
import AlertCustom from '~/components/UI/Notification/Alert';
import StatCardSkeleton from './StatCardSkeleton';

function StatCardList() {
  const [data, setData] = useState();

  useEffect(() => {
    const getStatCardData = async () => {
      try {
        const res = await DashboardService.getStatCardData();
        const { status, data } = res;

        if (status === 200) {
          setData(data);
        } else {
          AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
        }
      } catch (error) {
        AlertCustom({ type: 'error', title: error?.toString() || 'Có lỗi xảy ra, vui lòng thử lại' });
      }
    };

    getStatCardData();
  }, []);

  if (!data) {
    return <StatCardSkeleton />;
  }

  return (
    <>
      <Col xs={24} sm={12} md={6}>
        <StatCardItem
          color={'#2F4F4F'}
          icon={<ShopOutlined style={{ color: 'white', fontSize: '20px' }} />}
          value={data?.products}
          title="Sản phẩm"
        />
      </Col>
      <Col xs={24} sm={12} md={6}>
        <StatCardItem
          color={'#800000'}
          icon={<UserOutlined style={{ color: 'white', fontSize: '20px' }} />}
          value={data?.staffs}
          title="Nhân viên"
        />
      </Col>
      <Col xs={24} sm={12} md={6}>
        <StatCardItem
          color={'#483D8B'}
          icon={<TeamOutlined style={{ color: 'white', fontSize: '20px' }} />}
          value={data?.customers}
          title="Khách hàng"
        />
      </Col>
      <Col xs={24} sm={12} md={6}>
        <StatCardItem
          color={'#006400'}
          icon={<ShoppingOutlined style={{ color: 'white', fontSize: '20px' }} />}
          value={data?.orders}
          title="Đơn đặt hàng"
        />
      </Col>
    </>
  );
}

export default StatCardList;
