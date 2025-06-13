import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../_metronic/_partials/controls";
import { FormControlLabel, Switch } from "@material-ui/core";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import { useHistory } from "react-router";
import { useSnackBar } from "../../../../../hooks/useSnackBar";

// Material-UI Icons
import CreditCardIcon from "@material-ui/icons/CreditCard";
import MonetizationOnIcon from "@material-ui/icons/MonetizationOn";
import ShowChartIcon from "@material-ui/icons/ShowChart";
import SettingsIcon from "@material-ui/icons/Settings";
import BusinessIcon from "@material-ui/icons/Business";
import DescriptionIcon from "@material-ui/icons/Description";
import LocalAtmIcon from "@material-ui/icons/LocalAtm";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import CompareArrowsIcon from "@material-ui/icons/CompareArrows";
import RefreshIcon from "@material-ui/icons/Refresh";
import LocalShippingIcon from "@material-ui/icons/LocalShipping";

const ProductEditSchema = Yup.object().shape({
  product: Yup.string().required("Nombre del grupo es un campo requerido"),
});

export function ProductEditForm({ product, ref }) {
  const initialValues = {
    product: product.product,
    brand: product.brand,
    cardType: product.cardType,
    cashierExt: product.cashierExt,
    cashier: product.cashier,
    extractCashier: product.extractCashier,
    punitiveRate: product.punitiveRate,
    replacement: product.replacement,
    compensatoryRate: product.compensatoryRate,
    refinancing: product.refinancing,
    tem: product.tem,
    cft: product.cft,
    tna: product.tna,
    summary: product.summary,
    renewalCharge: product.renewalCharge,
    quotaLimit: product.quotaLimit,
    limit: product.limit,
    flota: product.flota,
    comision: product.comision,
  };

  const history = useHistory();
  const { open, variant, message, handleClose, setOpenMessage } = useSnackBar();
  const [, /* progress */ setProgress] = useState(false);

  const handleEdit = async (values) => {
    try {
      setProgress(true);
      // Simulamos una llamada a la API
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setOpenMessage("success", "El producto fue actualizado correctamente.");
      setTimeout(() => {
        history.push("/cards/products");
      }, 4000);
    } catch {
      setOpenMessage(
        "error",
        "El producto no pudo ser actualizado correctamente. Por favor, volvé a intentar."
      );
      setProgress(false);
    }
  };

  return (
    <div className="card card-custom card-stretch gutter-b">
      <Formik
        innerRef={ref}
        enableReinitialize
        initialValues={initialValues}
        validationSchema={ProductEditSchema}
        onSubmit={(values) => {
          handleEdit(values);
        }}
      >
        {({
          handleSubmit,
          values,
          handleChange,
          setFieldValue,
          isSubmitting,
          isValid,
        }) => (
          <>
            <Form className="form form-label-right" onSubmit={handleSubmit}>
              <div className="card-body">
                {/* Sección: Información Básica */}
                <div className="mb-10">
                  <div className="d-flex align-items-center mb-5">
                    <CreditCardIcon
                      className="text-primary mr-3"
                      style={{ fontSize: 28 }}
                    />
                    <h2 className="text-dark mb-0 font-weight-bold">
                      Información Básica
                    </h2>
                  </div>

                  <div className="form-group row">
                    <div className="col-lg-4 mb-6">
                      <Field
                        name="product"
                        component={Input}
                        placeholder="Producto"
                        label="Producto *"
                      />
                    </div>
                    <div className="col-lg-4 mb-6">
                      <Field
                        name="brand"
                        component={Input}
                        placeholder="Marca"
                        label={
                          <span>
                            <BusinessIcon
                              style={{
                                fontSize: 16,
                                marginRight: 5,
                                marginBottom: 2,
                              }}
                            />
                            Marca
                          </span>
                        }
                      />
                    </div>
                    <div className="col-lg-4 mb-6">
                      <Field
                        name="cardType"
                        component={Input}
                        placeholder="Tipo"
                        label="Tipo"
                      />
                    </div>
                    <div className="col-lg-4 mb-6">
                      <Field
                        name="comision"
                        component={Input}
                        placeholder="Comisión"
                        label={
                          <span>
                            <MonetizationOnIcon
                              style={{
                                fontSize: 16,
                                marginRight: 5,
                                marginBottom: 2,
                              }}
                            />
                            Comisión
                          </span>
                        }
                      />
                    </div>
                    <div className="col-lg-4 mb-6">
                      <Field
                        name="limit"
                        component={Input}
                        placeholder="Límite"
                        label="Límite"
                      />
                    </div>
                    <div className="col-lg-4 mb-6">
                      <Field
                        name="quotaLimit"
                        component={Input}
                        placeholder="Límite Cuotas"
                        label="Cuota Límite"
                      />
                    </div>
                  </div>
                </div>

                {/* Separador */}
                <div className="separator separator-dashed my-8"></div>

                {/* Sección: Información Financiera */}
                <div className="mb-10">
                  <div className="d-flex align-items-center mb-5">
                    <ShowChartIcon
                      className="text-success mr-3"
                      style={{ fontSize: 28 }}
                    />
                    <h2 className="text-dark mb-0 font-weight-bold">
                      Información Financiera
                    </h2>
                  </div>

                  <div className="form-group row">
                    <div className="col-lg-4 mb-6">
                      <Field
                        name="tna"
                        component={Input}
                        placeholder="TNA"
                        label="TNA"
                      />
                    </div>
                    <div className="col-lg-4 mb-6">
                      <Field
                        name="cft"
                        component={Input}
                        placeholder="CFT"
                        label="CFT"
                      />
                    </div>
                    <div className="col-lg-4 mb-6">
                      <Field
                        name="tem"
                        component={Input}
                        placeholder="TEM"
                        label="TEM"
                      />
                    </div>
                    <div className="col-lg-4 mb-6">
                      <Field
                        name="compensatoryRate"
                        component={Input}
                        placeholder="Tasa Compensatorios"
                        label="Tasa Compensatorios"
                      />
                    </div>
                    <div className="col-lg-4 mb-6">
                      <Field
                        name="punitiveRate"
                        component={Input}
                        placeholder="Tasa Punitorios"
                        label="Tasa Punitorios"
                      />
                    </div>
                    <div className="col-lg-4 mb-6">
                      <Field
                        name="renewalCharge"
                        component={Input}
                        placeholder="Cargo Renovación"
                        label={
                          <span>
                            <RefreshIcon
                              style={{
                                fontSize: 16,
                                marginRight: 5,
                                marginBottom: 2,
                              }}
                            />
                            Cargo Renovación
                          </span>
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Separador */}
                <div className="separator separator-dashed my-8"></div>

                {/* Sección: Configuración Adicional */}
                <div className="mb-10">
                  <div className="d-flex align-items-center mb-5">
                    <SettingsIcon
                      className="text-warning mr-3"
                      style={{ fontSize: 28 }}
                    />
                    <h2 className="text-dark mb-0 font-weight-bold">
                      Configuración Adicional
                    </h2>
                  </div>

                  <div className="form-group row">
                    <div className="col-lg-4 mb-6">
                      <Field
                        name="replacement"
                        component={Input}
                        placeholder="Reposición"
                        label="Reposición"
                      />
                    </div>
                    <div className="col-lg-4 mb-6">
                      <Field
                        name="cashier"
                        component={Input}
                        placeholder="Cajero"
                        label={
                          <span>
                            <AccountBalanceIcon
                              style={{
                                fontSize: 16,
                                marginRight: 5,
                                marginBottom: 2,
                              }}
                            />
                            Cajero
                          </span>
                        }
                      />
                    </div>
                    <div className="col-lg-4 mb-6">
                      <Field
                        name="cashierExt"
                        component={Input}
                        placeholder="CajeroExt"
                        label="CajeroExt"
                      />
                    </div>
                    <div className="col-lg-4">
                      <Field
                        name="summary"
                        component={Input}
                        placeholder="Resumen"
                        label={
                          <span>
                            <DescriptionIcon
                              style={{
                                fontSize: 16,
                                marginRight: 5,
                                marginBottom: 2,
                              }}
                            />
                            Resumen
                          </span>
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Separador */}
                <div className="separator separator-dashed my-8"></div>

                {/* Sección: Características */}
                <div className="mb-10">
                  <div className="d-flex align-items-center mb-5">
                    <LocalAtmIcon
                      className="text-info mr-3"
                      style={{ fontSize: 28 }}
                    />
                    <h2 className="text-dark mb-0 font-weight-bold">
                      Características
                    </h2>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-4 mb-4">
                      <div className="d-flex align-items-center bg-light-warning p-4 rounded">
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={values.extractCashier === "1"}
                              onChange={(e) => {
                                setFieldValue(
                                  "extractCashier",
                                  e.target.checked ? "1" : "0"
                                );
                              }}
                            />
                          }
                          label={
                            <span className="font-weight-bold text-dark">
                              <CompareArrowsIcon
                                style={{ fontSize: 16, marginRight: 8 }}
                              />
                              Extrae Cajero
                            </span>
                          }
                          labelPlacement="start"
                          className="d-flex justify-content-between w-100 m-0"
                        />
                      </div>
                    </div>

                    <div className="col-md-4 mb-4">
                      <div className="d-flex align-items-center bg-light-info p-4 rounded">
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={values.refinancing === "1"}
                              onChange={(e) => {
                                setFieldValue(
                                  "refinancing",
                                  e.target.checked ? "1" : "0"
                                );
                              }}
                            />
                          }
                          label={
                            <span className="font-weight-bold text-dark">
                              <RefreshIcon
                                style={{ fontSize: 16, marginRight: 8 }}
                              />
                              Refinanciación
                            </span>
                          }
                          labelPlacement="start"
                          className="d-flex justify-content-between w-100 m-0"
                        />
                      </div>
                    </div>

                    <div className="col-md-4 mb-4">
                      <div className="d-flex align-items-center bg-light-success p-4 rounded">
                        <FormControlLabel
                          control={
                            <Switch
                              color="primary"
                              checked={values.flota === "1"}
                              onChange={(e) => {
                                setFieldValue(
                                  "flota",
                                  e.target.checked ? "1" : "0"
                                );
                              }}
                            />
                          }
                          label={
                            <span className="font-weight-bold text-dark">
                              <LocalShippingIcon
                                style={{ fontSize: 16, marginRight: 8 }}
                              />
                              Flota
                            </span>
                          }
                          labelPlacement="start"
                          className="d-flex justify-content-between w-100 m-0"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <SnackbarMessage
                handleClose={handleClose}
                open={open}
                variant={variant}
                message={message}
              />
            </Form>
          </>
        )}
      </Formik>
    </div>
  );
}
