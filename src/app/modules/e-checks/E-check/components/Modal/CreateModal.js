/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Button, CircularProgress } from "@material-ui/core";
import { Form, Formik, Field /* ErrorMessage */ } from "formik";
import * as Yup from "yup";
import { useSnackBar } from "../../../../../hooks/useSnackBar";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import { Input } from "../../../../../../_metronic/_partials/controls";
import { createEcheck } from "../../../../../_redux/e-checks/echecksCrud";
import { getAllEchecks } from "../../../../../_redux/e-checks/echecksActions";

const ProductEditSchema = Yup.object().shape({
  idcuenta: Yup.number().required("Este es un campo requerido"),
  idmoneda: Yup.number().required("Este es un campo requerido"),
  cuitdestino: Yup.string().required("Este es un campo requerido"),
  importe: Yup.number().required("Este es un campo requerido"),
  fechapago: Yup.string().required("Este es un campo requerido"),
  fechaemision: Yup.string().required("Este es un campo requerido"),
  tipoemision: Yup.number().required("Este es un campo requerido"),
  concepto: Yup.string().required("Este es un campo requerido"),
  nature: Yup.string().required("Este es un campo requerido"),
  modo: Yup.string().required("Este es un campo requerido"),
  razon: Yup.string().required("Este es un campo requerido"),
  referencia: Yup.string().required("Este es un campo requerido"),
  trxid: Yup.string().required("Este es un campo requerido"),
  trxjson: Yup.string().required("Este es un campo requerido"),
  status: Yup.number().required("Este es un campo requerido"),
});

export function CreateModal(props) {
  const [progress, setProgress] = useState(false);
  const dispatch = useDispatch();
  const { open, variant, message, handleClose, setOpenMessage } = useSnackBar();

  const fecha = new Date();
  const año = fecha.getFullYear();
  const mes = (fecha.getMonth() + 1).toString().padStart(2, "0");
  const dia = fecha
    .getDate()
    .toString()
    .padStart(2, "0");
  const fechaFormateada = `${año}-${mes}-${dia}`;

  const initialValues = {
    idcuenta: 0,
    idmoneda: 0,
    cuitdestino: "",
    importe: 0,
    fechapago: fechaFormateada,
    fechaemision: fechaFormateada,
    tipoemision: 0,
    concepto: "",
    nature: "",
    modo: "",
    razon: "",
    referencia: "",
    trxid: "",
    trxjson: "",
  };

  const handleCreate = async (values) => {
    console.log(values.fechapago);
    const fechaPago = new Date(values.fechapago);
    const fechaPagoISO = fechaPago.toISOString();
    const fechaEmision = new Date(values.fechaemision);
    const fechaEmisionISO = fechaEmision.toISOString();

    const requestValues = {
      idcuenta: values.idcuenta,
      idmoneda: values.idmoneda,
      tipoemision: values.tipoemision,
      cuitdestino: values.cuitdestino,
      importe: values.importe,
      fechaemision: fechaEmisionISO,
      fechapago: fechaPagoISO,
      concepto: values.idcuenta,
      nature: values.concepto,
      modo: values.modo,
      razon: values.razon,
      referencia: values.referencia,
      trxid: values.trxid,
      trxjson: values.trxjson,
    };

    try {
      await createEcheck(requestValues);
      setProgress(false);
      setOpenMessage("success", "El cheque fue creado correctamente.");
      await dispatch(getAllEchecks());
      props.setShow(false);
    } catch {
      setOpenMessage(
        "error",
        "El cheque no pudo ser creado correctamente. Por favor, volvé a intentar."
      );
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
        <Modal.Title id="example-modal-sizes-title-lg">
          Nuevo E-check
        </Modal.Title>
      </Modal.Header>
      <Formik
        enableReinitialize={false}
        initialValues={initialValues}
        validationSchema={ProductEditSchema}
        onSubmit={(values) => {
          setProgress(true);
          return handleCreate(values);
        }}
      >
        {({
          handleSubmit,
          handleChange,
          setFieldValue,
          values,
          isSubmitting,
        }) => (
          <>
            <Modal.Body className="overlay overlay-block cursor-default">
              <Form className="form form-label-right">
                <div className="form-product row">
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      ID CUENTA
                    </label>
                    <Field
                      name="idcuenta"
                      component={Input}
                      placeholder=""
                      type="number"
                      label=""
                      onChange={(e) =>
                        setFieldValue("idcuenta", e.target.value)
                      }
                    />
                  </div>

                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      ID MONEDA
                    </label>
                    <Field
                      name="idmoneda"
                      component={Input}
                      placeholder=""
                      type="number"
                      label=""
                      onChange={(e) =>
                        setFieldValue("idmoneda", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      CUIT DESTINO
                    </label>
                    <Field
                      name="cuitdestino"
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                      onChange={(e) =>
                        setFieldValue("cuitdestino", e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="form-product row">
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      IMPORTE
                    </label>
                    <Field
                      name="importe"
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                      onChange={(e) => setFieldValue("importe", e.target.value)}
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      CONCEPTO
                    </label>
                    <Field
                      name="concepto"
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                      onChange={(e) =>
                        setFieldValue("concepto", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      NATURE
                    </label>
                    <Field
                      name="nature"
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                      onChange={(e) => setFieldValue("nature", e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-product row">
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      MODO
                    </label>
                    <Field
                      name="modo"
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                      onChange={(e) => setFieldValue("modo", e.target.value)}
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      ESTADO
                    </label>
                    <Field
                      name="status"
                      component={Input}
                      placeholder=""
                      type="number"
                      label=""
                      onChange={(e) => setFieldValue("status", e.target.value)}
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      RAZON
                    </label>
                    <Field
                      name="razon"
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                      onChange={(e) => setFieldValue("razon", e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-product row">
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      REFERENCIA
                    </label>
                    <Field
                      name="referencia"
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                      onChange={(e) =>
                        setFieldValue("referencia", e.target.value)
                      }
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      trxid
                    </label>
                    <Field
                      name="trxid"
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                      onChange={(e) => setFieldValue("trxid", e.target.value)}
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      trxjson
                    </label>
                    <Field
                      name="trxjson"
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                      onChange={(e) => setFieldValue("trxjson", e.target.value)}
                    />
                  </div>
                </div>
                <div className="form-product row">
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-12 col-form-label text-lg-left">
                      FECHA DE EMISION
                    </label>
                    <Field
                      type="date"
                      class="form-control"
                      name="fechaemision"
                      placeholder=""
                      component={Input}
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-12 col-form-label text-lg-left">
                      FECHA DE PAGO
                    </label>
                    <Field
                      type="date"
                      class="form-control"
                      name="fechapago"
                      placeholder=""
                      component={Input}
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-6 col-form-label text-lg-left">
                      TIPO DE EMISION
                    </label>
                    <Field
                      name="tipoemision"
                      component={Input}
                      placeholder=""
                      type="number"
                      label=""
                      onChange={(e) =>
                        setFieldValue("tipoemision", e.target.value)
                      }
                    />
                  </div>
                </div>
              </Form>
            </Modal.Body>
            <Modal.Footer className="form">
              <div className="form-group">
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
                  className="mr-3"
                  size="large"
                  onClick={() => handleSubmit()}
                  disabled={progress}
                  endIcon={
                    progress && <CircularProgress size={20} color="secondary" />
                  }
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
          </>
        )}
      </Formik>
    </Modal>
  );
}
