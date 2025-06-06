import React from 'react';
import { Formik, Form } from "formik"
import { GeneralSelector } from '../../../../../components/Fields/GeneralSelector';

export const Filters = ({currencies, entities, setValues, values}) => {

  return (
      <Formik
        initialValues={values}
        >
        {({ handleSubmit, setFieldValue, values }) => (
        <Form className="form-label-right">   
          <div className="row justify-content-center">
            <div className="col-lg-5">
              <GeneralSelector 
                values={values}
                valueName='idCurrency'
                keyName='currency'
                label='Moneda'
                data={currencies}
                setFieldValue={setFieldValue}
                insideOnchange={(e) => {
                  const newValues = {
                    ...values,
                    idCurrency: e.target.value
                  }
                  setValues(newValues)
                  handleSubmit()}
                }
              />
            </div>
            <div className="col-lg-5 mr-3">
              <GeneralSelector 
                values={values}
                valueName='idEntity'
                keyName='entity'
                label='Entidad'
                data={entities}
                setFieldValue={setFieldValue}
                insideOnchange={(e) => {
                  const newValues = {
                    ...values,
                    idCurrency: e.target.value
                  }
                  setValues(newValues)
                  handleSubmit()}
                }
              />
            </div>
          </div>
        </Form>
      )}
    </Formik>
  )
}