import { Col, Skeleton } from 'antd';

function StatCardSkeleton() {
  return (
    <>
      {[...Array(4)].map((_, index) => (
        <Col key={index} xs={24} sm={12} md={6}>
          <Skeleton.Input active size="large" block style={{ height: '120px' }} />
        </Col>
      ))}
    </>
  );
}

export default StatCardSkeleton;
