import React from 'react'
import styles from './Banner.module.scss';
import classNames from 'classnames/bind';

import Image from '~/components/Image';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Link } from 'react-router-dom';


const cx = classNames.bind(styles);

function Banner({ movie }) {
   



    let baseImageURL = import.meta.env.VITE_APP_BASE_URL_CDN;
    let imageURL = (movie.thumb_url).replace('https://phimimg.com/', '');

    imageURL = baseImageURL + imageURL;

    return (
        <div>
            <div className={cx('item')}>
                <Image sx={{ borderRadius: '25px', objectFit: 'fill' }} source={imageURL} limitedItems={movie} index={movie._id} />



                <div className={cx('back')}>
                    <div className={cx('movies-title')}><strong style={{ fontSize: '25px', marginBottom: '9px' }} >
                        {movie.name}</strong><br />{movie.content}

                        <div style={{ marginTop: '15px' }}>
                            <Link to={'/watch/' + movie.slug}>
                                <Button
                                    variant="contained"
                                    sx={{
                                        textTransform: 'none',
                                        fontWeight: 'bold',
                                        opacity: 0.5,
                                        background: 'gray',
                                        transition: 'background 0.3s ease, opacity 0.3s ease', // Smooth transition
                                        '&:hover': {
                                            background: '#696cc0', // Change to a little blue on hover
                                            opacity: 1, // Set opacity to 1 on hover
                                        },
                                    }}
                                >
                                    <div
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                        }}
                                    >
                                        <PlayArrowIcon />
                                        <strong style={{ marginTop: '2px' }}>Xem ngay</strong>
                                    </div>
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Banner
