import { Popconfirm, Space, Spin, Button } from 'antd';
import { DeleteFilled, EyeFilled } from '@ant-design/icons';
import { useState } from 'react';
import TableTemplate from '~/components/UI/Table/TableTemplate';

const TableCategories = ({ keyWord, data, loading }) => {
  const [page, setPage] = useState(1);

  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      width: '5%',
      key: '',
      render: (text, record, index) => (page - 1) * 6 + index + 1,
    },
    {
      title: 'Mã danh mục',
      dataIndex: '_id',
      key: 'id',
      sorter: (a, b) => a._id.localeCompare(b._id),
      filteredValue: [keyWord],
      onFilter: (value, record) => {
        return (
          String(record.id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.name).toLowerCase().includes(value.toLowerCase())
        );
      },
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      showOnResponse: true,
      showOnDesktop: true,
      sorter: (item1, item2) => item1.name.localeCompare(item2.name),
    },
    {
      title: 'Thao tác',
      key: 'action',
      id: 'action',
      ellipsis: true,
      width: '10%',
      showOnResponse: true,
      showOnDesktop: true,
      fixed: 'right',
      align: 'center',
      render: (text, record, index) => (
        <Space size="middle" key={index}>
          <Button type="primary" icon={<EyeFilled />} onClick={() => handleEditCustomer(record)}></Button>
          <Popconfirm
            placement="top"
            title="Bạn có chắc muốn xóa danh mục này?"
            okText="Xác nhận"
            cancelText="Hủy"
            // cancelButtonProps={{
            //   className: 'text-gray-400 border-gray-400 hover:text-gray-500 hover:border-gray-500',
            // }}
            onConfirm={() => handleRemoveCustomer(record)}
          >
            <Button type="primary" icon={<DeleteFilled />} danger></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleRemoveCustomer = (record) => {};

  const handleEditCustomer = (customer) => {};
  // if (loading === true) {
  //   return (
  //     <div className="w-full flex items-center justify-center mb-12 h-4/5">
  //       <Space size="middle ">
  //         <Spin size="large" tip="Loading..." />
  //       </Space>
  //     </div>
  //   );
  // }
  return (
    <>
      <TableTemplate
        dataSource={data}
        columns={columns}
        pagination={{
          onChange(current) {
            setPage(current);
          },
          defaultPageSize: 6,
          showSizeChanger: false,
          pageSizeOptions: ['6'],
        }}
        rowKey={'id'}
      />
      {/* <ModalForm isModalOpen={isOpen} /> */}
    </>
  );
};

export default TableCategories;
