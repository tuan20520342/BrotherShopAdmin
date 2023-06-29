import { call, put, takeLatest } from 'redux-saga/effects';
import * as SagaActionTypes from '../constants';
import AlertCustom from '~/components/UI/Notification/Alert';
import { StaffService } from '~/services/api/StaffAPI';
import { authenticationAction } from '../reducer/AuthReducer';
import Cookies from 'js-cookie';
import { AuthenticationService } from '~/services/api/AuthAPI';

function* actGetCurrentUser() {
  try {
    const id = Cookies.get('currentUser');
    yield put(authenticationAction.getCurrentUserInLoading());
    const res = yield call(() => StaffService.getStaffById(id));
    const { data, status } = res;
    if (status === 200) {
      const { staff } = data;
      yield put(authenticationAction.getCurrentUserSuccess({ currentUser: staff }));
    } else {
      AlertCustom({ type: 'error', title: 'Đã có lỗi' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: 'Đã có lỗi' });
  }
}

function* actPutCurrentUser(action) {
  const { editUser } = action;
  try {
    const res = yield call(() => StaffService.putStaff(editUser));

    if (res.status === 200) {
      AlertCustom({
        type: 'success',
        title: 'Chỉnh sửa thông tin thành công',
      });
    } else {
      AlertCustom({ type: 'error', title: 'Chỉnh sửa thông tin thất bại' });
    }
    yield put({ type: SagaActionTypes.GET_CURRENT_USER_SAGA });
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response.data });
    yield put({ type: SagaActionTypes.GET_CURRENT_USER_SAGA });
  }
}

function* actForgotPassword(action) {
  try {
    const { data } = action;
    const res = yield call(() => AuthenticationService.forgotPassword(data));

    if (res.status === 200) {
      AlertCustom({ type: 'success', title: res.data.message });
    } else {
      AlertCustom({ type: 'error', title: res.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  }
}

function* actResetPassword(action) {
  try {
    const { data } = action;
    const res = yield call(() => AuthenticationService.resetPassword(data));
    if (res.status === 201) {
      AlertCustom({ type: 'success', title: res.data.message });
    } else {
      AlertCustom({ type: 'error', title: res.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  }
}

export function* followGetCurrentUser() {
  yield takeLatest(SagaActionTypes.GET_CURRENT_USER_SAGA, actGetCurrentUser);
}
export function* followPutCurrentUser() {
  yield takeLatest(SagaActionTypes.PUT_CURRENT_USER_SAGA, actPutCurrentUser);
}
export function* followForgotPassword() {
  yield takeLatest(SagaActionTypes.FORGOT_PASSWORD_SAGA, actForgotPassword);
}

export function* followResetPassword() {
  yield takeLatest(SagaActionTypes.RESET_PASSWORD_SAGA, actResetPassword);
}
