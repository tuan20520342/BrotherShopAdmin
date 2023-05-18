import { Popconfirm, Space, Spin, Button, Tag, Image } from 'antd';
import dayjs from 'dayjs';
import { DeleteFilled, EyeFilled } from '@ant-design/icons';
import { useState } from 'react';
import TableTemplate from '~/components/UI/Table/TableTemplate';
import { useDispatch } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants/constant';
import { useNavigate } from 'react-router-dom';
import LoadingSpin from '~/components/UI/LoadingSpin/LoadingSpin';

const TableProducts = ({ keyWord, data, loading }) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      width: '5%',
      key: '',
      render: (text, record, index) => (page - 1) * 4 + index + 1,
      align: 'center',
    },
    {
      title: 'Hình ảnh',
      dataIndex: ['images', 'mainImg'],
      key: 'image',
      align: 'center',
      showOnResponse: true,
      showOnDesktop: true,
      render: (image) => <Image width={80} src={`https://res.cloudinary.com/ddajkcbs2/image/upload/${image}`} />,
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: '_id',
      key: '_id',
      align: 'center',
      sorter: (item1, item2) => item1._id.localeCompare(item2._id),
      filteredValue: [keyWord],
      onFilter: (value, record) => {
        return (
          String(record._id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.oldPrice).toLowerCase().includes(value.toLowerCase()) ||
          String(record.price).toLowerCase().includes(value.toLowerCase()) ||
          String(record.sizes.reduce((acc, size) => acc + size.quantity, 0))
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
      showOnResponse: true,
      showOnDesktop: true,
      render: (id) => id.substring(0, 6).toUpperCase(),
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: 'Giá cũ',
      dataIndex: 'oldPrice',
      key: 'oldPrice',
      showOnResponse: true,
      showOnDesktop: true,
      sorter: (a, b) => (a.oldPrice ?? a.price) - (b.oldPrice ?? b.price),
      render: (value, record) => (
        <div>
          {record.oldPrice?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',') ||
            record.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
          <sup> đ</sup>
        </div>
      ),
    },
    {
      title: 'Giá bán',
      dataIndex: 'price',
      key: 'price',
      showOnResponse: true,
      showOnDesktop: true,
      ellipsis: true,
      sorter: (a, b) => a.price - b.price,
      render: (price) => (
        <div>
          {price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
          <sup> đ</sup>
        </div>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'sizes',
      key: 'sizes',
      showOnResponse: true,
      showOnDesktop: true,
      ellipsis: true,
      sorter: (a, b) =>
        a.sizes.reduce((acc, size) => acc + size.quantity, 0) - b.sizes.reduce((acc, size) => acc + size.quantity, 0),
      render: (sizes) => {
        const quantity = sizes.reduce((acc, size) => acc + size.quantity, 0);
        return <div>{quantity.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</div>;
      },
    },
    {
      title: 'Đã bán',
      dataIndex: 'sizes',
      key: 'sold',
      showOnResponse: true,
      showOnDesktop: true,
      ellipsis: true,
      sorter: (a, b) =>
        a.sizes.reduce((acc, size) => acc + size.sold, 0) - b.sizes.reduce((acc, size) => acc + size.sold, 0),
      render: (sizes) => {
        const quantitySold = sizes.reduce((acc, size) => acc + size.sold, 0);
        return <div>{quantitySold.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</div>;
      },
    },

    {
      title: 'Thao tác',
      key: 'action',
      id: 'action',
      ellipsis: true,
      width: '10%',
      showOnResponse: true,
      showOnDesktop: true,
      fixed: 'right',
      align: 'center',
      render: (text, record, index) => (
        <Space size="middle" key={index}>
          <Button type="primary" icon={<EyeFilled />} onClick={() => handleEditProduct(record)}></Button>
          <Popconfirm
            placement="top"
            title="Bạn có chắc muốn xóa sản phẩm này?"
            okText="Xác nhận"
            cancelText="Hủy"
            onConfirm={() => handleRemoveProduct(record)}
          >
            <Button type="primary" icon={<DeleteFilled />} danger></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleRemoveProduct = (record) => {};

  const handleEditProduct = (product) => {
    navigate(`/products/${product._id}`);
  };
  if (loading) {
    return <LoadingSpin />;
  }
  return (
    <>
      <TableTemplate
        dataSource={data}
        columns={columns}
        pagination={{
          onChange(current) {
            setPage(current);
          },
          defaultPageSize: 4,
          showSizeChanger: false,
          pageSizeOptions: ['4'],
        }}
        rowKey={'_id'}
      />
      {/* <ModalForm isModalOpen={isOpen} /> */}
    </>
  );
};

export default TableProducts;
