import * as React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper/modules';
import MovieItem from '~/components/MovieItem';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ArrowCircleLeftIcon from '@mui/icons-material/ArrowCircleLeft';
import ArrowCircleRightIcon from '@mui/icons-material/ArrowCircleRight';

const styled = {
  position: 'absolute',
  height: '100%',
  backgroundImage: 'linear-gradient(to right, rgba(0, 0, 0, 0.7) 40%, rgba(0, 0, 0, 0))',
  backgroundColor: 'none',
  width: '100%',
  top: 0,
  left: 0
};

const MovieSlider = ({ title, data, prevButtonClass, nextButtonClass }) => {
  return (
    <>
      <h2 style={{ color: 'white', letterSpacing: '2px' }}>{title}</h2>
      {/* Custom Navigation Buttons */}

      <div className={prevButtonClass}  >
        <ArrowCircleLeftIcon sx={styledArrows} />
      </div>
      <div className={nextButtonClass}  >
        <ArrowCircleRightIcon sx={styledArrowsRight} />
      </div>

      <Swiper
        slidesPerView={1}
        spaceBetween={0}
        pagination={{
          clickable: true,
        }}
        navigation={{
          nextEl: `.${nextButtonClass}`, // Use dynamic class for next button
          prevEl: `.${prevButtonClass}`, // Use dynamic class for prev button
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
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 6,
            spaceBetween: 40,
          },
          1920: {
            slidesPerView: 7,
            spaceBetween: 20,
          },
        }}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >


        <div className="shadows" style={styled}></div>
        {data?.map((movie) => (
          <SwiperSlide key={movie._id}>
            <MovieItem movie={movie} />
          </SwiperSlide>
        ))}


      </Swiper>



    </>
  );
};

const styledArrows = {
  position: 'absolute',
  left: '10px', // Adjust position for better placement
  zIndex: 2,
  fontSize: '39px',
  cursor: 'pointer',
  marginTop: '8%',
  color: 'white',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add background for better contrast
  borderRadius: '50%', // Make it circular
  padding: '5px', // Add padding for balance
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.9)', // Subtle and soft shadow
};

const styledArrowsRight = {
  position: 'absolute',
  right: '10px', // Adjust position for better placement
  zIndex: 2,
  fontSize: '39px',
  cursor: 'pointer',
  marginTop: '8%',
  color: 'white',
  backgroundColor: 'rgba(0, 0, 0, 0.5)', // Add background for better contrast
  borderRadius: '50%', // Make it circular
  padding: '5px', // Add padding for balance
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.9)', // Subtle and soft shadow
};



export default MovieSlider;
