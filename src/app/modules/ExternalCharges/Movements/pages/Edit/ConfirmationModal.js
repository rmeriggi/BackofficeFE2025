import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { useSnackBar } from "../../../../../hooks/useSnackBar";
import { edit } from "../../utils/service";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import { useHistory } from "react-router-dom";

export function ConfirmationModal({ show, onHide, values, setProgress }) {

  const { open, variant,message, handleClose, setOpenMessage } = useSnackBar()
  const history = useHistory();

  const  body = { 
    status: values.status,
    operationNumber: values.operationNumber
  }

  const handleConfirmation = async() => {
    try {
        await edit(values.id, body);
        setOpenMessage('success', 'El movimiento fue actualizado correctamente.')
        setTimeout(()=>{
          setProgress(false)
          history.push('/externalcharges/movement')  
        }, 4000)
      } catch  {
        setOpenMessage('error', 'El movimiento no pudo ser actualizado correctamente. Por favor, volvé a intentar.')
        setProgress(false)
      }
  }
  
  return (
    <Modal
      show={show}
      onHide={onHide}
      aria-labelledby="example-modal-sizes-title-lg"
    >
        <Modal.Header closeButton>
            <Modal.Title id="example-modal-sizes-title-lg">
                Confirmación
            </Modal.Title>
        </Modal.Header>
        <Modal.Body className="overlay overlay-block cursor-default">
            {false ? (
                <>
                    <div className="overlay-layer">
                        <div className="spinner spinner-lg spinner-primary" />
                    </div> 
                </>
                ) : (
                    <p>Usted esta a punto de modificar un movimiento de una operaci&oacute;n realizada cuyo estado proviene de un gateway externo y su uso puede tener consecuencias en futuras conciliaciones. Est&aacute; seguro?</p>
                )
            }
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            onClick={()=> {
                setProgress(false)
                onHide();
            }}
          >
            Volver
          </Button>
          <Button
            className="ml-3"
            variant="contained"
            color="secondary"
            size="large"
            onClick={()=>{
              handleConfirmation(values)
            }}
          >
            Confirmar
          </Button>
        </div>
      </Modal.Footer>
      <SnackbarMessage
          handleClose={handleClose}
          open={open}
          variant={variant}
          message={message}
        />
    </Modal>
  );
}