import { all } from 'redux-saga/effects'
import mineFieldsSaga from '../features/mineFields/mineFieldsSaga';

export default function* rootSaga() {
  yield all([ mineFieldsSaga() ]);
}