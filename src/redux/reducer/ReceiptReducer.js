import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  isCreateReceiptSucceeded: false,
  items: [],
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
  },
});

export const receiptActions = receiptSlice.actions;

export default receiptSlice.reducer;
