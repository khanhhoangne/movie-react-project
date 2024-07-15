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
                src={!imageLoaded[index] ? 'https://imgur.com/ikQanUS.gif' : source}
                onLoad={() => handleImageLoad(index)}
            />
        </>
    )
}
