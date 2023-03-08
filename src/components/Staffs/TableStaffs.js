import { Popconfirm, Space, Spin, Button } from 'antd';
import { DeleteFilled, EyeFilled } from '@ant-design/icons';
import { useState } from 'react';
import TableTemplate from '~/components/UI/Table/TableTemplate';

const TableStaffs = ({ keyWord, data, loading }) => {
  const [page, setPage] = useState(1);
  const renderRole = (role) => {
    if (role === 'MANAGER') {
      return 'Quản lý';
    } else {
      return 'Nhân viên bán hàng';
    }
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      width: '5%',
      key: '',
      render: (text, record, index) => (page - 1) * 6 + index + 1,
    },
    {
      title: 'Mã nhân viên',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
      filteredValue: [keyWord],
      onFilter: (value, record) => {
        return (
          String(record.id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.fullname).toLowerCase().includes(value.toLowerCase()) ||
          String(record.phoneNumber).toLowerCase().includes(value.toLowerCase()) ||
          String(record.email).toLowerCase().includes(value.toLowerCase()) ||
          String(renderRole(record.role)).toLowerCase().includes(value.toLowerCase())
        );
      },
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: 'Họ và tên',
      dataIndex: 'fullname',
      key: 'fullname',
      showOnResponse: true,
      showOnDesktop: true,
      sorter: (item1, item2) => item1.fullname.localeCompare(item2.fullname),
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
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
      dataIndex: 'role',
      key: 'role',
      showOnResponse: true,
      showOnDesktop: true,
      ellipsis: true,
      render: (role) => renderRole(role),
    },
    {
      title: 'Trạng thái tài khoản',
      dataIndex: 'active',
      key: 'active',
      showOnResponse: true,
      showOnDesktop: true,
      ellipsis: true,
      render: (active) => {
        if (active) {
          return 'Đang hoạt động';
        } else {
          return 'Tạm ngừng';
        }
      },
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
          {record.role === 'MANAGER' ? (
            <Button type="primary" icon={<DeleteFilled />} disabled></Button>
          ) : (
            // <button
            //   type="button"
            //   className="bg-slate-400 text-white font-bold py-3 px-3 rounded inline-flex items-center"
            //   disabled
            // >
            //   <DeleteFilled />
            // </button>
            <Popconfirm
              placement="top"
              title="Bạn có chắc muốn xóa nhân viên này?"
              okText="Xác nhận"
              cancelText="Hủy"
              // cancelButtonProps={{
              //   className: 'text-gray-400 border-gray-400 hover:text-gray-500 hover:border-gray-500',
              // }}
              onConfirm={() => handleRemoveStaff(record)}
            >
              <Button type="primary" icon={<DeleteFilled />} danger></Button>
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  const handleRemoveStaff = (record) => {};

  const handleEditStaff = (staff) => {};
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

export default TableStaffs;
