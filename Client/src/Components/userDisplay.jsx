import React, { Component } from 'react';
import './Css/userDisplayCss.css';
import { Video } from './VideoDispay';

export default class UserDisplay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      library: 'My library',
      input: '',
      isEdit: false,
    };
  }

  componentDidMount = async () => {};

  //CHANGE THE LIBRARY TITLE
  toggleEditLibrary = async () => {
    this.setState({ isEdit: !this.state.isEdit });
  };

  handleChange = async e => {
    e.preventDefault();
    const value = e.target.value;
    this.setState({ [e.target.name]: value });
  };

  handleSubmit = async e => {
    e.preventDefault();
    this.setState({ library: this.state.input, isEdit: false });
    if (this.state.input === '') {
      this.setState({ library: 'My library', isEdit: false });
    }
  };

  render() {
    let userData = this.props.userData;
    let profilPic = this.props.userData.snippet.thumbnails.high.url;
    const { handleSubmit, handleChange, toggleEditLibrary } = this;
    const { isEdit, input, library } = this.state;
    const { playlist, videoData, handleSignoutClick } = this.props;
    console.log('Video USERDISPLAY ID', playlist);
    console.log('USERDATA', userData);
    console.log('profilPIC', profilPic);

    return (
      <div>
        <div className="search">
          <div className="card border-light">
            <img src={profilPic} className="card-img-top  rounded-circle" alt="picProfil" />
            {isEdit === true ? (
              <div>
                <form onSubmit={this.props.handleSubmit}>
                  <input
                    className="editInput"
                    name="input"
                    value={this.state.input}
                    onChange={this.props.handleChange}
                  />
                </form>
              </div>
            ) : (
              <p className="card-img-top" onClick={toggleEditLibrary} style={{ cursor: 'pointer' }}>
                {library}
              </p>
            )}
            <form className="inputSearch" onSubmit={this.props.handleSubmit}>
              <div>
                <input value={this.props.input} onChange={this.props.handleChange} name="input" />
                <br />
                <button className="myBtn1 btn-danger" name="submit" onClick={this.props.handleSubmit}>
                  Search Channel
                </button>
              </div>
            </form>
            <button className="myBtn btn btn-danger btn-sm" onClick={this.props.handleSignoutClick}>
              {' '}
              Sign Out{' '}
            </button>
            <br></br>
            {playlist ? <Video videoId={playlist} videoData={videoData} /> : null}
            <div className="card-body">
              <p className="card-text" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}
