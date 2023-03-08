import { Table } from 'antd';
import './TableTemplate.css';

const TableTemplate = (props) => {
  return (
    <Table
      pagination={props.pagination}
      locale={{
        triggerDesc: 'Nhấp để sắp xếp giảm dần',
        triggerAsc: 'Nhấp để sắp xếp tăng dần',
        cancelSort: 'Trở về mặc định',
      }}
      rowKey={props.rowKey}
      className="table-striped-rows"
      // size="middle"
      columns={props.columns}
      dataSource={props.dataSource}
      // onChange={handleChange}
      scroll={{ x: 'max-content' }}
      summary={props.summary}
    />
  );
};

export default TableTemplate;
