import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  promos: [],
  promoById: {},
};

const promotionSlice = createSlice({
  name: 'promotionSlice',
  initialState,
  reducers: {
    getPromosLoading: (state, action) => {
      state.loading = true;
    },
    getPromosSuccess: (state, action) => {
      state.loading = false;
      state.promos = action.payload.promos;
    },
  },
});

export const promotionActions = promotionSlice.actions;

export default promotionSlice.reducer;
