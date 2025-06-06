import { Button, CircularProgress } from '@material-ui/core'
import React, { useState } from 'react'
import { ModalWrapper } from '../../../../../components/ModalWrapper'
import { deleteBalanceItau } from '../../utils/service'

const ModalConfirm = ({show, onHide, id, setOpenMessage}) => {

  const [loading, setLoading] = useState(false)
  
  const handleDelete = async () => {
    setLoading(true)
    try {
      await deleteBalanceItau(id)
      setOpenMessage("success", "Proceso realizado correctamente")
      setLoading(false)
      onHide()
    } catch (error) {
      setOpenMessage("error", "El proceso no pudo ser realizado correctamente, intente más tarde")
      setLoading(false)
    }
  }

  const handleBack = () => {
    onHide()
  }

  return (
    <ModalWrapper
      show={show}
      onHide={onHide}
      title="Confirmación de acción"
      footer={() =>
        (<>
        <Button
          variant="outlined"
          color="secondary"
          size="large"
          onClick={() => handleBack()}
        >
          Volver
        </Button>
        <Button
          variant="contained"
          color="secondary"
          className="ml-3"
          size="large"
          disabled={loading}
          onClick={() => handleDelete()}
          endIcon={
            loading && <CircularProgress size={20} color="secondary"/>  
            }
          >
            Continuar
        </Button>
        </>)
      }
    >
      <p>Confirme sí quiere seguir con el proceso</p>
    </ModalWrapper>
  )
}

export default ModalConfirm