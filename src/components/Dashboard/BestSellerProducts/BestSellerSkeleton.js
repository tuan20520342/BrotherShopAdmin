const { Card, Skeleton } = require('antd');

function BestSellerSkeleton() {
  return (
    <Card
      title={<Skeleton.Input active size="default" />}
      extra={<Skeleton.Input active size="default" />}
      bodyStyle={{ padding: '1rem' }}
      style={{ marginTop: '30px' }}
    >
      <Skeleton.Input active size="large" block style={{ height: '300px' }} />
    </Card>
  );
}

export default BestSellerSkeleton;
