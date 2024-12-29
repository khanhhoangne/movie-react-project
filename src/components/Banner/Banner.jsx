import React from 'react'
import styles from './Banner.module.scss';
import classNames from 'classnames/bind';

import Image from '~/components/Image';
import { Button } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Link } from 'react-router-dom';


const cx = classNames.bind(styles);

function Banner() {
    let movie = {
        poster_url: 'https://phimimg.com/upload/vod/20231014-1/c394301783a06f08edafda3988e20b48.jpg',
        _id: '1234xa',
        content: 'Cậu Bé Rừng Xanh là bộ phim phỏng theo tác phẩm nổi tiếng Tarzan of the Apes của Edgar Rice Burroughs, do hãng phim Walt Disney sản xuất.Bộ phim bắt đầu với tai nạn đắm tàu của Tarzan và cha mẹ. Họ dạt vào một hoang đảo ở châu Phi đầy thú dữ. Sau khi mất cả hai người thân vì báo Sabor, cậu bé được khỉ mẹ Karla, con khỉ vừa mất con vì Sabor, cứu sống. Karla đem cậu bé về, đặt tên và nuôi như con đẻ. Dù vậy, Tarzan chưa bao giờ có được tình yêu của đầu đàn Kerchak. Tarzan lớn lên trong sự khác biệt với bầy đàn, cậu chỉ có Terk, con khỉ béo ị và Tantor, con voi nhát cáy làm bạn.Cuộc sống của Tarzan cứ mãi hoang dã như vậy nếu không có một ngày đoàn thám hiểm nghiên cứu giống khỉ đột của giáo sư Porter xuất hiện ở cánh rừng già này. Cùng đi ...',
        name: 'Cậu Bé Rừng Xanh'
    };



    let baseImageURL = import.meta.env.VITE_APP_BASE_URL_CDN;
    let imageURL = (movie.poster_url).replace('https://phimimg.com/', '');

    imageURL = baseImageURL + imageURL;

    return (
        <div>
            <div className={cx('item')}>
                <Image sx={{ borderRadius: '25px', objectFit: 'fill' }} source={imageURL} limitedItems={movie} index={movie._id} />

                <img className={cx('item-logo')} src="/Movie_Category_Logo.png" />


                <div className={cx('back')}>
                    <div className={cx('movies-title')}><strong style={{ fontSize: '25px', marginBottom: '9px' }} >
                        {movie.name}</strong><br />{movie.content}

                        <div style={{ marginTop: '15px' }}>
                            <Link to="/watch/cau-be-rung-xanh-1999">
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
