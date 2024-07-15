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


const cx = classNames.bind(styles);

function checkDeviceType() {
  const width = window.innerWidth;
  if (width <= 768) {
      return 'mobile';
  } else {
      return 'desktop';
  }
}

function PaperComponent(props) {
  console.log(props);
  return (
    <Draggable
      handle="#draggable-dialog-title"
      cancel={'[class*="MuiDialogContent-root"]'}

    >
      <Paper {...props} sx={{ zIndex: 100000000, minWidth: checkDeviceType() === 'desktop' ? '900px' : 'unset', background: 'linear-gradient(57deg, transparent, rgba(0, 0, 0, 0), #221d1d), linear-gradient(141deg, transparent, rgba(0, 0, 0, 0), #131212)' }} />
    </Draggable>
  );
}




export default React.memo(function DialogMUI({ handleDialogExit, dataMovie }) {
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  console.log('dialog');

  const linked = '/watch/' + dataMovie.movie.slug;

  const DialogComponent = () => (
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
          <img className={cx('img-item-slide')} width="100%" height="100%" src={dataMovie.movie.thumb_url} />
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
            <div className={cx('btn-1')}>
              <Link to={linked} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}><LiveTvIcon /> <span style={{ marginLeft: '9px' }}>Xem Ngay</span></Link>
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
  )

  return (
    <React.Fragment>
      <DialogComponent />
    </React.Fragment>
  );
})