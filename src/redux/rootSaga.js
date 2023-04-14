import { all } from 'redux-saga/effects';
import * as CategorySaga from './sagaActions/CategorySaga';

export default function* rootSaga() {
  yield all([CategorySaga.followActGetListCategories()]);
}
