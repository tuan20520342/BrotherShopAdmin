import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  title: '',
  visible: false,
  ComponentContent: <p>Nội dung mặc định</p>,
};

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.visible = true;
      state.title = action.payload.title;
      state.ComponentContent = action.payload.ComponentContent;
    },
    hideModal: (state, action) => {
      state.visible = false;
      state.title = '';
      state.ComponentContent = <p>Nội dung mặc định</p>;
    },
  },
});

export const modalActions = modalSlice.actions;

export default modalSlice.reducer;
