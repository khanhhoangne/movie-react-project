import * as React from 'react';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

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

    return (
        <div>
            <Stack spacing={1} alignItems="center">
                <Stack direction="row" spacing={1}>
                    {startIdx > 0 && (
                        <>
                            <Chip sx={{ fontWeight: 'bold', color: 'white' }} onClick={() => handleChangeEpisode(episodes[0].slug)} label={episodes[0].name} color="primary" variant="outlined" />
                            {startIdx > 1 && <Chip sx={{ fontWeight: 'bold', color: 'white' }} label="..." color="primary" variant="outlined" />}
                        </>
                    )}

                    {episodesToShow.map((episode) => (
                        <Chip className={(episode.slug === currentEpisode ? 'button-active': '')} sx={{ fontWeight: 'bold', color: 'white' }} key={episode.slug} onClick={() => handleChangeEpisode(episode.slug)} label={episode.name} color="primary" variant="outlined" />
                    ))}

                    {endIdx < episodes.length - 1 && (
                        <>
                            {endIdx < episodes.length - 2 && <Chip sx={{ fontWeight: 'bold', color: 'white' }} label="..." color="primary" variant="outlined" />}
                            <Chip sx={{ fontWeight: 'bold', color: 'white' }} onClick={() => handleChangeEpisode(episodes[episodes.length - 1].slug)} label={episodes[episodes.length - 1].name} color="primary" variant="outlined" />
                        </>
                    )}
                </Stack>
            </Stack>
        </div>
    );
};

export default PaginationCustom;