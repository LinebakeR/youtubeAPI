import React, { Component } from 'react';
import { getUser } from '../apiConnect';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
  //CLICK LOGIN BUTTON, INIT INSTANCE AND CATCH USER DATA FROM GETUSER METHOD WHEN LOGGED
  handleAuthClick = async e => {
    e.preventDefault();
    const { history, isLogIn } = this.props;
    try {
      //API INSTANCE SIGN IN
      await window.gapi.auth2.getAuthInstance().signIn();
      console.log('User connected');
      const user = await getUser();
      isLogIn(user);
      history.push('/dashboard');
    } catch (err) {
      console.log('error when try to login', err);
    }
  };

  render() {
    const { isLogged } = this.props;
    return isLogged ? (
      <Redirect to="/dashboard" />
    ) : (
      <div className="btn1">
        <ul>
          Please Log you in with google
          <br />
          <button className="btn btn-danger" onClick={this.handleAuthClick}>
            Sign In
          </button>
        </ul>
      </div>
    );
  }
}
