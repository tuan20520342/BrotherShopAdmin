import { Popconfirm, Space, Button } from 'antd';
import { DeleteFilled, EyeFilled } from '@ant-design/icons';
import TableTemplate from '~/components/UI/Table/TableTemplate';
import { modalActions } from '~/redux/reducer/ModalReducer';
import { useDispatch } from 'react-redux';
import EditCategoryForm from './EditCategoryForm';
import LoadingSpin from '~/components/UI/LoadingSpin/LoadingSpin';
import * as SagaActionTypes from '~/redux/constants';

const TableCategories = ({ keyWord, data, loading }) => {
  const dispatch = useDispatch();

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
      ellipsis: true,
      align: 'center',
      render: (id) => id.substring(0, 6).toUpperCase(),
    },
    {
      title: 'Tên danh mục',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      sorter: (item1, item2) => item1.name.localeCompare(item2.name),
    },
    {
      title: 'Loại',
      dataIndex: 'types',
      key: 'types',
      ellipsis: true,
      sorter: (item1, item2) => item1.name.localeCompare(item2.name),
      render: (types) => (types.length > 0 ? types.map((type) => type.type).join(', ') : 'Không có loại nào'),
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
          <Button type="primary" icon={<EyeFilled />} onClick={() => handleEditCategory(record)} />

          {record.products.length > 0 ? (
            <Button type="primary" icon={<DeleteFilled />} danger disabled />
          ) : (
            <Popconfirm
              placement="top"
              title="Bạn có chắc muốn xóa danh mục này?"
              okText="Xác nhận"
              cancelText="Hủy"
              onConfirm={() => handleRemoveCategory(record)}
            >
              <Button type="primary" icon={<DeleteFilled />} danger />
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  const handleRemoveCategory = (record) => {
    dispatch({ type: SagaActionTypes.REMOVE_CATEGORY_SAGA, removedCategory: { categoryId: record._id } });
  };

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

export default TableCategories;
