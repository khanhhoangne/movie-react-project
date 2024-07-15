import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import Button from '@mui/material/Button';

export default function SimpleBackdrop({ open }) {
    open = open ?? false;

    return (
        <div>
            <Backdrop
                sx={{ boxShadow: '5px 0 10px rgba(0, 0, 0, 0.1), -5px 0 10px rgba(0, 0, 0, 0.1)', color: 'white', opacity: '0.1', zIndex: (theme) => theme.zIndex.drawer + 1 }}
                open={open}
            >
                <CircularProgress />
            </Backdrop>
        </div>
    );
}
