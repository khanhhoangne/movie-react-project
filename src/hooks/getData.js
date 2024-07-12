import React from 'react'
import { useQuery } from 'react-query';
import httpRequest from '~/utils/httpRequest';
import { useState, useEffect } from 'react';

function getData(url) {
    const [data, setData] = useState();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await httpRequest.get(url);
                setData(response.data);
            } catch (error) {}
        };

        fetchData();
    }, [url]);


    return data;
}

export default getData
