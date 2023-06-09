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
        Upload
      </div>
    </div>
  );
}

export default UploadButton;
