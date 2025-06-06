import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Button, CircularProgress } from "@material-ui/core";
import { useSnackBar } from "../../../../../../hooks/useSnackBar";
import { SnackbarMessage } from "../../../../../../components/SnackbarMessage";
import { getAllBankAccounts } from "../../../../../../_redux/bankAccounts/bankAccountsActions";
import { deleteBankAccount } from "../../../../../../_redux/bankAccounts/bankAccountsCrud";

export function DeleteModal({ show, setShow, accountId, clientId }) {
  const [progress, setProgress] = useState(false);
  const { open, variant, message, handleClose, setOpenMessage } = useSnackBar();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (progress) return; 
    setProgress(true);
    console.log("Inicio de eliminación de cuenta bancaria con ID:", accountId);

    try {
      await deleteBankAccount(accountId);
      setOpenMessage("success", 'La cuenta fue eliminada correctamente.');
      console.log("Cuenta eliminada, recargando lista de cuentas bancarias.");
      await dispatch(getAllBankAccounts(clientId, false));
    } catch (error) {
      console.error("Error al eliminar la cuenta bancaria:", error);
      setOpenMessage("error", 'La cuenta no pudo ser eliminada correctamente. Por favor, volvé a intentar.');
    } finally {
      setProgress(false);
      setShow(false);
    }
  };
  
  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      size="m"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Confirmación de Eliminación
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Estás seguro de que deseas eliminar esta cuenta bancaria?</p>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: 'space-between' }}>
        <Button
          variant="outlined"
          style={{ color: 'secondary', borderColor: 'secondary', backgroundColor: '#fff' }}
          onClick={() => setShow(false)}
          disabled={progress}
        >
          Cancelar
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleDelete}
          disabled={progress}
          endIcon={progress && <CircularProgress size={20} color="inherit" />}
        >
          Confirmar
        </Button>
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
