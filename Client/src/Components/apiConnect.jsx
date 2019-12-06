import React, { Component } from 'react';
import UserDisplay from './userDisplay';
import axios from 'axios';

const discoveryDocs = [ 'https://people.googleapis.com/$discovery/rest?version=v1' ];
const scopes = 'https://www.googleapis.com/auth/youtube.readonly';
const defaultChannel = 'alexxww';
const apiKey = 'AIzaSyAiekQd1zCztDr6vEsW5bYIYT26MmFJ5i8';

export default class youtube extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isLogged: false,
			isLoaded: false,
			input: ''
		};
		this.handleAuthClick = this.handleAuthClick.bind(this);
		this.handleSignoutClick = this.handleSignoutClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	componentDidMount(e) {
		this.initClient();
	}

	//INIT CLIENT CONNEXION
	initClient() {
		window.gapi.load('client:auth2', () => {
			window.gapi.client
				.init({
					clientId: '568890925993-1vgd0a6g7iabongc0l0s6d1jrq14g8ps.apps.googleusercontent.com',
					discoveryDocs: discoveryDocs,
					scope: scopes
				})
				.then(() => {
					// SIGN IN INSTANCE
					window.gapi.auth2.getAuthInstance().isSignedIn.get();
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
		const { isLogged, input, userData, isLoaded } = this.state;
		event.preventDefault();
		window.gapi.auth2.getAuthInstance().signIn().then(() => {
			this.loadClient();
			console.log('User connected');
			window.gapi.client
				.request({
					method: 'GET',
					path: '/youtube/v3/channels',
					params: {
						part: 'snippet,contentDetails,statistics,id ',
						mine: 'true'
					}
				})
				.then((res) => {
					let userData = res.result.items[0];
					this.setState({ userData, isLogged: !isLogged });
					if (this.state.isLogged && userData !== undefined) {
						console.log('COUCOU');
						this.getPlaylist();
					}
					console.log('myData', userData);
				})
				.catch((err) => console.log('get Channel err', err));
		});
	}

	//CLICK LOGOUT BUTTON, BREAK THE INSTANCE
	handleSignoutClick(event) {
		event.preventDefault();
		window.gapi.auth2.getAuthInstance().signOut().then(console.log('User disconnected'));
		this.setState({ isLogged: false });
	}

	//SEARCH FOR VIDEO OR USER
	getVideos(videos) {
		let newChanVid = videos.toLowerCase();
		return window.gapi.client.youtube.search
			.list({
				part: 'snippet',
				maxResults: 25,
				q: newChanVid
			})
			.then((res) => {
				console.log('res', res);
				let videoData = res.result.items;
				this.setState({ videoData });
				console.log('videoData', videoData);
			})
			.catch((err) => console.log('No video found', err));
	}

	getPlaylist(playlist) {
		playlist = this.state.userData.contentDetails.relatedPlaylists.uploads;
		if (this.state.isLogged) {
			return window.gapi.client.youtube.playlistItems
				.list({
					part: 'snippet',
					playlistId: playlist,
					maxResults: 10
				})
				.then((res) => {
					let newPlaylist = res.result.items;
					this.setState([ newPlaylist ]);
					console.log('playlist', newPlaylist);
				})
				.catch((err) => console.log("Can't find playlist", err));
		}
	}

	handleChange(e) {
		const value = e.target.value;
		e.preventDefault();
		this.setState({ [e.target.name]: value });
	}
	handleSubmit(e) {
		e.preventDefault();
		const { input } = this.state;
		this.setState({ input });
		this.getVideos(input);
		//this.getChannel(input);
		console.log('input', input);
	}

	render() {
		const { isLogged, input, userData, videoData, newPlaylist } = this.state;
		const { handleSignoutClick, handleAuthClick, handleChange, handleSubmit } = this;
		console.log('IsLOGGED ?', isLogged);
		console.log('playlist', newPlaylist);

		if (newPlaylist !== undefined) {
			return this.getPlaylist();
		}

		return (
			<div>
				{isLogged === true ? (
					<div className="button-searchBar">
						<UserDisplay
							userData={userData}
							videoData={videoData}
							handleSignoutClick={handleSignoutClick}
							handleChange={handleChange}
							input={input}
							handleSubmit={handleSubmit}
							playlist={newPlaylist}
						/>
					</div>
				) : (
					<div className="btn1">
						<ul>
							Please Log you in with google
							<br />
							<button className="btn btn-danger" onClick={handleAuthClick}>
								Sign In
							</button>
						</ul>
					</div>
				)}
			</div>
		);
	}
}
