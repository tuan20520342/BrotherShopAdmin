import { Popconfirm, Space, Button } from 'antd';
import { DeleteFilled, EyeFilled } from '@ant-design/icons';
import TableTemplate from '~/components/UI/Table/TableTemplate';
import LoadingSpin from '~/components/UI/LoadingSpin/LoadingSpin';
import { useDispatch } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants';
import { role } from '~/util/constants';
import { useNavigate } from 'react-router-dom';

const TableStaffs = ({ keyWord, data, loading }) => {
  const dispatch = useDispatch();
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
      ellipsis: true,
      render: (id) => id.substring(0, 6).toUpperCase(),
    },
    {
      title: 'Họ và tên',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
      sorter: (item1, item2) => item1.name.localeCompare(item2.name),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      key: 'phone',
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
      title: 'Vai trò',
      dataIndex: ['role', 'name'],
      key: 'role',
      align: 'center',
      ellipsis: true,
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      key: 'status',
      ellipsis: true,
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
          <Button type="primary" icon={<EyeFilled />} onClick={() => handleEditStaff(record)}></Button>
          {record.role.name === role.MANAGER || record.status === 'Đã nghỉ' ? (
            <Button type="primary" icon={<DeleteFilled />} disabled />
          ) : (
            <Popconfirm
              placement="top"
              title="Bạn có chắc muốn xóa nhân viên này?"
              okText="Xác nhận"
              cancelText="Hủy"
              onConfirm={() => handleRemoveStaff(record)}
            >
              <Button type="primary" icon={<DeleteFilled />} danger />
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  const handleRemoveStaff = (record) => {
    dispatch({
      type: SagaActionTypes.DELETE_STAFF_SAGA,
      staffId: record._id,
    });
  };

  const handleEditStaff = (staff) => {
    navigate(`/staffs/${staff._id}`);
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
          defaultPageSize: 6,
          showSizeChanger: false,
          pageSizeOptions: ['6'],
        }}
        rowKey={'_id'}
      />
    </>
  );
};

export default TableStaffs;
