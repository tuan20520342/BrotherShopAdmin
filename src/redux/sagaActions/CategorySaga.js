import { call, put, takeLatest } from 'redux-saga/effects';
import * as SagaActionTypes from '../constants';
import { categoryActions } from '../reducer/CategoryReducer';
import { modalActions } from '../reducer/ModalReducer';
import { CategoryService } from '~/services/api/CategoryAPI';
import AlertCustom from '~/components/UI/Notification/Alert';

function* actGetListCategories() {
  try {
    yield put(categoryActions.getCategoriesLoading());

    const res = yield call(() => CategoryService.getCategoriesList());
    const { status, data } = res;

    if (status === 200) {
      yield put(categoryActions.getCategoriesSuccess({ categories: data.categories }));
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  }
}

function* actUpdateCategory(action) {
  try {
    const { updatedCategory } = action;
    yield put(categoryActions.getCategoriesLoading());

    const res = yield call(() => CategoryService.updateCategory(updatedCategory));
    const { status, data } = res;

    if (status === 200) {
      yield put(modalActions.hideModal());
      AlertCustom({ type: 'success', title: data.message });

      yield put({ type: SagaActionTypes.GET_CATEGORIES_SAGA });
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  }
}

function* actRemoveCategory(action) {
  try {
    const { removedCategory } = action;
    yield put(categoryActions.getCategoriesLoading());

    const res = yield call(() => CategoryService.removeCategory(removedCategory));
    const { status, data } = res;

    if (status === 200) {
      yield put(modalActions.hideModal());
      AlertCustom({ type: 'success', title: data.message });
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  } finally {
    yield put({ type: SagaActionTypes.GET_CATEGORIES_SAGA });
  }
}

function* actCreateCategory(action) {
  try {
    const { newCategory } = action;
    yield put(categoryActions.getCategoriesLoading());

    const res = yield call(() => CategoryService.createCategory(newCategory));
    const { status, data } = res;

    if (status === 201) {
      AlertCustom({ type: 'success', title: data.message });
      yield put(modalActions.hideModal());
      yield put({ type: SagaActionTypes.GET_CATEGORIES_SAGA });
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  }
}

export function* followActGetListCategories() {
  yield takeLatest(SagaActionTypes.GET_CATEGORIES_SAGA, actGetListCategories);
}

export function* followActUpdateCategory() {
  yield takeLatest(SagaActionTypes.UPDATE_CATEGORY_SAGA, actUpdateCategory);
}

export function* followActRemoveCategory() {
  yield takeLatest(SagaActionTypes.REMOVE_CATEGORY_SAGA, actRemoveCategory);
}

export function* followActCreateCategory() {
  yield takeLatest(SagaActionTypes.CREATE_CATEGORY_SAGA, actCreateCategory);
}
