import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import {
  Button,
  CircularProgress,
  TextField,
  InputAdornment,
  FormControl,
  FormHelperText,
} from "@material-ui/core";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  AccountBalance as BankIcon,
  Fingerprint as FingerprintIcon,
  ShortText as AliasIcon,
  CreditCard as CuitIcon,
  Business as EntityIcon,
  CheckCircle as StatusIcon,
} from "@material-ui/icons";
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
      cbu: Yup.string()
        .required("Este campo es obligatorio")
        .min(22, "El CBU debe tener 22 caracteres")
        .max(22, "El CBU debe tener 22 caracteres"),
      CBUAlias: Yup.string()
        .required("Este campo es obligatorio")
        .max(30, "Máximo 30 caracteres"),
      cuit: Yup.string()
        .required("Este campo es obligatorio")
        .min(11, "El CUIT debe tener 11 caracteres")
        .max(11, "El CUIT debe tener 11 caracteres"),
      Entidad: Yup.string()
        .required("Este campo es obligatorio")
        .max(50, "Máximo 50 caracteres"),
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
        console.error("Error adding bank account:", error);
        setOpenMessage("error", "Error al añadir la cuenta bancaria.");
      } finally {
        setIsLoading(false);
      }
    },
  });

  return (
    <Modal show={show} onHide={onHide} size="md" centered>
      <Modal.Header
        closeButton
        className="text-white"
        style={{ borderTopLeftRadius: "8px", borderTopRightRadius: "8px" }}
      >
        <Modal.Title className="d-flex align-items-center">
          <BankIcon className="mr-2" />
          <span>Agregar Cuenta Bancaria</span>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="p-4">
        <form onSubmit={formik.handleSubmit} className="py-3">
          <div className="row">
            <div className="col-md-12 mb-4">
              <TextField
                fullWidth
                variant="outlined"
                label="CBU/CVU"
                name="cbu"
                value={formik.values.cbu}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cbu && Boolean(formik.errors.cbu)}
                helperText={formik.touched.cbu && formik.errors.cbu}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FingerprintIcon className="text-primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="col-md-6 mb-4">
              <TextField
                fullWidth
                variant="outlined"
                label="Alias CBU"
                name="CBUAlias"
                value={formik.values.CBUAlias}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.CBUAlias && Boolean(formik.errors.CBUAlias)
                }
                helperText={formik.touched.CBUAlias && formik.errors.CBUAlias}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AliasIcon className="text-primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="col-md-6 mb-4">
              <TextField
                fullWidth
                variant="outlined"
                label="CUIT"
                name="cuit"
                value={formik.values.cuit}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.cuit && Boolean(formik.errors.cuit)}
                helperText={formik.touched.cuit && formik.errors.cuit}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <CuitIcon className="text-primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="col-md-8 mb-4">
              <TextField
                fullWidth
                variant="outlined"
                label="Entidad Bancaria"
                name="Entidad"
                value={formik.values.Entidad}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.Entidad && Boolean(formik.errors.Entidad)}
                helperText={formik.touched.Entidad && formik.errors.Entidad}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <EntityIcon className="text-primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </div>

            <div className="col-md-4 mb-4">
              <FormControl fullWidth variant="outlined">
                <TextField
                  select
                  label="Estado"
                  name="status"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={formik.touched.status && Boolean(formik.errors.status)}
                  variant="outlined"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <StatusIcon className="text-primary" />
                      </InputAdornment>
                    ),
                  }}
                  SelectProps={{
                    native: true,
                  }}
                >
                  <option value={1}>Activo</option>
                  <option value={0}>Inactivo</option>
                </TextField>
                {formik.touched.status && formik.errors.status && (
                  <FormHelperText error>{formik.errors.status}</FormHelperText>
                )}
              </FormControl>
            </div>
          </div>

          <div className="d-flex justify-content-end pt-2">
            <Button
              variant="outlined"
              color="secondary"
              onClick={onHide}
              className="mr-3"
            >
              Cancelar
            </Button>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={isLoading}
              startIcon={!isLoading && <BankIcon />}
            >
              {isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                "Guardar Cuenta"
              )}
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}
