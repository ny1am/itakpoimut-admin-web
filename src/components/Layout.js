import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { PORTAL_URL } from 'consts';

class Layout extends React.Component {
  render() {
    return (
      <main className="site-content">
        <nav className="admin-menu">
          <div className="container">
            <ul>
              <li>
                <Link to="/companies">
                  Компанії
                </Link>
              </li>
              <li>
                <Link to="/users">
                  Користувачі
                </Link>
              </li>
              <li>
                <a href={PORTAL_URL} target="_blank">
                  ПОРТАЛ
                </a>
              </li>
            </ul>
          </div>
        </nav>
        <div className="container admin-container">
          {this.props.children}
        </div>
      </main>
    );
  }
}

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
