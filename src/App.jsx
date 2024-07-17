import { createElement, useEffect, useState, Fragment } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { createTheme, ThemeProvider } from '@mui/material'
import axios from 'axios'
import { BrowserRouter, Route, Routes, HashRouter } from 'react-router-dom'
import { publicRoutes } from '~/routes/index.js'
import BaseLayout from '~/layout/BaseLayout'
import { AppProvider } from '~/contexts/AppContext'
import { useLocation } from 'react-router-dom';

const queryClient = new QueryClient();

function App() {
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat, sans-serif"
    }
  });

  queryClient.clear();

  return (
    <AppProvider>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <QueryClientProvider client={queryClient}>
            <Routes>
              {
                publicRoutes.map((route, index) => {
                  const Layout = BaseLayout
                  const Page = route.component
                  const authenicationFlag = import.meta.env.VITE_APP_BASE_URL_CDN;
                  let PageComponent;

                  

                  if(authenicationFlag) {
                    PageComponent = <Layout><Page /></Layout>;
                  } else {
                    PageComponent = <Layout><Page /></Layout>;
                  }

                  return (
                    <Route key={index} path={route?.path} element={PageComponent} />
                  )
                })
              }
            </Routes>
          </QueryClientProvider>
        </ThemeProvider>
      </BrowserRouter>
    </AppProvider>
  )
}

export { App, queryClient }
