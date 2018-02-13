import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Pagination from 'components/Pagination';
import { roleAdmin, roleModerator } from 'utils';

class UsersPage extends React.PureComponent {
  renderUserActions(user) {
    const { addModRole, removeModRole } = this.props;
    if (roleAdmin(user)) {
      return (
        <div className="admin-row-proposed">
          admin
        </div>
      );
    } else {
      if (roleModerator(user)) {
        return (
          <React.Fragment>
            <div className="admin-row-proposed">
              moderator
            </div>
            <div>
              <button style={{color: 'red'}} onClick={() => removeModRole(user._id)}>
                Забрати можливість модерувати
              </button>
            </div>
          </React.Fragment>
        );
      } else {
        return (
          <React.Fragment>
            <div className="admin-row-proposed">
              user
            </div>
            <div>
              <button style={{color: 'blue'}} onClick={() => addModRole(user._id)}>
                Надати можливість модерувати
              </button>
            </div>
          </React.Fragment>
        );
      }
    }
  }

  render() {
    const { error } = this.props;
    if (error) {
      return (
        <div>
          {error}
        </div>
      );
    }
    const { users, currentPage, totalPages } = this.props;
    return (
      <div>
        {users && users.map(user => (
          <div key={user._id} className="admin-row">
            <div className="admin-row-proposed">
              {user.email}
            </div>
            <div>
              {user.username}
            </div>
            <div>
              {user.fname}
            </div>
            <div>
              {user.lname}
            </div>
            {this.renderUserActions(user)}
          </div>
        ))}
        {totalPages &&
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
          >
            <Link to="/users?currentPage={{page}}"/>
          </Pagination>
        }
      </div>
    );
  }
}

UsersPage.propTypes = {
  error: PropTypes.string,
  users: PropTypes.array,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  addModRole: PropTypes.func.isRequired,
  removeModRole: PropTypes.func.isRequired,
};

export default UsersPage;
