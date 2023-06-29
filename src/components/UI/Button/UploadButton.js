import { PlusOutlined } from '@ant-design/icons';

function UploadButton() {
  return (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Tải ảnh
      </div>
    </div>
  );
}

export default UploadButton;
