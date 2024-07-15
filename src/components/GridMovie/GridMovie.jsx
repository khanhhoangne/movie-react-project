import React from 'react'
import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import MovieItem from '~/components/MovieItem';

function GridMovie({ page, data, limit, onHandlePagination, result }) {

  const limitedItems = data.slice((page - 1) * limit, (page - 1) * limit + limit);

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
        {
          limitedItems?.map((movie, index) => {
            return (
              <Grid item key={index}>
                <MovieItem movie={movie} />
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
