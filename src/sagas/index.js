import { take } from 'redux-saga/effects';

export function* defaultSaga() {
  yield take('SOME_ACTION');
}

export default defaultSaga;
