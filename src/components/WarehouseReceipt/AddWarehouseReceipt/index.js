import Search from 'antd/lib/input/Search';
import React from 'react';
import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import TableStaffs from '~/components/Staffs/TableStaffs';
import {
  Typography,
  Row,
  Col,
  Button,
  Form,
  Input,
  Radio,
  Select,
  Cascader,
  DatePicker,
  InputNumber,
  TreeSelect,
  Switch,
  Checkbox,
  Upload,
  Space,
  Modal,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Toolbar from '~/components/UI/Toolbar';
import { useNavigate } from 'react-router-dom';
import TableProducts from '~/components/Prouducts/TableProducts';
import ModalForm from '~/HOC/ModalForm';
import { useDispatch, useSelector } from 'react-redux';
import { modalActions } from '~/redux/reducer/ModalReducer';
import AddProductToReceipt from './AddProductToReceipt';
import * as SagaActionTypes from '~/redux/constants/constant';
import LoadingSpin from '~/components/UI/LoadingSpin/LoadingSpin';
const { Title } = Typography;
const dateFormat = 'DD/MM/YYYY';

const AddWarehouseReceipt = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [form] = Form.useForm();
  const [keyWord, setKeyWord] = useState('');
  let { loading } = useSelector((state) => state.productSlice);

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

  useEffect(() => {
    dispatch({ type: SagaActionTypes.GET_PRODUCTS_SAGA });
  }, []);

  const handleAddProduct = () => {
    dispatch(
      modalActions.showModal({
        title: 'Thêm sản phẩm',
        ComponentContent: <AddProductToReceipt />,
      }),
    );
  };

  const handleClose = () => {
    navigate('/warehouse-receipt');
  };

  const handleSubmit = () => {
    form.submit();
  };

  const onFinish = (values) => {
    // let newStaff = {
    //   fullname: values.staff_name,
    //   birthday: values.staff_birth.toISOString(),
    //   identityNumber: values.staff_cccd,
    //   gender: values.staff_gender,
    //   phoneNumber: values.staff_phone_number,
    //   email: values.staff_email,
    //   address: values.staff_address,
    //   other: values.staff_other_information,
    //   password: '12345678',
    //   avatar: imageChange,
    //   role: 'EMPLOYEE',
    //   active: true,
    // };
    console.log(values);
  };

  if (loading) {
    return <LoadingSpin />;
  }

  return (
    <>
      <Row>
        <Col span={24}>
          <Form
            name="add_reciept_form"
            form={form}
            onFinish={onFinish}
            initialValues={{}}
            validateMessages={validateMessages}
            style={{
              background: 'white',
              padding: '20px',
              borderRadius: '6px',
              filter: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))',
              marginBottom: '10px',
            }}
          >
            <Row
              gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
              }}
            >
              <Col xs={24} sm={12} md={24} lg={12}>
                <Form.Item
                  name="date"
                  label="Ngày nhập hàng"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <DatePicker
                    placeholder="Ngày nhập hàng"
                    format={dateFormat}
                    disabledDate={(current) => current.isAfter(dayjs())}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={24} lg={12}>
                <Form.Item
                  name="staff"
                  label="Nhân viên nhập hàng"
                  // rules={[
                  //   {
                  //     required: true,
                  //   },
                  // ]}
                >
                  <Select
                    showSearch
                    allowClear
                    placeholder="Nhân viên"
                    // filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                    // onChange={onChange}
                  ></Select>
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={24} lg={12}>
                <Form.Item
                  name="supplier"
                  label="Nhà cung cấp"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Nhà cung cấp" />
                </Form.Item>
              </Col>
              <Col xs={24} sm={12} md={24} lg={12}>
                <Form.Item
                  name="deliver"
                  label="Người giao hàng"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Người giao hàng" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
        <Col span={24}>
          <Toolbar title={'Thêm sản phẩm'} setKeyWord={setKeyWord} handleAdd={handleAddProduct} />
        </Col>
        <Col span={24}>
          <TableProducts keyWord={keyWord} />
        </Col>
        <Col span={24}></Col>
      </Row>
      <Row justify="end" style={{ marginTop: '8px' }}>
        <Space>
          <Button size="large" type="primary" onClick={handleSubmit}>
            Lưu
          </Button>
          <Button size="large" type="primary" danger onClick={handleClose}>
            Hủy
          </Button>
        </Space>
      </Row>
      <ModalForm />
    </>
  );
};

export default AddWarehouseReceipt;
