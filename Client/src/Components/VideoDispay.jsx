import React from 'react';

const VID_URL = 'https://www.youtube.com/embed/';

export const Video = ({ videoId, videoData }) => {
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
                    <i style={{ cursor: 'pointer' }} className="fas fa-plus-circle"></i>
                  </div>
                </div>
              ))}
            </form>
          </div>
        </div>
      )}
    </>
  );
};
