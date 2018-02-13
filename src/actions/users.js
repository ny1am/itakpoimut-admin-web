import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

import {
  USERS_REQUEST, USERS_SUCCESS,
  ADD_MOD_ROLE_REQUEST, ADD_MOD_ROLE_SUCCESS,
  REMOVE_MOD_ROLE_REQUEST, REMOVE_MOD_ROLE_SUCCESS,
} from 'consts/users';

export function get(currentPage = 1) {
  return {
    type: USERS_REQUEST,
    currentPage,
    [WAIT_FOR_ACTION]: USERS_SUCCESS,
  };
}

export function addModRole(userId) {
  return {
    type: ADD_MOD_ROLE_REQUEST,
    userId,
    [WAIT_FOR_ACTION]: ADD_MOD_ROLE_SUCCESS,
  };
}

export function removeModRole(userId) {
  return {
    type: REMOVE_MOD_ROLE_REQUEST,
    userId,
    [WAIT_FOR_ACTION]: REMOVE_MOD_ROLE_SUCCESS,
  };
}
