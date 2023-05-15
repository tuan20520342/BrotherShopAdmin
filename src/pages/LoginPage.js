import { Spin, Col, Row } from 'antd';
import LoginForm from '~/components/Login/LoginForm';

const LoginPage = () => {
  return (
    <>
      <Row style={{ minHeight: '100vh', backgroundColor: '#d0ebff' }} justify="center">
        <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <LoginForm />
        </Col>
      </Row>
    </>
  );
};

export default LoginPage;
