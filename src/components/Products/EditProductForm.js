/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
import { Form, Input, Button, Select, InputNumber, Upload, Space, Modal, Row, Col, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import TableProductSizes from './TableProductSizes';
import { useSelector } from 'react-redux';

const { Title } = Typography;
const { Option } = Select;
const { TextArea } = Input;

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

const EditProductForm = ({ product }) => {
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [mainFileList, setMainFileList] = useState([
    {
      uid: '-1',
      name: 'Hình ảnh chính',
      status: 'done',
      url: `https://res.cloudinary.com/ddajkcbs2/image/upload/${product.images.mainImg}`,
    },
  ]);
  const [subFileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'Hình ảnh minh họa',
      status: 'done',
      url: `https://res.cloudinary.com/ddajkcbs2/image/upload/${product.images.subImg}`,
    },
  ]);

  const { categories } = useSelector((state) => state.categorySlice);

  const types = [];
  categories.forEach((element) => {
    if (element.types.length > 0) {
      types.push(...element.types);
    } else {
      types.push(element);
    }
  });

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url.substring(file.url.lastIndexOf('/') + 1));
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleMainChange = ({ fileList: newFileList }) => {
    setMainFileList(newFileList);
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
    navigate('/products');
  };

  const onFinish = (values) => {
    console.log(values);
  };

  return (
    <Form
      name="edit_product_form"
      form={form}
      onFinish={onFinish}
      initialValues={{
        name: product.name,
        description: product.description,
        price: product.price,
        oldPrice: product.oldPrice,
      }}
      validateMessages={validateMessages}
      layout="vertical"
    >
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={16} md={24} lg={16}>
          <div
            style={{
              background: 'white',
              borderRadius: '6px',
              marginBottom: '16px',
              padding: '0 20px',
              filter: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))',
            }}
          >
            <Row>
              <Col span={24}>
                <Title level={4}>Thông tin sản phẩm</Title>
              </Col>
              <Col span={24}>
                <Form.Item
                  name="name"
                  label="Tên sản phẩm"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Input placeholder="Tên sản phẩm" />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="description" label="Mô tả" rules={[{ required: true }]}>
                  <TextArea rows={2} placeholder="Mô tả" />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div
            style={{
              background: 'white',
              borderRadius: '6px',
              marginBottom: '16px',
              padding: '0 20px',
              filter: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))',
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
                <Title level={4}>Giá sản phẩm</Title>
              </Col>

              <Col span={12}>
                <Form.Item
                  name="oldPrice"
                  label="Giá cũ"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber
                    className="rounded"
                    min={0}
                    addonAfter={<div>VNĐ</div>}
                    placeholder="Giá cũ"
                    formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => parseInt(value.replace(/\$\s?|(,*)/g, ''))}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  name="price"
                  label="Giá bán"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <InputNumber
                    className="rounded"
                    min={0}
                    addonAfter={<div>VNĐ</div>}
                    placeholder="Giá bán"
                    formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => parseInt(value.replace(/\$\s?|(,*)/g, ''))}
                  />
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div
            style={{
              background: 'white',
              borderRadius: '6px',
              marginBottom: '16px',
              padding: '0 20px',
              filter: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))',
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
                <Title level={4}>Danh mục sản phẩm</Title>
              </Col>

              <Col span={24}>
                <Form.Item
                  name="categories"
                  label="Danh mục"
                  rules={[
                    {
                      required: true,
                    },
                  ]}
                >
                  <Select
                    showSearch
                    placeholder="Danh mục"
                    allowClear
                    // options={options}
                    filterOption={(input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase())}
                  >
                    {types.map((type) => (
                      <Option key={type._id} value={JSON.stringify(type)} label={type?.type || type?.name}>
                        <Typography>{type?.type || type?.name}</Typography>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </div>
          <div
            style={{
              background: 'white',
              borderRadius: '6px',
              marginBottom: '16px',
              padding: '0 20px',
              filter: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))',
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
                <Title level={4}>Số lượng sản phẩm</Title>
              </Col>
              <Col span={24}>
                <TableProductSizes data={product.sizes} />
              </Col>
            </Row>
          </div>
        </Col>
        <Col xs={24} sm={8} md={24} lg={8}>
          <div
            style={{
              background: 'white',
              borderRadius: '6px',
              marginBottom: '16px',
              padding: '0 20px',
              filter: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))',
            }}
          >
            <Row>
              <Col span={24}>
                <Title level={4}>Hình ảnh sản phẩm</Title>
              </Col>
              <Col span={24}>
                <Form.Item name="mainImage" label="Ảnh chính">
                  <ImgCrop rotationSlider>
                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                      fileList={mainFileList}
                      onPreview={handlePreview}
                      onChange={handleMainChange}
                      style={{ display: 'inline-block' }}
                    >
                      {mainFileList.length >= 1 ? null : uploadButton}
                    </Upload>
                  </ImgCrop>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="images" label="Thêm ảnh mô tả">
                  <ImgCrop rotationSlider>
                    <Upload
                      action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                      listType="picture-card"
                      fileList={subFileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                    />
                  </ImgCrop>
                </Form.Item>
              </Col>
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
          </div>
          <div
            style={{
              background: 'white',
              borderRadius: '6px',
              marginBottom: '16px',
              padding: '20px',
              filter: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))',
            }}
          >
            <Row justify="center">
              <Space>
                <Button size="large" type="primary" htmlType="submit">
                  Xác nhận
                </Button>
                <Button size="large" type="primary" danger onClick={handleClose}>
                  Đóng
                </Button>
              </Space>
            </Row>
          </div>
        </Col>
      </Row>
    </Form>
  );
};
export default EditProductForm;
