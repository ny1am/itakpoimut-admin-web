import React from 'react';
import PropTypes from 'prop-types';
import { ConnectedRouter } from 'react-router-redux';
import { Provider } from 'react-redux';

import App from 'components/App';

/**
 * Root component. Connects with redux and browser's history
 */
class Root extends React.Component {
  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <App />
        </ConnectedRouter>
      </Provider>
    );
  }
}

Root.propTypes = {
  /**
   * store object
   */
  store: PropTypes.object.isRequired,
  /**
   * browser history object
   */
  history: PropTypes.object.isRequired
};

export default Root;
