import React, { Component } from 'react';
import { Image, Nav, Navbar, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router';
import auth from '../utils/auth';

@lore.connect(function(getState, props) {
  var user = null;

  if (auth.hasToken()) {
    user = JSON.parse(auth.getToken());
  }

  return {
    definitions: user ? getState('definition.find', {
      where: {
        userId: user.id
      }
    }) : null
  }
})
class Navigation extends Component {
  static contextTypes = {
    loggedInUser: React.PropTypes.object,
  };

  static propTypes = {
    definitions: React.PropTypes.object,
  };

  render() {
    const { loggedInUser } = this.context;
    const { definitions } = this.props;
    let navigation = null;

    if (loggedInUser) {
      navigation = (
        <Nav pullRight>
          <Navbar.Text>
            You are currently logged in as <Image className="nav-avatar" src={loggedInUser.avatarUrl} />
            {' '}
            <strong>{loggedInUser.name}</strong>
          </Navbar.Text>
          <Navbar.Text>
            {'{' + definitions.data.length + '}'} definitions
          </Navbar.Text>
          <LinkContainer to="/logout">
            <NavItem eventKey={2}>Logout</NavItem>
          </LinkContainer>
        </Nav>
      )
    } else {
      navigation = (
        <Nav pullRight>
          <LinkContainer to="/login">
            <NavItem eventKey={2}>Login</NavItem>
          </LinkContainer>
        </Nav>
      )
    }

    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">Dev Dictionary</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          {navigation}
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default Navigation
