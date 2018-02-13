import React from 'react';
import { CrossStorageHub } from 'cross-storage';
import URL from 'url-parse';

import { PORTAL_URL } from 'consts';

class CrossStorageHubComponent extends React.Component {

  componentDidMount() {
    const url = new URL(PORTAL_URL);
    const regex = new RegExp(`${url.host}$`);
    CrossStorageHub.init([{
      origin: regex,
      allow: ['set']
    }]);
  }

  render() {
    return null;
  }
}

export default CrossStorageHubComponent;
