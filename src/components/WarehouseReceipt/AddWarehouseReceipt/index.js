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
const { Title } = Typography;
const dateFormat = 'DD/MM/YYYY';

const AddWarehouseReceipt = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();

  //   const staffs = [
  //     {
  //       id: 1,
  //       email: 'abc123@gmail.com',
  //       fullname: 'Nguyen Van A',
  //       birthday: '12/02/2002',
  //       identityNumber: '1231231',
  //       gender: 'MALE',
  //       phoneNumber: '012312313',
  //       address: 'KONTUM',
  //       other: 'NONE',
  //       avatar: '',
  //       role: 'EMPLOYEE',
  //       updatedAt: '',
  //       active: true,
  //     },
  //     {
  //       id: 2,
  //       email: 'tuan@gmail.com',
  //       fullname: 'CHRIST',
  //       birthday: '22/11/1990',
  //       identityNumber: '1231231231',
  //       gender: 'FEMALE',
  //       phoneNumber: '0912031123',
  //       address: 'HCM',
  //       other: '',
  //       avatar: '',
  //       role: 'MANAGER',
  //       updatedAt: '',
  //       active: true,
  //     },
  //   ];
  const [keyWord, setKeyWord] = useState('');

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

  const handleAddProduct = () => {
    // navigate('/add-product');
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

  return (
    <>
      <Row>
        <Col span={24}>
          <Form
            name="add_staff_form"
            form={form}
            onFinish={onFinish}
            initialValues={{
              staff_other_information: '',
            }}
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
              <Col span={24}>
                <Form.Item
                  name="staff_birth"
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
          <Button size="large" type="primary" htmlType="submit">
            Lưu
          </Button>
          <Button size="large" type="primary" danger>
            Hủy
          </Button>
        </Space>
      </Row>
    </>
  );
};

export default AddWarehouseReceipt;
