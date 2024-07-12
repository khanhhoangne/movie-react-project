import React, { useState } from 'react'
import styles from './GridMovie.module.scss';
import classNames from 'classnames/bind';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import DialogMUI from '~/components/DialogMUI';
import httpRequest from '~/utils/httpRequest';
import Pagination from '@mui/material/Pagination';
import LazyLoad from 'react-lazyload';
import Skeleton from '@mui/material/Skeleton';
import ConvertedImage from "~/components/PaginationCustom"


const cx = classNames.bind(styles);

function GridMovie({ page, data, limit, onHandlePagination }) {
  const [loadedImages, setLoadedImages] = useState([]);
  const [slug, setSlug] = React.useState(null);
  const [movieDetail, setMovieDetail] = React.useState(null);
  const limitedItems = data.slice((page - 1) * limit, (page - 1) * limit + limit);

  console.log('limit', limitedItems);
  console.log('page', page);

  const getMovieDetail = async () => {
    console.log(111);
    return await httpRequest.get('phim/' + slug);
  }

  React.useEffect(() => {
    if (slug) {
      getMovieDetail()
        .then((data) => { if (data.data.status !== false) setMovieDetail(data) });
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

  const divideAndRoundUpIfGreaterThanOne = (dividend, divisor) => {
    let result = dividend / divisor;  // Perform the division

    if (result > 1) {
      result = Math.ceil(result);  // Round up using Math.ceil() if result is greater than 1
    }

    return result;
  }

  const handleImageLoad = (imageId) => {
    // setLoadedImages(prevState => [...prevState, imageId]); 
  };

  return (
    <>
      <Grid container spacing={5} sx={{ marginTop: "45px", justifyContent: "center" }}>
        {slug && movieDetail && <DialogMUI handleDialogExit={handleDialogExit} dataMovie={movieDetail} />}
        {
          limitedItems?.map((movie, index) => {
            let baseImageURL = import.meta.env.VITE_APP_BASE_URL_CDN;
            let imageURL = (movie.poster_url).replace(baseImageURL, "");

            imageURL = baseImageURL + imageURL;

            const linked = '/watch/' + movie.slug;


            return (
              <Grid item key={index} className={cx('item')}>  
                {/* <ConvertedImage imageUrl={movie} /> */}
                <img style={{ objectFit:"cover" }} width={220} height={341} src={imageURL} alt="Empty Image" />

                <div className={cx('back')}>
                  <div className={cx('movies-title')}>{movie.name}</div>
                  <div className={cx('movies-info')}>{movie.episode_current}</div>
                  <Link to={{ pathname: linked }} onMouseEnter={handleDialogOver} relative="path" className={cx('btn-watch-movies-icon')}>
                    <img className={cx('btn-watch-icon-sizes')} data-slug={movie.slug} src="https://miplayvn.com/img/icon/play-button.png" alt="" />
                  </Link>
                </div>
              </Grid>
            )
          })
        }
      </Grid>
      <div>
        <Pagination variant="outlined" shape="rounded" page={page} onClick={onHandlePagination} sx={{ display: 'ruby-text', marginTop: '20px', color: 'white' }} count={divideAndRoundUpIfGreaterThanOne(data.length, limit)} color="primary" />
      </div>
    </>
  )
}

export default GridMovie
