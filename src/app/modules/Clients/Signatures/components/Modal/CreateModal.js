/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Button, CircularProgress } from "@material-ui/core";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSnackBar } from "../../../../../hooks/useSnackBar";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import {
  Input,
  Checkbox,
} from "../../../../../../_metronic/_partials/controls";
import { GeneralSelector } from "../../../../../components/Fields/GeneralSelector";
import { newSignature } from "../../../../../_redux/signatures/signaturesCrud";
import { getSignaturesByClient } from "../../../../../_redux/signatures/signaturesByClientActions";
import { useParams } from "react-router-dom";
import { useFetchRelations } from "../../../../../hooks";

const ProductEditSchema = Yup.object().shape({
  IDClient: Yup.number().required("Este es un campo requerido"),
  IDRelation: Yup.number().required("Este es un campo requerido"),
  transfers: Yup.number().required("Este es un campo requerido"),
  payments: Yup.number().required("Este es un campo requerido"),
  Inversions: Yup.number().required("Este es un campo requerido"),
  Trxmin: Yup.number().required("Este es un campo requerido"),
  TrxMax: Yup.number().required("Este es un campo requerido"),
  Paymin: Yup.number().required("Este es un campo requerido"),
  Paymax: Yup.number().required("Este es un campo requerido"),
  Invmin: Yup.number().required("Este es un campo requerido"),
  Invmax: Yup.number().required("Este es un campo requerido"),
  Email: Yup.number().required("Este es un campo requerido"),
  SMS: Yup.number().required("Este es un campo requerido"),
  Token: Yup.number().required("Este es un campo requerido"),
  Status: Yup.number().required("Este es un campo requerido"),
  tipoEsquema: Yup.string().required("Este es un campo requerido"),
});

