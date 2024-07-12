import { createElement, useEffect, useState, Fragment } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import { createTheme, ThemeProvider } from '@mui/material'
import axios from 'axios'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { publicRoutes } from '~/routes/index.js'
import BaseLayout from '~/layout/BaseLayout'
import { AppProvider } from '~/contexts/AppContext'

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
                  return (
                    <Route key={index} path={route.path} element={<Layout><Page /></Layout>} />
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
