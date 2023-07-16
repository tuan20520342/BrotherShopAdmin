import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Typography, Row } from 'antd';
import '~/components/Login/styles/LoginForm.css';
import * as SagaActionTypes from '~/redux/constants';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
const { Title } = Typography;

const ChangePasswordForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onClose = () => {
    navigate('/profile');
  };

  const onFinish = async (values) => {
    const data = {
      password: values.confirmPassword,
      callback: () => navigate('/profile'),
    };
    dispatch({
      type: SagaActionTypes.CHANGE_PASSWORD_SAGA,
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
              message: 'Vui lòng nhập mật khẩu cũ',
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
        <Form.Item
          name="newPassword"
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
            placeholder="New Password"
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
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Mật khẩu mới không khớp'));
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
        <div style={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>
          <Button size="large" type="primary" htmlType="submit">
            Xác nhận
          </Button>
          <Button size="large" type="primary" danger onClick={() => onClose()}>
            Hủy
          </Button>
        </div>
      </Form>
    </div>
  );
};
export default ChangePasswordForm;
