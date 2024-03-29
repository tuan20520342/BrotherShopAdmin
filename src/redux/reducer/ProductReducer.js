import { createSlice } from '@reduxjs/toolkit';
import { productStates } from '~/util/constants';

const initialState = {
  loading: false,
  idLoading: false,
  editLoading: null,
  products: [],
  productId: {
    _id: -1,
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
    getProductByIdFail: (state, action) => {
      state.idLoading = false;
    },
    editProductLoading: (state, action) => {
      state.editLoading = true;
    },
    editProductComplete: (state, action) => {
      state.editLoading = false;
    },
    addProduct: (state, action) => {
      const newProduct = action.payload.product;
      const isExistingProduct =
        state.products.findIndex((product) => product._id.toString() === newProduct._id.toString()) !== -1;
      if (isExistingProduct) return;
      state.products.push(newProduct);
    },
    editProduct: (state, action) => {
      const { updatedProduct } = action.payload;
      const existingProductIndex = state.products.findIndex((product) => product._id === updatedProduct._id.toString());
      state.products[existingProductIndex] = updatedProduct;
    },
    stopSellingProduct: (state, action) => {
      const { productId } = action.payload;
      const existingProductIndex = state.products.findIndex((product) => product._id === productId);
      state.products[existingProductIndex].state = productStates.PAUSE;
    },
    resellProduct: (state, action) => {
      const { productId } = action.payload;
      const existingProductIndex = state.products.findIndex((product) => product._id === productId);
      state.products[existingProductIndex].state = productStates.ACTIVE;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
