import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { get, save } from 'actions/company';

import CompanyPageComponent from './CompanyPage';

class CompanyPageContainer extends React.PureComponent {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      ready: false
    };
  }

  componentDidMount() {
    const idString = this.props.match.params.id;
    const id = idString ? Number(idString) : null;
    this.props.onFetch(id).then(response => {
      this.setState({ ...response, ready: true });
    });
  }

  onSubmit(...args) {
    return this.props.onSubmit(...args).then(() => {
      this.props.dispatch(push('/companies'));
    }). catch(({ errors }) => {
      window.scrollTo(0,0);
      this.setState({ errors });
    });
  }

  render() {
    const { ready, ...passThroughProps } = this.state;
    if (!ready) {
      return null;
    }
    const idString = this.props.match.params.id;
    const id = idString ? Number(idString) : null;
    return (
      <CompanyPageComponent
        _id={id}
        {...passThroughProps}
        onSubmit={this.onSubmit}
      />
    );
  }
}

CompanyPageContainer.propTypes = {
  match: PropTypes.object.isRequired,
  onFetch: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  dispatch: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onFetch: (id) => dispatch(get(id)),
  onSubmit: (...args) => dispatch(save(...args)),
  dispatch
});

export default withRouter(
  connect(null, mapDispatchToProps)(CompanyPageContainer)
);
