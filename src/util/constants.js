/* eslint-disable no-template-curly-in-string */
export const validateMessages = {
  required: 'Cần nhập ${label}!',
  types: {
    email: '${label} không hợp lệ!',
    number: '',
  },
  number: {
    min: '${label} phải ít nhất từ ${min} trở lên',
    range: '${label} phải trong khoảng từ ${min} đến ${max}',
  },
};

export const productStates = {
  ACTIVE: 'Đang bán',
  PAUSE: 'Ngừng bán',
  OUT_OF_STOCK: 'Hết hàng',
};