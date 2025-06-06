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

const DebtReceivableSchema = Yup.object().shape({
  cuit: Yup.string().required("Este es un campo requerido"),
  razonsocial: Yup.string().required("Este es un campo requerido"),
  importe: Yup.number().required("Este es un campo requerido"),
  fecha: Yup.string().required("Este es un campo requerido"),
  fechavencimiento: Yup.string().required("Este es un campo requerido"),
  condicion: Yup.string().required("Este es un campo requerido"),
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
      setOpenMessage("success", "El comprobante fue creado correctamente.");
      await dispatch(getAllInvoices());
      props.setShow(false);
    } catch {
      setOpenMessage("error", "El comprobante no pudo ser creado correctamente. Por favor, volvé a intentar.");
      setProgress(false);
    }
  };

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size={"xl"}
      centered={true}
      animation={true}
    >
      <Modal.Header closeButton>
        <Modal.Title>Nuevo Comprobante</Modal.Title>
      </Modal.Header>
      <Formik
        initialValues={initialValues}
        validationSchema={DebtReceivableSchema}
        onSubmit={(values) => {
          setProgress(true);
          return handleCreate(values);
        }}
      >
        {({ handleSubmit, setFieldValue, values }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              <Form className="form form-label-right">
                <div className="form-group row">
                  <div className="col-lg-6">
                    <label>Razón Social</label>
                    <Field
                      name="razonsocial"
                      component={Input}
                      placeholder=""
                      type="text"
                      onChange={(e) => setFieldValue("razonsocial", e.target.value)}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label>CUIT</label>
                    <Field
                      name="cuit"
                      component={Input}
                      placeholder=""
                      type="text"
                      onChange={(e) => setFieldValue("cuit", e.target.value)}
                    />
                  </div>
                </div>
                <h5>Dirección Legal</h5>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <label>Importe*</label>
                    <Field
                      name="importe"
                      component={Input}
                      placeholder=""
                      type="number"
                      onChange={(e) => setFieldValue("importe", e.target.value)}
                    />
                  </div>
                  <div className="col-lg-4">
                    <label>Fecha del Comprobante*</label>
                    <Field
                      name="fecha"
                      component={Input}
                      type="date"
                      onChange={(e) => setFieldValue("fecha", e.target.value)}
                    />
                  </div>
                  <div className="col-lg-4">
                    <label>Fecha de Vencimiento*</label>
                    <Field
                      name="fechavencimiento"
                      component={Input}
                      type="date"
                      onChange={(e) => setFieldValue("fechavencimiento", e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-6">
                    <label>Condición de Pago</label>
                    <Field
                      name="condicion"
                      component={Input}
                      placeholder=""
                      type="text"
                      onChange={(e) => setFieldValue("condicion", e.target.value)}
                    />
                  </div>
                  <div className="col-lg-6">
                    <label>Descripción</label>
                    <Field
                      name="descripcion"
                      component={Input}
                      placeholder=""
                      type="text"
                      onChange={(e) => setFieldValue("descripcion", e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-group row">
                  <div className="col-lg-4">
                    <label>Email</label>
                    <Field
                      name="email"
                      component={Input}
                      placeholder=""
                      type="email"
                      onChange={(e) => setFieldValue("email", e.target.value)}
                    />
                  </div>
                  <div className="col-lg-4">
                    <label>URL</label>
                    <Field
                      name="url"
                      component={Input}
                      placeholder=""
                      type="url"
                      onChange={(e) => setFieldValue("url", e.target.value)}
                    />
                  </div>
                  <div className="col-lg-4">
                    <label>Comprobante</label>
                    <Field
                      name="comprobante"
                      component={Input}
                      placeholder=""
                      type="text"
                      onChange={(e) => setFieldValue("comprobante", e.target.value)}
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer className="form">
              <Button
                variant="contained"
                color="secondary"
                className="mr-3"
                size="large"
                onClick={() => props.setShow(false)}
              >
                Cancelar
              </Button>
              <Button
                variant="contained"
                color="secondary"
                size="large"
                onClick={() => handleSubmit()}
                disabled={progress}
                endIcon={progress && <CircularProgress size={20} color="secondary" />}
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
          </>
        )}
      </Formik>
    </Modal>
  );
}
