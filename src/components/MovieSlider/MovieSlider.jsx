import * as React from 'react';
import styles from './MovieSlider.module.scss';
import classNames from 'classnames/bind';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import LazyLoad from 'react-lazyload';
import { Link } from 'react-router-dom';
import DialogMUI from '~/components/DialogMUI';
import httpRequest from '~/utils/httpRequest';
import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';



// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';


const cx = classNames.bind(styles);


export default function MovieSlider({ title, data }) {

  console.log('slider', data);
  const [slug, setSlug] = React.useState(null);
  const [movieDetail, setMovieDetail] = React.useState(null);
  const [imageLoaded, setImageLoaded] = useState(Array(data).fill(false));

  const handleImageLoad = (index) => {
    console.log('setted');
    setImageLoaded((prevLoaded) => {
      const newLoaded = [...prevLoaded];
      newLoaded[index] = true;
      return newLoaded;
    });
  };

  const getMovieDetail = async () => {
    return await httpRequest.get('phim/' + slug);
  }

  React.useEffect(() => {
    if (slug) {
      getMovieDetail()
        .then((data) => { if (data.data.status !== false && data.data.status !== undefined) {
          setMovieDetail(data);
        } });
    }
  }, [slug])



  const handleDialogOver = (e) => {
    const element = e.target;
    const slugData = element.getAttribute("data-slug");
    setSlug(slugData);
  }

  const handleDialogExit = (e) => {
    console.log('handleDialogExit');
    setMovieDetail(null);
  }

  const handleDragStart = (e) => e.preventDefault();

  return (
    <>
      <h2 style={{ color: 'white' }}>{title}</h2>
      {slug && movieDetail && <DialogMUI handleDialogExit={handleDialogExit} dataMovie={movieDetail} />}
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        pagination={{
          clickable: true,
        }}
        breakpoints={{
          330: {
            slidesPerView: 2,
            spaceBetween: -25,
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 20,
          },
          1920: {
            slidesPerView: 7,
            spaceBetween: 20,
          }
        }}
        modules={[Pagination]}
        className="mySwiper"
      >
        {
          data?.map((movie, index) => {
            let baseImageURL = import.meta.env.VITE_APP_BASE_URL_CDN;
            let imageURL = (movie.poster_url).replace(baseImageURL, "");
            const linked = 'watch/' + movie.slug;

            imageURL = baseImageURL + imageURL;

            return (
              <SwiperSlide key={movie._id} className={cx('item')}>
                <div key={index} className="image-item">
                  <img
                    style={{ objectFit: `${!imageLoaded[index]} ? '' : 'cover'` }}
                    alt={`Image ${index}`}
                    className={cx('img-item')} src={!imageLoaded[index] ? 'https://imgur.com/ikQanUS.gif' : imageURL}
                    onLoad={() => handleImageLoad(index)}
                  />
                </div>
                <div className={cx('back')}>
                  <div className={cx('movies-title')}>{movie.name}</div>
                  <div className={cx('movies-info')}>{movie.episode_current}</div>
                  <Link to={linked} onMouseEnter={handleDialogOver} className={cx('btn-watch-movies-icon')}>
                    <img className={cx('btn-watch-icon-sizes')} data-slug={movie.slug} src="https://miplayvn.com/img/icon/play-button.png" alt="" />
                  </Link>
                </div>
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </>

  );
}