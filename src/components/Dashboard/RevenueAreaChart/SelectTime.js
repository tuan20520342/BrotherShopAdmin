import { PlusOutlined } from '@ant-design/icons';
import { Button, Divider, Input, Select, Space } from 'antd';
import { useRef, useState } from 'react';

function SelectTime({ onTimeChange }) {
  const [items, setItems] = useState([
    {
      label: '7 ngày qua',
      value: '7',
    },
    {
      label: '1 tháng qua',
      value: '30',
    },
    {
      label: '6 tháng qua',
      value: '180',
    },
    {
      label: '1 năm qua',
      value: '365',
    },
  ]);
  const [name, setName] = useState('');
  const inputRef = useRef(null);

  const onNameChange = (event) => {
    setName(event.target.value);
  };

  const addItem = (e) => {
    if (name.trim() === '') {
      return;
    }

    e.preventDefault();
    setItems([...items, { label: `${name} năm qua`, value: parseFloat(name) * 365 }]);
    setName('');

    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  const handleChangeTime = (value) => {
    onTimeChange(value);
  };

  return (
    <Select
      style={{
        width: 300,
      }}
      placeholder="Chọn khoảng thời gian"
      dropdownRender={(menu) => (
        <>
          {menu}
          <Divider
            style={{
              margin: '8px 0',
            }}
          />
          <Space
            style={{
              padding: '0 8px 4px',
            }}
          >
            <Input
              placeholder="Nhập số năm"
              type="number"
              ref={inputRef}
              value={name}
              onChange={onNameChange}
              required
            />
            <Button type="text" icon={<PlusOutlined />} onClick={addItem}>
              Thêm thời gian
            </Button>
          </Space>
        </>
      )}
      options={items}
      defaultValue={items[0]}
      onChange={handleChangeTime}
    />
  );
}

export default SelectTime;
