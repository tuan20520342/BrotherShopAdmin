import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import ImgCrop from 'antd-img-crop';
import { PlusOutlined } from '@ant-design/icons';
import {
  Form,
  Input,
  Button,
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
  Row,
  Col,
} from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants/constant';

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

const EditStaffForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [enableModify, setEnableModify] = useState(false);
  const [componentDisabled, setComponentDisabled] = useState(true);
  const { staffById } = useSelector((state) => state.staffSlice);
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [imageChange, setImageChange] = useState('');
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

  // useEffect(() => {
  //   if (isCreateStaffSucceeded) {
  //     navigate('/staffs', { replace: true });
  //   }
  // }, [isCreateStaffSucceeded]);

  const handleEnableModify = () => {
    setEnableModify(true);
    setComponentDisabled(false);
  };

  const handleClose = () => {
    navigate('/staffs');
  };

  const handleFormCancel = () => {
    setEnableModify(false);
    setComponentDisabled(true);
    onReset();
  };

  const onReset = () => {
    form.resetFields();
  };

  const onFinish = (values) => {
    let editStaff = {
      staffId: staffById._id,
      role: staffById.role._id,
      name: values.name,
      address: values.address,
      phone: values.phone,
      gender: values.gender,
      birthday: values.birthday.toDate(),
      email: values.email,
    };
    dispatch({
      type: SagaActionTypes.PUT_STAFF_SAGA,
      editStaff: editStaff,
    });
  };

  return (
    <Form
      name="add_staff_form"
      form={form}
      onFinish={onFinish}
      initialValues={{
        name: staffById.name,
        birthday: dayjs(staffById.birthday),
        cccd: '111111111111',
        gender: staffById.gender,
        phone: staffById.phone,
        email: staffById.email,
        address: staffById.address,
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
          <Form.Item
            name="name"
            label="Họ và tên"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Họ và tên" disabled={componentDisabled} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={24} lg={12} key={2}>
          <Form.Item
            name="birthday"
            label="Ngày sinh"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <DatePicker
              placeholder="Ngày sinh"
              format={dateFormat}
              disabledDate={(current) => current.isAfter(dayjs())}
              disabled={componentDisabled}
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
              { required: true },
            ]}
          >
            <Input placeholder="CCCD" disabled={true} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={24} lg={12} key={4}>
          <Form.Item
            name="gender"
            label="Giới tính"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="Giới tính"
              allowClear
              style={{
                width: '40%',
              }}
              disabled={componentDisabled}
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
              { required: true },
            ]}
          >
            <Input placeholder="Số điện thoại" disabled={componentDisabled} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={24} lg={12} key={6}>
          <Form.Item name="email" label="Email" rules={[{ type: 'email', required: true }]}>
            <Input placeholder="Email" disabled={true} />
          </Form.Item>
        </Col>
        <Col xs={24} sm={12} md={24} lg={12} key={7}>
          <Form.Item name="address" label="Địa chỉ" rules={[{ required: true }]}>
            <TextArea rows={2} placeholder="Địa chỉ" disabled={componentDisabled} />
          </Form.Item>
        </Col>
        <Col span={24} key={8}>
          <Form.Item name="otherInformation" label="Khác">
            <TextArea rows={2} placeholder="Khác" disabled={componentDisabled} />
          </Form.Item>
        </Col>
        <Col span={24} key={9}>
          <Form.Item name="avatar" label="Ảnh nhân viên">
            <ImgCrop>
              <Upload
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                disabled={componentDisabled}
              >
                {fileList.length >= 1 ? null : uploadButton}
              </Upload>
            </ImgCrop>
          </Form.Item>
        </Col>
      </Row>
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
            <Button type="primary" danger onClick={handleFormCancel}>
              Hủy
            </Button>
            <Button type="primary" htmlType="submit">
              Lưu
            </Button>
          </Space>
        )}
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
export default EditStaffForm;
