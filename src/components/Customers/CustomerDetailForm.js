import React, { useState } from 'react';
import dayjs from 'dayjs';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, Select, DatePicker, Modal, Row, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const { Option } = Select;
const { TextArea } = Input;
const dateFormat = 'DD/MM/YYYY';

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

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

const CustomerDetailForm = () => {
  const navigate = useNavigate();
  const { customerById } = useSelector((state) => state.customerSlice);
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    },
  ]);
  const handleCancel = () => setPreviewOpen(false);
  const handlePreview = async (file) => {
    console.log(file);
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    console.log(newFileList);
  };
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const handleClose = () => {
    navigate('/customers');
  };

  const onFinish = (values) => {
    // let editStaff = {
    //   staffId: customerById._id,
    //   role: customerById.role._id,
    //   name: values.name,
    //   address: values.address,
    //   phone: values.phone,
    //   gender: values.gender,
    //   birthday: values.birthday.toDate(),
    //   email: values.email,
    // };
    // dispatch({
    //   type: SagaActionTypes.PUT_STAFF_SAGA,
    //   editStaff: editStaff,
    // });
  };

  return (
    <Form
      name="add_staff_form"
      form={form}
      onFinish={onFinish}
      initialValues={{
        name: customerById.name,
        birthday: dayjs(customerById.birthday),
        cccd: '111111111111',
        gender: customerById.gender,
        phone: customerById.phone,
        email: customerById.email,
        address: customerById?.address?.map(
          (item) => `${item.name}, ${item.phone}, ${item.detail}, ${item.ward}, ${item.district}, ${item.city}`,
        ),
        otherInformation: '',
      }}
      validateMessages={validateMessages}
      style={{
        background: 'white',
        padding: '20px',
        borderRadius: '6px',
        filter: 'drop-shadow(0 10px 8px rgb(0 0 0 / 0.04)) drop-shadow(0 4px 3px rgb(0 0 0 / 0.1))',
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
        <Col xs={24} sm={12} md={24} lg={12} key={1}>
          <Form.Item name="name" label="Họ và tên">
            <Input placeholder="Họ và tên" disabled={true} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={24} lg={12} key={2}>
          <Form.Item name="birthday" label="Ngày sinh">
            <DatePicker
              placeholder="Ngày sinh"
              format={dateFormat}
              disabledDate={(current) => current.isAfter(dayjs())}
              disabled={true}
            />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={24} lg={12} key={3}>
          <Form.Item
            name="cccd"
            label="CCCD"
            rules={[
              {
                pattern: /^[\d]{12,12}$/,
                message: 'CCCD không hợp lệ',
              },
            ]}
          >
            <Input placeholder="CCCD" disabled={true} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={24} lg={12} key={4}>
          <Form.Item name="gender" label="Giới tính">
            <Select
              placeholder="Giới tính"
              allowClear
              style={{
                width: '40%',
              }}
              disabled={true}
            >
              <Option value="Nam">Nam</Option>
              <Option value="Nữ">Nữ</Option>
              <Option value="Khác">Khác</Option>
            </Select>
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={24} lg={12} key={5}>
          <Form.Item
            name="phone"
            label="Số Điện Thoại"
            rules={[
              {
                pattern: /^[\d]{10,10}$/,
                message: 'Số Điện Thoại không hợp lệ',
              },
            ]}
          >
            <Input placeholder="Số điện thoại" disabled={true} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={24} lg={12} key={6}>
          <Form.Item name="email" label="Email">
            <Input placeholder="Email" disabled={true} />
          </Form.Item>
        </Col>
        <Col span={24} key={7}>
          <Form.Item label="Địa chỉ">
            <Form.List name="address">
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index) => (
                    <Form.Item key={field.key}>
                      <Form.Item {...field} noStyle>
                        <TextArea rows={2} placeholder="Tên loại danh mục" disabled={true} />
                      </Form.Item>
                    </Form.Item>
                  ))}
                </>
              )}
            </Form.List>
          </Form.Item>
        </Col>
        {/* <Col span={24} key={9}>
          <Form.Item name="avatar" label="Ảnh nhân viên">
            <ImgCrop>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                disabled={true}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
            </ImgCrop>
          </Form.Item>
        </Col> */}
      </Row>
      <Row justify="end">
        <Button type="primary" danger onClick={handleClose}>
          Đóng
        </Button>
      </Row>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img
          alt="example"
          style={{
            width: '100%',
          }}
          src={previewImage}
        />
      </Modal>
    </Form>
  );
};
export default CustomerDetailForm;
