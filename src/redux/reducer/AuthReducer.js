import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLogin: false,
  currentUser: {},
};

const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    logIn: (state, action) => {
      state.isLogin = true;
      state.currentUser = action.payload.currentUser;
    },
    logOut: (state, action) => {
      state.isLogin = false;
      state.currentUser = {};
    },
  },
});

export const authenticationAction = authenticationSlice.actions;

export default authenticationSlice.reducer;
