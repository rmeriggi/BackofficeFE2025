import React, { useState } from "react";
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
import { formatFieldToTypeNumber, formatNumberThousandsSeparator } from '../../../../../utils/formatData'
import { assignWallet } from "../../utils/service";
import { useSnackBar } from "../../../../../hooks/useSnackBar";
import { SnackbarMessage } from "../../../../../components/SnackbarMessage";

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
    width: '15px !important',
    height: '15px !important',
  },
  submitContainer: {
    display: 'flex',
    alignItems: 'center'
  },
  submitButton: {
    height: 35
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
    marginLeft: '5px'
  }
}));

const AssignWalletEditSchema = Yup.object().shape({
  feesDueMin: Yup.string()
  .required("Mínimo de cuotas es un campo requerido"),
  feesDueMax: Yup.string()
  .required("Máximo de cuotas es un campo requerido"),
  amountMin: Yup.string()
  .required("Importe mínimo es un campo requerido"),
  amountMax: Yup.string()
  .required("Importe máximo es un campo requerido"),
  daysLateFrom: Yup.string()
  .required("Días DESDE es un campo requerido"),
  daysLateTo: Yup.string()
  .required("Días HASTA es un campo requerido")
});

const initialValues = {
  product: [0],
  creditStatus: [0],
  manager: [0],
  toManager: [0],
  feesDueMin: 0,
  feesDueMax: 999,
  amountMin: 0,
  amountMax: formatNumberThousandsSeparator(999999),
  daysLateFrom: 0,
  daysLateTo: 999,
  execute: 0,
  asign: 0
}

export function AssignWalletEditForm({products, creditStatus, managers, openModal}) {

  const classes = useStyles();
  const [progress, setProgress] = useState(false);
  const { open, variant,message, handleClose, setOpenMessage } = useSnackBar()
  
  const handleModal = async(values) => {
    const req = {
      amountMax:    formatFieldToTypeNumber(values.amountMax),
      amountMin:    formatFieldToTypeNumber(values.amountMin),
      asign:        values.asign,
      creditStatus: values.creditStatus,
      daysLateFrom: Number(values.daysLateFrom),
      daysLateTo:   Number(values.daysLateTo),
      execute:      values.execute,
      feesDueMax:   Number(values.feesDueMax),
      feesDueMin:   Number(values.feesDueMin),
      manager:      values.manager,
      product:      values.manager,
      toManager:    values.toManager
    } 
    try {
        await assignWallet(req).then(res=>{
        openModal(res, req)
        setProgress(false)
      })
      setOpenMessage("warning", "Verifique los datos antes de confirmar por favor.")
    } catch (e) {
      setOpenMessage("error", "No se a podido cargar los datos para la asignación. Por favor, volvé a intentar.")
    }
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={AssignWalletEditSchema}
        onSubmit={(values) => {
          setProgress(!progress)
          handleModal(values)
        }}
      >
        {({ handleSubmit, handleChange, setFieldValue, values }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-4">
                  <MultiselectComponent 
                    input={'Producto'}
                    classes={classes}
                    array={products}
                    property={'product'}
                    setFieldValue={setFieldValue}
                    name={'product'}
                  />
                </div> 
                <div className="col-lg-4">
                  <MultiselectComponent 
                    input={'Estado de la cuota'}
                    classes={classes}
                    array={creditStatus}
                    property={'status'}
                    setFieldValue={setFieldValue}
                    name={'creditStatus'}
                  />
                </div> 
              </div>
              <div className="form-group row" style={{height: '110px'}}>
                <div className="col-lg-4 d-flex flex-wrap">
                  <span className={classes.fromToText}>Cuotas adeudadas</span>
                  <div className={`col-lg-6 ${classes.fromToText}`}>
                    <Field
                        name="feesDueMin"
                        component={Input}
                        placeholder="Desde"
                        label="Desde"
                    />
                  </div>
                  <div className={`col-lg-6 ${classes.fromToText}`}>
                    <Field
                        name="feesDueMax"
                        component={Input}
                        placeholder="Hasta"
                        label="Hasta"
                    />
                  </div>
                </div>
                <div className="col-lg-4 d-flex flex-wrap" >
                  <span className={classes.fromToText}>Importe</span>
                  <div className={`col-lg-6 ${classes.fromToText}`}>
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
                  <div className={`col-lg-6 ${classes.fromToText}`}>
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
                <div className="col-lg-4 d-flex flex-wrap">
                  <span className={classes.fromToText}>D&iacute;as de atraso</span>
                  <div className={`col-lg-6 ${classes.fromToText}`}>
                    <Field
                        name="daysLateFrom"
                        component={Input}
                        placeholder="Desde"
                        label="Desde"
                    />
                  </div>
                  <div className={`col-lg-6 ${classes.fromToText}`}>
                    <Field
                        name="daysLateTo"
                        component={Input}
                        placeholder="Hasta"
                        label="Hasta"
                    />
                  </div>
                </div>
              </div>
              <div className="form-group row ml-2">
                <div className={`col-lg-6`}>
                  <MultiselectComponent 
                    input={'Gestores'}
                    classes={classes}
                    array={managers}
                    property={'user'}
                    setFieldValue={setFieldValue}
                    name={'manager'}
                  />
                </div>
                <div className={`col-lg-6 ${classes.toManager}`}>
                  <MultiselectComponent 
                    input={'A Gestores'}
                    classes={classes}
                    array={managers}
                    property={'user'}
                    disabled={true}
                  />
                  <Button 
                    data-cy="Edit-dataToAssignWallet-submit-button"
                    variant="outlined" 
                    color="primary"
                    type="submit"
                    className={`btn btn-primary ml-2 ${classes.submitButton}`}
                    disabled
                  >
                    ReAsignar
                  </Button>
                </div>
              </div>
              <div className={classes.submitContainer}>
                <Button 
                  data-cy="Edit-dataToAssignWallet-submit-button"
                  variant="outlined" 
                  color="primary"
                  type="submit"
                  className={`btn btn-primary ml-2 ${classes.submitButton}`}
                  onClick={()=> {
                    setFieldValue('asign', 1)
                  }}
                >
                  Asignar
                </Button>
                <Button 
                  data-cy="Edit-dataToAssignWallet-submit-button"
                  variant="outlined" 
                  color="primary"
                  type="submit"
                  className={`btn btn-primary ml-2 ${classes.submitButton}`}
                  onClick={handleSubmit}
                >
                  Desasignar
                </Button>
                <CircularProgress 
                  className={classes.progress} 
                  color={'primary'}
                  style={{display: `${progress? 'block': 'none'}`}}
                />
              </div>
            </Form>
          </>
        )}
      </Formik>
        <SnackbarMessage
          handleClose={handleClose}
          open={open}
          variant={variant}
          message={message}
        />
    </>
  );
}
