import { LockOutlined, UnlockOutlined } from '@ant-design/icons';
import { Button, Form, Input, Col, Collapse } from 'antd';
import { useDispatch } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants';
import { useState } from 'react';

const { Panel } = Collapse;

const ChangePasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(['1']);
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const onClose = () => {
    setOpen([]);
  };

  const onFinish = (values) => {
    setLoading(true);
    const data = {
      oldPassword: values.oldPassword,
      newPassword: values.confirmPassword,
      onSuccess: () => {
        form.resetFields();
        setLoading(false);
      },
      onError: () => {
        setLoading(false);
      },
    };

    dispatch({
      type: SagaActionTypes.CHANGE_PASSWORD_SAGA,
      data: data,
    });
  };

  return (
    <Collapse activeKey={open} onChange={() => setOpen((prev) => [1])}>
      <Panel header="Thay đổi mật khẩu" key="1" onChange={() => setOpen([1])}>
        <Form onFinish={onFinish} layout="vertical" form={form}>
          <Col xs={24}>
            <Form.Item
              name="oldPassword"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng nhập mật khẩu cũ',
                },
                {
                  pattern: /^.{8,}$/,
                  message: 'Phải có ít nhất 8 ký tự',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="oldPassword"
                placeholder="Mật khẩu cũ"
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="newPassword"
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
                placeholder="Mật khẩu mới"
              />
            </Form.Item>
          </Col>
          <Col xs={24}>
            <Form.Item
              name="confirmPassword"
              rules={[
                {
                  required: true,
                  message: 'Vui lòng xác nhận lại mật khẩu mới',
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
                  pattern: /^.{8,}$/,
                  message: 'Phải có ít nhất 8 ký tự',
                },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Xác nhận mật khẩu"
              />
            </Form.Item>
          </Col>
          <div style={{ display: 'flex', justifyContent: 'end', gap: '10px' }}>
            <Button loading={loading} size="large" type="primary" htmlType="submit">
              Xác nhận
            </Button>
            <Button size="large" type="primary" danger onClick={() => onClose()}>
              Hủy
            </Button>
          </div>
        </Form>
      </Panel>
    </Collapse>
  );
};
export default ChangePasswordForm;
