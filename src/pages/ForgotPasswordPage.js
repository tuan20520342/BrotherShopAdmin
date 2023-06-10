import { Col, Row } from 'antd';
import ForgotPasswordForm from '~/components/Login/ForgotPassword';

const ForgotPasswordPage = () => {
  return (
    <Row style={{ minHeight: '100vh', backgroundColor: '#d0ebff' }} justify="center">
      <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <ForgotPasswordForm />
      </Col>
    </Row>
  );
};

export default ForgotPasswordPage;
