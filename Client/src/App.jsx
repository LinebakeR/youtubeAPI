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
    };
  }
  isLogIn = user => {
    this.setState({ isLogged: true, user });
  };
  render() {
    const { isLogged, user } = this.state;
    return (
      <>
        <Navbar />
        <Router>
          <Switch>
            <Route path="/dashboard" render={props => <Dashboard {...props} user={user} isLogged={isLogged} />} />
            <Route exact path="/" render={props => <Login {...props} isLogged={isLogged} isLogIn={this.isLogIn} />} />
          </Switch>
        </Router>
      </>
    );
  }
}
