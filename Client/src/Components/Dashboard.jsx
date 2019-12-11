import React, { Component } from 'react';
import UserDisplay from './UserDisplay';
import { Redirect } from 'react-router-dom';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    const { isLogged } = props;
    this.state = {
      isLogged,
      isLoaded: false,
      input: '',
      videoId: [],
      myPlaylist: [],
    };
  }

  componentDidMount() {
    const { isLogged } = this.state;
    if (isLogged) {
      this.getPlaylist();
    }
  }

  //CLICK LOGOUT BUTTON, BREAK THE INSTANCE
  handleSignoutClick = async () => {
    const { isLogged } = this.state;
    try {
      await window.gapi.auth2.getAuthInstance().signOut();
      console.log('User disconnected');
      this.setState({ isLogged: false });
    } catch (err) {
      console.log('Error when try to disconnect', err);
    }
  };

  //GET USER VIDEOS PLAYLIST
  getPlaylist = async () => {
    const { isLoaded } = this.state;
    const playlist = this.props.user.contentDetails.relatedPlaylists.uploads;
    try {
      const res = await window.gapi.client.youtube.playlistItems.list({
        part: 'snippet',
        playlistId: playlist,
        maxResults: 10,
      });
      let newPlaylist = res.result.items;
      this.setState({ newPlaylist });
      console.log('PLAYLIST', newPlaylist);
      if (newPlaylist) {
        this.setState({ isLoaded: true });
        let videoId = this.state.videoId.slice();
        newPlaylist.map((item, i) => {
          videoId.push(item.snippet.resourceId.videoId);
          //this.state.videoId.push(item.snippet.resourceId.videoId)
        });
        this.setState({ videoId: videoId });
        // console.log('VIDEOID', this.state.videoId);
        // console.log('IsLOADED ?', isLoaded);
        // console.log('playlist', newPlaylist);
      }
    } catch (err) {
      console.log("Can't find playlist", err);
    }
  };

  //SEARCH FOR VIDEOS IN SEARCHBAR
  getVideos = async videos => {
    const newChanVid = videos.toLowerCase();
    if (newChanVid === '') {
      return null;
    }
    try {
      const res = await window.gapi.client.youtube.search.list({
        part: 'snippet',
        maxResults: 9,
        q: newChanVid,
      });
      console.log('res', res);
      let videoData = res.result.items;
      this.setState({ videoData });
      //console.log('videoData', videoData);
    } catch (err) {
      console.log('No video found', err);
    }
  };

  handleChange = async e => {
    const value = e.target.value;
    e.preventDefault();
    try {
      this.setState({ [e.target.name]: value });
    } catch (err) {
      console.log('handleChange error', err);
    }
  };
  handleSubmit = async e => {
    e.preventDefault();
    const { input } = this.state;
    try {
      this.setState({ input });
      this.getVideos(input);
    } catch (err) {
      console.log('error when sumbit', err);
    }
    // console.log('input', input);
  };

  render() {
    const { isLogged, user } = this.props;
    const { input, videoData, newPlaylist, videoId } = this.state;
    const { handleSignoutClick, handleChange, handleSubmit, getPlaylist } = this;
    console.log('IsLOGGED ?', isLogged);

    return !isLogged ? (
      <Redirect to="/" />
    ) : (
      <div className="button-searchBar">
        <UserDisplay
          userData={user}
          videoData={videoData}
          handleSignoutClick={handleSignoutClick}
          handleChange={handleChange}
          input={input}
          handleSubmit={handleSubmit}
          playlist={videoId}
          newPlaylist={newPlaylist}
        />
      </div>
    );
  }
}
