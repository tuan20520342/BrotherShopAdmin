import { Card, Col, Row } from 'antd';
import SellDataColumnChart from '~/components/Dashboard/Charts/SellDataAreaChart';

import CategoryDataPieChart from '~/components/Dashboard/Charts/CategoryDataPieChart';
import TrendOfCategoryLineChart from '~/components/Dashboard/Charts/TrendOfCategoryLineChart';
import BestSellerProducts from '~/components/Dashboard/BestSellerProducts';
import SoldQuantityProductsColumnChart from '~/components/Dashboard/Charts/SoldQuantityProductsColumnChart';
import StatCardList from '~/components/Dashboard/StatCardList';

const HomePage = () => {
  return (
    <div>
      <Row gutter={[16, 12]}>
        <StatCardList />
      </Row>

      <SellDataColumnChart />

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
