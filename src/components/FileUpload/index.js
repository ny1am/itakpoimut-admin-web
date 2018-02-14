import React from 'react';
import PropTypes from 'prop-types';

import './styles.css';

class FileUpload extends React.Component {

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.state = {
      result: props.error?'error':null,
    };
  }

  componentWillReceiveProps(newProps) {
    if (!this.props.error && newProps.error) {
      this.setState({
        result: 'error',
      });
    }
  }

  onChange() {
    let file = this.fileUpload.files[0];
    //validation for drag and drop
    if (file && file.type.indexOf('image/') !== 0) {
      file = null;
    }
    if (file) {
      this.setState({ result: 'success' });
    } else {
      this.setState({ result: null });
    }
    this.props.onChange(file);
  }

  render() {
    const wrapperClassName = `${this.props.className} ${this.state.result?`fileU${this.state.result}`:''}`;
    return (
      <div className={wrapperClassName}>
        {this.props.children &&
          React.Children.toArray(this.props.children)
        }
        <input type="file" accept="image/*" onChange={this.onChange} ref={(ref) => this.fileUpload = ref} />
      </div>
    );
  }
}

FileUpload.propTypes = {
  error: PropTypes.bool,
  className: PropTypes.string.isRequired,
  children: PropTypes.node,
  onChange: PropTypes.func.isRequired,
};

export default FileUpload;
