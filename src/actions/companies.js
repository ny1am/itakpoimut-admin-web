import { WAIT_FOR_ACTION } from 'redux-wait-for-action';

import {
  COMPANIES_REQUEST, COMPANIES_SUCCESS
} from 'consts/companies';

export function get(currentPage = 1, title) {
  return {
    type: COMPANIES_REQUEST,
    currentPage,
    title,
    [WAIT_FOR_ACTION]: COMPANIES_SUCCESS,
  };
}
