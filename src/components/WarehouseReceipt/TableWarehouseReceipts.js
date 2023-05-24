import { Space, Button } from 'antd';
import dayjs from 'dayjs';
import { EyeFilled } from '@ant-design/icons';
import TableTemplate from '~/components/UI/Table/TableTemplate';
import LoadingSpin from '../UI/LoadingSpin/LoadingSpin';
import { useNavigate } from 'react-router-dom';

const totalQuantity = (receipt) => {
  return receipt.products.reduce((total, currentProduct) => {
    const totalQuantity = currentProduct.sizes.reduce((accQuantity, currentSize) => {
      return accQuantity + currentSize.quantity;
    }, 0);
    return total + totalQuantity;
  }, 0);
};

const totalPrice = (receipt) => {
  return receipt.products.reduce((accPrice, currentProduct) => {
    const totalQuantity = currentProduct.sizes.reduce((accQuantity, currentSize) => {
      return accQuantity + currentSize.quantity;
    }, 0);

    return accPrice + currentProduct.importPrice * totalQuantity;
  }, 0);
};

const TableWarehouseReceipts = ({ keyWord, data, loading }) => {
  const navigate = useNavigate();

  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      width: '5%',
      key: '',
      align: 'center',
      render: (text, record, index) => data.indexOf(record) + 1,
    },

    {
      title: 'Mã phiếu nhập kho',
      dataIndex: '_id',
      key: '_id',
      align: 'center',
      sorter: (item1, item2) => item1._id.localeCompare(item2._id),
      filteredValue: [keyWord],
      onFilter: (value, record) => {
        return (
          String(record._id).toLowerCase().includes(value.toLowerCase()) ||
          String(totalPrice(record)).toLowerCase().includes(value.toLowerCase()) ||
          String(totalQuantity(record)).toLowerCase().includes(value.toLowerCase()) ||
          String(dayjs(record.date).format('DD/MM/YYYY')).toLowerCase().includes(value.toLowerCase())
        );
      },
      showOnResponse: true,
      showOnDesktop: true,
      render: (text, record, index) => record._id.slice(0, 8).toUpperCase(),
    },
    {
      title: 'Ngày nhập hàng',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      showOnResponse: true,
      showOnDesktop: true,
      sorter: (a, b) => dayjs(a.date).unix() - dayjs(b.date).unix(),
      render: (date) => `${dayjs(date).format('DD/MM/YYYY')}`,
    },

    {
      title: 'Số lượng mặt hàng',
      dataIndex: 'products',
      key: 'quantity',
      align: 'center',
      showOnResponse: true,
      showOnDesktop: true,
      ellipsis: true,
      sorter: (a, b) => a.products.length - b.products.length,
      render: (text, record, index) => {
        return <span>{record.products.length}</span>;
      },
    },
    {
      title: 'Số lượng',
      dataIndex: 'products',
      key: 'totalquantity',
      align: 'center',
      showOnResponse: true,
      showOnDesktop: true,
      ellipsis: true,
      sorter: (a, b) => totalQuantity(a) - totalQuantity(b),
      render: (text, record, index) => {
        return (
          <div>
            {totalQuantity(record)
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
          </div>
        );
      },
    },
    {
      title: 'Tổng giá',
      dataIndex: 'price',
      key: 'price',
      align: 'center',
      showOnResponse: true,
      showOnDesktop: true,
      ellipsis: true,
      sorter: (a, b) => totalPrice(a) - totalPrice(b),
      render: (text, record, index) => {
        return (
          <div>
            {totalPrice(record)
              .toString()
              .replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}{' '}
            đ
          </div>
        );
      },
    },

    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      id: 'action',
      ellipsis: true,
      width: '10%',
      showOnResponse: true,
      showOnDesktop: true,
      fixed: 'right',
      render: (text, record, index) => (
        <Space size="middle" key={index}>
          <Button type="primary" icon={<EyeFilled />} onClick={() => handleEditReceipt(record)} />
        </Space>
      ),
    },
  ];

  const handleEditReceipt = (receipt) => {
    navigate(`/warehouse-receipt/${receipt._id}`);
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

export default TableWarehouseReceipts;
