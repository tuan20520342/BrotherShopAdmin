/* eslint-disable no-template-curly-in-string */
import React, { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Form, Input, Button, Select, InputNumber, Upload, Space, Modal, Row, Col, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants';
import CustomImgCrop from './CustomImgCrop';
import Container from '../UI/Container/Container';
import UploadButton from '../UI/Button/UploadButton';

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
    if (newFileList.length > 0) {
      newFileList[0].status = 'done';
    }
    setSubFileList(newFileList);
  };

  const handleMainChange = ({ fileList: newFileList }) => {
    if (newFileList.length > 0) {
      newFileList[0].status = 'done';
    }
    setMainFileList(newFileList);
  };

  const handleClose = () => {
    navigate('/products');
  };

  const onFinish = async (values) => {
    const mainFileImg = await getBase64(mainFileList[0].originFileObj);
    const subFileImg = await getBase64(subFileList[0].originFileObj);

    const parsedCategory = JSON.parse(selectedCategory);
    const uploadFolder = getFolder(parsedCategory?.type || parsedCategory?.name);
    const mainImgFolder = createFolder(uploadFolder, true);
    const subImgFolder = createFolder(uploadFolder, false);

    const { name, description, price } = values;

    const newProduct = {
      name,
      description,
      price,
      categoryId: parsedCategory._id,
      mainImg: mainFileImg,
      subImg: subFileImg,
      mainFolder: mainImgFolder,
      subFolder: subImgFolder,
    };

    dispatch({ type: SagaActionTypes.CREATE_PRODUCT_SAGA, newProduct });
  };

  return (
    <Form
      name="add_product_form"
      form={form}
      onFinish={onFinish}
      initialValues={{
        description: '',
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
        </Col>
        <Col xs={24} sm={8} md={24} lg={8}>
          <Container>
            <Row>
              <Col span={24}>
                <Title level={4}>Hình ảnh sản phẩm</Title>
              </Col>
              <Col span={24}>
                <Form.Item name="mainImage" label="Ảnh chính">
                  <>
                    <CustomImgCrop>
                      <Upload
                        listType="picture-card"
                        fileList={mainFileList}
                        onPreview={handlePreview}
                        onChange={handleMainChange}
                        style={{ display: 'inline-block' }}
                        customRequest={() => {}}
                      >
                        {mainFileList.length >= 1 ? null : <UploadButton />}
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
                  </>
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item name="images" label="Thêm ảnh mô tả">
                  <>
                    <CustomImgCrop>
                      <Upload
                        listType="picture-card"
                        fileList={subFileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                        customRequest={() => {}}
                      >
                        {subFileList.length >= 1 ? null : <UploadButton />}
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
                  </>
                </Form.Item>
              </Col>
            </Row>

            <Row style={{ paddingBottom: '20px' }}>
              <Space>
                <Button size="large" type="primary" htmlType="submit">
                  Xác nhận
                </Button>
                <Button size="large" type="primary" danger onClick={handleClose}>
                  Đóng
                </Button>
              </Space>
            </Row>
          </Container>
        </Col>
      </Row>
    </Form>
  );
};
export default AddProductForm;
