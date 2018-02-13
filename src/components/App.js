import React from 'react';

import CrossStorageHub from 'components/CrossStorageHub';
import { loadAuth } from 'store/storage';

class App extends React.Component {
  render() {
    const auth = loadAuth() || {value: 'no token'};
    return (
      <div>
        <CrossStorageHub />
        {JSON.stringify(auth)}
      </div>
    );
  }
}

export default App;
