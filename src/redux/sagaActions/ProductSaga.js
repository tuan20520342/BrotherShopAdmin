import { call, put, takeLatest } from 'redux-saga/effects';
import * as SagaActionTypes from '../constants/constant';
import { productActions } from '../reducer/ProductReducer';
import { modalActions } from '../reducer/ModalReducer';
import { ProductService } from '~/services/api/ProductAPI';
import AlertCustom from '~/components/UI/Notification/Alert';

function* actGetListProducts() {
  try {
    yield put(productActions.getProductsLoading());

    const res = yield call(() => ProductService.getProductsList());
    console.log(res);
    const { status, data } = res;
    if (status === 200) {
      yield put(productActions.getProductsSuccess({ products: data.products }));
    } else {
      //yield put(authActions.requestLogFailed());
      console.log('an l r');
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
    console.log('an l r');
  }
}

function* actGetProductById(action) {
  try {
    const { id } = action;
    yield put(productActions.getProductByIdInLoading());

    const res = yield call(() => ProductService.getProductById(id));
    console.log(res);
    const { status, data } = res;
    if (status === 200) {
      yield put(productActions.getProductByIdSuccess({ productId: data.product }));
    } else {
      //yield put(authActions.requestLogFailed());
      console.log('an l r');
    }
  } catch (err) {
    //yield put(authActions.requestLogFailed());
    console.log('an l r');
  }
}

export function* followActGetListProducts() {
  yield takeLatest(SagaActionTypes.GET_PRODUCTS_SAGA, actGetListProducts);
}

export function* followActGetProductById() {
  yield takeLatest(SagaActionTypes.GET_PRODUCT_BY_ID_SAGA, actGetProductById);
}
