import { call, put, takeLatest } from 'redux-saga/effects';
import * as SagaActionTypes from '../constants/constant';
import { customerActions } from '../reducer/CustomerReducer';
import { CustomerService } from '~/services/api/CustomerAPI';
import AlertCustom from '~/components/UI/Notification/Alert';

function* actGetListCustomers() {
  try {
    yield put(customerActions.getCustomerByIdInLoading());
    const res = yield call(() => CustomerService.getCustomersList());
    const { status, data } = res;
    console.log(res);
    if (status === 200) {
      yield put(customerActions.getCustomersSuccess({ customers: data.customers }));
    } else {
      console.log('Không lấy đc danh sách');
    }
  } catch (err) {
    console.log(err);
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
      console.log('Không lấy đc nhân viên');
    }
  } catch (err) {
    console.log(err);
  }
}

export function* followActGetListCustomers() {
  yield takeLatest(SagaActionTypes.GET_CUSTOMERS_SAGA, actGetListCustomers);
}

export function* followActGetCustomerById() {
  yield takeLatest(SagaActionTypes.GET_CUSTOMER_BY_ID_SAGA, actGetCustomerById);
}
