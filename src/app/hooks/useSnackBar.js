import { useState } from 'react';

export const useSnackBar = () => {

  const [open, setOpen] = useState(false);
  const [variant, setVariant] = useState("success")
  const [message, setMessage] = useState("")

  function handleClose(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  }

  function setOpenMessage(color, message){
    setVariant(color)
    setMessage(message)
    setOpen(true)
  }

  return { open, variant,message, handleClose, setOpenMessage, setOpen }
};