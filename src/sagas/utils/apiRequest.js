import { call } from 'redux-saga/effects';

import { API_ROOT } from 'consts';
import request from 'utils/request';

function* apiRequest(url, options) {
  try {
    const payload = yield call(request, `${API_ROOT}${url}`, options);
    return { payload };
  } catch(error) {
    return { error };
  }
}

export default apiRequest;
