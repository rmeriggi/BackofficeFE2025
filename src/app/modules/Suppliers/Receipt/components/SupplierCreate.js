import React, { useEffect, useRef, useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardHeaderToolbar,
} from "../../../../../_metronic/_partials/controls";
import { useHistory } from "react-router";
import { Button, CircularProgress } from "@material-ui/core";
import { SnackbarMessage } from "../../../../components/SnackbarMessage";
import { useSnackBar } from "../../../../hooks/useSnackBar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../_metronic/_partials/controls";
import { useDispatch } from "react-redux";
import { useFetchCombos } from "../../../../hooks";
import {
  getCountries,
  getCategories,
  getCostCenters,
} from "../../../../_redux/combos/combosActions";
import { GeneralSelector } from "../../../../components/Fields/GeneralSelector";
import { createSupplier } from "../../../../_redux/suppliers/suppliersCrud";
import { getAllSuppliers } from "../../../../_redux/suppliers/suppliersActions";
import {
  incomeTaxConditionList,
  ivaConditionsList,
  grossIncomeList,
} from "../../Invoices/helpers/fiscalInfoList";

const NotificationsSchema = Yup.object().shape({
  cuit: Yup.string().required("Este campo es obligatorio"),
  business_name: Yup.string().required("Este campo es obligatorio"),
  country: Yup.string().required("Este campo es obligatorio"),
  province: Yup.string().required("Este campo es obligatorio"),
  city: Yup.string().required("Este campo es obligatorio"),
  address: Yup.string().required("Este campo es obligatorio"),
  cp: Yup.string().required("Este campo es obligatorio"),
  cellphone: Yup.string().required("Este campo es obligatorio"),
  email: Yup.string().required("Este campo es obligatorio"),
  category_id: Yup.number().required("Este campo es obligatorio"),
  center_id: Yup.number().required("Este campo es obligatorio"),
  iva_condition: Yup.string().required("La condición de IVA es requerida"),
  income_tax_condition: Yup.string().required(
    "La condición de ganancias es requerida"
  ),
  gross_income: Yup.string().required("Los ingresos brutos son requeridos"),
});

