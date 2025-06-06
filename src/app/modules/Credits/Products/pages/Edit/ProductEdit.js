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
import ProgramEdit from "./flaps/ProgramEdit";
import {ProductEditForm} from "./ProductEditForm";
import { editProduct } from "../../utils/service";
import { ScoringEdit } from "./flaps/ScoringEdit";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";
import { InfoEditForm } from "./flaps/InfoEditForm";
import { Formik } from "formik";
import { formatAmountFromString } from "../../../../../utils/formatData";
import { useProduct } from "../../utils/apiHook";
import useIsMountedRef from "../../../../../hooks/useIsMountedRef";
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { useSnackBar } from "../../../../../hooks/useSnackBar"

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

 export const formatNumber = (field) => {
  if(typeof field === "string"){
    const newValue = field.replace(".", "").replace(",", ".")
    const parse = parseFloat(newValue)
    return parse
  }else{
    return field
  }
}

export const formatBoolean = (field) => {
  if(field === "False"){
    return "0"
  }else if(field === "True"){
    return "1"
  }else{
    return field
  }
}

export function ProductEdit({history,match: {params: { id },}}) {

  const btnRef = useRef();
  const isMountedRef = useIsMountedRef();
  const [products, productComplete] = useProduct(id, isMountedRef) 
  const [tab, setTab] = useState("new");
  const { open, variant,message, handleClose, setOpenMessage } = useSnackBar()

  const backToProductsList = () => {
    history.push(`/credits/products`);
  };

  if(!productComplete){
    return <LayoutSplashScreen />
  }

  const saveProduct = async (values) => {
    const productEdited = {
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
      await editProduct(id, productEdited);
      setOpenMessage("success", "El producto fue actualizado correctamente.")
    } catch  {
      setOpenMessage("error", "El producto no pudo ser actualizado correctamente. Por favor, volvé a intentar.")
    }
  }

  const saveProductClick = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const initialValues = {
    ...products.product[0],
    investment: formatAmountFromString(products.product[0].investment),
    expenses: formatAmountFromString(products.product[0].expenses),
    taxes: formatAmountFromString(products.product[0].taxes),
    punitive: formatAmountFromString(products.product[0].punitive),
    minAmount: formatAmountFromString(products.product[0].minAmount),
    maxAmount: formatAmountFromString(products.product[0].maxAmount),
    automaticApproval: products.product[0].automaticApproval === "False" ? "0" : "1",
    automaticTransfer: products.product[0].automaticTransfer === "False" ? "0" : "1",
    product: products.product[0].product.trim()
  }
  
  return (
    <Card>
      <CardHeader title="Editar Producto">
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
            disabled={tab === "scoring" || tab === "program"}
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
          <li className="nav-item" onClick={() => setTab("scoring")}>
            <a
              className={`nav-link ${tab === "scoring" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "scoring").toString()}
            >
              Segmentación
            </a>
          </li>
          <li className="nav-item" onClick={() => setTab("program")}>
            <a
              className={`nav-link ${tab === "program" && "active"}`}
              data-toggle="tab"
              role="tab"
              aria-selected={(tab === "program").toString()}
            >
              Programa
            </a>
          </li>
        </ul>
        <div className="mt-5">
          <Formik
            enableReinitialize={false}
            initialValues={initialValues}
            validationSchema={ProductSchema}
            onSubmit={(values) => {
              saveProduct({...values});
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
          {tab === "scoring" && (
            <ScoringEdit />
          )}
          {tab === "program" && (
            <ProgramEdit />
          )}
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

