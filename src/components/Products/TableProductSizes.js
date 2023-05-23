import TableTemplate from '~/components/UI/Table/TableTemplate';

const TableProductSizes = ({ data }) => {
  const columns = [
    {
      title: 'Sizes',
      dataIndex: 'name',
      key: 'name',
      align: 'center',
      showOnResponse: true,
      showOnDesktop: true,
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
      render: (quantity) => quantity.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ','),
    },
    {
      title: 'Đã bán',
      dataIndex: 'sold',
      key: 'sold',
      align: 'center',
      showOnResponse: true,
      showOnDesktop: true,
      ellipsis: true,
      sorter: (a, b) => a.sold - b.sold,
      render: (sold) => sold.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ','),
    },
  ];

  return (
    <TableTemplate
      dataSource={data}
      columns={columns}
      pagination={{
        showSizeChanger: false,
        hideOnSinglePage: true,
      }}
      rowKey={'name'}
      style={{ filter: 'none' }}
    />
  );
};

export default TableProductSizes;
