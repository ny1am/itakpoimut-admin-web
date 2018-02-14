import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import queryString from 'query-string';
import { push } from 'react-router-redux';

import { get } from 'actions/companies';

import CompaniesPageComponent from './CompaniesPage';

class CompaniesPageContainer extends React.PureComponent {

  constructor(props) {
    super(props);
    this.onTitleChange = this.onTitleChange.bind(this);
  }

  componentDidMount() {
    this.fetchCompanies(this.props);
  }

  componentWillReceiveProps(newProps) {
    this.fetchCompanies(newProps);
  }

  fetchCompanies(props) {
    const { currentPage, title } = queryString.parse(props.location.search);
    props.onFetch(currentPage, title).then(response => {
      this.setState({ ...response });
    });
  }

  onTitleChange(title) {
    this.props.dispatch(
      push(`/companies?title=${title}&currentPage=1`)
    );
  }

  render() {
    const { title } = queryString.parse(this.props.location.search);
    return (
      <CompaniesPageComponent
        {...this.state}
        title={title||''}
        onTitleChange={this.onTitleChange}
      />
    );
  }
}

CompaniesPageContainer.propTypes = {
  location: PropTypes.object.isRequired,
  onFetch: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onFetch: (currentPage, title) => dispatch(get(currentPage, title)),
  dispatch
});

export default withRouter(
  connect(null, mapDispatchToProps)(CompaniesPageContainer)
);
