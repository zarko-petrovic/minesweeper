import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import mineFieldsReducer from '../features/mineFields/mineFieldsSlice';
import rootSaga from '../sagas/index';

const sagaMiddleware = createSagaMiddleware()

export const store = configureStore({
  reducer: {
    mineFields: mineFieldsReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware().prepend(sagaMiddleware)
});

sagaMiddleware.run(rootSaga);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
