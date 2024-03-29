import { call, put, takeLatest } from 'redux-saga/effects';
import { receiptActions } from '../reducer/ReceiptReducer';
import { ReceiptService } from '~/services/api/ReceiptAPI';
import AlertCustom from '~/components/UI/Notification/Alert';
import * as SagaActionTypes from '~/redux/constants';

function* actGetReceipts() {
  try {
    yield put(receiptActions.getReceiptsLoading());

    const res = yield call(() => ReceiptService.getReceipts());
    const { status, data } = res;

    if (status === 200) {
      yield put(receiptActions.getReceiptsSuccess({ receipts: data.receipts }));
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  }
}

function* actGetReceiptById(action) {
  try {
    const { id } = action;
    yield put(receiptActions.getReceiptByIdInLoading());
    const res = yield call(() => ReceiptService.getReceiptById(id));
    const { status, data } = res;
    if (status === 200) {
      yield put(receiptActions.getReceiptByIdSuccess({ receiptById: data.receipt }));
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
      yield put(receiptActions.getReceiptByIdFail());
    }
  } catch (err) {
    yield put(receiptActions.getReceiptByIdFail());
  }
}

function* actCreateReceipt(action) {
  const { newReceipt, callback } = action;
  try {
    const res = yield call(() => ReceiptService.createReceipt(newReceipt));
    const { status, data } = res;

    if (status === 201) {
      AlertCustom({ type: 'success', title: data.message });
      yield put(receiptActions.createReceiptSuccess());
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  } finally {
    callback();
  }
}

function* actUpdateReceipt(action) {
  const { updateReceipt, callback } = action;
  try {
    const res = yield call(() => ReceiptService.updateReceipt(updateReceipt));

    const { status, data } = res;
    if (status === 200) {
      AlertCustom({ type: 'success', title: data.message });
      yield put({ type: SagaActionTypes.GET_RECEIPT_BY_ID_SAGA, id: updateReceipt.receiptId });
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  } finally {
    callback();
  }
}

export function* followActGetReceipts() {
  yield takeLatest(SagaActionTypes.GET_RECEIPTS_SAGA, actGetReceipts);
}

export function* followActCreateReceipt() {
  yield takeLatest(SagaActionTypes.CREATE_RECEIPT_SAGA, actCreateReceipt);
}

export function* followActGetReceiptById() {
  yield takeLatest(SagaActionTypes.GET_RECEIPT_BY_ID_SAGA, actGetReceiptById);
}

export function* followActUpdateReceipt() {
  yield takeLatest(SagaActionTypes.UPDATE_RECEIPT_SAGA, actUpdateReceipt);
}
