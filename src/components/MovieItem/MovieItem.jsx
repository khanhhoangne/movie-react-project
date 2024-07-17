import React from 'react'
import styles from './MovieItem.module.scss';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import DialogMUI from '~/components/DialogMUI';
import httpRequest from '~/utils/httpRequest';
import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import SimpleBackdrop from '~/components/SimpleBackdrop';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function MovieItem({ movie }) {
    const [slug, setSlug] = React.useState(null);
    const [movieDetail, setMovieDetail] = React.useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const getMovieDetail = async () => {
        return await httpRequest.get('phim/' + slug);
    }

    React.useEffect(() => {
        if (slug && isLoading) {
            getMovieDetail()
                .then((data) => {
                    if (data.data.status !== false && data.data.status !== undefined) {
                        setMovieDetail(data.data);
                    }

                    if (data.data.status === undefined) {
                        data = decodeJSON(data.data);
                        setMovieDetail(data);
                    }

                    setIsLoading(false);
                })

        }

    }, [slug, isLoading])



    const handleDialogOver = (e) => {
        const element = e.target;
        const slugData = element.getAttribute("data-slug");
        setIsLoading(true);
        setSlug(slugData);
    }

    const handleDialogExit = (e) => {
        setMovieDetail(null);
    }


    let baseImageURL = import.meta.env.VITE_APP_BASE_URL_CDN;
    let imageURL = (movie.poster_url).replace(baseImageURL, "");

    imageURL = baseImageURL + imageURL;

    return (
        <>
            <SimpleBackdrop open={!movieDetail && slug && isLoading} />
            {slug && movieDetail && <DialogMUI handleDialogExit={handleDialogExit} dataMovie={movieDetail} />}
            <div className={cx('item')}>
                <Image source={imageURL} limitedItems={movie} index={movie._id} />
                <div className={cx('back')}>
                    <div className={cx('movies-title')}>{movie.name}</div>
                    <div className={cx('movies-info')}>{movie.episode_current}</div>
                    <div onClick={handleDialogOver} className={cx('btn-watch-movies-icon')}>
                        <img className={cx('btn-watch-icon-sizes')} data-slug={movie.slug} src="https://miplayvn.com/img/icon/play-button.png" alt="" />
                    </div>
                </div>
            </div>
        </>

    )
}

export default React.memo(MovieItem)
