import ImgCrop from 'antd-img-crop';

function CustomImgCrop({ children }) {
  return (
    <ImgCrop
      rotationSlider
      aspectSlider={true}
      quality={1}
      modalTitle="Chỉnh sửa hình ảnh"
      modalWidth={600}
      modalOk="Hoàn tất"
      modalCancel="Đóng"
    >
      {children}
    </ImgCrop>
  );
}

export default CustomImgCrop;
