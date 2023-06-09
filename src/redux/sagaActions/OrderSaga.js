import { call, put, takeLatest } from 'redux-saga/effects';
import { orderActions } from '../reducer/OrderReducer';
import { OrderService } from '~/services/api/OrderAPI';
import AlertCustom from '~/components/UI/Notification/Alert';
import * as SagaActionTypes from '~/redux/constants/constant';

function* actGetOrders() {
  try {
    yield put(orderActions.getOrdersLoading());

    const res = yield call(() => OrderService.getOrders());
    const { status, data } = res;

    if (status === 200) {
      yield put(orderActions.getOrdersSuccess({ orders: data.orders }));
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    console.log(err);
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  }
}

function* actGetOrderById(action) {
  try {
    const { id } = action;
    yield put(orderActions.getOrderByIdInLoading());
    const res = yield call(() => OrderService.getOrderById(id));
    const { status, data } = res;
    if (status === 200) {
      yield put(orderActions.getOrderByIdSuccess({ orderById: data.order }));
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  }
}

export function* followActGetOrders() {
  yield takeLatest(SagaActionTypes.GET_ORDERS_SAGA, actGetOrders);
}

export function* followActGetOrderById() {
  yield takeLatest(SagaActionTypes.GET_ORDER_BY_ID_SAGA, actGetOrderById);
}
