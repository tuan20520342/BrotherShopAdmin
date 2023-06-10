import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, Row } from 'antd';
import '../styles/LoginForm.css';
import { useNavigate } from 'react-router-dom';
import AlertCustom from '~/components/UI/Notification/Alert';
const { Title } = Typography;

const ResetPasswordForm = () => {
  const navigate = useNavigate();

  const onFinish = async (values) => {};
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
              pattern: /^.{6,}$/,
              message: 'Phải có ít nhất 6 ký tự',
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
              pattern: /^.{6,}$/,
              message: 'Phải có ít nhất 6 ký tự',
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
