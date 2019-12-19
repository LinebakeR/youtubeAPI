import React, { Component } from 'react';
import { getUser } from '../apiConnect';
import { Redirect } from 'react-router-dom';

export default class Login extends Component {
  constructor(props) {
    super(props);
    const { alerts } = props;
    this.state = {
      alerts,
      isAlert: null,
    };
  }
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
  componentDidMount = () => {
    if (this.props.alerts.length > 0) {
      this.setState({ isAlert: true });
      setTimeout(() => {
        this.setState({ isAlert: !this.state.isAlert });
      }, 2000);
    }
  };

  render() {
    const { isLogged, alerts } = this.props;
    const { isAlert, alert } = this.state;
    console.log('ISALERT', isAlert);

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
          <br></br>
          <br></br>
          {isAlert && (
            <div className="btn alert-danger" role="alert">
              {alerts}
            </div>
          )}
        </ul>
      </div>
    );
  }
}
