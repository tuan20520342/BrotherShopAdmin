import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  currentUser: {},
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    getCurrentUserInLoading: (state, action) => {
      state.loading = true;
    },
    getCurrentUserSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload.currentUser;
    },
  },
});

export const authenticationAction = authenticationSlice.actions;

export default authenticationSlice.reducer;
