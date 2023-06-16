import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, Row } from 'antd';
import '../styles/LoginForm.css';
import { useNavigate } from 'react-router-dom';
import * as SagaActionTypes from '~/redux/constants';
import { useDispatch } from 'react-redux';
const { Title } = Typography;

const ResetPasswordForm = ({ token }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values) => {
    const data = {
      token: token,
      password: values.password,
      confirmPassword: values.confirmPassword,
    };
    dispatch({
      type: SagaActionTypes.RESET_PASSWORD_SAGA,
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
      <Title style={{ textAlign: 'center', marginBottom: '30px' }} level={2}>
        Đặt lại mật khẩu
      </Title>
      <Form name="normal_login" className="login-form" onFinish={onFinish}>
        <Form.Item
          name="password"
          rules={[
            {
              required: true,
              message: 'Vui lòng nhập mật khẩu mới',
            },
            {
              pattern: /^.{8,}$/,
              message: 'Phải có ít nhất 8 ký tự',
            },
          ]}
        >
          <Input.Password
            prefix={<UnlockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="confirmPassword"
          rules={[
            {
              required: true,
              message: 'Vui lòng không để trống',
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Không khớp với mật khẩu mới'));
              },
            }),
            {
              pattern: /^.{8,}$/,
              message: 'Phải có ít nhất 8 ký tự',
            },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
          />
        </Form.Item>
        <Button
          style={{ marginTop: '10px' }}
          size="large"
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Xác nhận
        </Button>
      </Form>
    </div>
  );
};
export default ResetPasswordForm;
