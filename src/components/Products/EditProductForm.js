/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, Select, InputNumber, Upload, Space, Modal, Row, Col, Typography, Alert } from 'antd';
import { useNavigate } from 'react-router-dom';
import TableProductSizes from './TableProductSizes';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../UI/Container/Container';
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

const createFolder = (uploadFolder, isMainImg) => {
  return `brothershop/products/${isMainImg ? 'mainImg' : 'subImg'}/${uploadFolder}`;
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

const EditProductForm = ({ product }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form] = Form.useForm();
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const [selectedCategory, setSelectedCategory] = useState();
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
  const { editLoading } = useSelector((state) => state.productSlice);

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

  const onFinish = async (values) => {
    const { name, price, description, oldPrice } = values;
    const updatedProduct = {
      name,
      description,
      price,
      oldPrice,
      id: product._id,
    };

    if (selectedCategory) {
      const parsedCategory = JSON.parse(selectedCategory);
      updatedProduct.categoryId = parsedCategory._id;
    }

    const uploadFolder = getFolder(
      selectedCategory
        ? JSON.parse(selectedCategory)?.type || JSON.parse(selectedCategory)?.name
        : currentType?.type || product.category.name,
    );
    if (mainFileList[0].originFileObj) {
      const mainImgFolder = createFolder(uploadFolder, true);
      updatedProduct.mainFolder = mainImgFolder;

      const mainFileImg = await getBase64(mainFileList[0].originFileObj);
      updatedProduct.mainImg = mainFileImg;
    }

    if (subFileList[0].originFileObj) {
      const subImgFolder = createFolder(uploadFolder, false);
      updatedProduct.subFolder = subImgFolder;

      const subFileImg = await getBase64(subFileList[0].originFileObj);
      updatedProduct.subImg = subFileImg;
    }

    dispatch({ type: SagaActionTypes.UPDATE_PRODUCT_SAGA, updatedProduct: updatedProduct });
  };

  const currentType = product.category.types?.find((type) => type.products.includes(product._id));

  return (
    <>
      {editLoading && <Alert message="Cập nhật sản phẩm" description="Đang cập nhật sản phẩm" type="info" showIcon />}
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
            <Container>
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
            </Container>
            <Container>
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
                    label="Giá gốc"
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
                      placeholder="Giá gốc"
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
            </Container>
            <Container>
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
                    initialValue={currentType?.type || product.category.name}
                  >
                    <Select
                      showSearch
                      placeholder="Danh mục"
                      allowClear
                      optionLabelProp="label"
                      onChange={(value) => setSelectedCategory(value)}
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
            </Container>
            <Container>
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
            </Container>
          </Col>
          <Col xs={24} sm={8} md={24} lg={8}>
            <Container>
              <Row>
                <Col span={24}>
                  <Title level={4}>Hình ảnh sản phẩm</Title>
                </Col>
                <Col span={24}>
                  <Form.Item name="mainImg" label="Ảnh chính">
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
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item name="subImg" label="Thêm ảnh mô tả">
                    <CustomImgCrop>
                      <Upload
                        listType="picture-card"
                        fileList={subFileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                      >
                        {subFileList.length === 1 ? null : uploadButton}
                      </Upload>
                    </CustomImgCrop>
                  </Form.Item>
                </Col>
              </Row>

              <Space style={{ paddingBottom: '20px' }}>
                <Button size="large" type="primary" htmlType="submit">
                  Xác nhận
                </Button>
                <Button size="large" type="primary" danger onClick={handleClose}>
                  Đóng
                </Button>
              </Space>
              <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img
                  alt="example"
                  style={{
                    width: '100%',
                  }}
                  src={previewImage}
                />
              </Modal>
            </Container>
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default EditProductForm;
