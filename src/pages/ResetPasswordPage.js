import { Col, Row } from 'antd';
import ResetPasswordForm from '~/components/Login/ResetPassword';

const ResetPasswordPage = () => {
  return (
    <Row style={{ minHeight: '100vh', backgroundColor: '#d0ebff' }} justify="center">
      <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <ResetPasswordForm />
      </Col>
    </Row>
  );
};

export default ResetPasswordPage;
