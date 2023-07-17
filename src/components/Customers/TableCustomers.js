import { Space, Button } from 'antd';
import { EyeFilled } from '@ant-design/icons';
import dayjs from 'dayjs';
import TableTemplate from '~/components/UI/Table/TableTemplate';
import LoadingSpin from '../UI/LoadingSpin/LoadingSpin';
import { useNavigate } from 'react-router-dom';

const TableCustomers = ({ keyWord, data, loading }) => {
  const navigate = useNavigate();

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
      title: 'Mã khách hàng',
      dataIndex: '_id',
      key: '_id',
      sorter: (item1, item2) => item1._id.localeCompare(item2._id),
      filteredValue: [keyWord],
      align: 'center',
      onFilter: (value, record) => {
        return (
          String(record._id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.phone).toLowerCase().includes(value.toLowerCase()) ||
          String(record.email).toLowerCase().includes(value.toLowerCase()) ||
          String(record.gender).toLowerCase().includes(value.toLowerCase()) ||
          String(dayjs(record.birthday).format('DD/MM/YYYY')).toLowerCase().includes(value.toLowerCase()) ||
          String(record.orders.length).toLowerCase().includes(value.toLowerCase())
        );
      },
      ellipsis: true,
      render: (id) => id.substring(0, 6).toUpperCase(),
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      sorter: (item1, item2) => item1.name.localeCompare(item2.name),
      ellipsis: true,
    },
    {
      title: 'Ngày sinh',
      dataIndex: 'birthday',
      key: 'birthday',
      ellipsis: true,
      align: 'center',
      sorter: (a, b) => dayjs(a.birthday).unix() - dayjs(b.birthday).unix(),
      render: (birthday) => `${dayjs(birthday).format('DD/MM/YYYY')}`,
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      ellipsis: true,
      align: 'center',
    },
    {
      title: 'Giới tính',
      dataIndex: 'gender',
      key: 'gender',
      ellipsis: true,
      align: 'center',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      ellipsis: true,
    },
    {
      title: <div style={{ textAlign: 'center' }}>Số đơn hàng</div>,
      dataIndex: 'orders',
      key: 'orders',
      ellipsis: true,
      sorter: (a, b) => a.orders.length > b.orders.length,
      render: (orders) => `${orders.length}`,
      align: 'center',
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
          <Button type="primary" icon={<EyeFilled />} onClick={() => handleEditCustomer(record)}></Button>
        </Space>
      ),
    },
  ];

  const handleEditCustomer = (customer) => {
    navigate(`/customers/${customer._id}`);
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

export default TableCustomers;
