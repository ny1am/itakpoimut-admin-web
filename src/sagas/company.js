import { put } from 'redux-saga/effects';
import toFormData from 'object-to-formdata';

import {
  COMPANY_REQUEST, COMPANY_SUCCESS,
  SAVE_COMPANY_REQUEST, SAVE_COMPANY_SUCCESS,
} from 'consts/company';
import { takeFirst, combine } from './utils/effects';
import apiSecureRequest from './utils/apiSecureRequest';

function* fetchCompany({ id }) {
  const url = `/admin/company?_id=${id||''}`;
  const { payload } = yield apiSecureRequest(url);
  if (payload) {
    const newAction = { type: COMPANY_SUCCESS, payload };
    yield put(newAction);
  }
}

function* fetchCompanySaga() {
  yield takeFirst(COMPANY_REQUEST, fetchCompany);
}

function* saveCompany({ title, description, company_site, loyalty, published, _id, proposalsSeen, selectedCategories, selectedViolations, attachment }) {
  const url = `/admin/company`;
  const options = {
    method: 'POST',
    body: toFormData({
      title, description, company_site, attachment, loyalty, published, _id, proposalsSeen,
      'selectedCategories[]': selectedCategories,
      'selectedViolations[]': selectedViolations,
    }),
  };
  const { payload } = yield apiSecureRequest(url, options);
  if (payload) {
    const newAction = { type: SAVE_COMPANY_SUCCESS, payload };
    yield put(newAction);
  }
}

function* saveCompanySaga() {
  yield takeFirst(SAVE_COMPANY_REQUEST, saveCompany);
}

export default combine([
  fetchCompanySaga,
  saveCompanySaga
]);
