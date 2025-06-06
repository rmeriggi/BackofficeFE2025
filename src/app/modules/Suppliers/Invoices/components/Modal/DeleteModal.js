import React, { useState, useRef, useEffect } from "react";
import { Modal } from "react-bootstrap";
import { Button, CircularProgress } from "@material-ui/core";
import { useSnackBar } from "../../../../../hooks/useSnackBar";
import { SnackbarMessage } from "../../../../../components";
import { deleteInvoice } from "../../../../../_redux/invoices/invoicesCrud";

export function DeleteInvoiceModal({ show, setShow, invoiceId, onDeleteSuccess }) {
    const [progress, setProgress] = useState(false);
    const { open, variant, message, handleClose, setOpenMessage } = useSnackBar();

    const isMounted = useRef(true);

    useEffect(() => {
        return () => {
            isMounted.current = false;
        };
    }, []);

    const handleDelete = async () => {
        if (progress) return; 
        setProgress(true);

        try {
            const response = await deleteInvoice(invoiceId);

            if (response.status === 200 || response.status === 204) {
                setOpenMessage("success", 'El comprobante fue eliminado correctamente.');
                
                await onDeleteSuccess(); 
            }
        } catch (error) {
            console.error("Error al eliminar el comprobante:", error);
            setOpenMessage("error", 'El comprobante no pudo ser eliminado correctamente. Por favor, volvé a intentar.');
        } finally {
            if (isMounted.current) {
                setProgress(false);
                setShow(false);
            }
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
                <p>¿Estás seguro de que deseas eliminar este comprobante?</p>
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
