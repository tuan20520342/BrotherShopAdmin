import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  staffs: [],
};

const staffSlice = createSlice({
  name: 'staffSlice',
  initialState,
  reducers: {
    getStaffsLoading: (state, action) => {
      state.loading = true;
    },
    getStaffsSuccess: (state, action) => {
      state.loading = false;
      state.staffs = action.payload.staffs;
    },
  },
});

export const staffActions = staffSlice.actions;

export default staffSlice.reducer;
