/* eslint-disable eqeqeq */
import { FormControlLabel, Switch } from "@material-ui/core";
import React from "react";
import * as Yup from "yup";
import { Field, Form, Formik } from "formik";
import { toAbsoluteUrl } from "../../../../../../../../_metronic/_helpers";
import { Input } from "../../../../../../../../_metronic/_partials/controls";
import { es } from "date-fns/locale";
import { createMuiTheme, colors } from "@material-ui/core";
import DateFnsUtils from "@date-io/date-fns";
import { ThemeProvider } from "@material-ui/styles";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";

const cardSchema = Yup.object().shape({
  name: Yup.string().required("Nombre requerido"),
  lastName: Yup.string().required("Apellido es requerido"),
  number: Yup.string().required("Número es requerida"),
  birthDay: Yup.string().required("Fecha de nacimiento es requerido"),
  status: Yup.string().required("Status reqerido"),
});

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
});

const getCardImage = (idCard) => {
  if (idCard === "3" || idCard === "4" || idCard === "6")
    return "/media/cards/card2.png";
  return "/media/cards/card1.png";
};

export function CardEditForm({
  values,
  btnRef,
  setIsSubmitting,
  saveEditCard,
  idCard,
}) {
  return (
    <div className="col-3">
      <img
        src={toAbsoluteUrl(`${getCardImage(idCard)}`)}
        alt="card"
        className="img-fluid"
      />
      <Formik
        initialValues={values}
        validationSchema={cardSchema}
        onSubmit={(values) => {
          return saveEditCard(values);
        }}
      >
        {({ handleSubmit, values, setFieldValue, isSubmitting }) => (
          <>
            <Form className="form form-label-right mt-5">
              <div className="form-group row">
                <div className="col">
                  <Field
                    name="name"
                    component={Input}
                    placeholder="Holder Name"
                    label="Holder Name"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col text-center">
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                    <ThemeProvider theme={defaultMaterialTheme}>
                      <KeyboardDatePicker
                        autoOk
                        fullWidth
                        size="small"
                        disableFuture
                        inputVariant="outlined"
                        label="Fecha Alta"
                        format="dd/MM/yyyy"
                        value={values.start_date}
                        cancelLabel="cancelar"
                        onChange={(date) => setFieldValue("start_date", date)}
                      />
                    </ThemeProvider>
                  </MuiPickersUtilsProvider>
                </div>
              </div>
              <div className="form-group row">
                <div className="col text-center">
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}>
                    <ThemeProvider theme={defaultMaterialTheme}>
                      <KeyboardDatePicker
                        autoOk
                        fullWidth
                        size="small"
                        inputVariant="outlined"
                        label="Fecha Vencimiento"
                        format="dd/MM/yyyy"
                        value={values.expiration_date}
                        cancelLabel="cancelar"
                        onChange={(date) =>
                          setFieldValue("expiration_date", date)
                        }
                      />
                    </ThemeProvider>
                  </MuiPickersUtilsProvider>
                </div>
              </div>
              <div className="form-group row">
                <div className="col">
                  <Field
                    name="number"
                    component={Input}
                    placeholder="Número de tarjeta"
                    label="Número"
                    autoComplete="cc-exp"
                  />
                </div>
              </div>

              <div className="form-group row">
                <div className="col d-flex align-items-baseline">
                  <FormControlLabel
                    control={
                      <Switch
                        checked={values.status === "0" ? false : true}
                        onChange={(e) =>
                          setFieldValue(
                            "status",
                            e.target.checked !== false ? "1" : "0"
                          )
                        }
                        name="status"
                      />
                    }
                    label="Status"
                    labelPlacement="top"
                  />
                  <div>
                    {values.status == "1" ? <span>On</span> : <span>Off</span>}
                  </div>
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
    </div>
  );
}
