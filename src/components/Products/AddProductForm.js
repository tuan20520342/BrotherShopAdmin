/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, Select, InputNumber, Upload, Space, Modal, Row, Col, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import * as SagaActionTypes from '~/redux/constants/constant';
import CustomImgCrop from './CustomImgCrop';

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

const getFolder = (type) => {
  switch (type) {
    case 'GU 12 Vị Anh Hùng Dân Tộc':
    case 'GU Thần Cổ Đại':
    case 'GU Ngân Hà':
      return 'gu-thiet-ke';

    case 'GU Linh Vật':
    case 'GU Y Nguyên Bản 18-':
      return 'gu-unisex';

    case 'Áo thun đơn giản':
    case 'Áo khoác đơn giản':
    case 'Quần dài đơn giản':
      return 'gu-don-gian';

    case 'Nón':
    case 'Tất - Vớ':
    case 'Dây Nịt Da':
      return 'phu-kien';

    case 'GU TỐI GIẢN':
      return 'gu-toi-gian';
    case 'GU THỂ THAO':
      return 'gu-the-thao';
    default:
      break;
  }
};

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

const AddProductForm = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [mainFileList, setMainFileList] = useState([]);
  const [subFileList, setSubFileList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState();

  const { categories } = useSelector((state) => state.categorySlice);
  const dispatch = useDispatch();

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
    setSubFileList(newFileList);
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

  const uploadImages = async (file, isMainImg) => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', 'os8e1vxz');

    const parsedCategory = JSON.parse(selectedCategory);

    const uploadFolder = getFolder(parsedCategory?.type || parsedCategory?.name);
    formData.append('folder', `brothershop/products/${isMainImg ? 'mainImg' : 'subImg'}/${uploadFolder}`);

    const res = await axios.post('https://api.cloudinary.com/v1_1/ddajkcbs2/image/upload', formData);
    return res.data;
  };

  const onFinish = async (values) => {
    const mainFileImg = mainFileList[0].originFileObj;
    const subFileImg = subFileList[0].originFileObj;

    const [mainImgData, subImgData] = await Promise.all([
      uploadImages(mainFileImg, true),
      uploadImages(subFileImg, false),
    ]);

    const mainImgPublicId = mainImgData.public_id;
    const subImgPuclicId = subImgData.public_id;

    if (mainImgPublicId && subImgPuclicId) {
      const { name, description, price, categories } = values;
      const parsedCategory = JSON.parse(categories);
      const newProduct = {
        name,
        description,
        price,
        categoryId: parsedCategory._id,
        mainImg: mainImgPublicId,
        subImg: subImgPuclicId,
      };

      dispatch({ type: SagaActionTypes.CREATE_PRODUCT_SAGA, newProduct });
    }
  };

  return (
    <Form
      name="add_product_form"
      form={form}
      onFinish={onFinish}
      initialValues={{
        staff_other_information: '',
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

              <Col span={24}>
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
                    optionLabelProp="label"
                    onChange={(value) => setSelectedCategory(value)}
                  >
                    {types.map((type) => (
                      <Option value={JSON.stringify(type)} label={type?.type || type?.name}>
                        <Typography>{type?.type || type?.name}</Typography>
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
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
                  <CustomImgCrop>
                    <Upload
                      listType="picture-card"
                      fileList={mainFileList}
                      onPreview={handlePreview}
                      onChange={handleMainChange}
                      style={{ display: 'inline-block' }}
                    >
                      {mainFileList.length >= 1 ? null : uploadButton}
                    </Upload>
                  </CustomImgCrop>
                  <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img
                      alt="example"
                      style={{
                        width: '100%',
                      }}
                      src={previewImage}
                    />
                  </Modal>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="images" label="Thêm ảnh mô tả">
                  <CustomImgCrop>
                    <Upload
                      listType="picture-card"
                      fileList={subFileList}
                      onPreview={handlePreview}
                      onChange={handleChange}
                    >
                      {subFileList.length >= 3 ? null : uploadButton}
                    </Upload>
                  </CustomImgCrop>
                  <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                    <img
                      alt="example"
                      style={{
                        width: '100%',
                      }}
                      src={previewImage}
                    />
                  </Modal>
                </Form.Item>
              </Col>
            </Row>

            <div
              style={{
                background: 'white',
                borderRadius: '6px',
                marginBottom: '16px',
                paddingBottom: '20px',
                filter: 'drop-shadow(0 1px 1px rgb(0 0 0 / 0.05))',
              }}
            >
              <Row>
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
          </div>
        </Col>
      </Row>
    </Form>
  );
};
export default AddProductForm;
