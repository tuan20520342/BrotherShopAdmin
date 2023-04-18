import { configureStore } from '@reduxjs/toolkit';
import rootSaga from './rootSaga';
import createSagaMiddleware from 'redux-saga';
import modalSlice from './reducer/ModalReducer';
import categorySlice from './reducer/CategoryReducer';
import staffSlice from './reducer/StaffReducer';
import productSlice from './reducer/ProductReducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = {
  modalSlice,
  categorySlice,
  staffSlice,
  productSlice,
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
