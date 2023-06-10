import { Col, Row } from 'antd';
import ChangePasswordForm from '~/components/Profile/ChangePassword';

const ChangePasswordPage = () => {
  return (
    <Row justify="center">
      <Col style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <ChangePasswordForm />
      </Col>
    </Row>
  );
};

export default ChangePasswordPage;
