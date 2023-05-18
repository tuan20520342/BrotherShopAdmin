import { call, put, takeLatest } from 'redux-saga/effects';
import * as SagaActionTypes from '../constants/constant';
import { staffActions } from '../reducer/StaffReducer';
import { StaffService } from '~/services/api/StaffAPI';
import AlertCustom from '~/components/UI/Notification/Alert';

function* actPostStaff(action) {
  try {
    let { newStaff } = action;
    console.log(newStaff);
    let res = yield call(() => StaffService.postStaff(newStaff));
    console.log(res);
    if (res.status === 201) {
      AlertCustom({ type: 'success', title: 'Thêm nhân viên thành công' });
      yield put(staffActions.createStaffSucceeded());
    } else {
      AlertCustom({ type: 'error', title: 'Thêm nhân viên thất bại' });
    }
  } catch (err) {
    console.log(err);
    AlertCustom({ type: 'error', title: err.message });
  }
}

function* actGetListStaffs() {
  try {
    yield put(staffActions.getStaffsLoading());
    let res = yield call(() => StaffService.getStaffsList());
    let { status, data } = res;
    if (status === 200) {
      yield put(staffActions.getStaffsSuccess({ staffs: data.staffs }));
    } else {
      console.log('an l r');
    }
  } catch (err) {
    console.log(err);
  }
}

function* actDeleteStaff(action) {
  try {
    let { staffId } = action;
    let res = yield call(() => StaffService.deleteStaff(staffId));
    let { status, data } = res;
    if (status === 200) {
      AlertCustom({
        type: 'success',
        title: 'Xóa nhân viên thành công',
      });
      yield put({ type: SagaActionTypes.GET_STAFFS_SAGA });
    } else {
      AlertCustom({ type: 'error', title: 'Xóa loại nhân viên thất bại' });
    }
  } catch (err) {
    console.log(err);
  }
}

export function* followActPostStaff() {
  yield takeLatest(SagaActionTypes.POST_STAFF_SAGA, actPostStaff);
}

export function* followActGetListStaffs() {
  yield takeLatest(SagaActionTypes.GET_STAFFS_SAGA, actGetListStaffs);
}

export function* followActDeleteStaff() {
  yield takeLatest(SagaActionTypes.DELETE_STAFF_SAGA, actDeleteStaff);
}
