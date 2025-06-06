import React, { useState } from 'react'
import { Button } from '@material-ui/core'
import { Modal } from 'react-bootstrap'
import { withSnackbar } from '../../../../HOCs/withSnackbar'
import { useSnackBar } from '../../../../hooks/useSnackBar'
import { SnackbarMessage } from '../../../../components/SnackbarMessage'
import { getClientByPassport, inputPayment } from '../utils/service'

const InputModal = ({show, onHide,  id}) => {

  const {open, variant,message, handleClose, setOpenMessage} = useSnackBar()
  const [dni, setDni] = useState(0)
  const [clientName, setClientName] = useState('...')
  const [disabled, setDisabled] = useState(true)

  const handleCheckDni = async(dni) => {
    try {
      const clientName = await getClientByPassport(dni)
      setClientName(`${clientName.name} ${clientName.lastName}`)
      setDisabled(false)
    } catch (error) {
      setClientName(`No se encontró cliente con ese DNI`)
    }
  }

  const handleAction = async() => {
    const body = {
      id: id,
      dni: dni
    }
    try {
      await inputPayment(body)
      setOpenMessage("success", "El pago fue inputado correctamente.")
      setTimeout(()=>{
        onHide()
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
        size={'lg'}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            Imputar
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="overlay overlay-block cursor-default">
          <div className='col-12 d-flex justify-content-between'>
            <div className="col-3">
              <label for="dni">Ingrese DNI del cliente:</label>
              <input
                  type="number"
                  name='dni'
                  aria-label='algo'
                  className="form-control"
                  style={{width:'150px'}}
                  placeholder="Buscar por DNI"
                  disabled={false}
                  value={dni}
                  onChange={(e) => {
                      setDni(e.target.value)
                  }}
              />
            </div>
            <div className="col-4 d-flex align-items-end">
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                onClick={()=>{
                  handleCheckDni(dni)
                }}
              > 
                Consultar Cliente
              </Button>
            </div>
            <div className="col-4 d-flex flex-column justify-content-end">
                <span>Usted va a imputar a: </span>
                <span>{clientName}</span>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="form">
          <div className="form-group d-flex justify-content-end">
            <Button
              disabled={disabled}
              variant="contained"
              color="secondary"
              size="large"
              onClick={() => {
                handleAction()
              }}
            >
                Imputar
            </Button>
            <Button
              variant="outlined"
              className="ml-3"
              color="secondary"
              size="large"
              onClick={onHide}
            >
                Cancelar
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

export default withSnackbar(InputModal)