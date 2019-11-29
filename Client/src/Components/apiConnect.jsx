import React, { Component } from 'react';
import { generateKeyPair } from 'crypto';
import axios from 'axios';

const discoveryDocs = [ 'https://people.googleapis.com/$discovery/rest?version=v1' ];
const scopes = 'https://www.googleapis.com/auth/youtube.readonly';
const defaultChannel = 'alexxww';
const apiKey = 'your_api_key';

export default class Youtube extends Component {
	constructor(props) {
		super(props);
		this.state = {
			videos: [],
			isLogged: false,
			input: ''
		};
		this.handleAuthClick = this.handleAuthClick.bind(this);
		this.handleSignoutClick = this.handleSignoutClick.bind(this);
	}

	componentDidMount() {
		this.initClient();
	}

	//INIT CLIENT CONNEXION
	initClient() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId: 'YOUR_clientID.apps.googleusercontent.com',
					discoveryDocs: discoveryDocs,
					scope: scopes
				})
				.then(() => {
					// SIGN IN INSTANCE
					window.gapi.auth2.getAuthInstance().isSignedIn.get();
					this.loadClient();
				})
				.catch((err) => console.log('ERROR DURING INIT CLIENT', err));
		});
	}

	loadClient() {
		window.gapi.client.setApiKey(apiKey);
		return window.gapi.client.load('https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest').then(
			() => {
				console.log('GAPI client loaded for API');
			},
			(err) => {
				console.error('Error loading GAPI client for API', err);
			}
		);
	}

	//CLICK LOGIN BUTTON, INIT SIGN IN INSTANCE
	handleAuthClick(event) {
		const { isLogged } = this.state;
		event.preventDefault();
		this.setState({ isLogged: !this.state.isLogged });
		window.gapi.auth2.getAuthInstance().signIn().then(console.log('User connected'));
		fetch('https://www.googleapis.com/youtube/v3/channelschannels?part=contentDetails&mine=true')
			.then((res) => console.log('resp', res))
			.catch((err) => console.log('axios ERROR', err));
	}

	//CLICK LOGOUT BUTTON, BREAK THE INSTANCE
	handleSignoutClick(event) {
		event.preventDefault();
		window.gapi.auth2.getAuthInstance().signOut().then(console.log('User disconnected'));
		this.setState({ isLogged: false });
	}

	//CALL THE API LINK INTO INDEX.HTML
	getChannel(channel) {
		window.gapi.client.youtube.channels
			.list({
				part: 'snippet,contentDetails,statistics',
				mine: true
			})
			.then((res) => console.log('resp', res))
			.catch((err) => console.log('get Channel err', err));
	}

	handleChange(e) {
		const value = e.target.value;
		e.preventDefault();
		this.setState({ [e.target.name]: value });
	}
	handleSubmit(e) {
		const { input } = this.state;
		e.preventDefault();
		this.getChannel(input);
		this.setState({ input });
	}

	render() {
		const { isLogged, input } = this.state;
		const { handleSignoutClick, handleAuthClick, handleChange, handleSubmit } = this;
		console.log('props', this.props);
		return (
			<div>
				{isLogged === true ? (
					<div>
						<input name={input} onChange={handleChange.bind(this)} />
						<button name="submit" onSubmit={handleSubmit.bind(this)}>
							Search Channel
						</button>
						<button onClick={handleSignoutClick}>Sign Out</button>
					</div>
				) : (
					<button onClick={handleAuthClick}> Sign In</button>
				)}
			</div>
		);
	}
}
