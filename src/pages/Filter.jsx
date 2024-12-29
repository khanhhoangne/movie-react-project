import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { useQuery } from 'react-query';
import httpRequest from '~/utils/httpRequest';
import ScrollableTabs from '~/components/ScrollableTabs';
import GridMovie from '~/components/GridMovie';
import { Box } from '@mui/material';
import SimpleBackdrop from '~/components/SimpleBackdrop';

const types = [
    { name: 'Kinh dị', slug: 'kinh-di' },
    { name: 'Hoạt hình', slug: 'hoat-hinh' },
    { name: 'Tâm lý', slug: 'tam-ly' },
    { name: 'Hài hước', slug: 'hai-huoc' },
    { name: 'Chính kịch', slug: 'chinh-kich' },
    { name: 'Gia đình', slug: 'gia-dinh' },
    { name: 'Viễn tưởng', slug: 'vien-tuong' },
    { name: 'Khoa học', slug: 'khoa-hoc' },
    { name: 'Hành động', slug: 'hanh-dong' },
    { name: 'Tình cảm', slug: 'tinh-cam' },
    { name: 'Bí ẩn', slug: 'bi-an' },
    { name: 'Hình sự', slug: 'hinh-su' },
    { name: 'Chiến tranh', slug: 'chien-tranh' },
];

function Filter() {
    const [movieType, setMovieType] = useState(types[0].slug);
    const [page, setPage] = useState(1);
    const [temp, setTemp] = useState(false);
    const ref = useRef(false);

    useLayoutEffect(() => {
        if (ref.current) {
            console.log(123);
            setTimeout(() => {
                ref.current = false;
                setTemp(!temp);
            }, 2000);
        }
    }, [page, movieType]);

    const { data, isLoading, refetch, isRefetching, isFetching } = useQuery(
        ['movies_all', movieType, page],
        async () => {
            const url =
                movieType === 'hoat-hinh'
                    ? `v1/api/danh-sach/hoat-hinh?page=${page}&limit=15`
                    : `v1/api/the-loai/${movieType}?page=${page}&limit=15`;
            const response = await httpRequest.get(url);
            return response.data.data;
        },
        {
            keepPreviousData: true,
            refetchOnWindowFocus: false,
            staleTime: 50000000,
        }
    );


    const handleChangeMovieType = (e) => {
        ref.current = true;
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        const element = e.target;
        const categoryData = element.getAttribute('data-category');
        setMovieType(categoryData);
        setPage(1);
    };

    const handlePagination = (e) => {
        ref.current = true;
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });

        setPage(parseInt(e.target.innerText));
    };

    console.log(data);
    


    return (
        <>
            <Box>
                <ScrollableTabs onChangeMovieType={handleChangeMovieType} types={types} />
            </Box>
            {(isFetching || (isRefetching && ref.current)) && <SimpleBackdrop open={true} />}
            {data?.items.length > 0 && (
                <GridMovie
                    page={page}
                    data={data.items}
                    limit={15}
                    total={data.params.pagination.totalItems}
                    onHandlePagination={handlePagination}
                />
            )}
        </>
    );
}

export default Filter;
