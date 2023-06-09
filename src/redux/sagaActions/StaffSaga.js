import { call, put, takeLatest } from 'redux-saga/effects';
import * as SagaActionTypes from '../constants';
import { staffActions } from '../reducer/StaffReducer';
import { StaffService } from '~/services/api/StaffAPI';
import AlertCustom from '~/components/UI/Notification/Alert';
import Cookies from 'js-cookie';

function* actPostStaff(action) {
  try {
    const { newStaff } = action;

    const res = yield call(() => StaffService.postStaff(newStaff));
    if (res.status === 201) {
      AlertCustom({ type: 'success', title: 'Thêm nhân viên thành công' });
      yield put(staffActions.createStaffSucceeded());
    } else {
      AlertCustom({ type: 'error', title: 'Thêm nhân viên thất bại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err?.response?.data.message });
  }
}

function* actGetListStaffs() {
  try {
    yield put(staffActions.getStaffsLoading());
    const res = yield call(() => StaffService.getStaffsList());
    const { status, data } = res;
    if (status === 200) {
      yield put(staffActions.getStaffsSuccess({ staffs: data.staffs }));
    } else {
      console.log('Không lấy đc danh sách');
    }
  } catch (err) {
    console.log(err);
  }
}

function* actGetStaffById(action) {
  try {
    const { id } = action;
    yield put(staffActions.getStaffByIdInLoading());
    const res = yield call(() => StaffService.getStaffById(id));
    const { status, data } = res;
    if (status === 200) {
      yield put(staffActions.getStaffByIdSuccess({ staffById: data.staff }));
    } else {
      console.log('Không lấy đc nhân viên');
    }
  } catch (err) {
    console.log(err);
  }
}

function* actDeleteStaff(action) {
  try {
    const { staffId } = action;
    const res = yield call(() => StaffService.deleteStaff(staffId));
    const { status, data } = res;
    if (status === 200) {
      AlertCustom({
        type: 'success',
        title: data.message,
      });
      yield put({ type: SagaActionTypes.GET_STAFFS_SAGA });
    } else {
      AlertCustom({ type: 'error', title: 'Xóa loại nhân viên thất bại' });
    }
  } catch (err) {
    console.log(err);
  }
}

function* actPutStaff(action) {
  const { editStaff } = action;
  try {
    let res = yield call(() => StaffService.putStaff(editStaff));
    console.log(res);
    if (res.status === 200) {
      AlertCustom({
        type: 'success',
        title: 'Chỉnh sửa nhân viên thành công',
      });
    } else {
      AlertCustom({ type: 'error', title: 'Chỉnh sửa nhân viên thất bại' });
    }
    if (editStaff.staffId === Cookies.get('currentUser')) {
      yield put({ type: SagaActionTypes.GET_CURRENT_USER_SAGA });
    }
    yield put({ type: SagaActionTypes.GET_STAFF_BY_ID_SAGA, id: editStaff.staffId });
  } catch (err) {
    console.log(err);
    AlertCustom({ type: 'error', title: err.response.data });
    yield put({ type: SagaActionTypes.GET_STAFF_BY_ID_SAGA, id: editStaff.staffId });
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

export function* followActGetStaffById() {
  yield takeLatest(SagaActionTypes.GET_STAFF_BY_ID_SAGA, actGetStaffById);
}

export function* followActPutStaff() {
  yield takeLatest(SagaActionTypes.PUT_STAFF_SAGA, actPutStaff);
}
