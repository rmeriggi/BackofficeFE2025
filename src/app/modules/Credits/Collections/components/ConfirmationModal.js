import React from 'react'
import { Button } from '@material-ui/core'
import { Modal } from 'react-bootstrap'
import { withSnackbar } from '../../../../HOCs/withSnackbar'
import { useSnackBar } from '../../../../hooks/useSnackBar'
import { sendPlan } from '../utils/service'
import { SnackbarMessage } from '../../../../components/SnackbarMessage'
import { useHistory } from 'react-router-dom'

const ConfirmationModal = ({show, onHide, plan}) => {

  const history = useHistory()

  const {open, variant,message, handleClose, setOpenMessage} = useSnackBar()

  const handleSendPlan = async() => {
    try {
      await sendPlan(plan)
      setOpenMessage("success", "El plan fue envíado correctamente.")
      setTimeout(()=>{
        history.push('/credits/management')  
      }, 4000)
    } catch (error) {
      setOpenMessage("error", "El plan no pudo ser envíado correctamente. Por favor, volvé a intentar.")
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
        ¿Est&aacute;s Seguro?
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
              handleSendPlan()
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