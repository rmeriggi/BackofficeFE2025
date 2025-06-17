/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Button, CircularProgress } from "@material-ui/core";
import { Form, Formik, Field } from "formik";
import * as Yup from "yup";
import { useSnackBar } from "../../../../../hooks/useSnackBar";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import { Input } from "../../../../../../_metronic/_partials/controls";
import { createInvoice } from "../../../../../_redux/invoices/invoicesCrud";
import { getAllInvoices } from "../../../../../_redux/invoices/InvoicesActions";
import {
  Business,
  Description,
  Email,
  Event,
  EventAvailable,
  Link,
  Money,
  Payment,
  Fingerprint,
} from "@material-ui/icons";

const DebtReceivableSchema = Yup.object().shape({
  cuit: Yup.string()
    .required("Este campo es obligatorio")
    .matches(/^\d{11}$/, "El CUIT debe tener 11 dígitos"),
  razonsocial: Yup.string().required("Este campo es obligatorio"),
  importe: Yup.number()
    .required("Este campo es obligatorio")
    .positive("El importe debe ser positivo"),
  fecha: Yup.string().required("Este campo es obligatorio"),
  fechavencimiento: Yup.string().required("Este campo es obligatorio"),
  condicion: Yup.string().required("Este campo es obligatorio"),
  descripcion: Yup.string(),
  email: Yup.string().email("Formato de email inválido"),
  url: Yup.string().url("Formato de URL inválido"),
  comprobante: Yup.string(),
});

