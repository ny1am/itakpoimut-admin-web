import { put } from 'redux-saga/effects';

import {
  USERS_REQUEST, USERS_SUCCESS,
  ADD_MOD_ROLE_REQUEST, ADD_MOD_ROLE_SUCCESS,
  REMOVE_MOD_ROLE_REQUEST, REMOVE_MOD_ROLE_SUCCESS,
} from 'consts/users';
import { takeFirst, combine } from './utils/effects';
import apiSecureRequest from './utils/apiSecureRequest';

function* fetchUsers({ currentPage }) {
  const url = `/admin/users?currentPage=${currentPage}`;
  const { payload } = yield apiSecureRequest(url);
  if (payload) {
    const newAction = { type: USERS_SUCCESS, payload };
    yield put(newAction);
  }
}

function* fetchUsersSaga() {
  yield takeFirst(USERS_REQUEST, fetchUsers);
}

function* addModRole({ userId }) {
  const url = `/admin/addModeratorRole?id=${userId}`;
  const { payload } = yield apiSecureRequest(url);
  if (payload) {
    const newAction = { type: ADD_MOD_ROLE_SUCCESS, payload };
    yield put(newAction);
  }
}

function* addModRoleSaga() {
  yield takeFirst(ADD_MOD_ROLE_REQUEST, addModRole);
}

function* removeModRole({ userId }) {
  const url = `/admin/removeModeratorRole?id=${userId}`;
  const { payload } = yield apiSecureRequest(url);
  if (payload) {
    const newAction = { type: REMOVE_MOD_ROLE_SUCCESS, payload };
    yield put(newAction);
  }
}

function* removeModRoleSaga() {
  yield takeFirst(REMOVE_MOD_ROLE_REQUEST, removeModRole);
}

export default combine([
  fetchUsersSaga,
  addModRoleSaga,
  removeModRoleSaga,
]);
