import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  idLoading: false,
  editLoading: false,
  orders: [],
  orderById: {
    _id: -1,
  },
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
    getOrderByIdFail: (state, action) => {
      state.idLoading = false;
    },
    editOrderStatusInLoading: (state, action) => {
      state.editLoading = true;
    },
    editOrderStatus: (state, action) => {
      const { orderId, orderShippingStatus, orderPaymentStatus } = action.payload;
      const existingOrderIndex = state.orders.findIndex((order) => order._id.toString() === orderId.toString());
      state.orders[existingOrderIndex].shippingStatus = orderShippingStatus;
      state.orders[existingOrderIndex].paymentStatus = orderPaymentStatus;
    },
    editOrderStatusCompleted: (state, action) => {
      state.editLoading = false;
    },
  },
});

export const orderActions = orderSlice.actions;

export default orderSlice.reducer;
