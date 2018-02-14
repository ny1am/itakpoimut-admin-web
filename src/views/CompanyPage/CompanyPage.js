import React from 'react';
import PropTypes from 'prop-types';

import { PORTAL_URL } from 'consts';
import Checkbox from 'components/Checkbox';
import FileUpload from 'components/FileUpload';

function companyPicture(picture_url) {
  return picture_url || '/img/no-image.png';
}

class CompanyPage extends React.PureComponent {

  constructor(props) {
    super(props);
    this.onSelectCategory = this.onSelectCategory.bind(this);
    this.onSelectViolation = this.onSelectViolation.bind(this);
    this.onProposalsSeen = this.onProposalsSeen.bind(this);
    this.onPublished = this.onPublished.bind(this);
    this.onTitle = this.onTitle.bind(this);
    this.onDescription = this.onDescription.bind(this);
    this.onCompanySite = this.onCompanySite.bind(this);
    this.onLoyalty = this.onLoyalty.bind(this);
    this.handleAttachment = this.handleAttachment.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.state = {
      _id: props._id,
      proposals: props.proposals ? true : false,
      selectedCategories: props.selectedCategories,
      selectedViolations: props.selectedViolations,
      proposalsSeen: false,
      published: props.published || false,
      title: props.title,
      description: props.description,
      company_site: props.company_site,
      loyalty: props.loyalty || props.loyaltiesList[0].name,
    };
  }

  onSelectCategory({ target: {checked, value} }) {
    const selectedCategories = this.state.selectedCategories
      .filter(c => c!== value);
    if (checked) {
      selectedCategories.push(value);
    }
    this.setState({ selectedCategories });
  }

  onSelectViolation({ target: {checked, value} }) {
    const selectedViolations = this.state.selectedViolations
      .filter(v => v!== value);
    if (checked) {
      selectedViolations.push(value);
    }
    this.setState({ selectedViolations });
  }

  onProposalsSeen({ target: {checked} }) {
    this.setState({ proposalsSeen: checked });
  }

  onPublished({ target: {checked} }) {
    this.setState({ published: checked });
  }

  onTitle({ target: {value} }) {
    this.setState({ title: value });
  }

  onDescription({ target: {value} }) {
    this.setState({ description: value });
  }

  onCompanySite({ target: {value} }) {
    this.setState({ company_site: value });
  }

  onLoyalty({ target: {value} }) {
    this.setState({ loyalty: value });
  }

  handleAttachment(attachment) {
    this.setState({ attachment });
  }

  onSubmit(e) {
    e.preventDefault();
    this.props.onSubmit(this.state);
  }

