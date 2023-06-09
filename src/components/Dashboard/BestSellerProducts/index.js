import { Avatar, Card, List, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { DashboardService } from '~/services/api/DashboardAPI';
import AlertCustom from '../../UI/Notification/Alert';
import { useNavigate } from 'react-router-dom';

function BestSellerProducts() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getBestSellerProducts = async () => {
      try {
        const res = await DashboardService.getBestSellerProducts();
        const { status, data } = res;

        if (status === 200) {
          setProducts(data.products);
        } else {
          AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
        }
      } catch (error) {
        AlertCustom({ type: 'error', title: error?.toString() || 'Có lỗi xảy ra, vui lòng thử lại' });
      }
    };

    getBestSellerProducts();
  }, []);

  return (
    <Card
      title="Top sản phẩm bán chạy"
      style={{ marginTop: '30px' }}
      extra={<Typography.Link onClick={() => navigate('/products')}>Xem tất cả</Typography.Link>}
    >
      <List
        itemLayout="horizontal"
        dataSource={products}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar src={`${process.env.REACT_APP_CLOUDINARY_URL}/${item.images.mainImg}`} />}
              title={<span>{item.name}</span>}
              description={
                <div
                  style={{
                    height: '3em',
                    overflow: 'hidden',
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                  }}
                >
                  {item.description}
                </div>
              }
            />
          </List.Item>
        )}
      />
    </Card>
  );
}

export default BestSellerProducts;
