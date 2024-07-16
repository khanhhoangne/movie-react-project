import React, { Fragment, createRef, useRef, useState } from 'react'
import MovieSlider from '~/components/MovieSlider'
import MainMovie from '~/components/MainMovie'
import httpRequest from '~/utils/httpRequest';
import { useQuery } from 'react-query';
import SimpleBackdrop from '~/components/SimpleBackdrop';

const mainMovies = [
  'truyen-co-hac-am-grimm',
  'hanh-tinh-khi-vuong-quoc-moi',
  'cong-ty-quai-vat-2021',
  'gau-pooh-mau-va-mat-2'
]

function Home() {
  console.log('home');
  const LIMIT_MOVIES = 10;

  const titleSection = ["Phim mới cập nhật", "Phim hoạt hình", "TV Shows", "Phim lẻ", "Phim bộ"];

  const { data: queryLatestData, loading: queryLatestLoading, error: queryLatestError } = useQuery('movies_latest_home', async () => {
    return await httpRequest.get('danh-sach/phim-moi-cap-nhat');
  },{refetchOnWindowFocus: false})

  const { data: queryCartoonData, loading: queryCartoonLoading, error: queryCartoonError } = useQuery('movies_cartoon_home', async () => {
    return await httpRequest.get('v1/api/danh-sach/hoat-hinh');
  },{refetchOnWindowFocus: false})

  const { data: queryShowData, loading: queryShowLoading, error: queryShowError } = useQuery('movies_show_home', async () => {
    return await httpRequest.get('v1/api/danh-sach/tv-shows?page=2');
  },{refetchOnWindowFocus: false})

  const { data: querySingleData, loading: querySingleLoading, error: querySingleError } = useQuery('movies_single_home', async () => {
    return await httpRequest.get('v1/api/danh-sach/phim-le');
  },{refetchOnWindowFocus: false})

  const { data: querySeriesData, isLoading: querySeriesLoading, error: querySeriesError } = useQuery('movies_series_home', async () => {
    return await httpRequest.get('v1/api/danh-sach/phim-bo');
  },{refetchOnWindowFocus: false})

  const { data: queryMainData, isLoading: mainLoading } = useQuery('movies_main_home', async () => {

    const requests = mainMovies.map(async (page) => await httpRequest.get(`phim/${page}`));

    return await Promise.all(requests);
  },{refetchOnWindowFocus: true})


  if(querySeriesLoading && mainLoading) {
    return (
      <SimpleBackdrop open={true} />

    );
  }

  console.log('main', queryMainData);

  return (
    <Fragment>
      <MainMovie data={queryMainData} />
      <MovieSlider title={titleSection[0]}  data={queryLatestData?.data.items} />
      <MovieSlider title={titleSection[1]}  data={queryCartoonData?.data.data.items} />
      <MovieSlider title={titleSection[2]}  data={queryShowData?.data.data.items} />
      <MovieSlider title={titleSection[3]}  data={querySingleData?.data.data.items} />
      <MovieSlider title={titleSection[4]}  data={querySeriesData?.data.data.items} />
    </Fragment>
  )
}

export default Home
