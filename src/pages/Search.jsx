import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query';
import httpRequest from '~/utils/httpRequest';
import GridMovie from '~/components/GridMovie';
import { AppContext } from '~/contexts/AppContext';
import { useContext } from 'react';


function Search() {
    const context = useContext(AppContext);
    console.log(context.theme);
    const params = useParams();
    const query = encodeURIComponent(params.query);

    const { data, isLoading, isError, isSuccess, refetch, isFetching } = useQuery('movies_search', async () => {
        return await httpRequest.get('v1/api/tim-kiem?keyword=' + query + "&limit=20");
    }, { refetchOnWindowFocus: false })


    if (isLoading || isFetching) {
        return (
            <span className="loader"></span>
        );
    }

    return (
        <>
            <GridMovie page={1} data={data?.data.data.items} limit={20} result={params.query} />
        </>
    )
}

export default Search
