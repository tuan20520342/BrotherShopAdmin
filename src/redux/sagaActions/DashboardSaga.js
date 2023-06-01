import { call, put, takeLatest } from 'redux-saga/effects';

import * as SagaActionTypes from '../constants';
import AlertCustom from '~/components/UI/Notification/Alert';
import { getStatCardDataLoading, getStatCardDataSuccess } from '../reducer/DashboardReducer';
import { DashboardService } from '~/services/api/DashboardAPI';

function* actGetStatCardData(action) {
  try {
    yield put(getStatCardDataLoading());

    const res = yield call(() => DashboardService.getStatCardData());
    const { status, data } = res;

    if (status === 200) {
      const { products, staffs, customers, orders } = data;
      yield put(getStatCardDataSuccess({ products, staffs, customers, orders }));
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (error) {
    AlertCustom({ type: 'error', title: error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  }
}

export function* followGetStatCardData() {
  yield takeLatest(SagaActionTypes.GET_STAT_CARD_DATA, actGetStatCardData);
}
