import React, { useState } from 'react'
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import httpRequest from '~/utils/httpRequest';
import { Container, Grid } from '@mui/material';
import VerticalTabs from '~/components/VerticalTabs';
import Pagination from '@mui/material/Pagination';
import PaginationCustom from '~/components/PaginationCustom';

function Watch() {
    const [episode, setEpisode] = useState(null);
    let linkEmbed = null;
    let hiddenScrollTab = false;

    const params = useParams();
    console.log('watch');
    const { data, isLoading, isError, isSuccess, refetch, isFetching } = useQuery('movies_watch', async () => {
        console.log('refetch');
        return await httpRequest.get('phim/' + params.movieSlug);
    }, { refetchOnWindowFocus: false })

    const handleChangeEpisode = (episode) => {
        setEpisode(episode);

    }

    console.log(data);


    if (isLoading || isFetching) {
        return (
            <span className="loader"></span>
        );
    }


    if (data.data.status === undefined) {
        return <h2 style={{ color: 'white' }}>Something wrong, please come back later</h2>;
    }



    if (!data.data.status) {
        return <h2 style={{ color: 'white' }}>{data.data.msg}</h2>;
    }

    if (episode === null) {
        if(data?.data.episodes[0].server_data.length === 0) {
            return <h2 style={{color: 'white'}}>The movie has no data yet, please come back if you see a new episode</h2>;
        }
        
        linkEmbed = data?.data.episodes[0].server_data[0].link_embed;
    } else {
        linkEmbed = data?.data.episodes[0].server_data.filter(i => [episode].includes(i.slug))
        linkEmbed = linkEmbed[0].link_embed;
    }

    if ((data?.data.episodes[0].server_data).length === 1) {
        hiddenScrollTab = true;
    }



    if (isSuccess) {
        return (
            <div style={{ overflowX: 'hidden' }}>


                <iframe
                    src={linkEmbed}
                    frameBorder='0'
                    allow="fullscreen"
                    title='video'
                    width="100%"
                    height={600}
                />
                {
                    !hiddenScrollTab &&  <PaginationCustom current={episode} handleChangeEpisode={handleChangeEpisode} episodes={data?.data.episodes[0].server_data} />

                }

            </div>
        )
    }



}

export default Watch
