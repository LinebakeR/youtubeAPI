import React from 'react';

const VID_URL = 'https://www.youtube.com/embed/';

export const Video = ({ videoId, videoData }) => {
  if (!videoId) {
    return null;
  }

  console.log('VIDEODISPLAY ID ', videoId);
  console.log('VIDEODATA ID ', videoData);
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
        <div className="col">
          <form className="displaySearch">
            {videoData.map((vids, i) => (
              <iframe
                key={i}
                width={'auto'}
                height={'auto'}
                src={`${VID_URL}${vids.id.videoId}`}
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            ))}
          </form>
        </div>
      )}
    </>
  );
};
