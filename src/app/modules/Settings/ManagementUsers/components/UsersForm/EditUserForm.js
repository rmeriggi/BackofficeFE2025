/* eslint-disable eqeqeq */
import React from 'react'
import * as Yup from "yup";
import { Field, Form, Formik } from 'formik';
import { FormControlLabel, Switch } from '@material-ui/core';
import { Input } from '../../../../../../_metronic/_partials/controls';
import { LayoutSplashScreen } from '../../../../../../_metronic/layout';
import { useFetchClients } from '../../../../../hooks';

const userSchema = Yup.object().shape({
  user : Yup.string()
    .required("Usuario es requerido"),
  password : Yup.string()
    .required("Contraseña es requerida"),
  email: Yup.string()
    .required("Email es requerido")
    .email("Email incorrecto"),
  name: Yup.string()
    .required("Nombre requerido"),
  status: Yup.string()
    .required("Estatus reqerido"),
});


export default function EditUserForm({ btnRef, saveUser, initialValues, setIsSubmitting}) {

  const [clients] = useFetchClients()

  if(!clients) return <LayoutSplashScreen />

  return (
    <>
      <Formik
      initialValues={initialValues}
      validationSchema={userSchema}
      onSubmit={(values) => {
         return saveUser(values)
      }}
      >
      {({ handleSubmit,values, setFieldValue, isSubmitting }) => (
        <>
          <Form className="form form-label-right">   
            <div className="form-group row">
              <div className="col-lg-3">
                <Field
                  disabled
                  name="idclient"
                  value={clients.find(c => c.id == values.idclient)?.name || "No se encontró cliente"}
                  component={Input}
                  placeholder="Cliente"
                  label="Cliente"
                />
              </div>
              <div className="col-lg-3">
                <Field
                  name="user"
                  component={Input}
                  placeholder="Usuario"
                  label="Usuario"
                />
              </div>
              <div className="col-lg-3">
                <Field
                  name="password"
                  type="password"
                  component={Input}
                  placeholder="Contraseña"
                  label="Contraseña"
                />
              </div>
              <div className="col-lg-3">
                <Field
                  name="name"
                  component={Input}
                  placeholder="Nombre y Apellido"
                  label="Nombre y Apellido"
                /> 
              </div>
            </div>
            <div className="form-group row">
              <div className="col-lg-3">
                <Field
                  type="email"
                  name="email"
                  component={Input}
                  placeholder="Email"
                  label="Email"
                /> 
              </div>
              <div className="col-lg-3 d-flex align-items-baseline">
                <FormControlLabel
                  control={
                    <Switch 
                      checked={values.status == "0" ? false : true} 
                      onChange={(e) => setFieldValue("status", e.target.checked !== false ? 1 : 0)} 
                      name="status"
                    />
                  } 
                  label="Status"
                  labelPlacement="top" 
                />
                <div>
                  {values.status == "1" ?
                    (<span>On</span>):
                    (<span>Off</span>)
                  } 
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
  </>
  )
}
