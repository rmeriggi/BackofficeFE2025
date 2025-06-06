import React from 'react'
import * as Yup from "yup";
import { Formik, Form, Field } from "formik";
import { Input } from '../../../../../_metronic/_partials/controls';
import { InputAdornment } from '@material-ui/core';
import { GeneralSelector } from '../../../../components/Fields/GeneralSelector';

const schema = Yup.object().shape({
  id: Yup.string(),
  amount: Yup.string()
    .required("Saldo es requerido"),
  date: Yup.string()
    .required("Fecha es requerido"),
  entity: Yup.string()
    .required("Entidad es requerido"),
});

const FormBalancesItau = ({btnRef, data, edit, editBalance, createBalance, entities}) => {
  
  return (
    <Formik
      initialValues={data}
      validationSchema={schema}
      onSubmit={(values) => {
        if(edit){
          return editBalance(values);
        }else{
          return createBalance(values)
        }
      }}
    >
        {({ handleSubmit,values,setFieldValue }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-md-3">
                  <Field
                    type="date"
                    name="date"
                    component={Input}
                    placeholder="Fecha"
                    label="Fecha"
                    disabled={edit}
                  />
                </div>
                <div className="col-md-3 my-8">
                  <GeneralSelector 
                      disabled={edit}
                      values={values}
                      valueName='entity'
                      keyName='entity'
                      label='Entidad'
                      data={entities}
                      setFieldValue={setFieldValue}
                  />
                </div>
                <div className="col-md-3">
                  <Field
                    type="number"
                    name="amount"
                    component={Input}
                    placeholder="Saldo"
                    label="Saldo"
                    startAdornment={<InputAdornment position="start">$</InputAdornment>}
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
  )
}

export default FormBalancesItau