  renderCompanyLinks() {
    const style={marginBottom: 50, display: 'block', color: 'blue'};
    const { _id: id } = this.props;
    if (id) {
      return (
        <React.Fragment>
          <a href={`${PORTAL_URL}/company/${id}`} target="_blank" style={style}>
            Відкрити на порталі
          </a>
          <button style={style} onClick={()=>this.props.onDelete(id)}>
            Видалити
          </button>
        </React.Fragment>
      );
    } else {
      return null;
    }
  }
  renderDialogError() {
    if (this.props.errors.dialog) {
      return (
        <div className="dialog-error">
          {this.props.errors.dialog}
        </div>
      );
    } else {
      return null;
    }
  }
  renderCategories() {
    return this.props.categoriesList.map((category, index) => (
      <li key={index} className="row">
        <div className="check-row">
          <Checkbox
            id={'ctg_'+category.name}
            name="selectedCategories[]"
            value={category.name}
            onChange={this.onSelectCategory}
            checked={this.state.selectedCategories.indexOf(category.name) > -1}
          />
          <label htmlFor={'ctg_'+category.name}>
            {category.text}
            {this.renderCategoryProposedText(category)}
          </label>
        </div>
      </li>
    ));
  }
  renderCategoryProposedText(category) {
    if (this.props.proposedCategories.indexOf(category.name)>-1) {
      return (
        <span className="admin-row-proposed">
          - пропозиція від користувача
        </span>
      );
    } else {
      return null;
    }
  }
  renderViolations() {
    return this.props.violationsList.map((violation, index) => (
      <li key={index} className="row">
        <div className="check-row">
          <Checkbox
            id={'vlt_'+violation.name}
            name="selectedViolations[]"
            value={violation.name}
            onChange={this.onSelectViolation}
            checked={this.state.selectedViolations.indexOf(violation.name)>-1}
          />
          <label htmlFor={'vlt_'+violation.name}>
            {violation.text}
            {this.renderViolationProposedText(violation)}
          </label>
        </div>
      </li>
    ));
  }
  renderViolationProposedText(violations) {
    if (this.props.proposedViolations.indexOf(violations.name)>-1) {
      return (
        <span className="admin-row-proposed">
          - пропозиція від користувача
        </span>
      );
    } else {
      return null;
    }
  }
  renderLoyaltyOptions() {
    return this.props.loyaltiesList.map((loyalty, index) => (
      <option key={index} value={loyalty.name}>
        {loyalty.text}
      </option>
    ));
  }
  renderProposalsCheck() {
    if (this.props.proposals) {
      return (
        <div className="row">
          <div className="check-row">
            <Checkbox
              id="proposalsSeen"
              name="proposalsSeen"
              checked={this.state.proposalsSeen}
              onChange={this.onProposalsSeen}
            />
            <label htmlFor="proposalsSeen">
                Запропоновані зміни переглянуто
            </label>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
  render() {
    const titleClass = this.props.errors.title?'row--error':'';
    const descriptionClass = this.props.errors.description?'row--error':'';
    const company_siteClass = this.props.errors.company_site?'row--error':'';
    const loyaltyClass = this.props.errors.loyalty?'row--error':'';
    return (
      <div className="dialog dialog--company">
        <div className="dialog_content">
          <h1 className="dialog__h1">
            Компанія
          </h1>
          {this.renderCompanyLinks()}
          {this.renderDialogError()}
          <form action="/admin/company" method="post" encType="multipart/form-data" onSubmit={this.onSubmit}>
            <div className="row">
              <div className="check-row">
                <Checkbox
                  id="published"
                  name="published"
                  checked={this.state.published}
                  onChange={this.onPublished}
                />
                <label htmlFor="published">
                  Відображати на порталі
                </label>
              </div>
            </div>
            <div className={"row "+titleClass}>
              <label className="row__label" htmlFor="title">
                {this.props.errors.title || 'Назва компанії'}
              </label>
              <input
                className="row__input"
                type="text"
                name="title"
                value={this.state.title||''}
                onChange={this.onTitle}
                maxLength="300"
              />
            </div>
            <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>
              <FileUpload
                className="userpic selfCenter"
                error={!!this.props.errors.attachment}
                onChange={this.handleAttachment}
              >
                <img
                  src={companyPicture(this.props.img)}
                  width="100"
                  style={{left: 20}}
                />
              </FileUpload>
              <div className="hint">
                JPEG або PNG,<br/> розміром до 1 Mb
              </div>
            </div>
            <div className={"row "+descriptionClass}>
              <label className="row__label" htmlFor="description">
                {this.props.errors.description || 'Опис компанії'}
              </label>
              <textarea
                className="row__input"
                name="description"
                maxLength="300"
                value={this.state.description||''}
                onChange={this.onDescription}
              />
            </div>
            <div className={"row "+company_siteClass}>
              <label className="row__label" htmlFor="company_site">
                {this.props.errors.company_site || 'Посилання на сайт (якщо є)'}
              </label>
              <div className="http">
                <input
                  className="http"
                  type="text"
                  name="company_site"
                  maxLength="100"
                  value={this.state.company_site||''}
                  onChange={this.onCompanySite}
                />
              </div>
            </div>
            <hr/>
            <p>
              Сфери
            </p>
            <ul className="violations">
              {this.renderCategories()}
            </ul>
            <hr/>
            <p>
              Порушення
            </p>
            <ul className="violations">
              {this.renderViolations()}
            </ul>
            <div className={"row "+loyaltyClass}>
              <label className="row__label" htmlFor="loyalty">
                {this.props.errors.loyalty || 'Лояльність'}
              </label>
              <select
                className="row_input"
                name="loyalty"
                value={this.state.loyalty}
                onChange={this.onLoyalty}
              >
                {this.renderLoyaltyOptions()}
              </select>
            </div>
            {this.renderProposalsCheck()}
            <div className="right-content">
              <button className="dialog__button" type="submit">
                Зберегти
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

CompanyPage.propTypes = {
  _id: PropTypes.number,
  errors: PropTypes.object,
  proposals: PropTypes.bool,
  published: PropTypes.bool,
  title: PropTypes.string,
  img: PropTypes.string,
  description: PropTypes.string,
  company_site: PropTypes.string,
  loyalty: PropTypes.string,
  categoriesList: PropTypes.array,
  selectedCategories: PropTypes.array,
  proposedCategories: PropTypes.array,
  violationsList: PropTypes.array,
  selectedViolations: PropTypes.array,
  proposedViolations: PropTypes.array,
  loyaltiesList: PropTypes.array,
  onSubmit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

CompanyPage.defaultProps = {
  errors: {},
  selectedCategories: [],
  proposedCategories: [],
  selectedViolations: [],
  proposedViolations: [],
  proposalsSeen: false
};

export default CompanyPage;
