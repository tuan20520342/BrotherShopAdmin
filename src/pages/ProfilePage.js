import React from 'react';
import { Typography, Row, Col, Button } from 'antd';
import ProfileForm from '~/components/Profile/ProfileForm';
const { Title } = Typography;

const ProfilePage = () => {
  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>Thông tin cá nhân</Title>
        </Col>
        <Col span={24}>
          <ProfileForm />
        </Col>
      </Row>
    </>
  );
};

export default ProfilePage;
