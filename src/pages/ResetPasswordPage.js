import { Col, Row } from 'antd';
import { useParams } from 'react-router-dom';
import ResetPasswordForm from '~/components/Login/ResetPassword';

const ResetPasswordPage = () => {
  const { token } = useParams();
  return (
    <Row style={{ minHeight: '100vh', backgroundColor: '#d0ebff' }} justify="center">
      <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <ResetPasswordForm token={token} />
      </Col>
    </Row>
  );
};

export default ResetPasswordPage;
