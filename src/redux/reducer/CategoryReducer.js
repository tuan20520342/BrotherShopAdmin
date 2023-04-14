import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  categories: [],
};

const categorySlice = createSlice({
  name: 'categoriesSlice',
  initialState,
  reducers: {
    getCategoriesLoading: (state, action) => {
      state.loading = true;
    },
    getCategoriesSuccess: (state, action) => {
      state.loading = false;
      state.categories = action.payload.categories;
    },
  },
});

export const categoryActions = categorySlice.actions;

export default categorySlice.reducer;
