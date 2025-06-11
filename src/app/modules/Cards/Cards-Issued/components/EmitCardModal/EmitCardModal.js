import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "react-bootstrap";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import { es } from "date-fns/locale";
import { ThemeProvider, createMuiTheme, colors } from "@material-ui/core";

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
});

// Esquema de validación Yup
const validationSchema = Yup.object({
  tipo: Yup.string().required("Seleccione un tipo"),
  marca: Yup.string().required("Seleccione una marca"),
  fecha: Yup.date()
    .required("Seleccione una fecha válida")
    .min(new Date(), "La fecha no puede ser anterior a hoy"),
});

const EmitCardModal = ({ show, onClose }) => {
  const formik = useFormik({
    initialValues: {
      tipo: "",
      marca: "",
      fecha: null,
    },
    validationSchema,
    onSubmit: (values) => {
      // Lógica para procesar el formulario
      console.log(values);
      onClose();
    },
  });

  return (
    <div
      className={`modal fade ${show ? "show d-block" : ""}`}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Emisión de Tarjetas</h5>
            <Button
              type="button"
              className="btn-close"
              onClick={onClose}
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </Button>
          </div>

          <form onSubmit={formik.handleSubmit}>
            <div className="modal-body">
              {/* Campo Fecha con Material-UI Picker */}
              <div className="mb-4">
                <label className="form-label">Fecha de Emisión</label>
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                  <ThemeProvider theme={defaultMaterialTheme}>
                    <KeyboardDatePicker
                      autoOk
                      fullWidth
                      variant="inline"
                      inputVariant="outlined"
                      format="dd/MM/yyyy"
                      id="fecha"
                      name="fecha"
                      value={formik.values.fecha}
                      onChange={(date) => formik.setFieldValue("fecha", date)}
                      onBlur={formik.handleBlur}
                      error={
                        formik.touched.fecha && Boolean(formik.errors.fecha)
                      }
                      helperText={formik.touched.fecha && formik.errors.fecha}
                      cancelLabel="Cancelar"
                      invalidDateMessage="Formato de fecha inválido"
                      minDateMessage="La fecha no puede ser anterior a hoy"
                      placeholder="Seleccione fecha"
                      InputProps={{
                        className: "form-control",
                      }}
                    />
                  </ThemeProvider>
                </MuiPickersUtilsProvider>
              </div>

              {/* Campo Tipo */}
              <div className="mb-4">
                <label className="form-label">Tipo</label>
                <select
                  className={`form-control form-control-solid form-select ${
                    formik.touched.tipo && formik.errors.tipo
                      ? "is-invalid"
                      : ""
                  }`}
                  name="tipo"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.tipo}
                >
                  <option value="">Seleccione...</option>
                  <option value="credito">Crédito</option>
                  <option value="debito">Débito</option>
                  <option value="prepago">Prepago</option>
                </select>
                {formik.touched.tipo && formik.errors.tipo && (
                  <div className="invalid-feedback">{formik.errors.tipo}</div>
                )}
              </div>

              {/* Campo Marca */}
              <div className="mb-4">
                <label className="form-label">Marca</label>
                <select
                  className={`form-control form-control-solid form-select ${
                    formik.touched.marca && formik.errors.marca
                      ? "is-invalid"
                      : ""
                  }`}
                  name="marca"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.marca}
                >
                  <option value="">Seleccione...</option>
                  <option value="visa">Visa</option>
                  <option value="mastercard">MasterCard</option>
                  <option value="amex">American Express</option>
                </select>
                {formik.touched.marca && formik.errors.marca && (
                  <div className="invalid-feedback">{formik.errors.marca}</div>
                )}
              </div>

              {/* Disclaimer */}
              <div className="notice d-flex bg-light-warning rounded border-warning border border-dashed p-3">
                <i className="fas fa-info-circle fs-2 text-warning me-4"></i>
                <div className="d-flex flex-stack flex-grow-1">
                  <div className="fw-semibold">
                    <h4 className="text-gray-800 fw-bold mb-1">Atención</h4>
                    <div className="fs-6 text-gray-600">
                      Se emitirán tarjetas a todos los clientes activos que
                      cumplan con los requisitos del producto seleccionado y no
                      tengan tarjetas emitidas.
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <Button type="button" variant="light" onClick={onClose}>
                Cancelar
              </Button>
              <Button
                type="submit"
                variant="primary"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                {formik.isSubmitting ? (
                  <span className="spinner-border spinner-border-sm me-1"></span>
                ) : null}
                Procesar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EmitCardModal;
