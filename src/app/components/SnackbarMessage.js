import React from 'react';
import {Snackbar} from '@material-ui/core';
import { MySnackbarContentWrapper } from './Snackbar';

export const SnackbarMessage = ({handleClose, variant, message, open}) => {

    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
            }}
            open={open}
            autoHideDuration={1500}
            onClose={handleClose}
            >
            <>
                <MySnackbarContentWrapper
                onClose={handleClose}
                variant={variant}
                message={message}
                />
            </>
        </Snackbar>
    )
}