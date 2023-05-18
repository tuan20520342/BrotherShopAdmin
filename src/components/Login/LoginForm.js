import { LockOutlined, UserOutlined } from '@ant-design/icons';
import Cookies from 'js-cookie';
import { Button, Checkbox, Form, Input, Typography, Row } from 'antd';
import './styles/LoginForm.css';
import { useDispatch, useSelector } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants/constant';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import AlertCustom from '~/components/UI/Notification/Alert';
import { AuthenticationService } from '~/services/api/AuthAPI';
import { authenticationAction } from '~/redux/reducer/AuthReducer';
const { Title } = Typography;
const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onFinish = async (values) => {
    let { email, password } = values;
    let user = {
      username: email,
      password: password,
    };
    try {
      const { data, status } = await AuthenticationService.postLogin(user);

      if (status === 200) {
        let { token, staff } = data;
        const remainingMilliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
        Cookies.set('token', token, { expires: expiryDate });
        dispatch(authenticationAction.logIn({ currentUser: staff }));
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
        <a className="login-form-forgot" href="">
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