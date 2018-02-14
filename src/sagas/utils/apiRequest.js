import { call, put } from 'redux-saga/effects';

import { API_ROOT } from 'consts';
import { requestError } from 'actions/global';
import request from 'utils/request';

function* apiRequest(url, options) {
  try {
    const payload = yield call(request, `${API_ROOT}${url}`, options);
    return { payload };
  } catch(error) {
    yield put(requestError(error));
    return { error };
  }
}

export default apiRequest;
