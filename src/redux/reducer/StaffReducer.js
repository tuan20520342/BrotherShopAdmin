import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: false,
  idLoading: false,
  isCreateStaffSucceeded: false,
  staffs: [],
  staffById: {
    _id: -1,
  },
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
    getStaffByIdInLoading: (state, action) => {
      state.idLoading = true;
    },
    getStaffByIdSuccess: (state, action) => {
      state.staffById = action.payload.staffById;
      state.idLoading = false;
    },
    getStaffByIdFail: (state, action) => {
      state.idLoading = false;
    },
  },
});

export const staffActions = staffSlice.actions;

export default staffSlice.reducer;
