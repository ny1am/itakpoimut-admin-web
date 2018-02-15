import React from 'react';
import { render } from 'react-dom';
import promiseFinally from 'promise.prototype.finally';
import 'isomorphic-fetch';

import Root from 'components/Root';
import configureStore, { history } from 'store/configureStore';

promiseFinally.shim();

const store = configureStore();

render(
  <Root store={store} history={history} />,
  document.getElementById('root')
);
