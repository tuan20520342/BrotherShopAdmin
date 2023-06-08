import { createSlice } from '@reduxjs/toolkit';
import { productStates } from '~/util/constants';

const initialState = {
  loading: false,
  idLoading: false,
  editLoading: null,
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
    editProductLoading: (state, action) => {
      state.editLoading = true;
    },
    editProductComplete: (state, action) => {
      state.editLoading = false;
    },
    addProduct: (state, action) => {
      const newProduct = action.payload.product;
      state.products.push(newProduct);
    },
    editProduct: (state, action) => {
      const { updatedProduct } = action.payload;
      const existingProductIndex = state.products.findIndex((product) => product._id === updatedProduct._id.toString());
      state.products[existingProductIndex] = updatedProduct;
    },
    deleteProduct: (state, action) => {
      const { productId } = action.payload;
      const existingProductIndex = state.products.findIndex((product) => product._id === productId);
      state.products[existingProductIndex].state = productStates.PAUSE;
    },
  },
});

export const productActions = productSlice.actions;

export default productSlice.reducer;
