import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';

const VideoPlayer = ({ m3u8Url }) => {
  const videoRef = useRef(null);

  useEffect(() => {
    if (videoRef.current) {
      const video = videoRef.current;

      if (Hls.isSupported()) {
        const hls = new Hls();
        hls.loadSource(m3u8Url);
        hls.attachMedia(video);

        hls.on(Hls.Events.MANIFEST_PARSED, () => {
          video.play();
        });

        hls.on(Hls.Events.ERROR, (event, data) => {
          console.error('HLS.js Error: ', data);
        });

        return () => {
          hls.destroy();
        };
      } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
        video.src = m3u8Url;
        video.addEventListener('loadedmetadata', () => {
          video.play();
        });
      } else {
        console.error('Trình duyệt không hỗ trợ HLS.');
      }
    }
  }, [m3u8Url]);

  return (
    <div>
      <video ref={videoRef} controls style={{ width: '100%', height: 'auto' }} />
    </div>
  );
};

export default VideoPlayer;
