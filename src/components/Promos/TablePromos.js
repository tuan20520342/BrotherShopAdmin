import { Space, Button, Popconfirm, Tag } from 'antd';
import dayjs from 'dayjs';
import { EyeFilled, DeleteFilled, UndoOutlined } from '@ant-design/icons';
import TableTemplate from '~/components/UI/Table/TableTemplate';
import LoadingSpin from '../UI/LoadingSpin/LoadingSpin';
import { useDispatch } from 'react-redux';
import * as SagaActionTypes from '~/redux/constants';
import { modalActions } from '~/redux/reducer/ModalReducer';
import AddPromoForm from './AddPromoForm';
import { printNumberWithCommas } from '~/util/shared';

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
      render: (amount) => printNumberWithCommas(amount),
    },
    {
      title: <div style={{ textAlign: 'center' }}>Tối thiểu</div>,
      dataIndex: 'minPrice',
      key: 'minPrice',
      align: 'end',
      ellipsis: true,
      sorter: (a, b) => a.minPrice > b.minPrice,
      render: (minPrice) => `${printNumberWithCommas(minPrice)} đ`,
    },
    {
      title: 'Tình trạng',
      dataIndex: 'expired',
      key: 'expired',
      align: 'center',
      ellipsis: true,
      render: (expired) => {
        if (expired) {
          return <Tag color={'red'}>Ngừng sử dụng</Tag>;
        } else return <Tag color={'green'}>Đang áp dụng</Tag>;
      },
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
          {record.expired ? (
            <Popconfirm
              placement="top"
              title="Bạn muốn khôi phục khuyến mãi này?"
              okText="Xác nhận"
              cancelText="Hủy"
              onConfirm={() => handleRestorePromotion(record._id)}
            >
              <Button type="default" icon={<UndoOutlined />} />
            </Popconfirm>
          ) : (
            <Popconfirm
              placement="top"
              title="Bạn có chắc muốn xóa khuyến mãi này?"
              okText="Xác nhận"
              cancelText="Hủy"
              onConfirm={() => handleRemovePromo(record)}
            >
              <Button type="primary" icon={<DeleteFilled />} danger />
            </Popconfirm>
          )}
        </Space>
      ),
    },
  ];

  const handleEditPromo = (promo) => {
    dispatch(
      modalActions.showModal({
        title: 'Chi tiết khuyến mãi',
        ComponentContent: <AddPromoForm promo={promo} />,
      }),
    );
  };

  const handleRemovePromo = (promo) => {
    dispatch({ type: SagaActionTypes.DELETE_PROMO_SAGA, promoId: promo._id });
  };

  const handleRestorePromotion = (promotionId) => {
    dispatch({ type: SagaActionTypes.RESTORE_PROMO_SAGA, promoId: promotionId });
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
