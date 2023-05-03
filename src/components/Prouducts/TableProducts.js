import { Popconfirm, Space, Spin, Button, Tag, Image } from 'antd';
import dayjs from 'dayjs';
import { DeleteFilled, EyeFilled } from '@ant-design/icons';
import { useState } from 'react';
import TableTemplate from '~/components/UI/Table/TableTemplate';
import { useDispatch } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants/constant';
import { useNavigate } from 'react-router-dom';
import LoadingSpin from '~/components/UI/LoadingSpin/LoadingSpin';

const TableProducts = ({ keyWord, data, loading }) => {
  const [page, setPage] = useState(1);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const columns = [
    {
      title: 'STT',
      dataIndex: '',
      width: '5%',
      key: '',
      render: (text, record, index) => (page - 1) * 4 + index + 1,
      align: 'center',
    },
    {
      title: 'Hình ảnh',
      dataIndex: ['images', 'mainImg'],
      key: 'image',
      align: 'center',
      showOnResponse: true,
      showOnDesktop: true,
      render: (image) => <Image width={80} src={`https://res.cloudinary.com/ddajkcbs2/image/upload/${image}`} />,
    },
    {
      title: 'Mã sản phẩm',
      dataIndex: '_id',
      key: '_id',
      align: 'center',
      sorter: (item1, item2) => item1._id.localeCompare(item2._id),
      filteredValue: [keyWord],
      onFilter: (value, record) => {
        return (
          String(record._id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.oldPrice).toLowerCase().includes(value.toLowerCase()) ||
          String(record.price).toLowerCase().includes(value.toLowerCase()) ||
          String(record.sizes.reduce((acc, size) => acc + size.quantity, 0))
            .toLowerCase()
            .includes(value.toLowerCase())
          // record.state.find((item) => item.stateName.toLowerCase().includes(value.toLowerCase())) ||
          // String(dayjs(record.EXP).format('DD/MM/YYYY')).toLowerCase().includes(value.toLowerCase()) ||
          // String(dayjs(record.MFG).format('DD/MM/YYYY')).toLowerCase().includes(value.toLowerCase())
        );
      },
      showOnResponse: true,
      showOnDesktop: true,
      render: (id) => id.substring(0, 6),
    },
    {
      title: 'Tên sản phẩm',
      dataIndex: 'name',
      key: 'name',
      showOnResponse: true,
      showOnDesktop: true,
    },
    {
      title: 'Giá cũ',
      dataIndex: 'oldPrice',
      key: 'oldPrice',
      showOnResponse: true,
      showOnDesktop: true,
      sorter: (a, b) => a.oldPrice - b.oldPrice,
      render: (oldPrice) => (
        <div>
          {oldPrice?.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
          <sup>{oldPrice && ` đ`}</sup>
        </div>
      ),
    },
    {
      title: 'Giá bán',
      dataIndex: 'price',
      key: 'price',
      showOnResponse: true,
      showOnDesktop: true,
      ellipsis: true,
      sorter: (a, b) => a.price - b.price,
      render: (price) => (
        <div>
          {price.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}
          <sup> đ</sup>
        </div>
      ),
    },
    {
      title: 'Số lượng',
      dataIndex: 'sizes',
      key: 'sizes',
      showOnResponse: true,
      showOnDesktop: true,
      ellipsis: true,
      sorter: (a, b) =>
        a.sizes.reduce((acc, size) => acc + size.quantity, 0) - b.sizes.reduce((acc, size) => acc + size.quantity, 0),
      render: (sizes) => {
        const quantity = sizes.reduce((acc, size) => acc + size.quantity, 0);
        return <div>{quantity.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}</div>;
      },
    },

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

  const handleEditProduct = (product) => {
    // dispatch({ type: SagaActionTypes.GET_PRODUCT_BY_ID_SAGA, id: product._id });
    navigate(`/products/${product._id}`);
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
          defaultPageSize: 4,
          showSizeChanger: false,
          pageSizeOptions: ['4'],
        }}
        rowKey={'_id'}
      />
      {/* <ModalForm isModalOpen={isOpen} /> */}
    </>
  );
};

export default TableProducts;
