import { Col, Row } from 'antd';
import RevenueColumnChart from '~/components/Dashboard/RevenueAreaChart';

import CategoryDataPieChart from '~/components/Dashboard/CategoryDataPieChart';
import TrendOfCategoryLineChart from '~/components/Dashboard/TrendOfCategoryLineChart';
import BestSellerProducts from '~/components/Dashboard/BestSellerProducts';
import SoldQuantityProductsColumnChart from '~/components/Dashboard/SoldQuantityProductsColumnChart';
import StatCardList from '~/components/Dashboard/StatCards';

const HomePage = () => {
  return (
    <div>
      <Row gutter={[16, 12]}>
        <StatCardList />
      </Row>

      <RevenueColumnChart />

      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <BestSellerProducts />
        </Col>
        <Col xs={24} sm={12}>
          <CategoryDataPieChart />
        </Col>
      </Row>

      <TrendOfCategoryLineChart />

      <SoldQuantityProductsColumnChart />
    </div>
  );
};

export default HomePage;
