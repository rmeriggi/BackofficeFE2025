import React from 'react'
import * as Yup from "yup";
import { Field, Form, Formik } from 'formik';
import { Input } from '../../../../../../_metronic/_partials/controls';

const userSchema = Yup.object().shape({
  program : Yup.string()
    .required("Programa es requerido"),
  description : Yup.string()
    .required("Descripción es requerido"),
  status: Yup.string()
    .required("Email es requerido"),
});

export function EditProgramForm({ btnRef, saveProgram, initialValues}) {

  return (
    <>
      <Formik
      initialValues={initialValues}
      validationSchema={userSchema}
      onSubmit={(values) => {
         return saveProgram(values)
      }}
      >
      {({ handleSubmit, setFieldValue , values }) => (
        <>
          <Form className="form form-label-right">   
            <div className="form-group row">
              <div className="col-lg-3">
                <Field
                  name="program"
                  component={Input}
                  placeholder="Programa"
                  label="Programa"
                />
              </div>
              <div className="col-lg-3">
                <Field
                  name="description"
                  component={Input}
                  placeholder="Descripción"
                  label="Descripción"
                />
              </div>
              <div className="col-lg-3">
                <Field
                  name="status"
                  component={Input}
                  placeholder="Estado"
                  label="Estado"
                /> 
              </div>
            </div>
            <button
              type="submit"
              style={{ display: "none" }}
              ref={btnRef}
              onSubmit={() => handleSubmit()}
            ></button>
          </Form>
        </>
      )}
    </Formik>
  </>
  )
}
