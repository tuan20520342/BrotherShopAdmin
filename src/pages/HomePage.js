import { Card, Col, Dropdown, Row } from 'antd';
import SellDataColumnChart from '~/components/Dashboard/Charts/SellDataAreaChart';

import { EllipsisOutlined } from '@ant-design/icons';
import CategoryDataPieChart from '~/components/Dashboard/Charts/CategoryDataPieChart';
import TrendOfCategoryLineChart from '~/components/Dashboard/Charts/TrendOfCategoryLineChart';
import BestSellerProducts from '~/components/Dashboard/BestSellerProducts';
import SoldQuantityProductsColumnChart from '~/components/Dashboard/Charts/SoldQuantityProductsColumnChart';
import StatCardList from '~/components/Dashboard/StatCardList';

const HomePage = () => {
  const items = [
    {
      label: '7 ngày qua',
      key: '1',
      onClick: () => {
        getRevenueSevenDaysAgo();
      },
    },
    {
      label: '1 tháng qua',
      key: '2',
      onClick: () => {},
    },
    {
      label: '6 tháng qua',
      key: '3',
      onClick: () => {},
    },
    {
      label: '1 năm qua',
      key: '4',
      onClick: () => {},
    },
  ];

  const getRevenueSevenDaysAgo = () => {};

  return (
    <div>
      <Row gutter={[16, 12]}>
        <StatCardList />
      </Row>

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
        <SellDataColumnChart />
      </Card>

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Card title="Top sản phẩm bán chạy" style={{ marginTop: '30px' }}>
            <BestSellerProducts />
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card title="Sản phẩm đã bán theo danh mục" style={{ marginTop: '30px' }}>
            <CategoryDataPieChart />
          </Card>
        </Col>
      </Row>

      <Card title="Xu hướng mua hàng theo danh mục" style={{ marginTop: '30px' }}>
        <TrendOfCategoryLineChart />
      </Card>

      <Card title="Sản phẩm đã bán" style={{ marginTop: '30px' }}>
        <SoldQuantityProductsColumnChart />
      </Card>
    </div>
  );
};

export default HomePage;
