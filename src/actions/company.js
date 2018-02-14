import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

import {
  COMPANY_REQUEST, COMPANY_SUCCESS,
  SAVE_COMPANY_REQUEST, SAVE_COMPANY_SUCCESS,
  DELETE_COMPANY_REQUEST, DELETE_COMPANY_SUCCESS
} from 'consts/company';

export function get(id) {
  return {
    type: COMPANY_REQUEST,
    id,
    [WAIT_FOR_ACTION]: COMPANY_SUCCESS,
  };
}

export function save(data) {
  return {
    type: SAVE_COMPANY_REQUEST,
    ...data,
    [WAIT_FOR_ACTION]: SAVE_COMPANY_SUCCESS,
  };
}

export function deleteCompany(id) {
  return {
    type: DELETE_COMPANY_REQUEST,
    id,
    [WAIT_FOR_ACTION]: DELETE_COMPANY_SUCCESS,
  };
}
