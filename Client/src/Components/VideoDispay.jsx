import React, { Component } from 'react';

const VID_URL = 'https://www.youtube.com/embed/';

export class Video extends Component {
  constructor(props) {
    super();
    this.state = {
      myPlaylist: [],
    };
  }

  // componentDidMount = async () => {};

  // handleSubmit = async e => {
  //   const { newPlaylist } = this.props;
  //   if (!newPlaylist.snippet) {
  //     return null;
  //   }
  //   const title = newPlaylist.snippet.title;
  //   const thumbnailsHighUrl = newPlaylist.snippet.thumbnails.high.url;
  //   const thumbnailsMediumUrl = newPlaylist.snippet.thumbnails.medium.url;
  //   const thumbnailsDefaultUrl = newPlaylist.snippet.thumbnails.default.url;

  //   try {
  //     const res = await window.gapi.client.youtube.playlists.insert({
  //       part: 'snippet',
  //       resource: {
  //         snippet: {
  //           title: title,
  //           thumbnails: {
  //             high: {
  //               url: thumbnailsHighUrl,
  //               height: 360,
  //               width: 480,
  //             },
  //             medium: {
  //               url: thumbnailsMediumUrl,
  //               height: 180,
  //               width: 320,
  //             },
  //             default: {
  //               url: thumbnailsDefaultUrl,
  //               height: 90,
  //               width: 120,
  //             },
  //           },
  //         },
  //       },
  //     });
  //     this.setState({ myPlaylist: res });
  //   } catch (err) {
  //     console.log("can't add to user playlist", err);
  //   }
  // };

  render() {
    const { videoId, videoData, newPlaylist } = this.props;

    if (!videoId) {
      return null;
    }

    return (
      <>
        <div className="displayVid">
          {videoId.map((vid, i) => (
            <iframe
              key={i}
              width={'200'}
              height={'200'}
              src={`${VID_URL}${vid}`}
              frameBorder="0"
              allow="autoplay; encrypted-media"
              allowFullScreen
            />
          ))}
        </div>
        {videoData && (
          <div className="card-group">
            <div className="card">
              <form className="displaySearch">
                {videoData.map((vids, i) => (
                  <div key={i}>
                    <iframe
                      width={'auto'}
                      height={'auto'}
                      src={`${VID_URL}${vids.id.videoId}`}
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    />
                    <div>
                      <i onClick={this.handleSubmit} style={{ cursor: 'pointer' }} className="fas fa-plus-circle"></i>
                    </div>
                  </div>
                ))}
              </form>
            </div>
          </div>
        )}
      </>
    );
  }
}
