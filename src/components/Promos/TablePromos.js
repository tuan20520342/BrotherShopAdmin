import { Space, Button, Popconfirm } from 'antd';
import dayjs from 'dayjs';
import { EyeFilled, DeleteFilled } from '@ant-design/icons';
import TableTemplate from '~/components/UI/Table/TableTemplate';
import LoadingSpin from '../UI/LoadingSpin/LoadingSpin';
import { useDispatch } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants';
import { modalActions } from '~/redux/reducer/ModalReducer';
import AddPromoForm from './AddPromoForm';

const TablePromos = ({ keyWord, data, loading }) => {
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
      title: 'Mã khuyến mãi',
      dataIndex: '_id',
      key: '_id',
      align: 'center',
      sorter: (item1, item2) => item1._id.localeCompare(item2._id),
      filteredValue: [keyWord],
      onFilter: (value, record) => {
        return (
          String(record._id).toLowerCase().includes(value.toLowerCase()) ||
          String(record.name).toLowerCase().includes(value.toLowerCase()) ||
          String(record.percentage).toLowerCase().includes(value.toLowerCase()) ||
          String(record.amount).toLowerCase().includes(value.toLowerCase()) ||
          String(record.minPrice).toLowerCase().includes(value.toLowerCase()) ||
          String(dayjs(record.startDate).format('HH:mm DD-MM-YYYY')).toLowerCase().includes(value.toLowerCase()) ||
          String(dayjs(record.endDate).format('HH:mm DD-MM-YYYY')).toLowerCase().includes(value.toLowerCase())
        );
      },
      ellipsis: true,
      render: (id) => id.slice(0, 8).toUpperCase(),
    },
    {
      title: 'Tên chương trình',
      dataIndex: 'name',
      key: 'name',
      ellipsis: true,
    },
    {
      title: 'Phần trăm ưu đãi',
      dataIndex: 'percentage',
      key: 'percentage',
      align: 'center',
      ellipsis: true,
      render: (percentage) => `${percentage}%`,
      sorter: (a, b) => a.percentage > b.percentage,
    },
    {
      title: 'Ngày bắt đầu',
      dataIndex: 'startDate',
      key: 'startDate',
      align: 'center',
      ellipsis: true,
      sorter: (a, b) => dayjs(a.startDate).unix() - dayjs(b.startDate).unix(),
      render: (date) => `${dayjs(date).format('HH:mm DD-MM-YYYY')}`,
    },
    {
      title: 'Ngày kết thúc',
      dataIndex: 'endDate',
      key: 'endDate',
      align: 'center',
      ellipsis: true,
      sorter: (a, b) => dayjs(a.endDate).unix() - dayjs(b.endDate).unix(),
      render: (date) => `${dayjs(date).format('HH:mm DD-MM-YYYY')}`,
    },
    {
      title: <div style={{ textAlign: 'center' }}>Số lượng</div>,
      dataIndex: 'amount',
      key: 'amount',
      align: 'center',
      ellipsis: true,
      sorter: (a, b) => a.amount > b.amount,
      render: (amount) => amount.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ','),
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tối thiểu</div>,
      dataIndex: 'minPrice',
      key: 'minPrice',
      align: 'end',
      ellipsis: true,
      sorter: (a, b) => a.minPrice > b.minPrice,
      render: (minPrice) => `${minPrice.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',')}đ`,
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      id: 'action',
      ellipsis: true,
      width: '10%',
      fixed: 'right',

      render: (text, record, index) => (
        <Space size="middle" key={index}>
          <Button type="primary" icon={<EyeFilled />} onClick={() => handleEditPromo(record)} />
          <Popconfirm
            placement="top"
            title="Bạn có chắc muốn xóa khuyến mãi này?"
            okText="Xác nhận"
            cancelText="Hủy"
            onConfirm={() => handleRemovePromo(record)}
          >
            <Button type="primary" icon={<DeleteFilled />} danger />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const handleEditPromo = (promo) => {
    dispatch(
      modalActions.showModal({
        title: 'Thêm khuyến mãi',
        ComponentContent: <AddPromoForm promo={promo} />,
      }),
    );
  };

  const handleRemovePromo = (promo) => {
    dispatch({ type: SagaActionTypes.DELETE_PROMO_SAGA, promoId: promo._id });
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

export default TablePromos;
