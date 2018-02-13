import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Pagination from 'components/Pagination';

function companyClassName(company) {
  let result = "admin-row";
  if (!company.published) {
    result += " admin-row-not-published";
  }
  if (company.proposals) {
    result += " admin-row-proposed";
  }
  return result;
}

class CompaniesList extends React.PureComponent {
  renderCompanies() {
    return this.props.companies.map(company => (
      <div key={company._id} className={companyClassName(company)}>
        <div>
          {company._id}
        </div>
        <div>
          {company.title}
        </div>
        <div>
          <a href={"/admin/company?_id="+company._id}>Редагувати</a>
        </div>
      </div>
    ));
  }
  render() {
    const { title, currentPage, totalPages } = this.props;
    return (
      <div className="search-results">
        {this.renderCompanies()}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
        >
          <Link to={`/companies?title=${title}&currentPage={{page}}`}/>
        </Pagination>
      </div>
    );
  }
}

CompaniesList.propTypes = {
  companies: PropTypes.array,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  title: PropTypes.string,
};

export default CompaniesList;
