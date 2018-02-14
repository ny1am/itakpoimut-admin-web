import { createStore, compose, applyMiddleware } from 'redux';
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
import createHistory from 'history/createBrowserHistory';
import { routerMiddleware } from 'react-router-redux';
import createSagaMiddleware from 'redux-saga';
import createReduxWaitForMiddleware from 'redux-wait-for-action';
// import logger from 'redux-logger';

import patchReduxWaitForMiddleware from './middlewares/patchReduxWaitForMiddleware';

import rootReducer from '../reducers';
import sagas from '../sagas';

export const history = createHistory();

function configureStoreProd(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    sagaMiddleware,
    patchReduxWaitForMiddleware,
    createReduxWaitForMiddleware(),
    reactRouterMiddleware,
  ];

  const store = createStore(rootReducer, initialState, compose(
    applyMiddleware(...middlewares)
    )
  );

  sagaMiddleware.run(sagas);

  return store;
}

function configureStoreDev(initialState) {
  const reactRouterMiddleware = routerMiddleware(history);
  const sagaMiddleware = createSagaMiddleware();
  const middlewares = [
    // Redux middleware that spits an error on you when you try to mutate your state either inside a dispatch or between dispatches.
    reduxImmutableStateInvariant(),
    sagaMiddleware,
    patchReduxWaitForMiddleware,
    createReduxWaitForMiddleware(),
    reactRouterMiddleware,
    // logger
  ];

  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; // add support for Redux dev tools
  const store = createStore(rootReducer, initialState, composeEnhancers(
    applyMiddleware(...middlewares)
    )
  );

  sagaMiddleware.run(sagas);

  return store;
}

const configureStore = process.env.NODE_ENV === 'production' ? configureStoreProd : configureStoreDev;

export default configureStore;
