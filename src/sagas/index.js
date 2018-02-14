import { combine } from './utils/effects';

import usersSaga from './users';
import companiesSaga from './companies';
import companySaga from './company';

export default combine([
  usersSaga,
  companiesSaga,
  companySaga,
]);
