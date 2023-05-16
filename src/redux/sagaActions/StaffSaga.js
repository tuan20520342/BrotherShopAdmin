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
      //yield put(authActions.requestLogFailed());
      console.log('an l r');
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
    console.log(err);
  }
}

export function* followActPostStaff() {
  yield takeLatest(SagaActionTypes.POST_STAFF_SAGA, actPostStaff);
}

export function* followActGetListStaffs() {
  yield takeLatest(SagaActionTypes.GET_STAFFS_SAGA, actGetListStaffs);
}
