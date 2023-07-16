import { Popconfirm, Space, Button, Image } from 'antd';
import { DeleteFilled, EyeFilled, UndoOutlined } from '@ant-design/icons';
import TableTemplate from '~/components/UI/Table/TableTemplate';
import { useNavigate } from 'react-router-dom';
import LoadingSpin from '~/components/UI/LoadingSpin/LoadingSpin';
import { useDispatch } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants';
import { printNumberWithCommas } from '~/util/shared';

const TableProducts = ({ keyWord, data, loading }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      width: '5%',
      key: '',
      render: (text, record, index) => data.indexOf(record) + 1,
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'Hình ảnh',
      dataIndex: ['images', 'mainImg'],
      key: 'image',
      align: 'center',
      ellipsis: true,
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
      ellipsis: true,
      render: (id) => id.substring(0, 8).toUpperCase(),
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: <div style={{ textAlign: 'center' }}>Giá cũ</div>,
      dataIndex: 'oldPrice',
      key: 'oldPrice',
      align: 'center',
      ellipsis: true,
      sorter: (a, b) => (a.oldPrice ?? a.price) - (b.oldPrice ?? b.price),
      render: (value, record) => <div>{printNumberWithCommas(record.oldPrice || record.price)} đ</div>,
    },
    {
      title: <div style={{ textAlign: 'center' }}>Giá bán</div>,
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      ellipsis: true,
      sorter: (a, b) => a.price - b.price,
      render: (price) => <div>{printNumberWithCommas(price)} đ</div>,
    },
    {
      title: <div style={{ textAlign: 'center' }}>Số lượng</div>,
      dataIndex: 'sizes',
      key: 'sizes',
      align: 'center',
      ellipsis: true,
      sorter: (a, b) =>
        a.sizes.reduce((acc, size) => acc + size.quantity, 0) - b.sizes.reduce((acc, size) => acc + size.quantity, 0),
      render: (sizes) => {
        const quantity = sizes.reduce((acc, size) => acc + size.quantity, 0);
        return <div>{printNumberWithCommas(quantity)}</div>;
      },
    },
    {
      title: <div style={{ textAlign: 'center' }}>Đã bán</div>,
      dataIndex: 'sizes',
      key: 'sold',
      ellipsis: true,
      align: 'center',
      sorter: (a, b) =>
        a.sizes.reduce((acc, size) => acc + size.sold, 0) - b.sizes.reduce((acc, size) => acc + size.sold, 0),
      render: (sizes) => {
        const quantitySold = sizes.reduce((acc, size) => acc + size.sold, 0);
        return <div>{printNumberWithCommas(quantitySold)}</div>;
      },
    },

    {
      title: 'Thao tác',
      key: 'action',
      id: 'action',
      ellipsis: true,
      width: '10%',
      fixed: 'right',
      align: 'center',
      render: (text, record, index) => (
        <Space size="middle" key={index}>
          <Button type="primary" icon={<EyeFilled />} onClick={() => handleEditProduct(record)} />
          {record.state === 'Đang bán' ? (
            <Popconfirm
              placement="top"
              title="Bạn có chắc muốn xóa sản phẩm này?"
              okText="Xác nhận"
              cancelText="Hủy"
              onConfirm={() => handleRemoveProduct(record)}
            >
              <Button type="primary" icon={<DeleteFilled />} danger></Button>
            </Popconfirm>
          ) : (
            <Popconfirm
              placement="top"
              title="Bạn muốn khôi phục sản phẩm này?"
              okText="Xác nhận"
              cancelText="Hủy"
              onConfirm={() => handleResellProduct(record)}
            >
              <Button type="default" icon={<UndoOutlined />} />
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  const handleRemoveProduct = (product) => {
    dispatch({ type: SagaActionTypes.STOP_SELLING_PRODUCT_SAGA, productId: product._id });
  };

  const handleEditProduct = (product) => {
    navigate(`/products/${product._id}`);
  };

  const handleResellProduct = (product) => {
    dispatch({ type: SagaActionTypes.RESELL_PRODUCT_SAGA, productId: product._id });
  };

  if (loading) {
    return <LoadingSpin />;
  }

  return (
    <TableTemplate
      dataSource={data}
      columns={columns}
      pagination={{
        defaultPageSize: 4,
        showSizeChanger: false,
        pageSizeOptions: ['4'],
      }}
      rowKey={'_id'}
    />
  );
};

export default TableProducts;
