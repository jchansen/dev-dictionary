import React, { Component } from 'react';
import commonActions from './commonActions';
import { Alert, Button, Glyphicon, Image } from 'react-bootstrap';
import { Link } from 'react-router';
import PayloadStates from '../constants/PayloadStates';
import auth from '../utils/auth';

@lore.connect(function(getState, props) {
  return {
    users: getState('user.find')
  }
}, { subscribe: true })
class Login extends Component {

  constructor(props) {
    super(props);

    this.markUserLoggedIn = this.markUserLoggedIn.bind(this);
  }

  static contextTypes = {
    loggedInUser: React.PropTypes.object,
  };

  static propTypes = {
    users: React.PropTypes.object.isRequired,
    router: React.PropTypes.object.isRequired,
  };

  markUserLoggedIn(user) {
    auth.saveToken(JSON.stringify(user));
    this.props.router.push('/');
  }

  renderUser(user) {
    return (
      <div key={user.id} className="user">
        <Image src={user.data.avatarUrl} />
        {' '}
        <strong>{user.data.name}</strong>
        {' '}
        <Button bsStyle="link" onClick={this.markUserLoggedIn.bind(this, user)}>
          Login as {user.data.name}
        </Button>
      </div>
    )
  }

  render() {
    const { loggedInUser } = this.context;
    const { users } = this.props;

    if (loggedInUser) {
      return (
        <div className="login-screen">
          <div>
            <p>
              You are currently logged in as <Image src={loggedInUser.avatarUrl} />
              {' '}
              <strong>{loggedInUser.name}</strong>
            </p>
            <p>If you want to login as another user, first <Link to="/logout">logout</Link>.</p>
          </div>

        </div>
      )
    }

    if (users.state === PayloadStates.FETCHING) {
      return (
        <div className="login-screen">
          <div>
            <div>
              <Glyphicon glyph="refresh" className="spin" /> Loading...
            </div>
          </div>
        </div>
      )
    }

    if (users.state === PayloadStates.ERROR_FETCHING) {
      <div className="login-screen">
        <div>
          <Alert bsStyle="danger">
            <strong>Error!</strong>
            {JSON.stringify(users.error)}
          </Alert>
        </div>
      </div>
    }

    return (
      <div className="login-screen">
        <div>
          <div className="users">
            {users.data.map(this.renderUser.bind(this))}
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
