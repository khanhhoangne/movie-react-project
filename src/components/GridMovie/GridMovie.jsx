import React, { useRef, useState } from 'react'
import styles from './GridMovie.module.scss';
import classNames from 'classnames/bind';
import { Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import DialogMUI from '~/components/DialogMUI';
import httpRequest from '~/utils/httpRequest';
import Pagination from '@mui/material/Pagination';
import SimpleBackdrop from '~/components/SimpleBackdrop';
import Image from '~/components/Image';

const cx = classNames.bind(styles);

function GridMovie({ page, data, limit, onHandlePagination, result }) {
  const [slug, setSlug] = React.useState(null);
  const [movieDetail, setMovieDetail] = React.useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const limitedItems = data.slice((page - 1) * limit, (page - 1) * limit + limit);

  const getMovieDetail = async () => {
    return await httpRequest.get('phim/' + slug);
  }

  React.useEffect(() => {
    if (slug && isLoading) {
      console.log('effect');
      getMovieDetail()
        .then((data) => { 
          if (data.data.status !== false && data.data.status !== undefined) setMovieDetail(data.data) 
          if(data.data.status === undefined) setMovieDetail(decodeJSON(data.data));

          setIsLoading(false);
        });
    }
  }, [slug, isLoading])


  const handleDialogOver = (e) => {
    console.log('over');
    const element = e.target;
    const slugData = element.getAttribute("data-slug");
    setSlug(slugData);
    setIsLoading(true);
  }

  const handleDialogExit = (e) => {
    console.log('handleDialogExit');
    setMovieDetail(null);
  }

  const divideAndRoundUpIfGreaterThanOne = (dividend, divisor) => {
    let result = dividend / divisor;

    if (result > 1) {
      result = Math.ceil(result);
    }

    return result;
  }



  return (
    <>
      {result && <h2 style={{ textAlign: "center", fontWeight: "bold", color: "white", marginTop: "70px" }}>Kết quả tìm kiếm "{result}"</h2>}
      <Grid container spacing={4} sx={{ marginTop: "83px", justifyContent: "center" }}>
        <SimpleBackdrop open={!movieDetail && slug && isLoading} />
        {movieDetail && slug && !isLoading && <DialogMUI handleDialogExit={handleDialogExit} dataMovie={movieDetail} />}
        {
          limitedItems?.map((movie, index) => {
            let baseImageURL = import.meta.env.VITE_APP_BASE_URL_CDN;
            let imageURL = (movie.poster_url).replace(baseImageURL, "");

            imageURL = baseImageURL + imageURL;

            const linked = '/watch/' + movie.slug;


            return (
              <Grid item key={index} className={cx('item')}>
                <div key={index} className="image-item">
                  <Image source={imageURL} limitedItems={limitedItems} index={movie._id} />
                </div>
                <div className={cx('back')}>
                  <div className={cx('movies-title')}>{movie.name}</div>
                  <div className={cx('movies-info')}>{movie.episode_current}</div>
                  <Link onClick={handleDialogOver} relative="path" className={cx('btn-watch-movies-icon')}>
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
