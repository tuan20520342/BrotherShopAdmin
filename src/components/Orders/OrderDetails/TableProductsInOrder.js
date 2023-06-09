import { Image } from 'antd';
import TableTemplate from '~/components/UI/Table/TableTemplate';

const TableProductsInOrder = ({ keyWord, data }) => {
  console.log(data);
  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      width: '5%',
      key: '',
      align: 'center',
      render: (text, record, index) => data.indexOf(record) + 1,
      ellipsis: true,
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
          String(record.amount).toLowerCase().includes(value.toLowerCase()) ||
          String(record.price).toLowerCase().includes(value.toLowerCase()) ||
          String(record.price * record.amount)
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
      ellipsis: true,

      render: (text, record, index) => record._id.slice(0, 8).toUpperCase(),
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'image',
      key: 'image',
      align: 'center',
      ellipsis: true,
      render: (image) => <Image width={80} src={image} />,
    },
    {
      title: <div style={{ textAlign: 'center' }}>Số lượng</div>,
      dataIndex: 'amount',
      key: 'amount',
      align: 'end',
      ellipsis: true,
      sorter: (a, b) => a.amount > b.amount,
      render: (amount) => amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ','),
    },
    {
      title: <div style={{ textAlign: 'center' }}>Giá </div>,
      dataIndex: 'price',
      key: 'price',
      align: 'end',
      ellipsis: true,
      sorter: (a, b) => a.price > b.price,
      render: (price) => `${price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')} đ`,
    },
    {
      title: <div style={{ textAlign: 'center' }}>Thành tiền</div>,
      dataIndex: 'price',
      key: 'totalPrice',
      align: 'end',
      ellipsis: true,
      sorter: (a, b) => a.price * a.amount > b.price * b.amount,
      render: (value, record) => (
        <div>{(record.price * record.amount).toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')} đ</div>
      ),
    },
  ];

  return (
    <TableTemplate
      style={{ filter: 'none' }}
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

export default TableProductsInOrder;
