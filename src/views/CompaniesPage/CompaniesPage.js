import React from 'react';
import PropTypes from 'prop-types';

import CompaniesList from './CompaniesList';

class CompaniesPage extends React.PureComponent {

  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onTitleChange = this.onTitleChange.bind(this);
    this.state = {
      title: props.title,
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.title !== nextProps.title) {
      this.setState({
        title: nextProps.title
      });
    }
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onTitleChange(this.state.title);
  }

  onTitleChange({ target: { value }}) {
    this.setState({
      title: value,
    });
  }

  renderCompanies() {
    const { companies, currentPage, totalPages } = this.props;
    if (!companies) {
      return null;
    }
    return (
      <CompaniesList
        companies={companies}
        currentPage={currentPage}
        totalPages={totalPages}
        title={this.state.title}
      />
    );
  }
  render() {
    return (
      <React.Fragment>
        <div className="admin-action">
          <a href="/admin/company">
            Додати компанію
          </a>
        </div>
        <form action="/admin/companies" method="post" onSubmit={this.onSubmit}>
          <div className="search-construct search-construct--highlight" style={{marginBottom: 50}}>
            <div className="search-construct-input">
              <input
                type="text"
                name="title"
                value={this.state.title||''}
                onChange={this.onTitleChange}
                placeholder="Введіть назву компанії"
              />
            </div>
            <button type="submit" className="search-construct-button" />
          </div>
          <div className="admin-helper">
            <span className="admin-row-not-published">
              - Не показується на порталі
            </span>
            <span className="admin-row-proposed">
              - Запропоновані зміни
            </span>
          </div>
        </form>
        {this.renderCompanies()}
      </React.Fragment>
    );
  }
}

CompaniesPage.propTypes = {
  companies: PropTypes.array,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  title: PropTypes.string,
  onTitleChange: PropTypes.string,
};

export default CompaniesPage;
