import React, { Component } from 'react';
import { Link } from 'react-router';
import auth from '../utils/auth';

class Logout extends Component {

  componentWillMount() {
    auth.deleteToken();
  }

  render() {
    return (
      <div>
        <p>You have been <strong>logged out</strong></p>

        <p><Link to="/login">Log back in</Link></p>
      </div>
    );
  }
}

export default Logout;
