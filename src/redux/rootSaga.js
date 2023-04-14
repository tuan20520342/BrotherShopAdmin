import { all } from 'redux-saga/effects';
import * as CategorySaga from './sagaActions/CategorySaga';
import * as StaffSaga from './sagaActions/StaffSaga';

export default function* rootSaga() {
  yield all([CategorySaga.followActGetListCategories(), StaffSaga.followActPostStaff()]);
}
