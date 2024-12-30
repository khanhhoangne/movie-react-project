import React, { Fragment, createRef, useRef, useState } from 'react'
import MovieSlider from '~/components/MovieSlider'
import MainMovie from '~/components/MainMovie'
import httpRequest from '~/utils/httpRequest';
import { useQuery } from 'react-query';
import SimpleBackdrop from '~/components/SimpleBackdrop';
import { isAuthenticated } from '~/servies/firebase';
import Banner from '~/components/Banner';

const mainMovies = [
  'nhat-ky-hai-trinh-one-piece-truyen-ky-dao-nguoi-ca',
  'dau-bep-phan-3',
  'cong-ty-quai-vat-2021',
  'gau-pooh-mau-va-mat-2'
]


const bannerMovies = [
  'cau-be-rung-xanh-1999',
  'tro-choi-sat-nhan',
  'tro-choi-con-muc-phan-2',
  'thanh-guom-diet-quy-dai-tru-dac-huan'
]

const LIMIT_MOVIES = 15;


function Home() {
  

  const titleSection = ["Phim mới cập nhật", "Phim hoạt hình", "TV Shows", "Phim lẻ", "Phim bộ"];

  const { data: queryLatestData, loading: queryLatestLoading, error: queryLatestError } = useQuery('movies_latest_home', async () => {
    return await httpRequest.get('danh-sach/phim-moi-cap-nhat');
  }, { refetchOnWindowFocus: false })

  const { data: queryCartoonData, loading: queryCartoonLoading, error: queryCartoonError } = useQuery('movies_cartoon_home', async () => {
    return await httpRequest.get('v1/api/danh-sach/hoat-hinh');
  }, { refetchOnWindowFocus: false })

  const { data: queryShowData, loading: queryShowLoading, error: queryShowError } = useQuery('movies_show_home', async () => {
    return await httpRequest.get('v1/api/danh-sach/tv-shows?page=2');
  }, { refetchOnWindowFocus: false })

  const { data: querySingleData, loading: querySingleLoading, error: querySingleError } = useQuery('movies_single_home', async () => {
    return await httpRequest.get('v1/api/danh-sach/phim-le');
  }, { refetchOnWindowFocus: false })

  const { data: querySeriesData, isLoading: querySeriesLoading, error: querySeriesError } = useQuery('movies_series_home', async () => {
    return await httpRequest.get('v1/api/danh-sach/phim-bo');
  }, { refetchOnWindowFocus: false })

  const { data: queryMainData, isLoading: mainLoading } = useQuery('movies_main_home', async () => {

    const requests = mainMovies.map(async (page) => await httpRequest.get(`phim/${page}`));

    return await Promise.all(requests);
  }, { refetchOnWindowFocus: true })

  const { data: randomMovieData, isLoading: randomMovieLoading } = useQuery(
    'random_movie', 
    async () => {
      const randomMovie = bannerMovies[Math.floor(Math.random() * bannerMovies.length)];
      return await httpRequest.get(`phim/${randomMovie}`);
    },
    { refetchOnWindowFocus: false }
  );  


  const isLoading =
    queryLatestLoading ||
    queryCartoonLoading ||
    queryShowLoading ||
    querySingleLoading ||
    querySeriesLoading ||
    mainLoading ||
    randomMovieLoading;

  if (isLoading) {
    return <SimpleBackdrop open={true} />;
  }

  console.log('randomMovieData', randomMovieData.data.movie);
  

  return (
    <Fragment>
      <div className='smoke'>
        <MainMovie data={queryMainData} />
        <MovieSlider title={titleSection[0]} data={queryLatestData?.data.items} />

        <Banner movie={randomMovieData.data.movie} />
      
        <MovieSlider title={titleSection[1]} data={queryCartoonData?.data.data.items} />
        <MovieSlider title={titleSection[2]} data={queryShowData?.data.data.items} />
        <MovieSlider title={titleSection[3]} data={querySingleData?.data.data.items} />
        <MovieSlider title={titleSection[4]} data={querySeriesData?.data.data.items} />
      </div>
    </Fragment>
  )
}

export default Home
