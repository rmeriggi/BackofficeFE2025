import React from "react";
import { Modal } from "react-bootstrap";
import { Button } from "@material-ui/core";
import { ListingWallet } from "./ListingWallet";
import { useSnackBar } from "../../../../../hooks/useSnackBar";
import { assignWallet } from "../../utils/service";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";

export function ConfirmationModal({ show, onHide, assignList, values }) {

  const { open, variant,message, handleClose, setOpenMessage } = useSnackBar()

  const handleConfirmation = async() => {
    try {
      const confirmationValues = {
        ...values,
        execute: 1
      };
      await assignWallet(confirmationValues)
      setTimeout(() => {
        onHide();
      }, 3000);
      setOpenMessage("success", "La asignación se realizó de manera correcta.")
    } catch (e) {
      setOpenMessage("error", "No se a podido realizar la asignación. Por favor, volvé a intentar.")
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
        Total asignado
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {false ? (
          <>
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div> 
          {/*end::Loading*/}
          </>
        ) : (
          <ListingWallet assignList={assignList}/>
        )}
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
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
            onClick={()=>{
              handleConfirmation(values)
              // eslint-disable-next-line eqeqeq
              if(values.asign == 1)
              {
                values.execute = 1;
              }
              else
              {
                values.execute=2;
              }
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