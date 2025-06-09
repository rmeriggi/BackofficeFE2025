import React from 'react'
import { Button } from '@material-ui/core'
import { Modal } from 'react-bootstrap'
import { withSnackbar } from '../../../../HOCs/withSnackbar'
import { useSnackBar } from '../../../../hooks/useSnackBar'
import { SnackbarMessage } from '../../../../components/SnackbarMessage'
import { campaign } from '../utils/service'

const ConfirmationModal = ({show, onHide, id}) => {

  const {open, variant,message, handleClose, setOpenMessage} = useSnackBar()

  const handleCampaign = async(id) => {
    const body = {
        campaign: id
    }
    try {
        await campaign(body)
        setOpenMessage("success", "Operación exitosa.")
        setTimeout(()=> {
            onHide()
        },[3000])
    } catch (error) {
        setOpenMessage("error", "La operación no se pudo realizar exitosamente.")
    }
}

  return (
    <>
      <Modal
        show={show}
        onHide={onHide}
        title="Confirmación"
      >
       
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Confirmación
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        Est&aacute; a punto de enviarle un mensaje a todos los clientes de esta campaña. ¿Est&aacute;s Seguro?
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group d-flex justify-content-end">
            <Button
            variant="outlined"
            color="secondary"
            size="large"
            onClick={onHide}
            >
                Volver
            </Button>
            <Button
            className="ml-3"
            variant="contained"
            color="secondary"
            size="large"
            onClick={() => {
                handleCampaign(id)
            }}
            >
                Si
            </Button>
        </div>
      </Modal.Footer>
      </Modal>
      <SnackbarMessage
          handleClose={handleClose}
          open={open}
          variant={variant}
          message={message}
      />
    </>
  )
}

export default withSnackbar(ConfirmationModal)