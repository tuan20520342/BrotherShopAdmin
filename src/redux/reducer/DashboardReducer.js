import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  statCardData: {
    products: 0,
    staffs: 0,
    customers: 0,
    orders: 0,
  },
  revenue: [],
};

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    getStatCardData: (state, action) => {
      const { products, staffs, customers, orders } = action.payload;

      state.statCardData.products = products;
      state.statCardData.staffs = staffs;
      state.statCardData.customers = customers;
      state.statCardData.orders = orders;
    },
    getRevenue: (state, action) => {
      const { data } = action.payload;
      state.revenue = data;
    },
  },
});

export const { getStatCardData, getRevenue } = dashboardSlice.actions;

export const selectStatCardData = (state) => state.dashboardSlice.statCardData;
export const selectRevenueSevenDaysAgo = (state) => state.dashboardSlice.revenue;

export default dashboardSlice.reducer;
