import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';

import { get, addModRole, removeModRole } from 'actions/users';

import UsersPageComponent from './UsersPage';

const getCurrentPage = (location) => {
  const { currentPage } = queryString.parse(location.search);
  return currentPage;
};

class UsersPageContainer extends React.PureComponent {

  constructor(props) {
    super(props);
    this.addModRole = this.addModRole.bind(this);
    this.removeModRole = this.removeModRole.bind(this);
  }

  componentDidMount() {
    this.fetchUsers(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.fetchUsers(newProps);
  }

  fetchUsers(props) {
    const currentPage = getCurrentPage(props.location);
    props.onFetch(currentPage)
      .then(response => {
        this.setState({ ...response });
      })
      .catch(() => {
        this.setState({ error: 'Немає доступу' });
      });
  }

  addModRole(userId) {
    this.props.addModRole(userId).finally(() => {
      this.fetchUsers(this.props);
    });
  }

  removeModRole(userId) {
    this.props.removeModRole(userId).finally(() => {
      this.fetchUsers(this.props);
    });
  }

  render() {
    return (
      <UsersPageComponent
        {...this.state}
        addModRole={this.addModRole}
        removeModRole={this.removeModRole}
      />
    );
  }
}

UsersPageContainer.propTypes = {
  location: PropTypes.object.isRequired,
  onFetch: PropTypes.func.isRequired,
  addModRole: PropTypes.func.isRequired,
  removeModRole: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onFetch: (currentPage) => dispatch(get(currentPage)),
  addModRole: (userId) => dispatch(addModRole(userId)),
  removeModRole: (userId) => dispatch(removeModRole(userId)),
  dispatch
});

export default withRouter(
  connect(null, mapDispatchToProps)(UsersPageContainer)
);