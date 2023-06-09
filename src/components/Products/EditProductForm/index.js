/* eslint-disable no-template-curly-in-string */
import React, { useRef, useState } from 'react';
import { Form, Row, Col, Alert } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants';
import ProductCommonInfor from './ProductCommonInfor';
import ProductPrice from './ProductPrice';
import ProductSelectCategory from './ProductSelectCategory';
import ProductQuantity from './ProductQuantity';
import { validateMessages } from '~/util/constants';
import ProductUploadImages from './ProductUploadImages';

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

const EditProductForm = ({ product }) => {
  const dispatch = useDispatch();

  const ref = useRef();

  const [form] = Form.useForm();
  const [selectedCategory, setSelectedCategory] = useState();

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
    if (ref.current.getMainFileList()) {
      const mainImgFolder = createFolder(uploadFolder, true);
      updatedProduct.mainFolder = mainImgFolder;

      const mainFileImg = await getBase64(ref.current.getMainFileList());
      updatedProduct.mainImg = mainFileImg;
    }

    if (ref.current.getSubFileList()) {
      const subImgFolder = createFolder(uploadFolder, false);
      updatedProduct.subFolder = subImgFolder;

      const subFileImg = await getBase64(ref.current.getSubFileList());
      updatedProduct.subImg = subFileImg;
    }

    dispatch({ type: SagaActionTypes.UPDATE_PRODUCT_SAGA, updatedProduct: updatedProduct });
  };

  const currentType = product.category.types?.find((type) => type.products.includes(product._id));

  return (
    <>
      {editLoading && (
        <Alert
          message="Cập nhật sản phẩm"
          description="Đang cập nhật sản phẩm"
          type="info"
          showIcon
          style={{ marginBottom: '30px' }}
        />
      )}
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
            <ProductCommonInfor />
            <ProductPrice />
            <ProductSelectCategory
              types={types}
              onChange={(value) => setSelectedCategory(value)}
              currentType={currentType}
              product={product}
            />
            <ProductQuantity sizes={product.sizes} />
          </Col>
          <Col xs={24} sm={8} md={24} lg={8}>
            <ProductUploadImages ref={ref} product={product} loading={editLoading} />
          </Col>
        </Row>
      </Form>
    </>
  );
};
export default EditProductForm;
