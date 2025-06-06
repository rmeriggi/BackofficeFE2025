/* eslint-disable no-script-url,jsx-a11y/anchor-is-valid,jsx-a11y/role-supports-aria-props */
import { Button } from "@material-ui/core";
import React, { useState, useRef } from "react";
import * as Yup from "yup";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../../_metronic/_partials/controls";
import { Formik } from "formik";
import { createProduct } from "../../utils/service";
import { InfoEditForm } from "../Edit/flaps/InfoEditForm";
import {ProductEditForm} from "../Edit/ProductEditForm";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import { useEditContext } from "../Edit/Context/EditContext";
import { useSnackBar } from "../../../../../hooks/useSnackBar"
import { formatBoolean, formatNumber } from "../Edit/ProductEdit";


const ProductSchema = Yup.object().shape({
  idEntity: Yup.string()
    .required("Entidad es requerido"),
  idCountry: Yup.string()
    .required("País es requerido"),
  product: Yup.string()
    .required("Producto es requerido"),
  date: Yup.string()
    .required("Fecha es requerido"),
  expiration: Yup.string()
    .required("Expiración es requerido"),
  idCurrency:Yup.string()
    .required("Moneda es requerido"),
  investment:Yup.string()
    .required("Capital es requerido"),
  quotaMin: Yup.string()
    .required("Cuota mínima es requerida"),
  quotaMax: Yup.string()
    .required("Cupta máxima es requerida"),
  TEA:Yup.string()
    .required("TEA es requerido"),
  TNA: Yup.string()
    .required("TNA es requerido"),
  CFT: Yup.string()
    .required("CFT es requerido"),
  quota:Yup.string()
    .required("Cupo es requerido"),
  minAmount: Yup.string()
    .required("Monto mínimo es requerido"),
  maxAmount: Yup.string()
    .required("Monto máximo es requerido"),
  status: Yup.string()
    .required("Status es requerido"),
  minScore: Yup.string()
    .required("Score mínimo es requerido"),
  maxScore: Yup.string()
    .required("Score máximo es requerido"), 
  minCalification: Yup.string()
    .required("Calificación mínima es requerida"),
  maxCalification: Yup.string()
    .required("Calificación máxima es requerido"),
  expenses: Yup.string()
    .required("Gastos administrativos es requerido"),
  taxes:Yup.string()
    .required("Impuesto es requerido"),
  punitive: Yup.string()
    .required("Punitivos es requerido"),
  creditsQuantity: Yup.string()
    .required("Límite por cliente es requerido"),
  RCI: Yup.string()
    .required("RCI es requerido"),
  idLoginData: Yup.string()
    .required("Datos ingresos es requerido"),
  cutDay: Yup.string()
    .required("Corte de cartera es requerido"),
  expirationDay: Yup.string()
    .required("Día de vencimiento es requerido"),
  freeDay: Yup.string()
    .required("Periodo de gracia es requerida"),
  idFrecuency: Yup.string()
    .required("Frecuencia es requerido"),
  automaticApproval: Yup.string()
    .required("Aprovación automática es requerido"),
  automaticTransfer: Yup.string()
    .required("Transferencia automática es requerido"),
  idDebitTransaction: Yup.string()
    .required("Débito transacción es requerido"),
  idCreditTransaction: Yup.string()
    .required("Crédito transacción es requerido"),
  idDebitAutomaticTransaction: Yup.string()
    .required("Débito transacción atuomática es requerido"),
  idCreditDestiny: Yup.string()
    .required("Destino crédito es requerido"),
  idQuotaCalculate: Yup.string()
    .required("Sistema de cálculo de cuota es requerido"),
  reputation: Yup.string()
    .required("Reputación es requerido"),
});

export function ProductCreate({history}) {

  const btnRef = useRef();
  const {state} = useEditContext()
  const [tab, setTab] = useState("new");
 
  const {open, variant,message, handleClose, setOpenMessage} = useSnackBar()

  const backToProductsList = () => {
    history.push(`/credits/products`);
  };

  const saveProduct = async (values) => {
    const productCreated = {
      ...values,
      investment: formatNumber(values.investment),
      maxAmount: formatNumber(values.maxAmount),
      minAmount: formatNumber(values.minAmount),
      expenses: formatNumber(values.expenses),
      taxes: formatNumber(values.taxes),
      punitive: formatNumber(values.punitive),
      automaticApproval: formatBoolean(values.automaticApproval),
      automaticTransfer: formatBoolean(values.automaticTransfer),
    };
    try {
      const response = await createProduct(productCreated);
      setOpenMessage("success", "El producto fue creado correctamente.")
      const { id } = response
      setTimeout(()=>{
        history.push(`/credits/products/edit/${id}`)  
      }, 3000)
    } catch  {
      setOpenMessage("error", "El producto no pudo ser creado correctamente. Por favor, volvé a intentar.")
    }
  }

  const saveProductClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  return (
    <Card>
      <CardHeader title="Crear Producto">
        <CardHeaderToolbar>
          <Button
            variant="outlined"
            color="secondary"
            className="mr-3"
            size="large"
            onClick={backToProductsList}
          >
            Volver
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className="ml-2"
            size="large"
            onClick={saveProductClick}
          >
            Guardar
          </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <ul className="nav nav-tabs nav-tabs-line " role="tablist">
          <li className="nav-item" onClick={() => setTab("new")}>
            <a
              className={`nav-link ${tab === "new" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "new").toString()}
            >
              Detalle
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("info")}>
            <a
              className={`nav-link ${tab === "info" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "info").toString()}
            >
              Más información
            </a>
          </li>
        </ul>
        <div className="mt-5">
          <Formik
            enableReinitialize={false}
            initialValues={state.product}
            validationSchema={ProductSchema}
            onSubmit={(values) => {
              saveProduct(values);
            }}
          >
            {({ handleSubmit, setFieldValue, values, handleChange }) => (
              <form onSubmit={handleSubmit} className="form form-label-right">
                {tab === "new" && (
                  <ProductEditForm
                    setFieldValue={setFieldValue}
                    values={values}
                    handleChange={handleChange}
                    edit
                  />
                )}
                {tab === "info" && (
                  <InfoEditForm
                    setFieldValue={setFieldValue}
                    values={values}
                    handleChange={handleChange}
                    edit
                  />
                )}
                <button
                  type="submit"
                  style={{ display: "none" }}
                  ref={btnRef}
              ></button>
              </form>
            )}
          </Formik>
        </div>
        <SnackbarMessage
          handleClose={handleClose}
          open={open}
          variant={variant}
          message={message}
        />
      </CardBody>
    </Card>
  );
}

