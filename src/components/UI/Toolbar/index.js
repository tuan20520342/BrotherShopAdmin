import { Button, Col, Row } from 'antd';
import Search from 'antd/lib/input/Search';
import { PlusOutlined } from '@ant-design/icons';

const Toolbar = ({ title, handleAdd, setKeyWord, buttonDisability }) => {
  return (
    <Row style={{ display: 'flex', flexWrap: 'wrap-reverse' }} gutter={8} justify="end">
      <Col style={{ marginBottom: '4px' }}>
        <Search
          name="search"
          placeholder="Tìm kiếm..."
          allowClear
          onChange={(e) => {
            setKeyWord(e.target.value);
          }}
        />
      </Col>
      <Col style={{ marginBottom: '4px' }}>
        <Button type="primary" onClick={handleAdd} icon={<PlusOutlined />} disabled={buttonDisability ?? false}>
          {title}
        </Button>
      </Col>
    </Row>
  );
};

export default Toolbar;
