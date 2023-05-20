import { Popconfirm, Space, Button } from 'antd';
import dayjs from 'dayjs';
import { DeleteFilled, EyeFilled } from '@ant-design/icons';
import TableTemplate from '~/components/UI/Table/TableTemplate';

const TableWarehouseReceipts = ({ keyWord, data, loading }) => {
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
      sorter: (item1, item2) => item1.id.localeCompare(item2.id),
      filteredValue: [keyWord],
      onFilter: (value, record) => {
        console.log(record);
        return (
          String(record.id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.product.title).toLowerCase().includes(value.toLowerCase()) ||
          String(record.cost).toLowerCase().includes(value.toLowerCase()) ||
          String(record.price).toLowerCase().includes(value.toLowerCase()) ||
          String(record.quantity).toLowerCase().includes(value.toLowerCase()) ||
          record.state.find((item) => item.stateName.toLowerCase().includes(value.toLowerCase())) ||
          String(dayjs(record.EXP).format('DD/MM/YYYY')).toLowerCase().includes(value.toLowerCase()) ||
          String(dayjs(record.MFG).format('DD/MM/YYYY')).toLowerCase().includes(value.toLowerCase())
        );
      },
      showOnResponse: true,
      showOnDesktop: true,
      render: (text, record, index) => record._id.slice(0, 8),
    },
    {
      title: 'Ngày nhập hàng',
      dataIndex: 'date',
      key: 'date',
      align: 'center',
      showOnResponse: true,
      showOnDesktop: true,
      sorter: (a, b) => a.date > b.date,
      render: (date) => `${dayjs(date).format('DD/MM/YYYY')}`,
    },

    {
      title: 'Số lượng',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'center',
      showOnResponse: true,
      showOnDesktop: true,
      ellipsis: true,
      sorter: (a, b) => a.quantity - b.quantity,
      render: (text, record, index) => {
        console.log(record);
        // return <div>{record.quantity.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</div>;
        return <span>{record.products.length}</span>;
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
      sorter: (a, b) => a.price - b.price,
      render: (text, record, index) => {
        const totalPrice = record.products.reduce((accPrice, currentProduct) => {
          const totalQuantity = currentProduct.sizes.reduce((accQuantity, currentSize) => {
            return accQuantity + currentSize.quantity;
          }, 0);

          return accPrice + currentProduct.importPrice * totalQuantity;
        }, 0);
        return <div>{totalPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}đ</div>;
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
          <Button type="primary" icon={<EyeFilled />} onClick={() => handleEditReceipt(record)}></Button>
          <Popconfirm
            placement="top"
            title="Bạn có chắc muốn xóa sản phẩm này?"
            okText="Xác nhận"
            cancelText="Hủy"
            onConfirm={() => handleRemoveReceipt(record)}
          >
            <Button type="primary" icon={<DeleteFilled />} danger></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleRemoveReceipt = (record) => {};

  const handleEditReceipt = (receipt) => {};

  return (
    <TableTemplate
      dataSource={data}
      columns={columns}
      pagination={{
        defaultPageSize: 6,
        showSizeChanger: false,
        pageSizeOptions: ['6'],
      }}
      rowKey={'id'}
    />
  );
};

export default TableWarehouseReceipts;
