import React, { useState } from 'react';
import { Form, Input, Button, Space, Row } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import ModalForm from '~/HOC/ModalForm';
import { modalActions } from '~/redux/reducer/ModalReducer';
import { useDispatch, useSelector } from 'react-redux';
import './style/CategoryForm.css';

const validateMessages = {
  required: 'Cần nhập ${label}!',
  types: {
    email: '${label} không hợp lệ!',
    number: '',
  },
  number: {
    min: '${label} phải ít nhất từ ${min} trở lên',
    range: '${label} phải trong khoảng từ ${min} đến ${max}',
  },
};

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 18,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 6,
    },
  },
};

const EditCategoryForm = ({ category }) => {
  const dispatch = useDispatch();
  const [enableModify, setEnableModify] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(true);
  const handleEnableModify = () => {
    setEnableModify(true);
    setComponentDisabled(false);
  };
  const handleCancel = () => {
    setEnableModify(false);
    setComponentDisabled(true);
    onReset();
  };

  const onReset = () => {
    form.resetFields();
  };

  const [form] = Form.useForm();
  const onFinish = (values) => {
    console.log(values);
  };
  const handleClose = () => {
    dispatch(modalActions.hideModal());
  };
  return (
    <Form
      name="add_category_form"
      form={form}
      onFinish={onFinish}
      initialValues={{
        category: category.name,
        types: category.types.map((type) => type.type),
      }}
      validateMessages={validateMessages}
      {...formItemLayout}
    >
      <Form.Item
        name="category"
        label="Tên danh mục"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Tên danh mục" disabled={componentDisabled} />
      </Form.Item>
      <Form.List
        name="types"
        rules={[
          {
            validator: async (_, types) => {
              if (!types || types.length < 1) {
                return Promise.reject(new Error('Cần ít nhất 1 loại'));
              }
            },
          },
        ]}
      >
        {(fields, { add, remove }, { errors }) => (
          <>
            {fields.map((field, index) => (
              <Form.Item
                {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
                label={index === 0 ? 'Loại danh mục' : ''}
                required={true}
                key={field.key}
              >
                <Form.Item
                  {...field}
                  validateTrigger={['onChange', 'onBlur']}
                  rules={[
                    {
                      required: true,
                      whitespace: true,
                      message: 'Cần nhập loại danh mục',
                    },
                  ]}
                  noStyle
                >
                  <Input
                    placeholder="Tên loại danh mục"
                    style={{
                      width: '60%',
                    }}
                    disabled={componentDisabled}
                  />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                    disabled={componentDisabled}
                  />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item {...formItemLayoutWithOutLabel}>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{
                  width: '60%',
                }}
                icon={<PlusOutlined />}
                disabled={componentDisabled}
              >
                Thêm loại danh mục
              </Button>
              {/* <Button
                type="dashed"
                onClick={() => {
                  add('The head item', 0);
                }}
                style={{
                  width: '60%',
                  marginTop: '20px',
                }}
                icon={<PlusOutlined />}
              >
                Add field at head
              </Button> */}
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Row justify="end">
        {enableModify === false ? (
          <Space>
            <Button type="primary" onClick={() => handleEnableModify()}>
              Chỉnh sửa
            </Button>
            <Button type="primary" danger onClick={handleClose}>
              Đóng
            </Button>
          </Space>
        ) : (
          <Space>
            <Button type="primary" danger onClick={handleCancel}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Space>
        )}
        {/* <Space>
          <Button type="primary" htmlType="submit">
            Xác nhận
          </Button>
          <Button type="primary" danger onClick={handleClose}>
            Đóng
          </Button>
        </Space> */}
      </Row>
    </Form>
  );
};
export default EditCategoryForm;
