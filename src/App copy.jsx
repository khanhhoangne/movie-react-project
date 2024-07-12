import { createElement, useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { Pagination } from '@mui/material'
import SimpleBottomNavigation from '~/components/NavBottom'
import axios from 'axios'



function App() {
  return (
    <>
      <iframe
        src='https://player.phimapi.com/player/?url=https://s3.phim1280.tv/20240514/lmq0k9u8/index.m3u8'
        frameborder='0'
        allow="fullscreen"
        title='video'
        width="100%"
      />
      <SimpleBottomNavigation />
    </>

  )
}

function Build() { }

export { App, Build }
