/* eslint-disable eqeqeq */
import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Button, CircularProgress /* MenuItem */ } from "@material-ui/core";
import { Form, Formik, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSnackBar } from "../../../../../hooks/useSnackBar";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import { Input } from "../../../../../../_metronic/_partials/controls";
import { GeneralSelector } from "../../../../../components/Fields/GeneralSelector";
import { getAllBlotters } from "../../../../../_redux/blotter/blottersActions";
import { updateAuthorizedBlotter } from "../../../../../_redux/blotter/blottersCrud";

const ProductEditSchema = Yup.object().shape({
  transferPrice: Yup.string().required("Este es un campo requerido"),
  performance: Yup.string().required("Este es un campo requerido"),
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
  const cat = [
    { id: 1, cat: "FX" },
    { id: 2, cat: "OP" },
    { id: 3, cat: "PASE" },
    { id: 4, cat: "ANULAR" },
  ];
  const catFilter = cat.filter(
    (e) => e.id == props.editInitialData.FX || e.id == 4
  );
  const { fromBlotter, toBlotter } = useSelector((s) => s.blotters);

  const initialValues = {
    date: props?.editInitialData?.date?.split(" ")[0],
    id: props.editInitialData.id,
    wallet: props.editInitialData.wallet,
    operations: props.editInitialData.operations,
    money: props.editInitialData.money,
    description: props.editInitialData.description,
    deadline: props.editInitialData.deadline,
    quantity: parseInt(props.editInitialData.quantity),
    quantityFormat: parseFloat(props.editInitialData.quantity)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, "."),
    price: new Intl.NumberFormat("de-DE", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(props.editInitialData.price),
    amount: new Intl.NumberFormat("de-DE", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(props.editInitialData.amount),
    counterparty: props.editInitialData.counterparty,
    market: props.editInitialData.market,
    idOperator: 0,
    charge: props.editInitialData.charge,
    authorized: props.editInitialData.authorized,
    idAuthorized: 0,
    transferPrice: new Intl.NumberFormat("de-DE", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(props.editInitialData.TransferPrice),
    performance: new Intl.NumberFormat("de-DE", {
      minimumFractionDigits: 4,
      maximumFractionDigits: 4,
    }).format(props.editInitialData.performance),
    FX: props.editInitialData.FX,
    notes: props.editInitialData.notes,
    timestamp: "",
    status: "",
  };

  async function handleEdit(e) {
    const values = {
      id: e.id,
      auth: e.authorized,
      notes: e.notes,
      FX: e.FX,
      tranferPrice: Number(
        e.transferPrice.replace(/\./g, "").replace(",", ".")
      ),
      performance: Number(e.performance.replace(/\./g, "").replace(",", ".")),
      /*   notes: e.notes,
      FX: e.FX, */
    };

    try {
      setProgress(true);
      await updateAuthorizedBlotter(values);
      await dispatch(getAllBlotters(false, fromBlotter, toBlotter));
      props.setShow(false);
      setProgress(false);
    } catch {
      setProgress(false);
    }
  }

  return (
    <Modal show={props.show} size={"xl"} centered={true} animation={true}>
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Actualizar operación
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
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      CARTERA
                    </label>
                    <Field
                      name="wallet"
                      disabled
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      OPERACION
                    </label>
                    <Field
                      name="operations"
                      disabled
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      MONEDA
                    </label>
                    <Field
                      name="money"
                      disabled
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                    />
                  </div>
                </div>
                <div className="form-product row">
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      ESPECIE
                    </label>
                    <Field
                      name="description"
                      disabled
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      PLAZO
                    </label>
                    <Field
                      name="deadline"
                      disabled
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      CANTIDAD
                    </label>
                    <Field type="hidden" name="quantity" />

                    <Field
                      name="quantityFormat"
                      disabled
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                    />
                  </div>
                </div>
                <div className="form-product row">
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      PRECIO C/100
                    </label>
                    <Field
                      name="price"
                      disabled
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      MONTO %100
                    </label>
                    <Field
                      name="amount"
                      disabled
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      CONTRAPARTE
                    </label>
                    <Field
                      name="counterparty"
                      disabled
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                    />
                  </div>
                </div>
                <div className="form-product row">
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      MERCADO
                    </label>
                    <Field
                      name="market"
                      disabled
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-form-label text-lg-left">
                      OBS
                    </label>
                    <GeneralSelector
                      values={values}
                      valueName="FX"
                      keyName="cat"
                      label=""
                      data={catFilter}
                      setFieldValue={setFieldValue}
                    />
                    <ErrorMessage name="FX">
                      {(error) => <p class="text-danger text-xs">{error}</p>}
                    </ErrorMessage>
                  </div>
                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-12 col-form-label text-lg-left">
                      FECHA DE CONCERTACION
                    </label>
                    <Field
                      type="text"
                      disabled
                      class="form-control"
                      name="date"
                      placeholder=""
                      component={Input}
                    />
                  </div>
                  <div className="col-lg-4">
                    <label className="font-size-h7  col-form-label text-lg-left">
                      TRANSFER PRICE
                    </label>
                    <Field
                      name="transferPrice"
                      component={Input}
                      type="text"
                      placeholder=""
                      onFocus={() =>
                        setFieldValue(
                          "transferPrice",
                          values.transferPrice
                            .replace(/\./g, "")
                            .replace(",", ".")
                        )
                      }
                      onBlur={() =>
                        setFieldValue(
                          "transferPrice",
                          new Intl.NumberFormat("de-DE", {
                            minimumFractionDigits: 4,
                            maximumFractionDigits: 4,
                          }).format(values.transferPrice)
                        )
                      }
                      onChange={(e) =>
                        setFieldValue(
                          "transferPrice",
                          e.target.value.replace(/[^0-9.]/g, "")
                        )
                      }
                      label=""
                    />
                  </div>

                  <div className="col-lg-4">
                    <label className="font-size-h7 col-lg-4 col-form-label text-lg-left">
                      RDO
                    </label>
                    <Field
                      name="performance"
                      component={Input}
                      placeholder=""
                      type="text"
                      label=""
                      readOnly
                      value={
                        (values.performance =
                          props.editInitialData.operations === "COMPRA"
                            ? values.transferPrice.includes(",")
                              ? new Intl.NumberFormat("de-DE", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(
                                  ((Number(
                                    values.transferPrice
                                      .replace(/\./g, "")
                                      .replace(",", ".")
                                  ) -
                                    Number(
                                      values.price
                                        .replace(/\./g, "")
                                        .replace(",", ".")
                                    )) /
                                    100) *
                                    values.quantity
                                )
                              : new Intl.NumberFormat("de-DE", {
                                  minimumFractionDigits: 2,
                                  maximumFractionDigits: 2,
                                }).format(
                                  ((Number(values.transferPrice) -
                                    Number(
                                      values.price
                                        .replace(/\./g, "")
                                        .replace(",", ".")
                                    )) /
                                    100) *
                                    values.quantity
                                )
                            : values.transferPrice.includes(",")
                            ? new Intl.NumberFormat("de-DE", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(
                                ((Number(
                                  values.price
                                    .replace(/\./g, "")
                                    .replace(",", ".")
                                ) -
                                  Number(
                                    values.transferPrice
                                      .replace(/\./g, "")
                                      .replace(",", ".")
                                  )) /
                                  100) *
                                  values.quantity
                              )
                            : new Intl.NumberFormat("de-DE", {
                                minimumFractionDigits: 2,
                                maximumFractionDigits: 2,
                              }).format(
                                ((Number(
                                  values.price
                                    .replace(/\./g, "")
                                    .replace(",", ".")
                                ) -
                                  Number(values.transferPrice)) /
                                  100) *
                                  values.quantity
                              ))
                      }
                    />
                  </div>
                  <div className="col-lg-12">
                    <label className="font-size-h7 col-lg-12 col-form-label text-lg-left">
                      NOTAS
                    </label>
                    <Field
                      type="text"
                      class="form-control"
                      name="notes"
                      placeholder=""
                      component={Input}
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
