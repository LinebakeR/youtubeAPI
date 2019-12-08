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
	handleAuthClick = async (e) => {
		e.preventDefault();
		try {
			const res = await window.gapi.auth2.getAuthInstance().signIn();
			console.log('User connected');
			this.loadClient();
			this.execute();
		} catch (err) {
			console.log('Error when try to connect', err);
		}
	};

	execute = async () => {
		const { isLogged, input, userData, isLoaded } = this.state;
		try {
			const res = await window.gapi.client.request({
				method: 'GET',
				path: '/youtube/v3/channels',
				params: {
					part: 'snippet,contentDetails,statistics,id ',
					mine: 'true'
				}
			});
			let userData = res.result.items[0];
			this.setState({ userData });
			console.log('myData', userData);
			if (userData !== undefined) {
				this.setState({ isLogged: !isLogged });
				this.getPlaylist();
			}
		} catch (err) {
			console.log('Get user channel error', err);
		}
	};

	//CLICK LOGOUT BUTTON, BREAK THE INSTANCE
	handleSignoutClick = async (e) => {
		e.preventDefault();
		try {
			const res = window.gapi.auth2.getAuthInstance().signOut();
			console.log('User disconnected');
			this.setState({ isLogged: false });
		} catch (err) {
			console.log('Error when try to disconnect', err);
		}
	};

	//SEARCH FOR VIDEOS

	getVideos = async (videos) => {
		const newChanVid = videos.toLowerCase();
		if (newChanVid === '') {
			return null;
		}
		try {
			const res = await window.gapi.client.youtube.search.list({
				part: 'snippet',
				maxResults: 25,
				q: newChanVid
			});
			console.log('res', res);
			let videoData = res.result.items;
			this.setState({ videoData });
			console.log('videoData', videoData);
		} catch (err) {
			console.log('No video found', err);
		}
	};

	//USER VIDEO PLAYLIST
	getPlaylist = async (playlist) => {
		const { isLoaded } = this.state;
		playlist = this.state.userData.contentDetails.relatedPlaylists.uploads;
		try {
			const res = await window.gapi.client.youtube.playlistItems.list({
				part: 'snippet',
				playlistId: playlist,
				maxResults: 10
			});
			console.log('COUCOU');
			let newPlaylist = res.result.items;
			this.setState({ newPlaylist });
			if (newPlaylist) {
				this.setState({ isLoaded: true });
				console.log('IsLOADED ?', isLoaded);
			}
			console.log('playlist', newPlaylist);
		} catch (err) {
			console.log("Can't find playlist", err);
		}
	};

	handleChange = async (e) => {
		const value = e.target.value;
		e.preventDefault();
		try {
			this.setState({ [e.target.name]: value });
		} catch (err) {
			console.log('handleChange error', err);
		}
	};
	handleSubmit = async (e) => {
		e.preventDefault();
		const { input } = this.state;
		try {
			this.setState({ input });
			this.getVideos(input);
		} catch (err) {
			console.log('error when sumbit', err);
		}
		console.log('input', input);
	};

	render() {
		const { isLogged, isLoaded, input, userData, videoData, newPlaylist } = this.state;
		const { handleSignoutClick, handleAuthClick, handleChange, handleSubmit } = this;
		console.log('IsLOGGED ?', isLogged);

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