export function SupplierCreate() {
  const history = useHistory();
  const formikRef = useRef(null);
  const { open, variant, message, handleClose, setOpenMessage } =
    useSnackBar();
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(false);
  const [countries] = useFetchCombos("countries", getCountries);
  const [categories] = useFetchCombos("categories", getCategories);
  const [costCenters] = useFetchCombos("costCenters", getCostCenters);

  const initialValues = {
    cuit: "",
    business_name: "",
    country: "",
    province: "",
    city: "",
    address: "",
    cp: "",
    cellphone: "",
    email: "",
    category_id: "",
    center_id: "",
    iva_condition: "0",
    income_tax_condition: "0",
    gross_income: "0",
  };

  const handleFormSubmit = () => {
    if (formikRef.current) {
      formikRef.current.submitForm();
    }
  };

  const handleEdit = async (value) => {
    const requestValues = {
      cuit: value.cuit.toString(),
      razonsocial: value.business_name,
      pais: `+${value.country}`,
      provincia: value.province,
      localidad: value.city,
      domicilio: value.address,
      cp: value.cp,
      telefono: value.cellphone,
      email: value.email,
      idcategoria: Number(value.category_id).toString(),
      idcentrocosto: Number(value.center_id).toString(),
      IVA: value.iva_condition,
      Ganancias: value.income_tax_condition,
      IIBB: value.gross_income,
    };

    try {
      const response = await createSupplier(requestValues);
      if (response) {
        setProgress(false);
        setOpenMessage("success", "El proveedor fue creado correctamente.");
        await dispatch(getAllSuppliers());
        history.goBack();
      }
    } catch (error) {
      setProgress(false);
      setOpenMessage(
        "error",
        "El proveedor no pudo ser creado correctamente. Por favor, volvé a intentar."
      );
      console.error("Error creando el proveedor:", error);
    }
  };

  return (
    <Card>
      <CardHeader title={`CREAR PROVEEDOR`}>
        <CardHeaderToolbar>
          <Button
            onClick={() => history.goBack()}
            variant="outlined"
            color="secondary"
            className="mr-3"
            size="large"
          >
            Volver
          </Button>
          <Button
            variant="contained"
            color="secondary"
            type="button"
            className="ml-4"
            size="large"
            onClick={handleFormSubmit}
            endIcon={progress && <CircularProgress size={20} color="primary" />}
          >
            Crear
          </Button>
        </CardHeaderToolbar>
      </CardHeader>
      <CardBody>
        <Formik
          innerRef={formikRef}
          enableReinitialize
          initialValues={initialValues}
          validationSchema={NotificationsSchema}
          onSubmit={(values, { setSubmitting }) => {
            setSubmitting(false);
            setProgress(true);
            handleEdit(values);
          }}
        >
          {({ values, setFieldValue }) => (
            <Form className="form form-label-right">
              {/* Razón Social */}
              <div className="col-lg-12">
                <p className="header-title fs-2 mb-5 mt-4">RAZÓN SOCIAL</p>
                <Field name="business_name" component={Input} label="" />
              </div>

              {/* CUIT */}
              <div className="col-lg-12">
                <p className="header-title fs-2 mb-5 mt-4">CUIT</p>
                <Field name="cuit" component={Input} type="number" label="" />
              </div>

              {/* Condiciones fiscales */}
              <div className="col-lg-12">
                <p className="header-title fs-2 mb-5 mt-4">Condición IVA</p>
                <select
                  name="iva_condition"
                  value={values.iva_condition}
                  onChange={(e) =>
                    setFieldValue("iva_condition", e.target.value)
                  }
                  className="form-control"
                >
                  <option value="0" hidden>
                    Seleccionar
                  </option>
                  {ivaConditionsList.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
                <ErrorMessage name="iva_condition">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </div>

              <div className="col-lg-12">
                <p className="header-title fs-2 mb-5 mt-4">
                  Condición Ganancias
                </p>
                <select
                  name="income_tax_condition"
                  value={values.income_tax_condition}
                  onChange={(e) =>
                    setFieldValue("income_tax_condition", e.target.value)
                  }
                  className="form-control"
                >
                  <option value="0" hidden>
                    Seleccionar
                  </option>
                  {incomeTaxConditionList.map((condition) => (
                    <option key={condition} value={condition}>
                      {condition}
                    </option>
                  ))}
                </select>
                <ErrorMessage name="income_tax_condition">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </div>

              <div className="col-lg-12">
                <p className="header-title fs-2 mb-5 mt-4">IIBB</p>
                <select
                  name="gross_income"
                  value={values.gross_income}
                  onChange={(e) =>
                    setFieldValue("gross_income", e.target.value)
                  }
                  className="form-control"
                >
                  <option value="0" hidden>
                    Seleccionar
                  </option>
                  {grossIncomeList.map((income) => (
                    <option key={income} value={income}>
                      {income}
                    </option>
                  ))}
                </select>
                <ErrorMessage name="gross_income">
                  {(msg) => <div className="text-danger">{msg}</div>}
                </ErrorMessage>
              </div>

              {/* Dirección Legal */}
              <div className="d-flex flex-column p-5">
                <p className="header-title fs-2 mb-5 mt-4">Dirección legal</p>
                <div className="d-flex flex-column flex-md-row gap-4">
                  <div className="col-lg-4">
                    <p>País*</p>
                    <GeneralSelector
                      values={values}
                      valueName="country"
                      keyName="country"
                      valueKey="code"
                      label=""
                      data={countries}
                      setFieldValue={setFieldValue}
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="province"
                      component={Input}
                      placeholder=""
                      label="Provincia*"
                    />
                  </div>
                  <div className="col-lg-4">
                    <Field
                      name="city"
                      component={Input}
                      placeholder=""
                      label="Ciudad*"
                    />
                  </div>
                </div>
                <div className="d-flex flex-column flex-md-row gap-4">
                  <div className="col-lg-6">
                    <Field
                      name="cp"
                      component={Input}
                      placeholder=""
                      label="Código postal*"
                    />
                  </div>
                  <div className="col-lg-6">
                    <Field
                      name="address"
                      component={Input}
                      placeholder=""
                      label="Dirección legal*"
                    />
                  </div>
                </div>
              </div>

              {/* Categoría */}
              <div className="col-lg-12">
                <p className="header-title fs-2 mb-5 mt-4">Categoría</p>
                <GeneralSelector
                  values={values}
                  name="id"
                  valueName="category_id"
                  keyName="categoria"
                  label=""
                  data={categories}
                  setFieldValue={setFieldValue}
                />
              </div>

              {/* Centro de costos */}
              <div className="col-lg-12 p-5">
                <p className="header-title fs-2 mb-5 mt-4">Centro de costos</p>
                <GeneralSelector
                  values={values}
                  name="id"
                  valueName="center_id"
                  keyName="CentroC"
                  label=""
                  data={costCenters}
                  setFieldValue={setFieldValue}
                />
              </div>

              {/* Datos de contacto */}
              <div className="col-lg-12">
                <p className="header-title fs-2 mb-5 mt-4">Teléfono*</p>
                <Field name="cellphone" component={Input} label="" />
              </div>
              <div className="col-lg-12">
                <p className="header-title fs-2 mb-5 mt-4">Correo electrónico*</p>
                <Field name="email" component={Input} label="" />
              </div>
            </Form>
          )}
        </Formik>
      </CardBody>
      <SnackbarMessage
        handleClose={handleClose}
        open={open}
        variant={variant}
        message={message}
      />
    </Card>
  );
}
