import { call, put, takeLatest } from 'redux-saga/effects';

import * as SagaActionTypes from '../constants';
import AlertCustom from '~/components/UI/Notification/Alert';
import { getRevenue, getStatCardData } from '../reducer/DashboardReducer';
import { DashboardService } from '~/services/api/DashboardAPI';

function* actGetStatCardData(action) {
  try {
    const res = yield call(() => DashboardService.getStatCardData());
    const { status, data } = res;

    if (status === 200) {
      const { products, staffs, customers, orders } = data;
      yield put(getStatCardData({ products, staffs, customers, orders }));
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (error) {
    AlertCustom({ type: 'error', title: error.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  }
}

function* actGetRevenueSevenDaysAgo(action) {
  try {
    const { days } = action;
    const res = yield call(() => DashboardService.getRevenue(days));
    const { status, data } = res;

    if (status === 200) {
      yield put(getRevenue({ data: data.data }));
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

export function* followGetRevenueSevenDaysAgo() {
  yield takeLatest(SagaActionTypes.GET_REVENUE, actGetRevenueSevenDaysAgo);
}
