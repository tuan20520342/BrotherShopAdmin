import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  idLoading: false,
  orders: [],
  orderById: {},
};

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState,
  reducers: {
    getOrdersLoading: (state, action) => {
      state.loading = true;
    },
    getOrdersSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload.orders;
    },
    getOrderByIdInLoading: (state, action) => {
      state.idLoading = true;
    },
    getOrderByIdSuccess: (state, action) => {
      state.orderById = action.payload.orderById;
      state.idLoading = false;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
