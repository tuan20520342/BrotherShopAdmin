import { call, put, takeLatest } from 'redux-saga/effects';
import * as SagaActionTypes from '../constants/constant';
import AlertCustom from '~/components/UI/Notification/Alert';
import { AuthenticationService } from '~/services/api/AuthAPI';
import { authenticationAction } from '../reducer/AuthReducer';
import Cookies from 'js-cookie';

function* actLogin(action) {
  try {
    let { user } = action;

    let res = yield call(() => AuthenticationService.postLogin(user));

    let { data, status } = res;

    if (status === 200) {
      let { token, staff } = data;

      const remainingMilliseconds = 60 * 60 * 1000;
      const expiryDate = new Date(new Date().getTime() + remainingMilliseconds);
      Cookies.set('token', token, { expires: expiryDate });
      yield put(authenticationAction.logIn({ currentUser: staff }));
    } else {
      AlertCustom({ type: 'error', title: 'Sai email hoặc password, vui lòng kiểm tra lại!' });
    }
  } catch (err) {
    console.log(err);

    AlertCustom({ type: 'error', title: 'Sai email hoặc password, vui lòng kiểm tra lại!' });
  }
}

export function* followActLogin() {
  yield takeLatest(SagaActionTypes.POST_LOGIN_SAGA, actLogin);
}
