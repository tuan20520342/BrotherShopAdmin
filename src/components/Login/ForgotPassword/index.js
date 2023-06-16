import { UserOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, Row } from 'antd';
import '../styles/LoginForm.css';
import * as SagaActionTypes from '~/redux/constants';
import { useDispatch } from 'react-redux';

const { Title, Paragraph } = Typography;

const ForgotPasswordForm = () => {
  const dispatch = useDispatch();

  const onFinish = (values) => {
    const data = {
      email: values.email,
      isCustomer: false,
    };
    dispatch({
      type: SagaActionTypes.FORGOT_PASSWORD_SAGA,
      data: data,
    });
  };
  return (
    <div id="components-form-login">
      <Row justify="center">
        <img
          style={{ objectFit: 'cover', width: '80%', maxWidth: '100px', height: 'auto' }}
          src={require('~/assets/clothing-shop.png')}
          alt="icon avatar"
        ></img>
      </Row>
      <Title style={{ textAlign: 'center', marginBottom: '10px' }} level={2}>
        Quên mật khẩu
      </Title>
      <Paragraph>
        Vui lòng nhập địa chỉ email tài khoản của bạn! <br /> Chúng tôi sẽ gửi liên kết thiết lập lại mật khẩu thông qua
        email.
      </Paragraph>
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập Email',
            },
            { type: 'email', message: 'Email không hợp lệ!' },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Button size="large" type="primary" htmlType="submit" className="login-form-button">
          Xác nhận
        </Button>
      </Form>
    </div>
  );
};
export default ForgotPasswordForm;
