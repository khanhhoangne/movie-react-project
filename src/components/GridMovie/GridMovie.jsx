import React from 'react';
import { Grid } from '@mui/material';
import Pagination from '@mui/material/Pagination';
import MovieItem from '~/components/MovieItem';

function GridMovie({ page, data, limit, onHandlePagination, result, total }) {
  console.log('grid');
  

  const limitedItems = data;

  const divideAndRoundUpIfGreaterThanOne = (dividend, divisor) => {
    let result = dividend / divisor;
    if (result > 1) {
      result = Math.ceil(result);
    }
    return result;
  }

  // Calculate the total number of pages
  const totalPages = divideAndRoundUpIfGreaterThanOne(total, limit);

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
      {/* Conditionally render pagination if more than one page */}
      {totalPages > 1 && (
        <div>
          <Pagination
            variant="outlined"
            shape="rounded"
            page={page}
            onClick={onHandlePagination}
            sx={{ display: 'ruby-text', marginTop: '20px', color: 'white' }}
            count={totalPages}
            color="primary"
            hidePrevButton
            hideNextButton
          />
        </div>
      )}
    </>
  )
}

export default GridMovie;
