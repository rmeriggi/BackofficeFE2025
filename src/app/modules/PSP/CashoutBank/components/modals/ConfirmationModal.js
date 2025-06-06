import React from 'react'
import { Button } from '@material-ui/core'
import { Modal } from 'react-bootstrap'
import { withSnackbar } from '../../../../../HOCs/withSnackbar'
import { useSnackBar } from '../../../../../hooks/useSnackBar'
import { reverse } from '../../utils/service'
import { SnackbarMessage } from '../../../../../components/SnackbarMessage'
import { useHistory } from 'react-router-dom'

const ConfirmationModal = ({show, onHide, action, id}) => {

  const history = useHistory()

  const {open, variant,message, handleClose, setOpenMessage} = useSnackBar()

  const handleAction = async() => {
    try {
      if(action === "set") {
        //await authorize(id)
        setOpenMessage("success", "La transacción fue ajustada exitosamente.")
      } else {
        await reverse(id)
        setOpenMessage("success", "La transacción fue reversada exitosamente.")
      }
      setTimeout(()=>{
        history.push('/cash/operations')  
      }, 4000)
    } catch (error) {
      setOpenMessage("error", "No se pudo realizar la acción.")
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
              handleAction()
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