import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { Button, CircularProgress } from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import DataInputContainer from "../DataInputContainer";
import { useSnackBar } from "../../../../../hooks/useSnackBar";
import { addBankAccount } from "../../../../../_redux/suppliers/suppliersCrud";

export function CreateModal({ show, onHide, refetchAccounts, idProveedor }) {
  const [isLoading, setIsLoading] = useState(false);
  const { setOpenMessage } = useSnackBar();


  const formik = useFormik({
    initialValues: {
      IdProveedor: idProveedor ? Number(idProveedor) : 0, 
      cbu: "",
      CBUAlias: "",
      cuit: "",
      Entidad: "",
      status: 1,
    },
    validationSchema: Yup.object({
      cbu: Yup.string().required("Campo requerido"),
      CBUAlias: Yup.string().required("Campo requerido"),
      cuit: Yup.string().required("Campo requerido"),
      Entidad: Yup.string().required("Campo requerido"),
      status: Yup.number().required("Campo requerido"),
    }),
    onSubmit: async (values) => {

      if (values.IdProveedor === 0) {
        setOpenMessage("error", "El ID del proveedor no es válido.");
        return;
      }
      setIsLoading(true);
      try {
        const response = await addBankAccount(values);
        if (response.id) {  
          setOpenMessage("success", "Cuenta bancaria añadida correctamente.");
          await refetchAccounts();  
          onHide();  
        } else {
          setOpenMessage("error", "Error al añadir la cuenta bancaria.");
        }
      } catch (error) {
        console.error('Error adding bank account:', error);
        setOpenMessage("error", "Error al añadir la cuenta bancaria.");
      } finally {
        setIsLoading(false);
      }
    },
  });
  
  return (
    <Modal show={show} onHide={onHide} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Cuenta Bancaria</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <div>
            <div className="mb-3">
              <DataInputContainer
                title="CBU/CVU Alias"
                formik={formik}
                formik_name="cbu"
                placeholder="CBU, CVU o alias"
              />
            </div>
            <div className="mb-3">
              <DataInputContainer
                title="Alias CBU"
                formik={formik}
                formik_name="CBUAlias"
                placeholder="Alias"
              />
            </div>
            <div className="mb-3">
              <DataInputContainer
                title="CUIT"
                formik={formik}
                formik_name="cuit"
                placeholder="CUIT"
              />
            </div>
            <div className="mb-3">
              <DataInputContainer
                title="Entidad"
                formik={formik}
                formik_name="Entidad"
                placeholder="Entidad"
              />
            </div>
            {/* <div className="mb-3">
              <DataInputContainer
                title="Estado"
                formik={formik}
                formik_name="status"
                placeholder="Estado"
              />
            </div> */}
            <div className="d-flex justify-content-end">
              <Button
                variant="contained"
                color="secondary"
                type="submit"
                disabled={isLoading}
              >
                {isLoading ? (
                  <CircularProgress size={20} color="secondary" />
                ) : (
                  "Enviar"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
