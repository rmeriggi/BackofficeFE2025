/* eslint-disable eqeqeq */
import React, { useState } from 'react'
import * as Yup from "yup";
import { Field, Form, Formik } from 'formik';
import { Input } from '../../../../../_metronic/_partials/controls';
import { Autocomplete } from '@material-ui/lab';
import { TextField } from '@material-ui/core';
import { getAllClients } from '../../../Clients/Clients/utils/service';

const schema = Yup.object().shape({
  idclient : Yup.string()
    .required("Cliente es requerido"),
  idSite : Yup.string()
    .required("IdSite es requerida"),
  publicKey: Yup.string()
    .required("Clave pública es requerida"),
  privateKey: Yup.string()
    .required("Clave privada es requerida"),
  site: Yup.string()
    .required("Site es requerido")
});


export default function FormSites({ btnRef, initialValues, action, isEdit = false, clientsEdit }) {

  const [clients, setClients] = useState([])

  const searchClients =async (e) => {
    try {
      const clientsData = await getAllClients(e)
      setClients(clientsData.clientsList)
    } catch (error) {
      setClients([])
    }
  }

  return (
    <>
      <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={(values) => {
        return action(values)
      }}
      >
      {({ handleSubmit,values, setFieldValue }) => (
        <>
          <Form className="form form-label-right">   
            <div className="form-group row">
              <div className="col-lg-3">
                {
                  isEdit ?
                  <Field
                    disabled
                    name="idclient"
                    value={clientsEdit.find(c => c.id == values.idclient)?.name || "No se encontró cliente"}
                    component={Input}
                    placeholder="Cliente"
                    label="Cliente"
                /> :
                  <Autocomplete 
                    options={clients}
                    name="idclient"
                    getOptionLabel={(option) => option.name}
                    getOptionSelected={(option, value) => option.id === value.id}
                    className={'pt-8'}
                    onChange={(e,newValue) => {
                      if(newValue?.id) setFieldValue("idclient", (newValue.id))
                    }}
                    renderInput={(params) => 
                      <TextField 
                        {...params} 
                        label="Cliente" 
                        variant='outlined'
                        size='small'
                        color='secondary'
                        onChange={(e) => {
                          if(e.target.value.length === 3){
                            searchClients(e.target.value)
                        }}}
                      />
                    }
                  />
                }
              </div>
              <div className="col-lg-3">
                <Field
                  name="site"
                  component={Input}
                  value={values.site}
                  placeholder="Site"
                  label="Site"
                />
              </div>
              <div className="col-lg-3">
                <Field
                  name="idSite"
                  component={Input}
                  value={values.idSite}
                  placeholder="Id Site"
                  label="Id Site"
                />
              </div>
              <div className="col-lg-3">
                <Field
                  name="publicKey"
                  component={Input}
                  value={values.publicKey}
                  placeholder="Clave Pública"
                  label="Clave Pública"
                />
              </div>
            </div>
            <div className='form-group row'>
              <div className="col-lg-3">
                <Field
                  name="privateKey"
                  component={Input}
                  value={values.privateKey}
                  placeholder="Clave Privada"
                  label="Clave Privada"
                /> 
              </div>
            </div>
            <button
              type='submit'
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
