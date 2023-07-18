import { Space, Button } from 'antd';
import dayjs from 'dayjs';
import { EyeFilled } from '@ant-design/icons';
import TableTemplate from '~/components/UI/Table/TableTemplate';
import LoadingSpin from '../UI/LoadingSpin/LoadingSpin';
import { useNavigate } from 'react-router-dom';
import { printNumberWithCommas } from '~/util/shared';

const TableOrders = ({ keyWord, data, loading }) => {
  const navigate = useNavigate();
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
      title: 'Mã đơn hàng',
      dataIndex: '_id',
      key: '_id',
      align: 'center',
      sorter: (item1, item2) => item1._id.localeCompare(item2._id),
      filteredValue: [keyWord],
      onFilter: (value, record) => {
        return (
          String(record._id).toLowerCase().includes(value.toLowerCase()) ||
          String(dayjs(record.createdAt).format('DD/MM/YYYY')).toLowerCase().includes(value.toLowerCase()) ||
          String(record.toName).toLowerCase().includes(value.toLowerCase()) ||
          String(record.toPhone).toLowerCase().includes(value.toLowerCase()) ||
          String(record.paymentMethod).toLowerCase().includes(value.toLowerCase()) ||
          String(record.shippingStatus).toLowerCase().includes(value.toLowerCase())
        );
      },
      ellipsis: true,

      render: (text, record, index) => record._id.slice(0, 8).toUpperCase(),
    },
    {
      title: 'Ngày đặt hàng',
      dataIndex: 'createdAt',
      key: 'createdAt',
      align: 'center',
      ellipsis: true,
      sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
      render: (date) => `${dayjs(date).format('DD/MM/YYYY')}`,
    },
    {
      title: 'Người nhận',
      dataIndex: 'toName',
      key: 'toName',
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'SĐT người nhận',
      dataIndex: 'toPhone',
      key: 'toPhone',
      align: 'center',
      ellipsis: true,
    },

    {
      title: 'Hình thức thanh toán',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'Trạng thái đơn hàng',
      dataIndex: 'shippingStatus',
      key: 'shippingStatus',
      align: 'center',
      ellipsis: true,
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tổng tiền</div>,
      dataIndex: 'totalProductsPrice',
      key: 'totalProductsPrice',
      align: 'end',
      ellipsis: true,
      sorter: (a, b) => a.totalProductsPrice - b.totalProductsPrice,
      render: (value, record) => <div>{printNumberWithCommas(record.totalProductsPrice)} đ</div>,
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      id: 'action',
      ellipsis: true,
      width: '10%',
      fixed: 'right',

      render: (text, record, index) => (
        <Space size="middle" key={index}>
          <Button type="primary" icon={<EyeFilled />} onClick={() => handleEditOrder(record)} />
        </Space>
      ),
    },
  ];

  const handleEditOrder = (order) => {
    navigate(`/orders/${order._id}`);
  };

  if (loading) {
    return <LoadingSpin />;
  }

  return (
    <TableTemplate
      dataSource={data}
      columns={columns}
      pagination={{
        defaultPageSize: 6,
        showSizeChanger: false,
        pageSizeOptions: ['6'],
      }}
      rowKey={'_id'}
    />
  );
};

export default TableOrders;
