import React from 'react'
import { useSnackBar } from '../hooks/useSnackBar'
import { SnackbarMessage } from '../components/SnackbarMessage'

export const withSnackbar = (Component) => {
  const NewComponent = props => {
    const { open, variant,message, handleClose, setOpenMessage } = useSnackBar()
    
    return (
      <>
        <Component setOpenMessage={setOpenMessage} {...props} />
        <SnackbarMessage 
          handleClose={handleClose}
          open={open}
          variant={variant}
          message={message}
        />
      </>
    )
  }
  return NewComponent
}
