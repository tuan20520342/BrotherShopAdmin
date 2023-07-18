import { Card, Row, Skeleton } from 'antd';

function CategoryChartSkeleton() {
  return (
    <Card
      title={<Skeleton.Input active size="default" />}
      bodyStyle={{ padding: '7rem 1rem' }}
      style={{ marginTop: '30px' }}
    >
      <Row justify="center">
        <Skeleton.Button size="large" shape="circle" active style={{ height: '300px', width: '300px' }} />
      </Row>
    </Card>
  );
}

export default CategoryChartSkeleton;
