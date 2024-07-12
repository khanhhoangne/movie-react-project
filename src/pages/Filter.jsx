import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import axios from 'axios';
import { useQuery } from 'react-query';
import httpRequest from '~/utils/httpRequest';
import ScrollableTabs from '~/components/ScrollableTabs';
import { useLayoutEffect } from 'react';
import getData from '~/hooks/getData';
import GridMovie from '~/components/GridMovie';
import ConvertImage from '~/components/PaginationCustom';
import SpeedDialMUI from '~/components/SpeedDialMUI';

const types = [
    {
        name: 'Kinh dị',
        slug: 'kinh-di'
    },
    {
        name: 'Hoạt hình',
        slug: 'hoat-hinh',
    },
    {
        name: 'Tâm lý',
        slug: 'tam-ly'
    },
    {
        name: 'Hài hước',
        slug: 'hai-huoc'
    },
    {
        name: 'Chính kịch',
        slug: 'chinh-kich'
    },
    {
        name: 'Gia đình',
        slug: 'gia-dinh'
    },
    {
        name: 'Giả tưởng',
        slug: 'gia-tuong'
    },
    {
        name: 'Viễn tưởng',
        slug: 'vien-tuong'
    },
    {
        name: 'Khoa học',
        slug: 'khoa-hoc'
    },
    {
        name: 'Hành động',
        slug: 'hanh-dong'
    },
    {
        name: 'Tình cảm',
        slug: 'tinh-cam'
    },
    {
        name: 'Bí ẩn',
        slug: 'bi-an'
    },
    {
        name: 'Hình sự',
        slug: 'hinh-su'
    },
    {
        name: 'Chiến tranh',
        slug: 'chien-tranh'
    }
]

let url = `v1/api/danh-sach/phim-le?limit=64`;
let urlSeries = `v1/api/danh-sach/phim-bo?limit=64`;
let urlCartoon = `v1/api/danh-sach/hoat-hinh?limit=64`

function Filter() {
    const [movieType, setMovieType] = useState(types[0].slug);
    const [page, setPage] = useState(1);
    const [temp, setTemp] = useState(false);
    const ref = useRef(false);
    useEffect(() => {
        if(ref.current) {
            console.log(123);
            setTimeout(() => {
                ref.current = false;
                setTemp(!temp);
            }, 1000) // Delay of 1000 milliseconds
            
        }
    }, [page, movieType])

    const { data, isLoading, refetch, isRefetching, isStale } = useQuery('movies_all', async () => {
        const singlePages = Array.from({ length: 192 }, (_, i) => `${url}&page=${i + 1}`);
        const seriesPages = Array.from({ length: 44 }, (_, i) =>  `${urlSeries}&page=${i + 1}`);
        const cartoonPages = Array.from({ length: 27 }, (_, i) =>  `${urlCartoon}&page=${i + 1}`);

        const mappingPages = [singlePages, seriesPages, cartoonPages].flat(1);

        const requests = mappingPages.map(async (page) => await httpRequest.get(page));

        return await Promise.all(requests);

    }, { refetchOnWindowFocus: false, staleTime: 50000000 })

    console.log('data', data);

    const listMovies = data?.reduce((accumulator, current) => [...accumulator, current.data.data.items], []).flat(1);
    console.log('merge', listMovies);

    const handleChangeMovieType = (e) => {
        ref.current = true;
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        
        const element = e.target;
        const categoryData = element.getAttribute("data-category");
        setMovieType(categoryData);
        setPage(1);
    }

    const listMoviesByFilter = listMovies?.filter(movie => {
        let flag = false;
        movie.category.map(category => {
            if ((movieType === category.slug)) {
                flag = true;
            }
        })

        if (movieType.replace('-', '') == movie.type) return true;

        return flag;
    });

    listMoviesByFilter?.sort((a, b) => b.year - a.year);

    const handlePagination = (e) => {
        ref.current = true;
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        
        setPage(parseInt(e.target.innerText));
    }

    console.log('listResult', listMoviesByFilter);

    const mustBeLoading = ( ref.current || isLoading || isRefetching || listMovies.length === 0);

    console.log('mustBeLoading', mustBeLoading);
    const mobileDevice = window.innerWidth <= 765;

    return (
        <>
            {/* {mobileDevice && !mustBeLoading && <ScrollableTabs onChangeMovieType={handleChangeMovieType} types={types} />} */}
            { <ScrollableTabs onChangeMovieType={handleChangeMovieType} types={types} />}
            {mustBeLoading && <span className="loader"></span>}
            {!mustBeLoading && listMovies && listMovies.length > 0 && <GridMovie page={page} data={listMoviesByFilter} limit={20} onHandlePagination={handlePagination} />}
        </>
    )
}

export default Filter
