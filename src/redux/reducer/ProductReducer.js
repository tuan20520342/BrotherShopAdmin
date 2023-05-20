import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  idLoading: false,
  products: [],
  productId: {
    name: '',
    category: '',
    price: 0,
    oldPrice: 0,
    description: '',
    images: {},
    sizes: [],
    totalSold: 0,
  },
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
    getProductByIdInLoading: (state, action) => {
      state.idLoading = true;
    },
    getProductByIdSuccess: (state, action) => {
      state.productId = action.payload.productId;
      state.idLoading = false;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
