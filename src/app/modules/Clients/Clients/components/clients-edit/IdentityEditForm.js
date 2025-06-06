import React, { useState } from "react";
import * as Yup from "yup";
//import { es } from "date-fns/locale";
import { Formik, Form, Field } from "formik";
//import DateFnsUtils from "@date-io/date-fns";
//import { ThemeProvider } from "@material-ui/styles";
//import { createMuiTheme, colors } from "@material-ui/core";
import //KeyboardDatePicker,
//MuiPickersUtilsProvider,
"@material-ui/pickers";
import {
  Checkbox,
  Input,
  Select,
} from "../../../../../../_metronic/_partials/controls";
import { useClientsContext } from "../../context/ClientsContext";

/*const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
});*/

// Validation schema
const IdentityEditSchema = Yup.object().shape({
  level: Yup.number(),
  date: Yup.string(),
  dni: Yup.number(),
  phone: Yup.number(),
  processed: Yup.number(),
  obligatedSubject: Yup.boolean(),
  politicallyExposedPerson: Yup.boolean(),
  name: Yup.string(),
  lastname: Yup.string(),
  email: Yup.string(),
});

const format = (value) => {
  if (typeof value === "string") {
    if (value === "true") {
      return true;
    } else {
      return false;
    }
  }
  if (typeof value === "boolean") {
    if (value === true) {
      return "true";
    } else {
      return "false";
    }
  }
};
export function IdentityEditForm({
  clientIdentity,
  btnRef,
  saveClient,
  setIsSubmitting,
}) {
  const [isObligatedSubject, setObligatedSubject] = useState(
    format(clientIdentity.obligatedSubject)
  );
  const [isPoliticallyExposedPerson, setPoliticallyExposedPerson] = useState(
    format(clientIdentity.politicallyExposedPerson)
  );
  const { levels } = useClientsContext();

  return (
    <>
      <Formik
        enableReinitialize={false}
        initialValues={clientIdentity}
        validationSchema={IdentityEditSchema}
        onSubmit={(values) => {
          return saveClient(values);
        }}
      >
        {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="name"
                    component={Input}
                    placeholder="Nombre"
                    label="Nombre"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="lastname"
                    component={Input}
                    placeholder="Apellido"
                    label="Apellido"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    name="email"
                    component={Input}
                    placeholder="Email"
                    label="Email"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Select name="level" label="Nivel">
                    {levels.map((level) => (
                      <option key={level} value={level}>
                        {level}
                      </option>
                    ))}
                  </Select>
                </div>
                <div className="col-lg-4">
                  <Field
                    type="text"
                    name="date"
                    component={Input}
                    placeholder="Fecha de Nacimiento"
                    label="Fecha de Nacimiento"
                  />
                </div>
                <div className="col-lg-4">
                  <Field
                    type="number"
                    name="dni"
                    component={Input}
                    placeholder="DNI"
                    label="DNI"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-4">
                  <Field
                    name="phone"
                    component={Input}
                    placeholder="Teléfono"
                    label="Teléfono"
                  />
                </div>
                <div className="col-lg-4 d-flex align-items-center">
                  <Checkbox
                    name="obligatedSubject"
                    isSelected={isObligatedSubject}
                    onChange={(e) => {
                      setObligatedSubject(!isObligatedSubject);
                      setFieldValue(
                        "obligatedSubject",
                        format(e.target.checked)
                      );
                    }}
                  >
                    Sujeto Obligado
                  </Checkbox>
                </div>
                <div className="col-lg-4 d-flex align-items-center">
                  <Checkbox
                    name="politicallyExposedPerson"
                    isSelected={isPoliticallyExposedPerson}
                    onChange={(e) => {
                      setPoliticallyExposedPerson(!isPoliticallyExposedPerson);
                      setFieldValue(
                        "politicallyExposedPerson",
                        format(e.target.checked)
                      );
                    }}
                  >
                    Persona Políticamente Expuesta
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
