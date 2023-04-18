import { all } from 'redux-saga/effects';
import * as CategorySaga from './sagaActions/CategorySaga';
import * as StaffSaga from './sagaActions/StaffSaga';
import * as ProductSaga from './sagaActions/ProductSaga';

export default function* rootSaga() {
  yield all([
    CategorySaga.followActGetListCategories(),
    StaffSaga.followActPostStaff(),
    ProductSaga.followActGetListProducts(),
  ]);
}
