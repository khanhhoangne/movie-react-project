import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import MovieItem from '~/components/MovieItem';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

const styled = {
  position: 'absolute',
  height: '100%',
  backgroundImage: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1.5) 80%, rgba(0, 0, 0, 1) 100%)',
  backgroundColor: 'none',
  width: '100%',
  top: 0,
  left: 0
}

export default function MovieSlider({ title, data }) {
  const [indexActive, setIndexActive] = React.useState(0);

  let baseImageURL = import.meta.env.VITE_APP_BASE_URL_CDN;
  let imageURL = (data?.at(indexActive)?.thumb_url ?? '').replace(baseImageURL, "");

  imageURL = baseImageURL + imageURL;
  return (
    <>
      <h2 style={{ color: 'white' }}>{title}</h2>
      <Swiper
        onSlideChange={(swiper) => setIndexActive(swiper.activeIndex)}

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
        style={{background: `url(${imageURL})`}}
      >
        <div style={styled}></div>
        {
          data?.map((movie, index) => {
            return (
              <SwiperSlide key={movie._id}>
                <MovieItem movie={movie} />
              </SwiperSlide>
            )
          })
        }
      </Swiper>
    </>

  );
}