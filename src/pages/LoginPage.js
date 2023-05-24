import { Col, Row } from 'antd';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import LoginForm from '~/components/Login/LoginForm';
import AlertCustom from '~/components/UI/Notification/Alert';

const LoginPage = () => {
  const { state } = useLocation();

  useEffect(() => {
    if (state) {
      AlertCustom({ type: 'loginToContinue', title: state.message });
    }
  }, [state]);

  return (
    <Row style={{ minHeight: '100vh', backgroundColor: '#d0ebff' }} justify="center">
      <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <LoginForm />
      </Col>
    </Row>
  );
};

export default LoginPage;
