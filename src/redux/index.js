import { configureStore } from '@reduxjs/toolkit';
import rootSaga from './rootSaga';
import createSagaMiddleware from 'redux-saga';
import modalSlice from './reducer/ModalReducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = {
  modalSlice,
};

export const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
