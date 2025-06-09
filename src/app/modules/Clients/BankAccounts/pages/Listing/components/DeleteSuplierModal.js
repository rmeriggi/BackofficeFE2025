import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Button, CircularProgress } from "@material-ui/core";
import { useSnackBar } from "../../../../../../hooks/useSnackBar";
import { SnackbarMessage } from "../../../../../../components/SnackbarMessage";
import { deleteSupplier } from "../../../../../../_redux/suppliers/suppliersCrud";

export function DeleteSupplierModal({
  show,
  setShow,
  supplierId,
  refetchSuppliers,
}) {
  const [progress, setProgress] = useState(false);
  const { open, variant, message, handleClose, setOpenMessage } = useSnackBar();
  const dispatch = useDispatch();

  const handleDelete = async () => {
    if (progress) return;
    setProgress(true);
    console.log("Inicio de eliminación de proveedor con ID:", supplierId);

    try {
      await deleteSupplier(supplierId);
      setOpenMessage("success", "El proveedor fue eliminado correctamente.");
      console.log("Proveedor eliminado, recargando lista de proveedores.");
      await dispatch(refetchSuppliers());
    } catch (error) {
      console.error("Error al eliminar el proveedor:", error);
      setOpenMessage(
        "error",
        "El proveedor no pudo ser eliminado correctamente. Por favor, volvé a intentar."
      );
    } finally {
      setProgress(false);
      setShow(false);
    }
  };

  return (
    <Modal show={show} onHide={() => setShow(false)} size="m" centered>
      <Modal.Header closeButton>
        <Modal.Title id="delete-supplier-modal">
          Confirmación de Eliminación
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>¿Estás seguro de que deseas eliminar este proveedor?</p>
      </Modal.Body>
      <Modal.Footer style={{ justifyContent: "space-between" }}>
        <Button
          variant="outlined"
          style={{
            color: "secondary",
            borderColor: "secondary",
            backgroundColor: "#fff",
          }}
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
