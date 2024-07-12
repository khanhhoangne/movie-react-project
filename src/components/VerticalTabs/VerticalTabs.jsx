import * as React from 'react';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function VerticalTabs({ episodes, handleChangeEpisode }) {
    console.log(episodes);
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{borderRadius: '50px', flexGrow: 1, bgcolor: 'background.paper', display: 'flex', height: 224, padding: '200px 23px', marginLeft: '109px' }}
    >
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        sx={{ borderRight: 1, borderColor: 'divider', height: '250px' }}
      >
        {
            episodes.server_data.map((episode, index) => {
                return (
                    <Tab onClick={handleChangeEpisode} data-episode={episode.slug} label={episode.name} />
                )
            })
        }
      </Tabs>
   
    </Box>
  );
}