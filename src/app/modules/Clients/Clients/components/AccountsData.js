import { Button, CircularProgress } from '@material-ui/core'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { SnackbarMessage } from '../../../../components/SnackbarMessage'
import { getClientCvu } from '../utils/service'
import { useOneClient } from '../utils/apiHooks'
import useIsMountedRef from "../../../../hooks/useIsMountedRef";
export default function AccountsData({account, buttonCvu}) {

  const {id} = useParams()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const isMounted = useIsMountedRef();
  const [clientToEdit, clientToEditCompleted,refreshClient] = useOneClient(id, isMounted);
  const [variant, setVariant] = useState('success')
  const [message, setMessage] = useState("El CVU se creó correctamente.")

  function handleCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  }

  const getCvu = async(id) =>{
    try {
      const response = await getClientCvu(id)
      if(response.success){
        setVariant('success')
        setMessage('El CVU se creó correctamente.')
        setTimeout(()=>{
          setOpenSnackbar(true)          
        }, 1000)
        refreshClient();
        setIsSubmitting(false)
      }else{
        setVariant('error')
        setMessage('El CVU no pudo ser creado correctamente.')
        setOpenSnackbar(true)        
        refreshClient();
        setIsSubmitting(false)
      }
    } catch {
      setVariant('error')
      setMessage('El CVU no pudo ser creado correctamente.')
      setOpenSnackbar(true)      
      refreshClient();
      setIsSubmitting(false)
    }
  }

  return (
    <div> 
      <div className="d-flex flex-wrap"> 
        <span className='text-muted mr-3 mt-auto'>Cuenta: {account?.account}</span>
        <span className='text-muted mr-3 mt-auto'>Alias: {account?.alias}</span>
        <span className='text-muted mt-auto'>CVU: {account?.cvu !== "Sin datos" ? account?.cvu : clientToEdit?.client?.arAccount?.dataAccount?.cvu ? clientToEdit?.client?.arAccount?.dataAccount?.cvu : "Sin datos"    }</span>
        {buttonCvu && (
          <Button
            variant="contained"
            color="secondary"
            className="ml-4"
            size="small"
            disabled={isSubmitting}
            onClick={() => {
              getCvu(id)
              setIsSubmitting(true)
            }}
            endIcon={
              isSubmitting && <CircularProgress size={10} color="secondary"/>  
            }  
            >
            Obtener CVU
        </Button>)
        }
      </div>
      <SnackbarMessage
        handleClose={handleCloseSnackbar}
        open={openSnackbar}
        variant={variant}
        message={message}
      />
    </div>
  )
}
