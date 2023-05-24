import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import { Button, Form, Input, Typography, Row } from 'antd';
import './styles/LoginForm.css';
import { useNavigate } from 'react-router-dom';
import AlertCustom from '~/components/UI/Notification/Alert';
import { AuthenticationService } from '~/services/api/AuthAPI';
const { Title } = Typography;

const LoginForm = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {
    const { email, password } = values;
    const user = {
      username: email,
      password: password,
    };
    try {
      const { data, status } = await AuthenticationService.postLogin(user);

      if (status === 200) {
        const { token, staff } = data;
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
        Cookies.set('token', token, { expires: expiryDate });
        Cookies.set('currentUser', staff._id, { expires: expiryDate });
        navigate('/', { replace: true });
        AlertCustom({ type: 'success', title: 'Đăng nhập thành công' });
      } else {
        AlertCustom({ type: 'error', title: 'Sai email hoặc password, vui lòng kiểm tra lại!' });
      }
    } catch (err) {
      console.log(err);
      AlertCustom({ type: 'error', title: 'Sai email hoặc password, vui lòng kiểm tra lại!' });
    }
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
      <Title style={{ textAlign: 'center', marginBottom: '30px' }} level={2}>
        Đăng nhập
      </Title>
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
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu',
            },
            {
              pattern: /^.{6,}$/,
              message: 'Phải có ít nhất 6 ký tự',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <a className="login-form-forgot" href="/forget-password">
          Quên mật khẩu?
        </a>
        <Button size="large" type="primary" htmlType="submit" className="login-form-button">
          Đăng nhập
        </Button>
      </Form>
    </div>
  );
};
export default LoginForm;
