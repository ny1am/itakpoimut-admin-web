import React from 'react';

import CrossStorageHub from 'components/CrossStorageHub';
import Layout from 'components/Layout';
import Routes from 'components/Routes';

class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Layout>
          <Routes />
        </Layout>
        <CrossStorageHub />
      </React.Fragment>
    );
  }
}

export default App;
