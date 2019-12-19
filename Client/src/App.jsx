import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import apiConnect from './apiConnect';
import Navbar from './Components/Navbar';
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';

//PASSING USER PROPS INTO THE ROUTE CHECK IS LOGGED (kind of protected route)

export default class App extends Component {
  constructor(props) {
    super();
    const { user, isLogged } = props;
    this.state = {
      user,
      isLogged,
      alerts: [],
    };
  }
  //CHECK IF USER IS ALWAYS LOGGED & UPDATE STATE USER
  isLogIn = user => {
    this.setState({ isLogged: true, user });
  };

  //DISCONNECT USER FROM APP
  isLogOut = async () => {
    this.setState({ alerts: [] });
    await window.gapi.auth2.getAuthInstance().signOut();
    this.setState({
      isLogged: false,
      alerts: "You've been disconnected",
    });
  };

  render() {
    const { isLogged, user, alerts } = this.state;
    return (
      <>
        <Navbar />
        <Router>
          <Switch>
            <Route
              path="/dashboard"
              render={props => <Dashboard {...props} user={user} isLogged={isLogged} isLogOut={this.isLogOut} />}
            />
            <Route
              exact
              path="/"
              render={props => <Login {...props} isLogged={isLogged} isLogIn={this.isLogIn} alerts={alerts} />}
            />
          </Switch>
        </Router>
      </>
    );
  }
}
