import * as React from 'react';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';


export default function CustomizeButton() {
  return (
    <Button
      variant="contained"
      sx={{
        textTransform: 'none',
        fontWeight: 'bold',
        opacity: 0.5,
        background: 'gray',
        transition: 'background 0.3s ease, opacity 0.3s ease', // Smooth transition
        '&:hover': {
          background: '#696cc0', // Change to a little blue on hover
          opacity: 1, // Set opacity to 1 on hover
        },
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <PlayArrowIcon />
        <strong style={{ marginTop: '2px' }}>Xem ngay</strong>
      </div>
    </Button>
  );
}