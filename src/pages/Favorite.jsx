import React from 'react'
import { getLocalStorageWithExpiration } from '~/utils/localStorageUtils';
import GridMovie from '~/components/GridMovie';
import { useAppContext } from '~/contexts/AppContext';

function Favorite() {
  const [page, setPage] = React.useState(1);

  const { movies } = useAppContext();
  console.log('getMovie', movies);
  

  
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
