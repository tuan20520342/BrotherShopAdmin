import { call, put, takeLatest } from 'redux-saga/effects';
import { orderActions } from '../reducer/OrderReducer';
import { OrderService } from '~/services/api/OrderAPI';
import AlertCustom from '~/components/UI/Notification/Alert';
import * as SagaActionTypes from '~/redux/constants';

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
      yield put(orderActions.getOrderByIdFail());
    }
  } catch (err) {
    yield put(orderActions.getOrderByIdFail());
  }
}

function* actUpdateOrderStatus(action) {
  try {
    const { orderId, shippingStatus, paymentStatus } = action;

    yield put(orderActions.editOrderStatusInLoading());
    const res = yield call(() => OrderService.updateOrderStatus(orderId, shippingStatus, paymentStatus));
    const { status, data } = res;

    if (status === 200) {
      yield put(orderActions.editOrderStatusCompleted());
      AlertCustom({ type: 'success', title: data.message });
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại zzz' });
    }
  } catch (error) {
    AlertCustom({ type: 'error', title: error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  } finally {
    yield put(orderActions.editOrderStatusCompleted());
  }
}

export function* followActGetOrders() {
  yield takeLatest(SagaActionTypes.GET_ORDERS_SAGA, actGetOrders);
}

export function* followActGetOrderById() {
  yield takeLatest(SagaActionTypes.GET_ORDER_BY_ID_SAGA, actGetOrderById);
}

export function* followActUpdateOrderStatus() {
  yield takeLatest(SagaActionTypes.UPDATE_ORDER_STATUS, actUpdateOrderStatus);
}
