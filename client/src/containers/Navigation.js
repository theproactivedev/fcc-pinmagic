import React, { Component } from 'react';
import PropTypes from 'prop-types';
import TwitterLogin from 'react-twitter-auth';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import {
  addUser, removeUser
} from '../actions.js';

class Navigation extends Component {
  constructor() {
    super();

    this.state = {
      activeItem: ""
    };

    this.onSuccess = this.onSuccess.bind(this);
    this.onFailed = this.onFailed.bind(this);
    this.logout = this.logout.bind(this);
  }

  onSuccess(response) {
    let that = this;
    const token = response.headers.get('x-auth-token');
    response.json().then(function(user) {
      if (token) {
        let bookUser = {
          "userName" : user.user.userName,
          "userId" : user.user.userId,
          "userToken" : token
        };
        that.props.dispatch(addUser(bookUser));
      }
    });
  };

  onFailed(error) {
    alert(error);
  };

  logout() {
    this.props.dispatch(removeUser());
    localStorage.removeItem("p!nm@g!c");
  }

  render() {
    const navbarInstance = (
      <Navbar inverse collapseOnSelect>
        <Navbar.Header>
          <LinkContainer to="/"><Navbar.Brand>Pin Magic</Navbar.Brand></LinkContainer>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
            {this.props.isUserAuthenticated &&
              <Nav pullRight>
              <LinkContainer to="/myBoard">
                <NavItem eventKey={'/myBoard'} href={'/myBoard'} className={this.state.activeItem === "myBoard" ? "activeLink" : ""} onClick={() => {this.activate("myBoard")}}>My Board</NavItem>
              </LinkContainer>
              <LinkContainer to="/">
                <NavItem eventKey={'logout'} onClick={this.logout} className="signOut"><i className="fa fa-sign-out" aria-hidden="true"></i> Sign Out</NavItem>
              </LinkContainer>
              </Nav>
            }

            {!this.props.isUserAuthenticated &&
              <Nav pullRight>
              <NavItem eventKey={'/twitter-authenticate'}>
                <TwitterLogin className="twitter-btn" showIcon={false} loginUrl="https://eg-fcc-pinterest.herokuapp.com/api/v1/auth/twitter"
                onFailure={this.onFailed} onSuccess={this.onSuccess}
                requestTokenUrl="https://eg-fcc-pinterest.herokuapp.com/api/v1/auth/twitter/reverse" />
              </NavItem>
              </Nav>
            }
        </Navbar.Collapse>
      </Navbar>
    );


    return (
      <div>
        <div>{navbarInstance}</div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user, isUserAuthenticated } = state;
  return { user, isUserAuthenticated };
}

Navigation.propTypes = {
  user: PropTypes.object.isRequired,
  isUserAuthenticated: PropTypes.bool.isRequired
};

export default connect(mapStateToProps)(Navigation);
