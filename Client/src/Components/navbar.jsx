import React, { Component } from 'react';

export default class navbar extends Component {
	render() {
		console.log('coucou', this.props);
		return (
			<div>
				<nav className="navbar navbar-light bg-dark">
					<a className="navbar-brand">Youtube API</a>
				</nav>
			</div>
		);
	}
}
