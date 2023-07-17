import React, { useState } from 'react';
import { Form, Input, Button, Space, Row } from 'antd';
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons';
import * as SagaActionTypes from '~/redux/constants';

import { modalActions } from '~/redux/reducer/ModalReducer';
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

const EditCategoryForm = ({ category }) => {
  const [enableModify, setEnableModify] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

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
    setLoading(true);
    const { category: updatedName, types } = values;

    const updatedTypes = types.map((item, index) => {
      return {
        type: item,
        _id: category.types[index]?._id,
      };
    });

    const updatedCategory = {
      name: updatedName,
      types: updatedTypes,
      categoryId: category._id,
    };

    dispatch({ type: SagaActionTypes.UPDATE_CATEGORY_SAGA, updatedCategory, callback: () => setLoading(false) });
  };

  const handleClose = () => {
    dispatch(modalActions.hideModal());
  };

  return (
    <Form
      name="edit_category_form"
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
      <Form.List name="types">
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
                {fields.length > 1 && category.types[index]?.products.length > 0 ? null : (
                  <MinusCircleOutlined
                    className="dynamic-delete-button"
                    onClick={() => remove(field.name)}
                    disabled={componentDisabled}
                  />
                )}
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
            <Button loading={loading} type="primary" htmlType="submit">
              Lưu
            </Button>
          </Space>
        )}
      </Row>
    </Form>
  );
};
export default EditCategoryForm;
