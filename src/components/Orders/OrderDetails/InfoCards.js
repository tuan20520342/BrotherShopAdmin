import React from 'react';
import { Typography, Col, Card } from 'antd';
import { UserOutlined, EnvironmentOutlined, CarOutlined, ShopOutlined } from '@ant-design/icons';

const { Meta } = Card;
const { Text, Paragraph } = Typography;

const InfoCard = ({ order }) => {
  return (
    <>
      <Col xs={24} sm={12} md={order.companyName ? 12 : 8}>
        <Card style={{ height: '100%' }}>
          <Meta
            avatar={<UserOutlined style={{ fontSize: 24 }} />}
            title="Người nhận"
            description={
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                <Text ellipsis={{ tooltip: `${order.toName}` }}>{order.toName}</Text>
                <Text ellipsis={{ tooltip: `${order.toEmail}` }}>{order.toEmail}</Text>
                <Text ellipsis={{ tooltip: `${order.toPhone}` }}>{order.toPhone}</Text>
              </div>
            }
          />
        </Card>
      </Col>
      <Col xs={24} sm={12} md={order.companyName ? 12 : 8}>
        <Card style={{ height: '100%' }}>
          <Meta
            avatar={<CarOutlined style={{ fontSize: 24 }} />}
            title="Đơn vị vận chuyển"
            description={
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                <Text ellipsis={{ tooltip: `${order.shippingMethod}` }}>{order.shippingMethod}</Text>
                <Text
                  ellipsis={{ tooltip: `${order.paymentMethod}` }}
                >{`Hình thức thanh toán: ${order.paymentMethod}`}</Text>
                <Text
                  ellipsis={{ tooltip: `${order.paymentStatus}` }}
                >{`Trạng thái thanh toán: ${order.paymentStatus}`}</Text>
              </div>
            }
          ></Meta>
        </Card>
      </Col>
      <Col xs={24} sm={12} md={order.companyName ? 12 : 8}>
        <Card style={{ height: '100%' }}>
          <Meta
            avatar={<EnvironmentOutlined style={{ fontSize: 24 }} />}
            title="Địa chỉ giao hàng"
            description={
              <Paragraph
                style={{ marginBottom: 0 }}
                ellipsis={{
                  rows: 3,
                  expandable: true,
                  symbol: 'more',
                }}
              >
                {order.toAddress}
              </Paragraph>
            }
          />
        </Card>
      </Col>
      {order.companyName && (
        <Col xs={24} sm={12} md={order.companyName ? 12 : 8}>
          <Card style={{ height: '100%' }}>
            <Meta
              avatar={<ShopOutlined style={{ fontSize: 24 }} />}
              title="Doanh nghiệp"
              description={
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
                  <Text ellipsis={{ tooltip: `${order.companyName}` }}>{order.companyName}</Text>
                  <Text
                    ellipsis={{ tooltip: `${order.companyTaxNumber}` }}
                  >{`Mã thuế: ${order.companyTaxNumber}`}</Text>
                  <Text ellipsis={{ tooltip: `${order.companyAddress}` }}>{`Địa chỉ: ${order.companyAddress}`}</Text>
                </div>
              }
            />
          </Card>
        </Col>
      )}
    </>
  );
};
export default InfoCard;
