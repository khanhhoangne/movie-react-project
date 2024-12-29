import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';
import classNames from 'classnames/bind';
import styles from './DialogMUI.module.scss';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { Chip, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite'; // Import filled heart icon
import { getLocalStorageWithExpiration, setLocalStorageWithExpiration } from '~/utils/localStorageUtils';
import { useAppContext } from '~/contexts/AppContext';

const cx = classNames.bind(styles);

function checkDeviceType() {
  const width = window.innerWidth;
  if (width <= 768) {
    return 'mobile';
  } else {
    return 'desktop';
  }
}

const PaperComponent = React.memo((props) => (
  <Draggable
    handle="#draggable-dialog-title"
    cancel={'[class*="MuiDialogContent-root"]'}
  >
    <Paper
      {...props}
      sx={{
        zIndex: 999999999999,
        minWidth: checkDeviceType() === 'desktop' ? '900px' : 'unset',
        background:
          'linear-gradient(57deg, transparent, rgba(0, 0, 0, 0), #221d1d), linear-gradient(141deg, transparent, rgba(0, 0, 0, 0), #131212)',
      }}
    />
  </Draggable>
));





export default React.memo(function DialogMUI({ handleDialogExit, dataMovie, movie }) {
  console.log(movie._id);
  
  const initialFavoritedState = React.useMemo(() => {
    const favorites = getLocalStorageWithExpiration('movies_favorite') || [];
    return favorites.some((fav) => fav._id === movie._id);
  }, [movie]);

  const isFirstRender = React.useRef(true);

  React.useEffect(() => {
    
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; // Skip the first render
    }

    handleDialogExit();
  }, [movie])

  const { setMovies } = useAppContext();

  const [isFavorited, setIsFavorited] = React.useState(initialFavoritedState);

  const handleFavoriteToggle = () => {
    setLocalStorageWithExpiration('movies_favorite', movie);
    setIsFavorited(!isFavorited);
    setMovies(getLocalStorageWithExpiration('movies_favorite') || []);
  };

  console.log('dialog');

  const linked = '/watch/' + dataMovie.movie.slug;

  let baseImageURL = import.meta.env.VITE_APP_BASE_URL_CDN;
  let imageURL = (dataMovie.movie.thumb_url).replace('https://phimimg.com/', baseImageURL);

  return (
    <Dialog
      open={true}
      PaperComponent={PaperComponent}
      aria-labelledby="draggable-dialog-title"
      sx={{ background: 'linear-gradient(192deg, transparent, rgba(0, 0, 0, 0), #221d1d), linear-gradient(141deg, transparent, rgba(0, 0, 0, 0), #131212)' }}
    >
      <IconButton
        aria-label="close"
        onClick={handleDialogExit}
        sx={{
          position: 'absolute',
          right: 8,
          top: 8,
          zIndex: 5,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContentText onMouseLeave={handleDialogExit}>
        <div className={cx('img-item')}>
          <img className={cx('img-item-slide')} width="100%" height="100%" src={imageURL} />
        </div>

        <div className={cx('opacity-background')}>
          <div className={cx('item-des', 'top-down')} >
            <h2 className={cx('item-tilte')}>
              {dataMovie.movie.name}

              <div className={cx('chip')}>
                <Chip className={cx('chip-item')} label={dataMovie.movie.quality} />
                <Chip className={cx('chip-item')} label={dataMovie.movie.year} />

                {
                  (dataMovie.movie.country).map((country, index) => {
                    return (
                      <Chip key={index} className={cx('chip-item')} label={country.name} />
                    )
                  })
                }
              </div >
            </h2>
            <div style={{ display: 'flex', gap: 15 }}>
              <div className={cx('btn-1')}>
                <Link to={linked} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LiveTvIcon /> <span style={{ marginLeft: '9px' }}>Xem Ngay</span></Link>
              </div>
              <div className={cx('btn-1', 'save-movies')}>
                <Link onClick={handleFavoriteToggle} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {
                    isFavorited
                      ? <><FavoriteIcon /> <span style={{ marginLeft: '9px' }}>Bỏ Lưu Phim</span></>
                      : <><FavoriteBorderIcon /> <span style={{ marginLeft: '9px' }}>Lưu Phim</span></>
                  }
                </Link>
              </div>
            </div>

            <div>
              {dataMovie.movie.content}
            </div>
            <div className={cx('chip')}>
              {
                (dataMovie.movie.category).map((cate, index) => {
                  return (
                    <Chip key={index} className={cx('chip-item')} label={cate.name} />
                  )
                })
              }
            </div>
          </div>

        </div>
      </DialogContentText>

    </Dialog>
  );
})