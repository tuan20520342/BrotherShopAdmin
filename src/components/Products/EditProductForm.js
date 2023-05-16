import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { PlusOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';
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
  Typography,
} from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import * as SagaActionTypes from '~/redux/constants/constant';
import { modalActions } from '~/redux/reducer/ModalReducer';
import { useDispatch, useSelector } from 'react-redux';
import TableCategories from '../Categories/TableCategories';
import TableProductSizes from './TableProductSizes';
const { Title } = Typography;

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

const EditProductForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { productId } = useSelector((state) => state.productSlice);

  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [imageChange, setImageChange] = useState('');
  const [mainFileList, setMainFileList] = useState([
    {
      uid: '-1',
      name: 'Main Image',
      status: 'done',
      url: `https://res.cloudinary.com/ddajkcbs2/image/upload/${productId.images.mainImg}`,
    },
  ]);
  const [fileList, setFileList] = useState([
    {
      uid: '-1',
      name: 'Sub Image',
      status: 'done',
      url: `https://res.cloudinary.com/ddajkcbs2/image/upload/${productId.images.subImg}`,
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

  const onFinish = (values) => {};

  return (
    <Form
      name="edit_product_form"
      form={form}
      onFinish={onFinish}
      initialValues={{
        name: productId.name,
        description: productId.description,
        price: productId.price,
        oldPrice: productId.oldPrice,
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

              {/* <Col xs={24} sm={12} md={24} lg={12}>
                <Form.Item
                  name="cost"
                  label="Giá nhập"
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
                    placeholder="Giá nhập"
                    formatter={(value) => value.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
                    parser={(value) => parseInt(value.replace(/\$\s?|(,*)/g, ''))}
                  />
                </Form.Item>
              </Col> */}
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
                  ></Select>
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
                <TableProductSizes data={productId.sizes} />
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
                      fileList={fileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                    >
                      {fileList.length >= 3 ? null : uploadButton}
                    </Upload>
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

      {/* <Row justify="end">
        <Space>
          <Button size="large" type="primary" htmlType="submit">
            Xác nhận
          </Button>
          <Button size="large" type="primary" danger onClick={handleClose}>
            Đóng
          </Button>
        </Space>
      </Row> */}
    </Form>
  );
};
export default EditProductForm;
