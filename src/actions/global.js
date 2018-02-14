import { GENERIC_REQUEST_ERROR } from 'consts';

export const requestError = (error) => ({
  type: GENERIC_REQUEST_ERROR,
  error
});
