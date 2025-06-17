import React, { useRef, useState } from "react";
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

// Material-UI Icons
import BusinessIcon from "@material-ui/icons/Business";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import AttachMoneyIcon from "@material-ui/icons/AttachMoney";
import CategoryIcon from "@material-ui/icons/Category";
import ContactPhoneIcon from "@material-ui/icons/ContactPhone";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

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
  const { open, variant, message, handleClose, setOpenMessage } = useSnackBar();
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

  const ivaOptions = ivaConditionsList.map((item) => ({
    label: item,
    code: item,
  }));

  const incomeTaxOptions = incomeTaxConditionList.map((item) => ({
    label: item,
    code: item,
  }));

  const grossIncomeOptions = grossIncomeList.map((item) => ({
    label: item,
    code: item,
  }));

  return (
    <Card>
      <CardHeader title="CREAR PROVEEDOR">
        <CardHeaderToolbar>
          <Button
            onClick={() => history.goBack()}
            variant="outlined"
            color="secondary"
            className="mr-3"
            size="large"
            startIcon={<ArrowBackIcon />}
          >
            Volver
          </Button>
          <Button
            variant="contained"
            color="secondary"
            type="button"
            size="large"
            onClick={handleFormSubmit}
            endIcon={progress && <CircularProgress size={20} color="inherit" />}
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
              {/* Sección Información Básica */}
              <div className="card mb-8">
                <div className="card-header bg-light py-4">
                  <div className="d-flex align-items-center">
                    <BusinessIcon
                      style={{
                        fontSize: "2rem",
                        color: "#3699FF",
                        marginRight: "8px",
                      }}
                    />
                    <h3 className="card-title text-dark fw-bolder fs-3 mb-0">
                      Información Básica
                    </h3>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row mb-6">
                    <div className="col-lg-6 mb-4 mb-lg-0">
                      <label className="form-label fs-6 fw-bolder text-dark required">
                        Razón Social
                      </label>
                      <Field
                        name="business_name"
                        component={Input}
                        placeholder="Ingrese razón social"
                      />
                    </div>

                    <div className="col-lg-6">
                      <label className="form-label fs-6 fw-bolder text-dark required">
                        CUIT
                      </label>
                      <Field
                        name="cuit"
                        component={Input}
                        type="number"
                        placeholder="Ingrese CUIT"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección Condiciones Fiscales */}
              <div className="card mb-8">
                <div className="card-header bg-light py-4">
                  <div className="d-flex align-items-center">
                    <AttachMoneyIcon
                      className="me-4"
                      style={{ fontSize: "2rem", color: "#3699FF" }}
                    />
                    <h3 className="card-title text-dark fw-bolder fs-3 mb-0">
                      Condiciones Fiscales
                    </h3>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row mb-6">
                    <div className="col-md-4 mb-4 mb-md-0">
                      <label className="form-label fs-6 fw-bolder text-dark required">
                        Condición IVA
                      </label>
                      {/*   <select
                        name="iva_condition"
                        value={values.iva_condition}
                        onChange={(e) =>
                          setFieldValue("iva_condition", e.target.value)
                        }
                        className={`form-select form-select-lg ${
                          values.iva_condition === "0" ? "text-muted" : ""
                        }`}
                      >
                        <option value="0" hidden>
                          Seleccionar condición
                        </option>
                        {ivaConditionsList.map((condition) => (
                          <option key={condition} value={condition}>
                            {condition}
                          </option>
                        ))}
                      </select> */}
                      <GeneralSelector
                        values={values}
                        valueName="iva_condition"
                        keyName="label"
                        valueKey="code"
                        placeholder="Seleccionar condición IVA"
                        data={ivaOptions}
                        setFieldValue={setFieldValue}
                      />
                      <ErrorMessage name="iva_condition">
                        {(msg) => <div className="text-danger mt-2">{msg}</div>}
                      </ErrorMessage>
                    </div>

                    <div className="col-md-4 mb-4 mb-md-0">
                      <label className="form-label fs-6 fw-bolder text-dark required">
                        Condición Ganancias
                      </label>
                      <GeneralSelector
                        values={values}
                        valueName="income_tax_condition"
                        keyName="label"
                        valueKey="code"
                        placeholder="Seleccionar condición Ganancias"
                        data={incomeTaxOptions}
                        setFieldValue={setFieldValue}
                      />
                      <ErrorMessage name="income_tax_condition">
                        {(msg) => <div className="text-danger mt-2">{msg}</div>}
                      </ErrorMessage>
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fs-6 fw-bolder text-dark required">
                        IIBB
                      </label>
                      <GeneralSelector
                        values={values}
                        valueName="gross_income"
                        keyName="label"
                        valueKey="code"
                        placeholder="Seleccionar Ingresos Brutos"
                        data={grossIncomeOptions}
                        setFieldValue={setFieldValue}
                      />

                      <ErrorMessage name="gross_income">
                        {(msg) => <div className="text-danger mt-2">{msg}</div>}
                      </ErrorMessage>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección Dirección Legal */}
              <div className="card mb-8">
                <div className="card-header bg-light py-4">
                  <div className="d-flex align-items-center">
                    <LocationOnIcon
                      className="me-4"
                      style={{ fontSize: "2rem", color: "#3699FF" }}
                    />
                    <h3 className="card-title text-dark fw-bolder fs-3 mb-0">
                      Dirección Legal
                    </h3>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row mb-6">
                    <div className="col-md-4 mb-4 mb-md-0">
                      <label className="form-label fs-6 fw-bolder text-dark required">
                        País
                      </label>
                      <GeneralSelector
                        values={values}
                        valueName="country"
                        keyName="country"
                        valueKey="code"
                        placeholder="Seleccionar país"
                        data={countries}
                        setFieldValue={setFieldValue}
                      />
                    </div>

                    <div className="col-md-4 mb-4 mb-md-0">
                      <label className="form-label fs-6 fw-bolder text-dark required">
                        Provincia
                      </label>
                      <Field
                        name="province"
                        component={Input}
                        placeholder="Ingrese provincia"
                      />
                    </div>

                    <div className="col-md-4">
                      <label className="form-label fs-6 fw-bolder text-dark required">
                        Ciudad
                      </label>
                      <Field
                        name="city"
                        component={Input}
                        placeholder="Ingrese ciudad"
                      />
                    </div>
                  </div>

                  <div className="row mb-6">
                    <div className="col-md-6 mb-4 mb-md-0">
                      <label className="form-label fs-6 fw-bolder text-dark required">
                        Código Postal
                      </label>
                      <Field
                        name="cp"
                        component={Input}
                        placeholder="Ingrese código postal"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fs-6 fw-bolder text-dark required">
                        Dirección
                      </label>
                      <Field
                        name="address"
                        component={Input}
                        placeholder="Ingrese dirección completa"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección Categorización */}
              <div className="card mb-8">
                <div className="card-header bg-light py-4">
                  <div className="d-flex align-items-center">
                    <CategoryIcon
                      className="me-4"
                      style={{ fontSize: "2rem", color: "#3699FF" }}
                    />
                    <h3 className="card-title text-dark fw-bolder fs-3 mb-0">
                      Categorización
                    </h3>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-4 mb-md-0">
                      <label className="form-label fs-6 fw-bolder text-dark required">
                        Categoría
                      </label>
                      <GeneralSelector
                        values={values}
                        name="id"
                        valueName="category_id"
                        keyName="categoria"
                        placeholder="Seleccionar categoría"
                        data={categories}
                        setFieldValue={setFieldValue}
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fs-6 fw-bolder text-dark required">
                        Centro de Costos
                      </label>
                      <GeneralSelector
                        values={values}
                        name="id"
                        valueName="center_id"
                        keyName="CentroC"
                        placeholder="Seleccionar centro"
                        data={costCenters}
                        setFieldValue={setFieldValue}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Sección Contacto */}
              <div className="card">
                <div className="card-header bg-light py-4">
                  <div className="d-flex align-items-center">
                    <ContactPhoneIcon
                      style={{
                        fontSize: "2rem",
                        color: "#3699FF",
                        marginRight: "8px",
                      }}
                    />
                    <h3 className="card-title text-dark fw-bolder fs-3 mb-0">
                      Datos de Contacto
                    </h3>
                  </div>
                </div>
                <div className="card-body">
                  <div className="row">
                    <div className="col-md-6 mb-4 mb-md-0">
                      <label className="form-label fs-6 fw-bolder text-dark required">
                        Teléfono
                      </label>
                      <Field
                        name="cellphone"
                        component={Input}
                        placeholder="Ingrese teléfono"
                      />
                    </div>

                    <div className="col-md-6">
                      <label className="form-label fs-6 fw-bolder text-dark required">
                        Correo Electrónico
                      </label>
                      <Field
                        name="email"
                        component={Input}
                        placeholder="Ingrese email"
                      />
                    </div>
                  </div>
                </div>
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
