import { call, put, takeLatest } from 'redux-saga/effects';
import * as SagaActionTypes from '../constants';
import { productActions } from '../reducer/ProductReducer';
import { ProductService } from '~/services/api/ProductAPI';
import AlertCustom from '~/components/UI/Notification/Alert';

function* actGetListProducts() {
  try {
    yield put(productActions.getProductsLoading());

    const res = yield call(() => ProductService.getProductsList());
    const { status, data } = res;

    if (status === 200) {
      yield put(productActions.getProductsSuccess({ products: data.products }));
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  }
}

function* actGetProductById(action) {
  try {
    const { id } = action;
    yield put(productActions.getProductByIdInLoading());

    const res = yield call(() => ProductService.getProductById(id));
    const { status, data } = res;
    if (status === 200) {
      yield put(productActions.getProductByIdSuccess({ productId: data.product }));
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  }
}

function* actCreateProduct(action) {
  try {
    const { newProduct, callback } = action;

    const res = yield call(() => ProductService.createProduct(newProduct));
    const { status, data } = res;

    if (status === 201) {
      AlertCustom({ type: 'success', title: data.message });
      if (callback) {
        callback();
      }
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  }
}

function* actUpdateProduct(action) {
  try {
    yield put(productActions.editProductLoading());

    const { updatedProduct } = action;
    const res = yield call(() => ProductService.updateProduct(updatedProduct));
    const { status, data } = res;

    if (status === 200) {
      yield put({ type: SagaActionTypes.GET_PRODUCTS_SAGA });
      AlertCustom({ type: 'success', title: data.message });
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  } finally {
    yield put(productActions.editProductComplete());
  }
}

function* actStopSellingProduct(action) {
  try {
    const { productId } = action;
    const res = yield call(() => ProductService.stopSellingProduct(productId));
    const { status, data } = res;

    if (status === 200) {
      yield put({ type: SagaActionTypes.GET_PRODUCTS_SAGA });
      AlertCustom({ type: 'success', title: data.message });
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  }
}

function* actResellProduct(action) {
  try {
    const { productId } = action;
    const res = yield call(() => ProductService.resellProduct(productId));
    const { status, data } = res;

    if (status === 200) {
      yield put({ type: SagaActionTypes.GET_PRODUCTS_SAGA });
      AlertCustom({ type: 'success', title: data.message });
    } else {
      AlertCustom({ type: 'error', title: data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
    }
  } catch (err) {
    AlertCustom({ type: 'error', title: err.response?.data?.message || 'Có lỗi xảy ra, vui lòng thử lại' });
  }
}

export function* followActGetListProducts() {
  yield takeLatest(SagaActionTypes.GET_PRODUCTS_SAGA, actGetListProducts);
}

export function* followActGetProductById() {
  yield takeLatest(SagaActionTypes.GET_PRODUCT_BY_ID_SAGA, actGetProductById);
}

export function* followActCreateProduct() {
  yield takeLatest(SagaActionTypes.CREATE_PRODUCT_SAGA, actCreateProduct);
}

export function* followActUpdateProduct() {
  yield takeLatest(SagaActionTypes.UPDATE_PRODUCT_SAGA, actUpdateProduct);
}

export function* followActStopSellingProduct() {
  yield takeLatest(SagaActionTypes.STOP_SELLING_PRODUCT_SAGA, actStopSellingProduct);
}

export function* followActResellProduct() {
  yield takeLatest(SagaActionTypes.RESELL_PRODUCT_SAGA, actResellProduct);
}
