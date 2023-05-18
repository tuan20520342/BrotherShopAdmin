import { call, put, takeLatest } from 'redux-saga/effects';
import * as SagaActionTypes from '../constants/constant';
import { categoryActions } from '../reducer/CategoryReducer';
import { modalActions } from '../reducer/ModalReducer';
import { CategoryService } from '~/services/api/CategoryAPI';
import AlertCustom from '~/components/UI/Notification/Alert';

function* actGetListCategories() {
  try {
    yield put(categoryActions.getCategoriesLoading());

    const res = yield call(() => CategoryService.getCategoriesList());
    console.log(res);
    const { status, data } = res;
    if (status === 200) {
      yield put(categoryActions.getCategoriesSuccess({ categories: data.categories }));
    } else {
      //yield put(authActions.requestLogFailed());
      console.log('an l r');
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
    console.log('an l r');
  }
}

export function* followActGetListCategories() {
  yield takeLatest(SagaActionTypes.GET_CATEGORIES_SAGA, actGetListCategories);
}
