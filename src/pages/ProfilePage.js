import React from 'react';
import { Typography, Row, Col } from 'antd';
import ProfileForm from '~/components/Profile/ProfileForm';
import { useSelector } from 'react-redux';
import LoadingSpin from '~/components/UI/LoadingSpin/LoadingSpin';

const { Title } = Typography;

const ProfilePage = () => {
  const { loading } = useSelector((state) => state.authenticationSlice);

  if (loading) {
    return <LoadingSpin />;
  }

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
