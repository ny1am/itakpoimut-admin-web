import { call } from 'redux-saga/effects';

import { loadAuth } from '../../store/storage';
import apiRequest from './apiRequest';

function* apiSecureRequest(url, options) {
  const auth = (yield call(loadAuth)) || {};
  const newOptions = Object.assign({ headers: {} }, options);
  newOptions.headers['Authorization'] = `JWT ${auth.token}`;
  const { payload, error } = yield apiRequest(url, newOptions);
  return { payload, error };
}

export default apiSecureRequest;
