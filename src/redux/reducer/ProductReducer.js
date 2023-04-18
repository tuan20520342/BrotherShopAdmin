import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  products: [],
};

const productSlice = createSlice({
  name: 'productSlice',
  initialState,
  reducers: {
    getProductsLoading: (state, action) => {
      state.loading = true;
    },
    getProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
