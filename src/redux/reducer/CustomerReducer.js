import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  idLoading: false,
  customers: [],
  customerById: {
    account: '',
    role: '',
    name: '',
    address: [],
    email: '',
    phone: '',
    gender: '',
    birthday: '',
    status: '',
  },
};

const customerSlice = createSlice({
  name: 'customerSlice',
  initialState,
  reducers: {
    getCustomersInLoading: (state, action) => {
      state.loading = true;
    },
    getCustomersSuccess: (state, action) => {
      state.loading = false;
      state.customers = action.payload.customers;
    },
    getCustomerByIdInLoading: (state, action) => {
      state.idLoading = true;
    },
    getCustomerByIdSuccess: (state, action) => {
      state.customerById = action.payload.customerById;
      state.idLoading = false;
    },
  },
});

export const customerActions = customerSlice.actions;

export default customerSlice.reducer;
