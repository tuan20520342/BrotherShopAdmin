import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const hadleGoBack = () => {
    navigate(-1);
  };
  return (
    <div
      style={{
        height: '80vh',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 20,
      }}
    >
      <img style={{ width: '60%', height: 'auto' }} src={require('~/assets/404.png')} alt="icon 404"></img>
      <Button size="large" type="primary" onClick={() => hadleGoBack()}>
        Quay lại
      </Button>
    </div>
  );
};

export default NotFoundPage;
