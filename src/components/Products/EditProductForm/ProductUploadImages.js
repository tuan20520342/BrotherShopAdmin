import { Button, Col, Form, Modal, Row, Space, Typography, Upload } from 'antd';
import Container from '~/components/UI/Container/Container';
import CustomImgCrop from '../CustomImgCrop';
import React, { useImperativeHandle, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import UploadButton from '~/components/UI/Button/UploadButton';

const { Title } = Typography;

const getBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

export default React.forwardRef(function ProductUploadImages({ product, loading }, ref) {
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

  const navigate = useNavigate();

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
    setFileList(newFileList);
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

  useImperativeHandle(ref, () => ({
    getMainFileList: () => {
      return mainFileList[0].originFileObj;
    },
    getSubFileList: () => {
      return subFileList[0].originFileObj;
    },
  }));

  return (
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
                customRequest={() => {}}
              >
                {mainFileList.length >= 1 ? null : <UploadButton />}
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
                customRequest={() => {}}
              >
                {subFileList.length === 1 ? null : <UploadButton />}
              </Upload>
            </CustomImgCrop>
          </Form.Item>
        </Col>
      </Row>

      <Space style={{ paddingBottom: '20px' }}>
        <Button size="large" type="primary" htmlType="submit" loading={loading}>
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
  );
});
