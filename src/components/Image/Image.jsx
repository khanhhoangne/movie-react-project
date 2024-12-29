import React, { useState, useEffect } from 'react';
import styles from './Image.module.scss';
import classNames from 'classnames/bind';


const cx = classNames.bind(styles);

export default function Image({ source, limitedItems, index, sx }) {
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
                style={{ objectFit: !imageLoaded[index] ? '' : 'cover', ...sx }}
                src={!imageLoaded[index] ? 'https://i.redd.it/ubbi1p7z7euc1.gif' :  source}
                onLoad={() => handleImageLoad(index)}
                loading="lazy"
                alt={`Image ${index}`}
            />
        </>
    );
}
