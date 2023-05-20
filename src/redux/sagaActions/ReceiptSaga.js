import { call, put, takeLatest } from 'redux-saga/effects';
import { receiptActions } from '../reducer/ReceiptReducer';
import { ReceiptService } from '~/services/api/ReceiptAPI';
import AlertCustom from '~/components/UI/Notification/Alert';
import * as SagaActionTypes from '~/redux/constants/constant';

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

function* actCreateReceipt(action) {
  try {
    const { newReceipt } = action;

    const res = yield call(() => ReceiptService.createReceipt(newReceipt));
    const { status, data } = res;

    if (status === 201) {
      AlertCustom({ type: 'success', title: data.message });
      yield put({ type: SagaActionTypes.GET_RECEIPTS_SAGA });
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  }
}

export function* followActGetReceipts() {
  yield takeLatest(SagaActionTypes.GET_RECEIPTS_SAGA, actGetReceipts);
}

export function* followActCreateReceipt() {
  yield takeLatest(SagaActionTypes.CREATE_RECEIPT_SAGA, actCreateReceipt);
}