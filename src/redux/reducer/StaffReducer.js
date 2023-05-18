import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  isCreateStaffSucceeded: false,
  staffs: [],
};

const staffSlice = createSlice({
  name: 'staffSlice',
  initialState,
  reducers: {
    getStaffsLoading: (state, action) => {
      state.loading = true;
      state.isCreateStaffSucceeded = false;
    },
    getStaffsSuccess: (state, action) => {
      state.loading = false;
      state.staffs = action.payload.staffs;
    },
    createStaffSucceeded: (state, action) => {
      state.isCreateStaffSucceeded = true;
    },
  },
});

export const staffActions = staffSlice.actions;

export default staffSlice.reducer;
