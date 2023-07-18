import { call, put, takeLatest } from 'redux-saga/effects';
import * as SagaActionTypes from '../constants';
import { customerActions } from '../reducer/CustomerReducer';
import { CustomerService } from '~/services/api/CustomerAPI';
import AlertCustom from '~/components/UI/Notification/Alert';

function* actGetListCustomers() {
  try {
    yield put(customerActions.getCustomersInLoading());
    const res = yield call(() => CustomerService.getCustomersList());
    const { status, data } = res;

    if (status === 200) {
      yield put(customerActions.getCustomersSuccess({ customers: data.customers }));
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  }
}

function* actGetCustomerById(action) {
  try {
    const { id } = action;
    yield put(customerActions.getCustomerByIdInLoading());
    const res = yield call(() => CustomerService.getCustomerById(id));
    const { status, data } = res;
    if (status === 200) {
      yield put(customerActions.getCustomerByIdSuccess({ customerById: data.customer }));
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
      yield put(customerActions.getCustomerByIdFail());
    }
  } catch (err) {
    yield put(customerActions.getCustomerByIdFail());
  }
}

export function* followActGetListCustomers() {
  yield takeLatest(SagaActionTypes.GET_CUSTOMERS_SAGA, actGetListCustomers);
}

export function* followActGetCustomerById() {
  yield takeLatest(SagaActionTypes.GET_CUSTOMER_BY_ID_SAGA, actGetCustomerById);
}
