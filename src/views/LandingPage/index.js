import React from 'react';
import { Link } from 'react-router-dom';

class LandingPage extends React.PureComponent {
  render() {
    return (
      <div>
        <Link to="/companies">
          Компанії
        </Link>
        <br/><br/>
        <Link to="/users">
          Користувачі
        </Link>
      </div>
    );
  }
}

export default LandingPage;
