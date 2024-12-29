import React from 'react'
import { getLocalStorageWithExpiration } from '~/utils/localStorageUtils';
import GridMovie from '~/components/GridMovie';
import { useAppContext } from '~/contexts/AppContext';
import { Link } from 'react-router-dom';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { Button } from '@mui/material';


function Favorite() {
  const [page, setPage] = React.useState(1);

  const { movies } = useAppContext();
  console.log('getMovie', movies);

  if (!movies || movies.length == 0) {
    return (
      <>
        <h2 style={{ color: 'white' }}>Danh sách đang trống, hãy lưu bất kì bộ nào bạn muốn và trở lại đây nhé!</h2>
        <Button variant="contained" sx={{ borderRadius:'20px', padding: '10px 40px'  }}>
          <Link to={'/filter'} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LiveTvIcon /> <span style={{ marginLeft: '9px', fontWeight:'bold' }}>Xem Tại đây</span></Link>
        </Button>
      </>
    )

  }



  return (
    <div>
      <GridMovie
        page={page}
        data={movies}
        total={movies.length}
        onHandlePagination={(_page) => setPage(_page)}
        limit={15}
      />
    </div>
  )
}

export default Favorite
