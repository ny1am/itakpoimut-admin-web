import React from 'react';
import { Route, Switch } from 'react-router-dom';

import LandingPage from 'views/LandingPage';
import CompaniesPage from 'views/CompaniesPage';
import UsersPage from 'views/UsersPage';
import CompanyPage from 'views/CompanyPage';

class Routes extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" exact component={LandingPage} />
        <Route path="/companies" component={CompaniesPage} />
        <Route path="/company/:id?" component={CompanyPage} />
        <Route path="/users" component={UsersPage} />
      </Switch>
    );
  }
}

export default Routes;
