import React from 'react'
import styles from './MainMovie.module.scss';
import classNames from 'classnames/bind';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderMain from "react-slick";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';

const cx = classNames.bind(styles);

function MainMovie({ data }) {

  console.log('Main');

  if (data !== undefined) {
    data = [data, data, data, data];
  }

  const settings = {
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    cssEase: "linear",
    speed: 700,
    accessibility: false
  };

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={10}
      pagination={{
        clickable: true,
      }}
      breakpoints={{
        640: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 40,
        },
        1024: {
          slidesPerView: 1,
          spaceBetween: 20,
        },
      }}
      modules={[Pagination]}
      className="mySwiper"
    >
      {
        data?.map((movie, index) => {
          return (
            <SwiperSlide key={index} className={cx('img-item')}>
              <img className={cx('img-item-slide')} width="100%" src={movie.thumb_url} />

              <div className={cx('opacity-background')}>
                <div className={cx('item-des', 'top-down')} >
                  <h2 className={cx('item-tilte')}>
                    {movie.origin_name}
                  </h2>
                  <div className={cx('btn-1')}>
                    <a href="#" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LiveTvIcon /> <span style={{ marginLeft: '9px' }}>Xem Ngay</span></a>
                  </div>
                  <div>
                    {movie.content}
                  </div>
                </div>

              </div>

              {/* <div className={cx('opacity-background')}>
      
        </div> */}
            </SwiperSlide>
          )
        })
      }
    </Swiper>

  )
}

export default MainMovie