export function CreateModal(props) {
  const [progress, setProgress] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { open, variant, message, handleClose } = useSnackBar();
  const [relations /* loading */] = useFetchRelations(id);
  const firmantes = relations?.filter((e) => e.relation === "FIRMANTES");

  const initialValues = {
    IDClient: id,
    IDRelation: "",
    transfers: 0,
    payments: 0,
    Inversions: 0,
    Trxmin: 0,
    TrxminVista: 0,
    TrxMax: 0,
    TrxMaxVista: 0,
    Paymin: 0,
    PayminVista: 0,
    Paymax: 0,
    PaymaxVista: 0,
    Invmin: 0,
    InvminVista: 0,
    Invmax: 0,
    InvmaxVista: 0,
    Email: 0,
    SMS: 0,
    Token: 0,
    Status: 1,
    tipoEsquema: "",
  };

  const handleCreate = async (values) => {
    const requestValues = {
      IDClient: Number(values.IDClient),
      IDRelation: Number(values.IDRelation),
      transfers: values.transfers,
      payments: values.payments,
      Inversions: values.Inversions,
      Trxmin: Number(values.Trxmin),
      TrxMax: Number(values.TrxMax),
      Paymin: Number(values.Paymin),
      Paymax: Number(values.Paymax),
      Invmin: Number(values.Invmin),
      Invmax: Number(values.Invmax),
      Email: values.Email,
      SMS: values.SMS,
      Token: values.Token,
      Status: values.Status,
      tipoEsquema: values.tipoEsquema,
    };

    try {
      await newSignature(requestValues);
      setProgress(false);
      await dispatch(getSignaturesByClient(id));
      props.setShow(false);
    } catch {
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
          Nuevo Esquema
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
                <div className="col-lg-5">
                  <label className="font-size-h7">Nombre de esquema</label>
                  <Field
                    name="tipoEsquema"
                    className="form-control"
                    placeholder="Ingrese el nombre del esquema"
                    type="text"
                  />
                  <ErrorMessage name="tipoEsquema">
                    {(error) => <p className="text-danger text-xs">{error}</p>}
                  </ErrorMessage>
                </div>
                <div className="form-product row">
                  <div className="col-lg-5">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      Firmante
                    </label>
                    <GeneralSelector
                      values={values}
                      valueName="IDRelation"
                      valueKey="idClientRelation"
                      keyName="name"
                      keyLastName="lastName"
                      label=""
                      data={firmantes}
                      setFieldValue={setFieldValue}
                    />
                    <ErrorMessage name="IDRelation">
                      {(error) => (
                        <p className="text-danger text-xs">{error}</p>
                      )}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="form-product row"></div>
                <div className="form-product row">
                  <div className="col-lg-3">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      transfers
                    </label>
                    <span className="switch switch-sm">
                      <Checkbox
                        name="transfers"
                        isSelected={values.transfers}
                        onChange={(e) => {
                          setFieldValue("transfers", e.target.checked ? 1 : 0);
                        }}
                      ></Checkbox>
                    </span>
                  </div>
                  <div className="col-lg-3">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      Trxmin($)
                    </label>
                    <Field
                      name="TrxminVista"
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                      onChange={(e) => {
                        setFieldValue(
                          "TrxminVista",
                          e.target.value
                            .replace(/[^0-9]/g, "")
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                        );
                        setFieldValue(
                          "Trxmin",
                          e.target.value.replace(/[^0-9]/g, "")
                        );
                      }}
                    />
                    <Field type="hidden" name="Trxmin" />
                  </div>
                  <div className="col-lg-3">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      TrxMax($)
                    </label>
                    <Field
                      name="TrxMaxVista"
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                      onChange={(e) => {
                        setFieldValue(
                          "TrxMaxVista",
                          e.target.value
                            .replace(/[^0-9]/g, "")
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                        );
                        setFieldValue(
                          "TrxMax",
                          e.target.value.replace(/[^0-9]/g, "")
                        );
                      }}
                    />
                    <Field type="hidden" name="TrxMax" />
                  </div>
                </div>
                <div className="form-product row">
                  <div className="col-lg-3">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      payments
                    </label>
                    <span className="switch switch-sm">
                      <Checkbox
                        name="payments"
                        isSelected={values.payments}
                        onChange={(e) => {
                          setFieldValue("payments", e.target.checked ? 1 : 0);
                        }}
                      ></Checkbox>
                    </span>
                  </div>
                  <div className="col-lg-3">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      Paymin($)
                    </label>
                    <Field
                      name="PayminVista"
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                      onChange={(e) => {
                        setFieldValue(
                          "PayminVista",
                          e.target.value
                            .replace(/[^0-9]/g, "")
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                        );
                        setFieldValue(
                          "Paymin",
                          e.target.value.replace(/[^0-9]/g, "")
                        );
                      }}
                    />
                    <Field type="hidden" name="Paymin" />
                  </div>
                  <div className="col-lg-3">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      Paymax($)
                    </label>
                    <Field
                      name="PaymaxVista"
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                      onChange={(e) => {
                        setFieldValue(
                          "PaymaxVista",
                          e.target.value
                            .replace(/[^0-9]/g, "")
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                        );
                        setFieldValue(
                          "Paymax",
                          e.target.value.replace(/[^0-9]/g, "")
                        );
                      }}
                    />
                    <Field type="hidden" name="Paymax" />
                  </div>
                </div>
                <div className="form-product row">
                  <div className="col-lg-3">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      Investment
                    </label>
                    <span className="switch switch-sm">
                      <Checkbox
                        name="Inversions"
                        isSelected={values.Inversions}
                        onChange={(e) => {
                          setFieldValue("Inversions", e.target.checked ? 1 : 0);
                        }}
                      ></Checkbox>
                    </span>
                  </div>

                  <div className="col-lg-3">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      Invmin($)
                    </label>
                    <Field
                      name="InvminVista"
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                      onChange={(e) => {
                        setFieldValue(
                          "InvminVista",
                          e.target.value
                            .replace(/[^0-9]/g, "")
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                        );
                        setFieldValue(
                          "Invmin",
                          e.target.value.replace(/[^0-9]/g, "")
                        );
                      }}
                    />
                    <Field type="hidden" name="Invmin" />
                  </div>
                  <div className="col-lg-3">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      Invmax($)
                    </label>
                    <Field
                      name="InvmaxVista"
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                      onChange={(e) => {
                        setFieldValue(
                          "InvmaxVista",
                          e.target.value
                            .replace(/[^0-9]/g, "")
                            .replace(/\B(?=(\d{3})+(?!\d))/g, ".")
                        );
                        setFieldValue(
                          "Invmax",
                          e.target.value.replace(/[^0-9]/g, "")
                        );
                      }}
                    />
                    <Field type="hidden" name="Invmax" />
                  </div>
                </div>
                <div className="form-product row">
                  <div className="col-lg-3">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      Email
                    </label>
                    <span className="switch switch-sm">
                      <Checkbox
                        name="Email"
                        isSelected={values.Email}
                        onChange={(e) => {
                          setFieldValue("Email", e.target.checked ? 1 : 0);
                        }}
                      ></Checkbox>
                    </span>
                  </div>

                  <div className="col-lg-3">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      SMS
                    </label>
                    <span className="switch switch-sm">
                      <Checkbox
                        name="SMS"
                        isSelected={values.SMS}
                        onChange={(e) => {
                          setFieldValue("SMS", e.target.checked ? 1 : 0);
                        }}
                      ></Checkbox>
                    </span>
                  </div>
                  <div className="col-lg-3">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      Token
                    </label>
                    <span className="switch switch-sm">
                      <Checkbox
                        name="Token"
                        isSelected={values.Token}
                        onChange={(e) => {
                          setFieldValue("Token", e.target.checked ? 1 : 0);
                        }}
                      ></Checkbox>
                    </span>
                  </div>
                  <div className="col-lg-3">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      Status
                    </label>
                    <span className="switch switch-sm">
                      <Checkbox
                        name="Status"
                        isSelected={values.Status}
                        onChange={(e) => {
                          setFieldValue("Status", e.target.checked ? 1 : 0);
                        }}
                      ></Checkbox>
                    </span>
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
