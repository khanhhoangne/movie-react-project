import * as React from 'react';
import Button from '@mui/material/Button';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import httpRequest from '~/utils/httpRequest';



const fetchAndDownloadVideo = async (m3u8Url) => {
  try {
    // Fetch the .m3u8 file using your Axios instance
    const response = await httpRequest.get(m3u8Url);
    const m3u8Content = response.data;

    // Parse the .m3u8 file to extract segment URLs
    const baseUrl = m3u8Url.substring(0, m3u8Url.lastIndexOf('/') + 1);
    const segmentUrls = m3u8Content
      .split('\n')
      .filter((line) => line && !line.startsWith('#'))
      .map((line) => baseUrl + line);

    // Fetch and combine all video segments using Axios
    const videoSegments = await Promise.all(
      segmentUrls.map((url) =>
        httpRequest
          .get(url, { responseType: 'arraybuffer' }) // Fetch binary data for each segment
          .then((res) => new Uint8Array(res.data))
      )
    );

    // Create a Blob from the combined segments
    const blob = new Blob(videoSegments, { type: 'video/mp4' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'video.mp4';
    a.click();
  } catch (error) {
    console.error('Error downloading video:', error);
  }
};





export default function DownloadVideo({ source }) {
  console.log(source);
  
  return (
    <Button
      component="label"
      role={undefined}
      variant="contained"
      tabIndex={-1}
      startIcon={<CloudDownloadIcon />}
      onClick={(event) => fetchAndDownloadVideo(source)}
    >
      Tải xuống
    </Button>
  );
}
