import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  items: [],
};

const receiptSlice = createSlice({
  name: 'receiptSlice',
  initialState,
  reducers: {
    getReceiptsLoading: (state, action) => {
      state.loading = true;
    },
    getReceiptsSuccess: (state, action) => {
      state.loading = false;
      state.items = action.payload.receipts;
    },
  },
});

export const receiptActions = receiptSlice.actions;

export default receiptSlice.reducer;
