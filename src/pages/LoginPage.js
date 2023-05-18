import { Col, Row } from 'antd';
import { useLocation } from 'react-router-dom';
import LoginForm from '~/components/Login/LoginForm';

const LoginPage = () => {
  const { state } = useLocation();
  // useEffect(() => {
  //   if (state) {
  //     AlertCustom({ type: 'loginToContinue', title: 'Hãy đăng nhập để tiếp tục' });
  //   }
  // }, [state]);
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
