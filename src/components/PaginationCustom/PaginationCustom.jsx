import * as React from 'react';
import { Button, Stack } from '@mui/material';
import { Padding } from '@mui/icons-material';

const PaginationCustom = ({ episodes, current, handleChangeEpisode }) => {
    const currentEpisode = current ?? episodes[0].slug;
    const maxDisplayedPages = 3; // Maximum number of items to display around the current episode

    const currentIndex = episodes.findIndex(episode => episode.slug === currentEpisode);

    let startIdx = Math.max(0, currentIndex - Math.floor((maxDisplayedPages - 1) / 2));
    let endIdx = Math.min(episodes.length - 1, startIdx + maxDisplayedPages - 1);

    if (endIdx === episodes.length - 1 && startIdx > 0) {
        startIdx = Math.max(0, episodes.length - maxDisplayedPages);
    }

    const episodesToShow = episodes.slice(startIdx, endIdx + 1);

    const buttonStyle = {
        textTransform: 'none',
        fontWeight: 'bold',
        opacity: 0.5,
        background: 'gray',
        transition: 'background 0.3s ease, opacity 0.3s ease',
        '&:hover': {
            background: '#696cc0',
            opacity: 1,
        },
        color: 'white',
    };

    const activeButtonStyle = {
        ...buttonStyle,
        background: '#696cc0', // Same as hover style
        opacity: 1,
    };

    const disabledButtonStyle = {
        ...buttonStyle,
        fontWeight: 'bold',
        color: 'white',
        opacity: 0.7,
    };

    const disabledTextStyle = {
        fontWeight: 'bold',
        color: 'white',
    };

    return (
        <div style={{ marginTop:'18px' }}>
            <Stack spacing={1} alignItems="center">
                <Stack direction="row" spacing={1}>
                    {startIdx > 0 && (
                        <>
                            <Button 
                                variant="contained"
                                sx={buttonStyle} 
                                onClick={() => handleChangeEpisode(episodes[0].slug)}
                            >
                                {episodes[0].name}
                            </Button>
                            {startIdx > 1 && (
                                <Button sx={disabledButtonStyle} disabled>
                                    <span style={disabledTextStyle}>...</span>
                                </Button>
                            )}
                        </>
                    )}

                    {episodesToShow.map((episode) => (
                        <Button
                            variant="contained"
                            sx={episode.slug === currentEpisode ? activeButtonStyle : buttonStyle}
                            key={episode.slug}
                            onClick={() => handleChangeEpisode(episode.slug)}
                        >
                            {episode.name}
                        </Button>
                    ))}

                    {endIdx < episodes.length - 1 && (
                        <>
                            {endIdx < episodes.length - 2 && (
                                <Button  sx={disabledButtonStyle} disabled>
                                    <span style={disabledTextStyle}>...</span>
                                </Button>
                            )}
                            <Button 
                                variant="contained"
                                sx={buttonStyle} 
                                onClick={() => handleChangeEpisode(episodes[episodes.length - 1].slug)}
                            >
                                {episodes[episodes.length - 1].name}
                            </Button>
                        </>
                    )}
                </Stack>
            </Stack>
        </div>
    );
};

export default PaginationCustom;
