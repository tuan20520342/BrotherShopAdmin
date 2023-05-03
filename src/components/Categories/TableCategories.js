import { Popconfirm, Space, Button } from 'antd';
import { DeleteFilled, EyeFilled } from '@ant-design/icons';
import { useState } from 'react';
import TableTemplate from '~/components/UI/Table/TableTemplate';
import { modalActions } from '~/redux/reducer/ModalReducer';
import { useDispatch } from 'react-redux';
import EditCategoryForm from './EditCategoryForm';
import LoadingSpin from '~/components/UI/LoadingSpin/LoadingSpin';

const TableCategories = ({ keyWord, data, loading }) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      width: '5%',
      key: '',
      align: 'center',
      render: (text, record, index) => (page - 1) * 6 + index + 1,
    },
    {
      title: 'Mã danh mục',
      dataIndex: '_id',
      key: '_id',
      sorter: (a, b) => a._id.localeCompare(b._id),
      filteredValue: [keyWord],
      onFilter: (value, record) => {
        return (
          String(record._id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.types.map((type) => type.type).join(', '))
            .toLowerCase()
            .includes(value.toLowerCase())
        );
      },
      showOnResponse: true,
      showOnDesktop: true,
      align: 'center',
      render: (id) => id.substring(0, 6),
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
      title: 'Loại',
      dataIndex: 'types',
      key: 'types',
      showOnResponse: true,
      showOnDesktop: true,
      sorter: (item1, item2) => item1.name.localeCompare(item2.name),
      render: (types) => types.map((type) => type.type).join(', '),
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
          <Button type="primary" icon={<EyeFilled />} onClick={() => handleEditCategory(record)}></Button>
          <Popconfirm
            placement="top"
            title="Bạn có chắc muốn xóa danh mục này?"
            okText="Xác nhận"
            cancelText="Hủy"
            onConfirm={() => handleRemoveCategory(record)}
          >
            <Button type="primary" icon={<DeleteFilled />} danger></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleRemoveCategory = (record) => {};

  const handleEditCategory = (category) => {
    dispatch(
      modalActions.showModal({
        title: 'Thông tin danh mục sản phẩm',
        ComponentContent: <EditCategoryForm category={category} />,
      }),
    );
  };
  if (loading) {
    return <LoadingSpin />;
  }
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
        rowKey={'_id'}
      />
      {/* <ModalForm isModalOpen={isOpen} /> */}
    </>
  );
};

export default TableCategories;
