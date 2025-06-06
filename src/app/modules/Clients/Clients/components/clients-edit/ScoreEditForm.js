import React from "react";
import {
  Input,
  Checkbox,
} from "../../../../../../_metronic/_partials/controls";
import DateFnsUtils from "@date-io/date-fns";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import { createMuiTheme, colors } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { es } from "date-fns/locale";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
});

// Validation schema
const ClientEditSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "Minimo 2 caracteres")
    .required("Nombre es requerido"),
  lastName: Yup.string()
    .min(2, "Minimo 2 caracteres")
    .required("Apellido es requerido"),
  score: Yup.number(),
  income: Yup.number(),
  available: Yup.number(),
  expiration: Yup.string(),
  socialRating: Yup.number(),
  operation: Yup.number(),
  situation: Yup.string(),
  situation6M: Yup.string(),
  situation12M: Yup.string(),
  model: Yup.string(),
  maxi: Yup.number(),
  maxShare: Yup.number(),
  age: Yup.number(),
  cuit: Yup.string(),
  dependecyRelationship: Yup.boolean(),
  retired: Yup.boolean(),
  monotribute: Yup.boolean(),
  MaxOperacionesHNTDia: Yup.number(),
  MaxOperacionesHNTMes: Yup.number(),
  MaxVolumenHNTDia: Yup.number(),
  MaxVolumenHNTMes: Yup.number(),
  idsituacionlaboral: Yup.number(),
  IncomeVolumenAnnual: Yup.number(),
  actividad: Yup.string(),
});

const format = (value) => {
  if (typeof value === "string") {
    if (value === "0") {
      return false;
    } else if (value === "1") {
      return true;
    }
  }
  if (typeof value === "boolean") {
    if (value === true) {
      return "1";
    } else if (value === false) {
      return "0";
    }
  }
};

export function ScoreEditForm({
  clientScore,
  btnRef,
  saveClient,
  setIsSubmitting,
}) {
  const { dependecyRelationship, retired, monotribute } = clientScore;

  return (
    <>
      <Formik
        enableReinitialize={false}
        initialValues={clientScore}
        validationSchema={ClientEditSchema}
        onSubmit={(values) => {
          return saveClient(values);
        }}
      >
        {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-3">
                  <Field
                    name="IncomeVolumenAnnual"
                    type="number"
                    component={Input}
                    placeholder="Ingresos/Volumen Anual"
                    label="Ingresos/Volumen Anual"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="idsituacionlaboral"
                    type="number"
                    component={Input}
                    placeholder="Situación Laboral"
                    label="Situación Laboral"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="actividad"
                    type="text"
                    component={Input}
                    placeholder="Actividad"
                    label="Actividad"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-3">
                  <Field
                    name="MaxOperacionesHNTMes"
                    type="number"
                    component={Input}
                    placeholder="Máximo de Operaciones del Mes"
                    label="Máximo de Operaciones del Mes"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="MaxOperacionesHNTDia"
                    type="number"
                    component={Input}
                    placeholder="Máximo de Operaciones del Dia"
                    label="Máximo de Operaciones del Dia"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="MaxVolumenHNTMes"
                    type="number"
                    component={Input}
                    placeholder="Máximo de Volumen del Mes"
                    label="Máximo de Volumen del Mes"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    type="number"
                    name="MaxVolumenHNTDia"
                    component={Input}
                    placeholder="Máximo de Volumen del Dia"
                    label="Máximo de Volumen del Dia"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-3">
                  <Field
                    name="name"
                    component={Input}
                    placeholder="Nombre"
                    label="Nombre"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="lastName"
                    component={Input}
                    placeholder="Apellido"
                    label="Apellido"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="score"
                    type="number"
                    component={Input}
                    placeholder="Score"
                    label="Score"
                    disabled
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    type="number"
                    name="income"
                    component={Input}
                    placeholder="Ingresos"
                    label="Ingresos"
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-3">
                  <Field
                    name="available"
                    component={Input}
                    placeholder="Disponible"
                    label="Disponible"
                    disabled
                  />
                </div>
                <div className="col-lg-3">
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                    <ThemeProvider theme={defaultMaterialTheme}>
                      <KeyboardDatePicker
                        autoOk
                        size="small"
                        inputVariant="outlined"
                        label="Vencimiento"
                        format="dd/MM/yyyy"
                        value={values.expiration}
                        cancelLabel="cancelar"
                        onChange={(date) => setFieldValue("expiration", date)}
                        className="mt-8"
                      />
                    </ThemeProvider>
                  </MuiPickersUtilsProvider>
                </div>
                <div className="col-lg-3">
                  <Field
                    name="socialRating"
                    component={Input}
                    placeholder="Calificación social"
                    label="Calificación social"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="operation"
                    component={Input}
                    placeholder="Opera"
                    label="Opera"
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-3">
                  <Field
                    name="situation"
                    component={Input}
                    placeholder="Situación"
                    label="Situación"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="situation6M"
                    component={Input}
                    placeholder="Situación 6M"
                    label="Situación 6M"
                    disabled
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="situation12M"
                    component={Input}
                    placeholder="Situación 12M"
                    label="Situación 12M"
                    disabled
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="model"
                    component={Input}
                    placeholder="Modelo"
                    label="Modelo"
                    disabled
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-3">
                  <Field
                    name="maxi"
                    component={Input}
                    placeholder="Máximo"
                    label="Máximo"
                    disabled
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="maxShare"
                    component={Input}
                    placeholder="Máximo Cuota"
                    label="Máximo Cuota"
                    disabled
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="age"
                    component={Input}
                    placeholder="Edad"
                    label="Edad"
                    disabled
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="cuit"
                    component={Input}
                    placeholder="CUIT/CUIL"
                    label="CUIT/CUIL"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Checkbox
                    name="dependecyRelationship"
                    disabled
                    isSelected={format(dependecyRelationship)}
                    onChange={() => {}}
                  >
                    Relación de Dependencia
                  </Checkbox>
                </div>
                <div className="col-lg-4">
                  <Checkbox
                    name="retired"
                    disabled
                    isSelected={format(retired)}
                    onChange={() => {}}
                  >
                    Jubilado/a
                  </Checkbox>
                </div>
                <div className="col-lg-4">
                  <Checkbox
                    name="monotribute"
                    isSelected={format(monotribute)}
                    onChange={() => {}}
                  >
                    Monotributista
                  </Checkbox>
                </div>
              </div>
              <button
                type="submit"
                style={{ display: "none" }}
                ref={btnRef}
                onSubmit={() => handleSubmit()}
                onClick={setIsSubmitting(isSubmitting)}
              ></button>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
