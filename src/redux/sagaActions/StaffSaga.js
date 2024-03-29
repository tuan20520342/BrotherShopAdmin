import { call, put, takeLatest } from 'redux-saga/effects';
import * as SagaActionTypes from '../constants';
import { staffActions } from '../reducer/StaffReducer';
import { StaffService } from '~/services/api/StaffAPI';
import AlertCustom from '~/components/UI/Notification/Alert';
import Cookies from 'js-cookie';

function* actPostStaff(action) {
  const { newStaff, onEditLoading } = action;
  try {
    const res = yield call(() => StaffService.postStaff(newStaff));
    const { status, data } = res;
    if (status === 201) {
      AlertCustom({ type: 'success', title: data.message });
      yield put(staffActions.createStaffSucceeded());
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  } finally {
    onEditLoading();
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
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
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
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
      yield put(staffActions.getStaffByIdFail());
    }
  } catch (err) {
    yield put(staffActions.getStaffByIdFail());
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
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  }
}

function* actPutStaff(action) {
  const { editStaff, onEditLoading } = action;
  try {
    const res = yield call(() => StaffService.putStaff(editStaff));
    const { status, data } = res;

    if (status === 200) {
      AlertCustom({
        type: 'success',
        title: data.message,
      });
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
    if (editStaff.staffId === Cookies.get('currentUser')) {
      yield put({ type: SagaActionTypes.GET_CURRENT_USER_SAGA });
    }
    yield put({ type: SagaActionTypes.GET_STAFF_BY_ID_SAGA, id: editStaff.staffId });
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    yield put({ type: SagaActionTypes.GET_STAFF_BY_ID_SAGA, id: editStaff.staffId });
  } finally {
    onEditLoading();
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
