import { Popconfirm, Space, Button } from 'antd';
import { DeleteFilled, EyeFilled } from '@ant-design/icons';
import { useState } from 'react';
import TableTemplate from '~/components/UI/Table/TableTemplate';
import LoadingSpin from '~/components/UI/LoadingSpin/LoadingSpin';
import { useDispatch } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants/constant';

const TableStaffs = ({ keyWord, data, loading }) => {
  const dispatch = useDispatch();
  const [page, setPage] = useState(1);

  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      width: '5%',
      key: '',
      render: (text, record, index) => (page - 1) * 6 + index + 1,
      align: 'center',
    },
    {
      title: 'Mã nhân viên',
      dataIndex: '_id',
      key: '_id',
      align: 'center',
      sorter: (item1, item2) => item1._id.localeCompare(item2._id),
      filteredValue: [keyWord],
      onFilter: (value, record) => {
        return (
          String(record.id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.phone).toLowerCase().includes(value.toLowerCase()) ||
          String(record.email).toLowerCase().includes(value.toLowerCase()) ||
          String(record.role.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.status).toLowerCase().includes(value.toLowerCase())
        );
      },
      showOnResponse: true,
      showOnDesktop: true,
      render: (id) => id.substring(0, 6).toUpperCase(),
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      showOnResponse: true,
      showOnDesktop: true,
      sorter: (item1, item2) => item1.name.localeCompare(item2.name),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      showOnResponse: true,
      showOnDesktop: true,
      ellipsis: true,
    },
    {
      title: 'Vai trò',
      dataIndex: ['role', 'name'],
      key: 'role',
      align: 'center',
      showOnResponse: true,
      showOnDesktop: true,
      ellipsis: true,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      showOnResponse: true,
      showOnDesktop: true,
      ellipsis: true,
      align: 'center',
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
          <Button type="primary" icon={<EyeFilled />} onClick={() => handleEditStaff(record)}></Button>
          {record.role.name === 'Chủ cửa hàng' ? (
            <Button type="primary" icon={<DeleteFilled />} disabled></Button>
          ) : (
            <Popconfirm
              placement="top"
              title="Bạn có chắc muốn xóa nhân viên này?"
              okText="Xác nhận"
              cancelText="Hủy"
              onConfirm={() => handleRemoveStaff(record)}
            >
              <Button type="primary" icon={<DeleteFilled />} danger></Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  const handleRemoveStaff = (record) => {
    console.log(record);
    dispatch({
      type: SagaActionTypes.DELETE_STAFF_SAGA,
      staffId: record._id,
    });
  };

  const handleEditStaff = (staff) => {};

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

export default TableStaffs;
