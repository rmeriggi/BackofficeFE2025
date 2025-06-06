import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { disableClient } from "./../modules/Clients/Clients/utils/service";

export function DisableClientModal({show,onHide, id, setOpenSnackbar, setVariant, setMessage, handleSuccess}) 
{
    const [frase, setFrase] = useState('');
    const [reason, setReason] = useState('');
    const [loading, setLoading] = useState(false);
    
    const isCorrectFrase = (frase.trim().toLowerCase() === "dar de baja al cliente de forma permanente");

    const hasPermissionSubmit = (loading === false && isCorrectFrase && reason)

    const reset = () =>
    {
        setLoading(false);
        setFrase('');
        setReason('')
    }

    const handleConfirm = async () => {
        if(!hasPermissionSubmit)
        {
            return null;
        }

        setLoading(true);


        try {
            const response = await disableClient({idClient:id, motive:reason});
            
            if(response?.id !== "0")
            {
                reset();
                handleSuccess();
            }

            setLoading(false);
        } catch(e) {
            setLoading(false);
            console.log("error?",e)

            setVariant("error");
            setMessage("Lo sentimos, ha ocurrido un error.");
            setOpenSnackbar(true);
        }
    }

    return (
        <Modal
            show={show}
            onHide={onHide}
            onExited={() => {
                console.log("en exited :)");
            }}
            aria-labelledby="example-modal-sizes-title-lg"
        >
            <Modal.Header closeButton>
              <Modal.Title id="example-modal-sizes-title-lg">
                Baja del cliente
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className="overlay overlay-block cursor-default">
                <p>Para confirmar la baja, escriba <strong>"dar de baja al cliente de forma permanente"</strong> en el campo de entrada de texto</p>
                <div>
                <input
                    type="text"
                    className="form-control"
                    name="reference"
                    value={frase}
                    onChange={(e) => {
                        setFrase(e.target.value);
                    }}
                />
                <p className="mt-1">Indicar un motivo</p>
                 <input
                    type="text"
                    className="form-control mt-1"
                    name="reason"
                    value={reason}
                    onChange={(e) => {
                        setReason(e.target.value);
                    }}
                />
                </div>
            </Modal.Body>
            <Modal.Footer className="form">
              <div className="form-group">
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => {
                    reset()
                    onHide();
                }}
                >
                  Volver
                </Button>
                <Button
                  className="ml-4"
                  variant="contained"
                  color="secondary"
                  size="large"
                  onClick={() => handleConfirm()}
                  disabled={!hasPermissionSubmit}
                >
                  Confirmar
                </Button>
              </div>
            </Modal.Footer>
        </Modal>
    );
}
