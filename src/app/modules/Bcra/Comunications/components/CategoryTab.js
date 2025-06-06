import React from 'react'
import { Formik, Form, Field } from "formik";
import { Input } from '../../../../../_metronic/_partials/controls';


const save = (values) => {
}

export function CategoryTab({backToComunication}) {
  return (
    <>
      <Formik
          initialValues={{
              id: "",
              category: "",
          }}
          onSubmit={(values) => {
              save(values);
          }}
      >
          {({handleSubmit}) => (
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-3">
                  <Field
                    name="id"
                    disable="true"
                    component={Input}
                    placeholder="ID"
                    label="ID"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="category"
                    component={Input}
                    placeholder="Categoria"
                    label="Categoria"
                  />
                </div>
                <div className="col-lg-3 mt-5"> 
                  <button
                    type="button"
                    onClick={backToComunication}
                    className="btn btn-light mt-3 w-100"
                  >
                    <i className="fa fa-arrow-left"></i>
                    Volver
                  </button>
                </div>
                {`  `}
                <div className="col-lg-3 mt-5"> 
                  <button
                    type="submit"
                    className="btn btn-primary mt-3 w-100"
                    onClick={() => handleSubmit()}
                  >
                    Guardar
                  </button>
                </div>
              </div>
            </Form>
          )}
      </Formik>
    </>
  )
}