export function CreateModal(props) {
  const [progress, setProgress] = useState(false);
  const dispatch = useDispatch();
  const { open, variant, message, handleClose, setOpenMessage } = useSnackBar();

  const initialValues = {
    cuit: "",
    razonsocial: "",
    importe: 0,
    fecha: "",
    fechavencimiento: "",
    condicion: "",
    descripcion: "",
    email: "",
    url: "",
    comprobante: "",
  };

  const handleCreate = async (values) => {
    const requestValues = {
      tipomovimiento: 1,
      cuit: values.cuit,
      fecha: new Date(values.fecha).toISOString(),
      fechavencimiento: new Date(values.fechavencimiento).toISOString(),
      condicion: values.condicion,
      trxautomatica: 0,
      email: values.email,
      url: values.url,
      comprobante: values.comprobante,
      centrocosto: 100,
      importe: values.importe,
      idcuenta: 200,
      categoria: 300,
      descripcion: values.descripcion,
      idorigen: 400,
      razonsocial: values.razonsocial,
    };

    try {
      await createInvoice(requestValues);
      setProgress(false);
      setOpenMessage("success", "Comprobante creado exitosamente");
      await dispatch(getAllInvoices());
      setTimeout(() => {
        props.setShow(false);
      }, 1500);
    } catch {
      setOpenMessage(
        "error",
        "Error al crear el comprobante. Por favor, intente nuevamente."
      );
      setProgress(false);
    }
  };

  // Estilos para campos de formulario
  const fieldStyle = {
    backgroundColor: "#f8f9fa",
    borderRadius: "6px",
    border: "1px solid #e4e6ef",
    padding: "12px 15px",
    fontSize: "15px",
    width: "100%",
  };

  return (
    <Modal
      show={props.show}
      onHide={() => {
        if (!progress) props.setShow(false);
      }}
      size={"lg"}
      centered={true}
      animation={true}
      backdrop={progress ? "static" : true}
    >
      <Modal.Header closeButton={!progress} className="bg-light-primary">
        <Modal.Title className="d-flex align-items-center">
          <span
            className="svg-icon svg-icon-primary svg-icon-2x"
            style={{ marginRight: "10px" }}
          >
            <i className="fas fa-file-invoice fs-2x text-primary"></i>
          </span>
          <div>
            <h2 className="fw-bolder mb-0">Nuevo Comprobante</h2>
            <div className="text-muted fs-7">Complete los datos requeridos</div>
          </div>
        </Modal.Title>
      </Modal.Header>

      <Formik
        initialValues={initialValues}
        validationSchema={DebtReceivableSchema}
        onSubmit={(values) => {
          setProgress(true);
          return handleCreate(values);
        }}
      >
        {({ handleSubmit, setFieldValue, values, errors, touched }) => (
          <>
            <Modal.Body className="py-6 px-8">
              <Form className="form">
                <div className="mb-8">
                  <h4 className="fw-bolder text-gray-800 mb-5 d-flex align-items-center">
                    <Business
                      className=" text-primary"
                      style={{ marginRight: "5px" }}
                    />
                    Información del Proveedor
                  </h4>

                  <div className="row g-5 mb-6">
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-gray-700 mb-3 d-flex align-items-center">
                        <Business
                          className="me-2"
                          style={{ marginRight: "5px", color: "#3699FF" }}
                        />
                        Razón Social
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <Field
                        name="razonsocial"
                        component={Input}
                        placeholder="Nombre del proveedor"
                        style={fieldStyle}
                      />
                      {errors.razonsocial && touched.razonsocial && (
                        <div className="text-danger mt-2">
                          {errors.razonsocial}
                        </div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold text-gray-700 mb-3 d-flex align-items-center">
                        <Fingerprint
                          className="me-2"
                          style={{ marginRight: "5px", color: "#3699FF" }}
                        />
                        CUIT
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <Field
                        name="cuit"
                        component={Input}
                        placeholder="12345678901"
                        style={fieldStyle}
                      />
                      {errors.cuit && touched.cuit && (
                        <div className="text-danger mt-2">{errors.cuit}</div>
                      )}
                    </div>
                  </div>
                </div>

                <div className="separator separator-dashed my-8"></div>

                <div className="mb-8">
                  <h4 className="fw-bolder text-gray-800 mb-5 d-flex align-items-center">
                    <Money
                      className=" text-primary"
                      style={{ marginRight: "5px" }}
                    />
                    Detalles del Comprobante
                  </h4>

                  <div className="row g-5 mb-6">
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-gray-700 mb-3 d-flex align-items-center">
                        <Money
                          className="me-2"
                          style={{ marginRight: "5px", color: "#3699FF" }}
                        />
                        Importe ($)
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <Field
                        name="importe"
                        component={Input}
                        placeholder="0.00"
                        type="number"
                        step="0.01"
                        style={fieldStyle}
                      />
                      {errors.importe && touched.importe && (
                        <div className="text-danger mt-2">{errors.importe}</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold text-gray-700 mb-3 d-flex align-items-center">
                        <Payment
                          className="me-2"
                          style={{ marginRight: "5px", color: "#3699FF" }}
                        />
                        Condición de Pago
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <Field
                        name="condicion"
                        component={Input}
                        placeholder="Ej: Contado, 30 días"
                        style={fieldStyle}
                      />
                      {errors.condicion && touched.condicion && (
                        <div className="text-danger mt-2">
                          {errors.condicion}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row g-5 mb-6">
                    <div className="col-md-6">
                      <label className="form-label fw-bold text-gray-700 mb-3 d-flex align-items-center">
                        <Event
                          className="me-2"
                          style={{ marginRight: "5px", color: "#3699FF" }}
                        />
                        Fecha del Comprobante
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <Field
                        name="fecha"
                        component={Input}
                        type="date"
                        style={fieldStyle}
                      />
                      {errors.fecha && touched.fecha && (
                        <div className="text-danger mt-2">{errors.fecha}</div>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fw-bold text-gray-700 mb-3 d-flex align-items-center">
                        <EventAvailable
                          className="me-2"
                          style={{ marginRight: "5px", color: "#3699FF" }}
                        />
                        Fecha de Vencimiento
                        <span className="text-danger ms-1">*</span>
                      </label>
                      <Field
                        name="fechavencimiento"
                        component={Input}
                        type="date"
                        style={fieldStyle}
                      />
                      {errors.fechavencimiento && touched.fechavencimiento && (
                        <div className="text-danger mt-2">
                          {errors.fechavencimiento}
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="row g-5">
                    <div className="col-md-12">
                      <label className="form-label fw-bold text-gray-700 mb-3 d-flex align-items-center">
                        <Description
                          className="me-2"
                          style={{ marginRight: "5px", color: "#3699FF" }}
                        />
                        Descripción
                      </label>
                      <Field
                        name="descripcion"
                        component={Input}
                        placeholder="Descripción del comprobante"
                        style={fieldStyle}
                      />
                    </div>
                  </div>
                </div>

                <div className="separator separator-dashed my-8"></div>

                <div>
                  <h4 className="fw-bolder text-gray-800 mb-5 d-flex align-items-center">
                    <i
                      className="fas fa-link fs-2  text-primary"
                      style={{ marginRight: "5px" }}
                    ></i>
                    Información Adicional
                  </h4>

                  <div className="row g-5">
                    <div className="col-md-4">
                      <label className="form-label fw-bold text-gray-700 mb-3 d-flex align-items-center">
                        <Email
                          className="me-2"
                          style={{ marginRight: "5px", color: "#3699FF" }}
                        />
                        Email
                      </label>
                      <Field
                        name="email"
                        component={Input}
                        placeholder="correo@proveedor.com"
                        style={fieldStyle}
                      />
                      {errors.email && touched.email && (
                        <div className="text-danger mt-2">{errors.email}</div>
                      )}
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-bold text-gray-700 mb-3 d-flex align-items-center">
                        <Link
                          className="me-2"
                          style={{ marginRight: "5px", color: "#3699FF" }}
                        />
                        URL
                      </label>
                      <Field
                        name="url"
                        component={Input}
                        placeholder="https://..."
                        style={fieldStyle}
                      />
                      {errors.url && touched.url && (
                        <div className="text-danger mt-2">{errors.url}</div>
                      )}
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fw-bold text-gray-700 mb-3">
                        N° Comprobante
                      </label>
                      <Field
                        name="comprobante"
                        component={Input}
                        placeholder="Número de comprobante"
                        style={fieldStyle}
                      />
                    </div>
                  </div>
                </div>
              </Form>
            </Modal.Body>

            <Modal.Footer className="d-flex justify-content-between border-top py-6 px-8">
              <Button
                variant="outlined"
                className="btn btn-light btn-active-light-primary"
                onClick={() => props.setShow(false)}
                disabled={progress}
              >
                Cancelar
              </Button>

              <Button
                variant="contained"
                className="btn btn-primary"
                onClick={handleSubmit}
                disabled={progress}
                style={{
                  minWidth: "140px",
                  padding: "10px 20px",
                  fontWeight: 600,
                }}
              >
                {progress ? (
                  <span className="d-flex align-items-center">
                    <CircularProgress
                      size={20}
                      color="inherit"
                      className="me-2"
                    />
                    Creando...
                  </span>
                ) : (
                  "Crear Comprobante"
                )}
              </Button>
            </Modal.Footer>

            <SnackbarMessage
              handleClose={handleClose}
              open={open}
              variant={variant}
              message={message}
            />
          </>
        )}
      </Formik>
    </Modal>
  );
}
