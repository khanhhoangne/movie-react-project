import React from 'react'
import styles from './MainMovie.module.scss';
import classNames from 'classnames/bind';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderMain from "react-slick";
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);

function MainMovie({ data }) {

  console.log('Main', data);

  
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
              <img className={cx('img-item-slide')} width="100%" src={movie.data.movie.thumb_url} />

              <div className={cx('opacity-background')}>
                <div className={cx('item-des', 'top-down')} >
                  <h2 className={cx('item-tilte')}>
                    {movie.data.movie.origin_name}
                  </h2>
                  <div className={cx('btn-1')}>
                    <Link to={`/watch/${movie.data.movie.slug}`} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LiveTvIcon /> <span style={{ marginLeft: '9px' }}>Xem Ngay</span></Link>
                  </div>
                  <div>
                    {movie.data.movie.content}
                  </div>
                </div>

              </div>

              <div className={cx('smoke')}></div>

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
