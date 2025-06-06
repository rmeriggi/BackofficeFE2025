import React, { useRef, useState } from "react";
import * as Yup from "yup";
import { Modal } from "react-bootstrap";
import { Button, InputAdornment, TextField } from "@material-ui/core";
import { Field, Form, Formik } from "formik";
import { Input } from "../../../../../../../../../_metronic/_partials/controls";
import BootstrapTable from "react-bootstrap-table-next";
import { useParams } from "react-router-dom";
import { AmountColumnFormatter } from "../../../../../../../../utils/column-formatter/AmountColumnFormatter";
import { AmountColumnFormatterCapitalAndInterest } from "./AmountColumnFormatter";

const InputePaymentSchema = Yup.object().shape({
  amount: Yup.number()
  .required("Es un campo requerido"),
  description: Yup.string()
  .required("Descripción es requerido"),
});

const columns = [
  {
    dataField: "quota",
    text: "Nro. Cuota",
    classes: 'text-center',
    headerClasses: 'text-center',
  },
  {
    dataField: "capital",
    text: "Importe",
    formatter: AmountColumnFormatterCapitalAndInterest,
    classes: 'text-center',
    headerClasses: 'text-center',
  },
  {
    dataField: "expenses",
    text: "Gastos",
    formatter: AmountColumnFormatter,
    classes: 'text-center',
    headerClasses: 'text-center',
  },
  {
    dataField: "compensatory",
    text: "Int. Comp",
    formatter: AmountColumnFormatter,
    classes: 'text-center',
    headerClasses: 'text-center',
  },
  {
    dataField: "punitives",
    text: "Punitorios",
    formatter: AmountColumnFormatter,
    classes: 'text-center',
    headerClasses: 'text-center',
  },
  {
    dataField: "total",
    text: "Total",
    formatter: AmountColumnFormatter,
    classes: 'text-center',
    headerClasses: 'text-center',
  },
  {
    dataField: "pending",
    text: "Pendiente",
    formatter: AmountColumnFormatter,
    classes: 'text-center',
    headerClasses: 'text-center',
  },
  {
    dataField: "toImpute",
    text: "A imputar",
    formatter: AmountColumnFormatter,
    classes: 'text-center',
    headerClasses: 'text-center',
  },
]

const consult = (values) => {
  if(values){
    return [
      {
        id: 1,
        quota: 1,
        capital: 1000,
        interest: 200,
        expenses: 200,
        punitives: 100,
        compensatory: 600,
        punitive: 400,
        total: 1500,
        pending: 2000,
        toImpute: 6000,
      }
    ]
  }
}
export function InputPaymentModal({ show, onHide, pending }) {

  const {id} = useParams()
  const btnRef = useRef();
  const [detailPayment, setDetailPayment] = useState()

  const saveNewContact = () => {
    if (btnRef && btnRef.current) {
      btnRef.current.click();
    }
  };

  const consultPayment = (values) => {
    //llamada al endpoint consulta del pago
    const response =  consult(values)
    setDetailPayment(response)
  }

  const confirmPayment = (values) => {
    //endpoint de confirmar pago
  }

  return (
    <Modal
      show={show}
      size="xl"
      onHide={onHide}
      onExited={() => setDetailPayment(undefined)}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Imputar pago
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="overlay overlay-block cursor-default">
        {/*begin::Loading*/}
        {false ? (
          <>
          <div className="overlay-layer">
            <div className="spinner spinner-lg spinner-primary" />
          </div> 
          {/*end::Loading*/}
          </>
        ) : (
          <Formik
          initialValues={{
            description: `Usted está pagando el crédito Nro ${id}`,
            amount: (pending),
            idCredit: id
          }}
          validateOnMount
          validationSchema={InputePaymentSchema}
          onSubmit={(values) => {
             confirmPayment(values)
          }}
          >
          {({ handleSubmit,values, setFieldValue, isValid, setFieldError, setFieldTouched }) => (
            <>
              <Form className="form form-label-right">   
                <div className="form-group row">
                  <div className="col">
                    <TextField
                      style={{width: '100%'}}
                      name="description"
                      placeholder="Descripción"
                      label="Descripción"
                      color="secondary"
                      multiline
                      rows={3}
                      value={values.description}
                      onChange={(e)=> setFieldValue('description', e.target.value)}
                      variant="outlined"
                    />
                  </div>
                </div>
                <div className="form-group row align-items-center">
                  <div className="col-6">
                    <Field
                      name="amount"
                      type="number"
                      value ={values.amount}
                      component={Input}
                      placeholder="Importe"
                      label="Importe"
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                      onChange={(e) => {
                        if(e.target.value <= pending){
                          setFieldValue('amount', e.target.value)
                          setFieldTouched("amount", true)
                        }
                        if(e.target.value > pending){
                          setFieldError("amount", "No se puede ingresar un monto mayor al importe pendiente")
                        }
                      }}
                    />
                  </div>
                  <div className="col-6 d-flex mb-3 justify-content-baseline mt-8">
                    <Button
                      variant="contained"
                      color="secondary"
                      disabled={!isValid}
                      className="ml-auto"
                      onClick={() => consultPayment(values)}
                    >
                      Consultar
                    </Button>
                  </div>
                </div>
                {detailPayment ? (
                  <BootstrapTable
                  keyField="id"
                  data={ detailPayment }
                  columns={ columns }
                  striped
                  condensed
                />  
                ):
                null
                }
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
        )}
      </Modal.Body>
      <Modal.Footer className="form">
        <div className="form-group">
          <Button
            variant="outlined"
            color="secondary"
            size="large"
            onClick={onHide}
          >
            Volver
          </Button>
          <Button
            className="ml-3"
            variant="contained"
            color="secondary"
            size="large"
            disabled={!detailPayment}
            onClick={saveNewContact}
          >
            Confirmar
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
}
