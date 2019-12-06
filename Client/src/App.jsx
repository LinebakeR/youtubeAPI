import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import apiConnect from './Components/apiConnect';
import Navbar from './Components/navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import navbar from './Components/navbar';

function App() {
	return (
		<Router>
			<Route path="/" render={(props) => <Navbar {...props} apiConnect={apiConnect} />} />
			<Route exact path="/" component={apiConnect} />
		</Router>
	);
}

export default App;
