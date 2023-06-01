import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  statCardData: {
    products: 0,
    staffs: 0,
    customers: 0,
    orders: 0,
  },
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    getStatCardDataLoading: (state, action) => {
      state.loading = true;
    },
    getStatCardDataSuccess: (state, action) => {
      const { products, staffs, customers, orders } = action.payload;

      state.loading = false;
      state.statCardData.products = products;
      state.statCardData.staffs = staffs;
      state.statCardData.customers = customers;
      state.statCardData.orders = orders;
    },
  },
});

export const { getStatCardDataLoading, getStatCardDataSuccess } = dashboardSlice.actions;

export const selectStatCardData = (state) => state.dashboardSlice.statCardData;

export default dashboardSlice.reducer;
