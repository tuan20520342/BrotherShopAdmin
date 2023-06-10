import { call, put, takeLatest } from 'redux-saga/effects';
import * as SagaActionTypes from '../constants/constant';
import AlertCustom from '~/components/UI/Notification/Alert';
import { StaffService } from '~/services/api/StaffAPI';
import { authenticationAction } from '../reducer/AuthReducer';
import Cookies from 'js-cookie';

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
    console.log(err);
    AlertCustom({ type: 'error', title: 'Đã có lỗi' });
  }
}

function* actPutCurrentUser(action) {
  const { editUser } = action;
  try {
    let res = yield call(() => StaffService.putStaff(editUser));
    console.log(res);
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
    console.log(err);
    AlertCustom({ type: 'error', title: err.response.data });
    yield put({ type: SagaActionTypes.GET_CURRENT_USER_SAGA });
  }
}

export function* followGetCurrentUser() {
  yield takeLatest(SagaActionTypes.GET_CURRENT_USER_SAGA, actGetCurrentUser);
}
export function* followPutCurrentUser() {
  yield takeLatest(SagaActionTypes.PUT_CURRENT_USER_SAGA, actPutCurrentUser);
}
