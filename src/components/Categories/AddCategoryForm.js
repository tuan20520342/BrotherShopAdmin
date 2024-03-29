import React, { useState } from 'react';
import { Form, Input, Button, Space, Row } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';

import { modalActions } from '~/redux/reducer/ModalReducer';
import * as SagaActionTypes from '~/redux/constants';
import { useDispatch } from 'react-redux';
import './style/CategoryForm.css';
import { validateMessages } from '~/util/constants';

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

const AddCategoryForm = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const onFinish = (values) => {
    setLoading(true);
    const { category, types } = values;

    const newCategory = {
      name: category,
      types,
    };

    const handleResetForms = () => {
      form.resetFields();
      setLoading(false);
    };

    dispatch({
      type: SagaActionTypes.CREATE_CATEGORY_SAGA,
      newCategory,
      onSuccess: handleResetForms,
      onError: () => setLoading(false),
    });
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
        staff_other_information: '',
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
        <Input placeholder="Tên danh mục" />
      </Form.Item>
      <Form.List
        name="types"
        // rules={[
        //   {
        //     validator: async (_, types) => {
        //       if (!types || types.length < 1) {
        //         return Promise.reject(new Error('Cần ít nhất 1 loại'));
        //       }
        //     },
        //   },
        // ]}
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
                  <Input placeholder="Tên loại danh mục" />
                </Form.Item>
                {fields.length > 1 ? (
                  <MinusCircleOutlined className="dynamic-delete-button" onClick={() => remove(field.name)} />
                ) : null}
              </Form.Item>
            ))}
            <Form.Item {...formItemLayoutWithOutLabel}>
              <Button
                type="dashed"
                onClick={() => add()}
                style={{
                  width: '100%',
                }}
                icon={<PlusOutlined />}
              >
                Thêm loại danh mục
              </Button>
              <Form.ErrorList errors={errors} />
            </Form.Item>
          </>
        )}
      </Form.List>
      <Row justify="end">
        <Space>
          <Button loading={loading} type="primary" htmlType="submit">
            Xác nhận
          </Button>
          <Button type="primary" danger onClick={handleClose}>
            Đóng
          </Button>
        </Space>
      </Row>
    </Form>
  );
};
export default AddCategoryForm;
