import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import styles from './Custom.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function ScrollableTabs({ types, onChangeMovieType }) {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };  

  return (
    <Box className={cx('tabs')} sx={{ zIndex:"999999999999999999", position:'fixed', maxWidth: { xs: 320, sm: 480 }, bgcolor: 'background.paper', borderRadius: '25px', top: '50%', left: '50%', marginTop:'-333px', marginLeft:'-270px'}}>
      <Tabs
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons="auto"
        aria-label="scrollable auto tabs example"
        sx={{ outline:'none' }}
      >
        {types.map((type) => {
            return (
                <Tab sx={{ outline:'none' }} onClick={onChangeMovieType} data-category={type.slug} key={type.slug} label={type.name} />
            )
        })}
      </Tabs>
    </Box>
  );
}