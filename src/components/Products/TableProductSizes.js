import TableTemplate from '~/components/UI/Table/TableTemplate';
import { printNumberWithCommas } from '~/util/shared';

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
      render: (quantity) => printNumberWithCommas(quantity),
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
      render: (sold) => printNumberWithCommas(sold),
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
