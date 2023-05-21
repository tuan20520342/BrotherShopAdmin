import { Popconfirm, Space, Button, Image } from 'antd';
import { DeleteFilled, EyeFilled } from '@ant-design/icons';
import TableTemplate from '~/components/UI/Table/TableTemplate';
import AddProductToReceipt from './AddProductToReceipt';
import { modalActions } from '~/redux/reducer/ModalReducer';
import { useDispatch } from 'react-redux';

const ProductsWarehouseTable = ({ keyWord, data, onEditProduct, onRemoveProduct }) => {
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
      title: <div style={{ textAlign: 'center' }}>Giá nhập</div>,
      dataIndex: 'importPrice',
      key: 'importPrice',
      align: 'center',
      ellipsis: true,
      sorter: (a, b) => a.importPrice - b.importPrice,
      render: (price) => <div>{price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')} đ</div>,
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
        return <div>{quantity.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</div>;
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
          <Button type="primary" icon={<EyeFilled />} onClick={() => handleEditProduct(record)}></Button>
          <Popconfirm
            placement="top"
            title="Bạn có chắc muốn xóa sản phẩm này ra khỏi phiếu nhập?"
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

  const handleRemoveProduct = (product) => {
    onRemoveProduct(product);
  };

  const handleEditProduct = (product) => {
    dispatch(
      modalActions.showModal({
        title: 'Cập nhật sản phẩm',
        ComponentContent: <AddProductToReceipt product={product} onEditProduct={onEditProduct} />,
      }),
    );
  };

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

export default ProductsWarehouseTable;
