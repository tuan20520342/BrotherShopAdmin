import { Card, Skeleton } from 'antd';

function QuantityChartSkeleton() {
  return (
    <Card
      title={<Skeleton.Input active size="default" />}
      bodyStyle={{ padding: '1rem' }}
      style={{ marginTop: '30px' }}
    >
      <Skeleton.Input active size="large" block style={{ height: '260px' }} />
    </Card>
  );
}

export default QuantityChartSkeleton;
