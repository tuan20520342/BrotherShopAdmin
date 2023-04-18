import { Popconfirm, Space, Spin, Button, Tag } from 'antd';
import dayjs from 'dayjs';
import { DeleteFilled, EyeFilled } from '@ant-design/icons';
import { useState } from 'react';
import TableTemplate from '~/components/UI/Table/TableTemplate';

const TableProducts = ({ keyWord, data, loading }) => {
  const [page, setPage] = useState(1);

  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      width: '5%',
      key: '',
      render: (text, record, index) => (page - 1) * 6 + index + 1,
    },
    // {
    //   title: 'Hình ảnh',
    //   dataIndex: 'image',
    //   key: 'image',
    //   showOnResponse: true,
    //   showOnDesktop: true,
    // },
    {
      title: 'Mã sản phẩm',
      dataIndex: '_id',
      key: 'id',
      sorter: (item1, item2) => item1._id.localeCompare(item2._id),
      filteredValue: [keyWord],
      onFilter: (value, record) => {
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
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      showOnResponse: true,
      showOnDesktop: true,
    },
    // {
    //   title: 'Giá cũ',
    //   dataIndex: 'oldPrice',
    //   key: 'oldPrice',
    //   showOnResponse: true,
    //   showOnDesktop: true,
    //   sorter: (a, b) => a.cost - b.cost,
    //   render: (text, record, index) => {
    //     return (
    //       <div>
    //         {record.cost.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
    //         <sup>đ</sup>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: 'Giá bán',
    //   dataIndex: 'price',
    //   key: 'price',
    //   showOnResponse: true,
    //   showOnDesktop: true,
    //   ellipsis: true,
    //   sorter: (a, b) => a.price - b.price,
    //   render: (text, record, index) => {
    //     return (
    //       <div>
    //         {record.price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
    //         <sup>đ</sup>
    //       </div>
    //     );
    //   },
    // },
    // {
    //   title: 'Số lượng',
    //   dataIndex: 'quantity',
    //   key: 'quantity',
    //   showOnResponse: true,
    //   showOnDesktop: true,
    //   ellipsis: true,
    //   sorter: (a, b) => a.quantity - b.quantity,
    //   render: (text, record, index) => {
    //     return <div>{record.quantity.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</div>;
    //   },
    // },

    // {
    //   title: 'Trạng thái',
    //   dataIndex: 'state',
    //   key: 'state',
    //   showOnResponse: true,
    //   showOnDesktop: true,
    //   ellipsis: true,
    //   render: (state) => (
    //     <>
    //       {state.map((item) => (
    //         <Tag color={item.color} key={item.stateName}>
    //           {item.stateName}
    //         </Tag>
    //       ))}
    //     </>
    //   ),
    // },
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
          <Button type="primary" icon={<EyeFilled />} onClick={() => handleEditProduct(record)}></Button>
          <Popconfirm
            placement="top"
            title="Bạn có chắc muốn xóa sản phẩm này?"
            okText="Xác nhận"
            cancelText="Hủy"
            // cancelButtonProps={{
            //   className: 'text-gray-400 border-gray-400 hover:text-gray-500 hover:border-gray-500',
            // }}
            onConfirm={() => handleRemoveProduct(record)}
          >
            <Button type="primary" icon={<DeleteFilled />} danger></Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleRemoveProduct = (record) => {};

  const handleEditProduct = (staff) => {};
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

export default TableProducts;
