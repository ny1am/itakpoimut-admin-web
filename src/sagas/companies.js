import { put } from 'redux-saga/effects';

import {
  COMPANIES_REQUEST, COMPANIES_SUCCESS
} from 'consts/companies';
import { takeFirst } from './utils/effects';
import apiSecureRequest from './utils/apiSecureRequest';

function* fetchCompanies({ currentPage, title }) {
  const url = `/admin/companies?currentPage=${currentPage}&title=${title||''}`;
  const { payload } = yield apiSecureRequest(url);
  if (payload) {
    const newAction = { type: COMPANIES_SUCCESS, payload };
    yield put(newAction);
  }
}

function* fetchCompaniesSaga() {
  yield takeFirst(COMPANIES_REQUEST, fetchCompanies);
}

export default fetchCompaniesSaga;
