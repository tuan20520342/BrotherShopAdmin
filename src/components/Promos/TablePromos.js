import { Space, Button, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { EyeFilled, DeleteFilled } from '@ant-design/icons';
import TableTemplate from '~/components/UI/Table/TableTemplate';
import LoadingSpin from '../UI/LoadingSpin/LoadingSpin';
import { useNavigate } from 'react-router-dom';

const TablePromos = ({ keyWord, data, loading }) => {
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
      title: 'Mã khuyến mãi',
      dataIndex: '_id',
      key: '_id',
      align: 'center',
      sorter: (item1, item2) => item1._id.localeCompare(item2._id),
      //   filteredValue: [keyWord],
      //   onFilter: (value, record) => {
      //     return (
      //       String(record._id).toLowerCase().includes(value.toLowerCase()) ||
      //       String(dayjs(record.createdAt).format('DD/MM/YYYY')).toLowerCase().includes(value.toLowerCase()) ||
      //       String(record.toName).toLowerCase().includes(value.toLowerCase()) ||
      //       String(record.toPhone).toLowerCase().includes(value.toLowerCase()) ||
      //       String(record.paymentMethod).toLowerCase().includes(value.toLowerCase()) ||
      //       String(record.shippingStatus).toLowerCase().includes(value.toLowerCase())
      //     );
      //   },
      ellipsis: true,

      //   render: (text, record, index) => record._id.slice(0, 8).toUpperCase(),
    },
    {
      title: 'Tên chương trình',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      ellipsis: true,
      //   sorter: (a, b) => dayjs(a.createdAt).unix() - dayjs(b.createdAt).unix(),
      //   render: (date) => `${dayjs(date).format('DD/MM/YYYY')}`,
    },
    {
      title: 'Phần trăm ưu đãi',
      dataIndex: 'discount',
      key: 'discount',
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'beginDate',
      key: 'beginDate',
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      key: 'endDate',
      align: 'center',
      ellipsis: true,
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
          <Button type="primary" icon={<EyeFilled />} onClick={() => handleEditPromo(record)} />
          <Popconfirm
            placement="top"
            title="Bạn có chắc muốn xóa khuyến mãi này?"
            okText="Xác nhận"
            cancelText="Hủy"
            onConfirm={() => handleRemovePromo(record)}
          >
            <Button type="primary" icon={<DeleteFilled />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleEditPromo = (order) => {
    // navigate(`/orders/${order._id}`);
  };

  const handleRemovePromo = (record) => {};

  //   if (loading) {
  //     return <LoadingSpin />;
  //   }

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

export default TablePromos;
