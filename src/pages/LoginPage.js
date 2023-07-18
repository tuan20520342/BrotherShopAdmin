import { Col, Row } from 'antd';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LoginForm from '~/components/Login/LoginForm';
import AlertCustom from '~/components/UI/Notification/Alert';

const LoginPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { state } = location;

  useEffect(() => {
    if (state) {
      AlertCustom({ type: 'loginToContinue', title: state.message });
      navigate(location.pathname, { state: null });
    }
  }, [state, navigate, location.pathname]);

  return (
    <Row style={{ minHeight: '100vh', backgroundColor: '#d0ebff' }} justify="center">
      <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <LoginForm />
      </Col>
    </Row>
  );
};

export default LoginPage;
