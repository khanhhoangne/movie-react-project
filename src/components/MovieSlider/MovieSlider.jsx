import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import MovieItem from '~/components/MovieItem';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

export default function MovieSlider({ title, data }) {
  return (
    <>
      <h2 style={{ color: 'white' }}>{title}</h2>
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
            return (
              <SwiperSlide key={movie._id} >
                <MovieItem movie={movie} />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </>

  );
}