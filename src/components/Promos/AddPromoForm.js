import React, { useState } from 'react';
import { Form, Input, Button, Space, Row, InputNumber, DatePicker } from 'antd';
import dayjs from 'dayjs';
import { modalActions } from '~/redux/reducer/ModalReducer';
import * as SagaActionTypes from '~/redux/constants';
import { useDispatch } from 'react-redux';
import { validateMessages } from '~/util/constants';
import { printNumberWithCommas } from '~/util/shared';
const { RangePicker } = DatePicker;
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 16,
    },
  },
};

const AddPromoForm = ({ promo }) => {
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  const [disabled, setDisabled] = useState(promo ? true : false);
  const [loading, setLoading] = useState(false);

  const handleEnableModify = () => {
    setDisabled(false);
  };

  const handleFormCancel = () => {
    setDisabled(true);
    onReset();
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    setLoading(true);

    if (promo) {
      const editPromo = {
        id: promo?._id,
        name: values.name,
        description: values.description,
        percentage: values.percentage,
        startDate: values.expire[0],
        endDate: values.expire[1],
        amount: values.amount,
        minPrice: values.minPrice,
      };
      dispatch({ type: SagaActionTypes.UPDATE_PROMO_SAGA, editPromo, callback: () => setLoading(false) });
    } else {
      const newPromo = {
        name: values.name,
        description: values.description,
        percentage: values.percentage,
        startDate: values.expire[0],
        endDate: values.expire[1],
        amount: values.amount,
        minPrice: values.minPrice,
      };
      dispatch({ type: SagaActionTypes.CREATE_PROMO_SAGA, newPromo, callback: () => setLoading(false) });
    }
  };

  const handleClose = () => {
    dispatch(modalActions.hideModal());
  };

  return (
    <Form
      name="add_promo_form"
      form={form}
      onFinish={onFinish}
      initialValues={{
        name: promo ? promo?.name : '',
        percentage: promo ? promo?.percentage : '',
        minPrice: promo ? promo?.minPrice : '',
        expire: promo ? [dayjs(promo?.startDate), dayjs(promo?.endDate)] : '',
        amount: promo ? promo?.amount : '',
        description: promo ? promo?.description : '',
      }}
      validateMessages={validateMessages}
      {...formItemLayout}
    >
      <Form.Item
        name="name"
        label="Tên khuyến mãi"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="Tên khuyến mãi" disabled={disabled} />
      </Form.Item>
      <Form.Item
        name="percentage"
        label="Phần trăm ưu đãi"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber
          className="rounded"
          min={0}
          max={100}
          addonAfter={'%'}
          placeholder="Phần trăm ưu đãi"
          disabled={disabled}
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        name="minPrice"
        label="Hóa đơn tối thiểu"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber
          className="rounded"
          min={0}
          addonAfter={'VNĐ'}
          placeholder="Tối thiểu"
          formatter={(value) => printNumberWithCommas(value)}
          parser={(value) => parseInt(value.replace(/\$\s?|(,*)/g, ''))}
          disabled={disabled}
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        name="expire"
        label="Thời hạn"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <RangePicker
          placeholder={['Bắt đầu', 'Kết thúc']}
          showTime={{
            format: 'HH:mm',
          }}
          format="DD-MM-YYYY HH:mm"
          disabled={disabled}
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        name="amount"
        label="Số lượng"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <InputNumber
          className="rounded"
          style={{ width: '100%' }}
          min={0}
          placeholder="Số lượng"
          formatter={(value) => printNumberWithCommas(value)}
          parser={(value) => parseInt(value.replace(/\$\s?|(,*)/g, ''))}
          disabled={disabled}
        />
      </Form.Item>
      <Form.Item
        name="description"
        rules={[
          {
            required: true,
          },
        ]}
        label="Mô tả"
      >
        <TextArea rows={2} placeholder="Mô tả" disabled={disabled} />
      </Form.Item>
      <Row justify="end">
        {promo ? (
          disabled ? (
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
              <Button type="primary" danger onClick={handleFormCancel}>
                Hủy
              </Button>
              <Button loading={loading} type="primary" htmlType="submit">
                Lưu
              </Button>
            </Space>
          )
        ) : (
          <Space>
            <Button loading={loading} type="primary" htmlType="submit">
              Xác nhận
            </Button>
            <Button type="primary" danger onClick={handleClose}>
              Đóng
            </Button>
          </Space>
        )}
      </Row>
    </Form>
  );
};
export default AddPromoForm;
