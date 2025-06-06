import React from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../_metronic/_partials/controls";
import { 
  Button,
  CircularProgress,
  InputAdornment
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core';
import { MultiselectComponent } from "../../../../../components/MultiselectComponent";
import {formatAmountFromString, formatFieldToTypeNumber} from "../../../../../utils/formatData"


const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
    width: '15px !important',
    height: '15px !important',
  },
  submitContainer: {
    display: 'flex',
    justifyContent: 'flex-end'
   
  },
  submitButton: {
    height: 35,
    display:'flex',
    alignSelf: 'flex-end',
    marginTop:15
  },
  fromToText: {
    textAlign: 'center',
    width: '100%'
  },
  toManager: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#dfe6ed',
    border: '1px solid #adbac5',
    justifyContent: 'space-between',
    height: '85px',
  },
  formControl: {
    paddingInline: '10px',
    borderRadius: '5px'
  },
  inputLabel: {
    textAlign: 'center',
    marginLeft: '2px'
  }
}));

const CollectionAdjustmentSchema = Yup.object().shape({
  amountMin: Yup.string()
  .required("Importe mínimo es un campo requerido"),
  amountMax: Yup.string()
  .required("Importe máximo es un campo requerido"),
  daysLateFrom: Yup.string()
  .required("Días DESDE es un campo requerido"),
  daysLateTo: Yup.string()
  .required("Días HASTA es un campo requerido"),
  dni: Yup.string()
  .min(3, "Se requieren como mínimo 3 dígitos")
 
});

export function CollectionAdjustmentForm({products, quotaStatus, setProgress, progress, getInstallments, setRequestValues}) {

  const initialValues = {
    product: [0],
    creditStatus: [0],
    amountMin: 0,
    amountMax: formatAmountFromString(99999999),
    daysLateFrom: 0,
    daysLateTo: 999,
    dni: ""
  }

  const classes = useStyles();

  const sendRequest = (values) => {
    const req = { 
      product:      values.product,
      creditStatus: values.creditStatus,
      amountMin:    formatFieldToTypeNumber(values.amountMin),
      amountMax:    formatFieldToTypeNumber(values.amountMax),
      daysLateFrom: Number(values.daysLateFrom),
      daysLateTo:   Number(values.daysLateTo),
      dni:          values.dni
    }
    setProgress(true)
    setRequestValues(req)
    getInstallments(req)
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={CollectionAdjustmentSchema}
        onSubmit={(values) => {
          sendRequest(values)
        }}
      >
        {({ handleSubmit, handleChange, setFieldValue }) => (
          <>
            <Form className="form form-label-right" >
              <div className="row">
                <div className="col-5">
                  <MultiselectComponent 
                    input={'Producto'}
                    classes={classes}
                    array={products}
                    property={'product'}
                    setFieldValue={setFieldValue}
                    name={'product'}
                  />
                </div> 
                <div className="col-4">
                  <MultiselectComponent 
                    input={'Estado de la cuota'}
                    classes={classes}
                    array={quotaStatus}
                    property={'status'}
                    setFieldValue={setFieldValue}
                    name={'creditStatus'}
                  />
                </div> 
                <div className="col-2 text-center align-self-end ml-auto">
                  <Button 
                    variant="outlined" 
                    color="secondary"
                    type="submit"
                    onSubmit={() => handleSubmit()}
                    endIcon={
                      progress && <CircularProgress size={20} color="secondary"/>  
                      }
                  >
                    Buscar
                  </Button>
                </div>
              </div>     
              <div className="row mt-8"> 
                <div className="col-lg-5 d-flex flex-wrap" >
                  <span className={classes.fromToText}>Importe</span>
                  <div className={`col ${classes.fromToText}`}>
                    <Field
                      name="amountMin"
                      component={Input}
                      placeholder="Mínimo"
                      label="Mínimo"
                      onChange={(e) => {
                        handleChange(e)
                        setFieldValue('amountMin', e.target.value)
                      }}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                  </div>
                  <div className={`col ${classes.fromToText}`}>
                    <Field
                      name="amountMax"
                      component={Input}
                      placeholder="Máximo"
                      label="Máximo"
                      onChange={(e) => {
                        handleChange(e)
                        setFieldValue('amountMax', e.target.value)
                      }}
                      startAdornment={<InputAdornment position="start">$</InputAdornment>}
                    />
                  </div>
                </div>
                <div className="col d-flex flex-wrap">
                  <span className={classes.fromToText}>D&iacute;as de atraso</span>
                  <div className={`col ${classes.fromToText}`}>
                    <Field
                      name="daysLateFrom"
                      component={Input}
                      placeholder="Desde"
                      label="Desde"
                    />
                  </div>
                  <div className={`col ${classes.fromToText}`}>
                    <Field
                      name="daysLateTo"
                      component={Input}
                      placeholder="Hasta"
                      label="Hasta"
                    />
                  </div>
                  <div className={`col ${classes.fromToText}`}>
                    <Field
                      name="dni"
                      component={Input}
                      placeholder="Documento"
                      label="Documento"
                      onChange={(e) => {
                        handleChange(e)
                        setFieldValue('dni', e.target.value)
                      }}
                    />
                  </div>
                </div>
              </div>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
