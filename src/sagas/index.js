import { combine } from './utils/effects';

import usersSaga from './users';
import companiesSaga from './companies';

export default combine([
  usersSaga,
  companiesSaga,
]);
