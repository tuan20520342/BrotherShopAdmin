import { call, put, takeLatest } from 'redux-saga/effects';
import * as SagaActionTypes from '../constants/constant';
import { productActions } from '../reducer/ProductReducer';
import { modalActions } from '../reducer/ModalReducer';
import { ProductService } from '~/services/api/ProductAPI';
import AlertCustom from '~/components/UI/Notification/Alert';

function* actGetListProducts() {
  try {
    yield put(productActions.getProductsLoading());

    let res = yield call(() => ProductService.getProductsList());
    console.log(res);
    let { status, data } = res;
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

export function* followActGetListProducts() {
  yield takeLatest(SagaActionTypes.GET_PRODUCTS_SAGA, actGetListProducts);
}
