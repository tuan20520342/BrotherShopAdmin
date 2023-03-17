import Search from 'antd/lib/input/Search';
import React from 'react';
import { useState, useEffect } from 'react';
import { Typography, Row, Col, Button, Modal, Form, Input } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Toolbar from '~/components/UI/Toolbar';
import { useNavigate } from 'react-router-dom';
import TableCategories from '~/components/Categories/TableCategories';
const { Title } = Typography;

const CategoriesPage = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const categories = [
    {
      id: 1,
      name: 'Áo',
    },
    {
      id: 2,
      name: 'Quần',
    },
    {
      id: 3,
      name: 'Unisex',
    },
  ];
  const [keyWord, setKeyWord] = useState('');

  const handleAddCategory = () => {
    showModal();
  };

  return (
    <>
      <Row>
        <Col span={24}>
          <Title level={2}>Danh mục sản phẩm</Title>
        </Col>
        <Col span={24}>
          <Toolbar title={'Thêm danh mục'} setKeyWord={setKeyWord} handleAdd={showModal} />
        </Col>
        <Col span={24}>
          <TableCategories data={categories} keyWord={keyWord} />
        </Col>
      </Row>
      <Modal title="Thêm danh mục" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <Form>
          <Form.Item
            name="category"
            label="Tên danh mục"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Input placeholder="Tên danh mục" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default CategoriesPage;
