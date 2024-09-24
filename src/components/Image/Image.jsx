import React, { useEffect, useState } from 'react'
import styles from './Image.module.scss';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

export default function Image({ source, limitedItems, index }) {
    const [imageLoaded, setImageLoaded] = useState(Array(limitedItems).fill(false));

    const handleImageLoad = (index) => {
        setImageLoaded((prevLoaded) => {
            const newLoaded = [...prevLoaded];
            newLoaded[index] = true;
            return newLoaded;
        });
    };

    return (
        <>
            <img
                className={cx('img-item')}
                style={{ objectFit: !imageLoaded[index] ? '' : 'cover' }}
                src={!imageLoaded[index] ? 'https://cdn.dribbble.com/users/1053052/screenshots/3600670/media/049491d00605f54d441aa47b9b419910.gif' : source}
                onLoad={() => handleImageLoad(index)}
            />
        </>
    )
}
