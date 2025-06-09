/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { Button, CircularProgress /* MenuItem */ } from "@material-ui/core";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSnackBar } from "../../../../../hooks/useSnackBar";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import {
  Input,
  Checkbox,
} from "../../../../../../_metronic/_partials/controls";
import { GeneralSelector } from "../../../../../components/Fields/GeneralSelector";
import { updateSignature } from "../../../../../_redux/signatures/signaturesCrud";
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
});

export function EditModal(props) {
  const [progress, setProgress] = useState(false);
  const dispatch = useDispatch();
  const {
    open,
    variant,
    message,
    handleClose /* setOpenMessage */,
  } = useSnackBar();
  const { id } = useParams();
  const [relations /* loading */] = useFetchRelations(id);
  const firmantes = relations?.filter((e) => e.relation === "FIRMANTES");

  const initialValues = {
    id: props.editInitialData.id,
    IDClient: id,
    IDRelation: props.editInitialData.IDRelation,
    transfers: Number(props.editInitialData.transfers),
    payments: Number(props.editInitialData.payments),
    Inversions: Number(props.editInitialData.Inversions),
    Trxmin: props.editInitialData.Trxmin,
    TrxminVista: Math.floor(parseFloat(props.editInitialData.Trxmin))
      .toString()
      .replace(/[^0-9]/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    TrxMax: props.editInitialData.TrxMax,
    TrxMaxVista: Math.floor(parseFloat(props.editInitialData.TrxMax))
      .toString()
      .replace(/[^0-9]/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    Paymin: props.editInitialData.Paymin,
    PayminVista: Math.floor(parseFloat(props.editInitialData.Paymin))
      .toString()
      .replace(/[^0-9]/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    Paymax: props.editInitialData.Paymax,
    PaymaxVista: Math.floor(parseFloat(props.editInitialData.Paymax))
      .toString()
      .replace(/[^0-9]/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    Invmin: props.editInitialData.Invmin,
    InvminVista: Math.floor(parseFloat(props.editInitialData.Invmin))
      .toString()
      .replace(/[^0-9]/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    Invmax: props.editInitialData.Invmax,
    InvmaxVista: Math.floor(parseFloat(props.editInitialData.Invmax))
      .toString()
      .replace(/[^0-9]/g, "")
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    Email: Number(props.editInitialData.Email),
    SMS: Number(props.editInitialData.SMS),
    Token: Number(props.editInitialData.Token),
    Status: Number(props.editInitialData.Status),
  };

  async function handleEdit(values) {
    const requestValues = {
      id: Number(values.id),
      IDClient: Number(values.IDClient),
      IDRelation: Number(values.IDRelation),
      transfers: Number(values.transfers),
      payments: Number(values.payments),
      Inversions: Number(values.Inversions),
      Trxmin: Number(values.Trxmin),
      TrxMax: Number(values.TrxMax),
      Paymin: Number(values.Paymin),
      Paymax: Number(values.Paymax),
      Invmin: Number(values.Invmin),
      Invmax: Number(values.Invmax),
      Email: Number(values.Email),
      SMS: Number(values.SMS),
      Token: Number(values.Token),
      Status: Number(values.Status),
    };
    try {
      setProgress(true);
      await updateSignature(requestValues);
      await dispatch(getSignaturesByClient(id));
      setProgress(false);
      props.setShow(false);
    } catch {
      setProgress(false);
    }
  }

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
          Actualizar Firmante
        </Modal.Title>
      </Modal.Header>
      <Formik
        enableReinitialize={false}
        initialValues={initialValues}
        validationSchema={ProductEditSchema}
        onSubmit={(values) => {
          setProgress(true);
          return handleEdit(values);
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
                      {(error) => <p class="text-danger text-xs">{error}</p>}
                    </ErrorMessage>
                  </div>
                </div>
                <div className="form-product row">
                  <div className="col-lg-3">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      transfers
                    </label>
                    <span class="switch switch-sm">
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
                    <span class="switch switch-sm">
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
                    <span class="switch switch-sm">
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
                    <span class="switch switch-sm">
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
                    <span class="switch switch-sm">
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
                    <span class="switch switch-sm">
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
                    <span class="switch switch-sm">
                      <Checkbox
                        name="status"
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
