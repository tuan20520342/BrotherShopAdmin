import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  isCreateReceiptSucceeded: false,
  idLoading: false,
  items: [],
  receiptById: {},
};

const receiptSlice = createSlice({
  name: 'receiptSlice',
  initialState,
  reducers: {
    getReceiptsLoading: (state, action) => {
      state.loading = true;
      state.isCreateReceiptSucceeded = false;
    },
    getReceiptsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload.receipts;
    },
    createReceiptSuccess: (state, action) => {
      state.isCreateReceiptSucceeded = true;
    },
    getReceiptByIdInLoading: (state, action) => {
      state.idLoading = true;
    },
    getReceiptByIdSuccess: (state, action) => {
      state.receiptById = action.payload.receiptById;
      state.idLoading = false;
    },
    addReceipt: (state, action) => {
      const { newReceipt } = action.payload;
      state.items.push(newReceipt);
    },
  },
});

export const receiptActions = receiptSlice.actions;

export default receiptSlice.reducer;
