import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../../_metronic/_partials/controls";
import { 
  Button,
  CircularProgress,
  createMuiTheme,
  FormControlLabel,
  Switch,
  colors
} from '@material-ui/core';
import { ThemeProvider } from "@material-ui/styles";
import { es } from "date-fns/locale";
import DateFnsUtils from '@date-io/date-fns'
import { SnackbarMessage } from "../../../../../../components/SnackbarMessage";
import { useHistory } from "react-router";
import { makeStyles } from '@material-ui/core';
import { useSnackBar } from '../../../../../../hooks/useSnackBar';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from 'moment';

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
  }
}));

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
});

const AccountingGroupEditSchema = Yup.object().shape({
  accountName: Yup.string()
  .required("Nombre de la cuenta es un campo requerido"),
});

export function MoreInfoEditForm({account}) {

  const classes = useStyles();
  const history = useHistory()
  const { open, variant,message, handleClose, setOpenMessage } = useSnackBar()
  const [progress, setProgress] = useState(false);

  const initialValues = {
    tpRiskCmt: account.tpRiskCmt,
    tpDrivingCart: account.tpDrivingCart,
    tpCmtTrading: account.tpCmtTrading,
    codCuotapartista: account.codCuotapartista,
    jointSignatureRequired: account.jointSignatureRequired,
    jointSignatureReference: account.jointSignatureReference,
    codGrupoArOperBurs: account.codGrupoArOperBurs,
    codTpComitente: account.codTpComitente,
    codCategoriaUIF: account.codCategoriaUIF,
    codGrupoArAcreencias: account.codGrupoArAcreencias,
    codGrupoArCustodia: account.codGrupoArCustodia,
    noPresencial: account.noPresencial,
    signatureDateFrom: account.signatureDateFrom,
    noIntermediaryThird: account.noIntermediaryThird,
    intermediary: account.intermediary,
    officialAccount: account.officialAccount,
    administrator: account.administrator,
    producer: account.producer,
    codTpVirtualWallet: account.codTpVirtualWallet,
  }


  const handleEdit = async (values) => {
    try {
      //await edit(accountingGroup.id, values);
      setOpenMessage('success', 'Los datos fueron actualizados correctamente.')
      setTimeout(()=>{
        history.push('/investments/accounts')  
      }, 4000)
    } catch  {
      setOpenMessage('error', 'Los datos no fueron actualizados correctamente. Por favor, volvé a intentar.')
    }
  }

  return (
    <>
      <Formik
        enableReinitialize
        initialValues={initialValues}
        validationSchema={AccountingGroupEditSchema}
        onSubmit={(values) => {
          setProgress(!progress)
          handleEdit(values)
        }}
      >
        {({ handleSubmit, values, handleChange, setFieldValue, isSubmitting }) => (
          <>
            <Form className="form form-label-right">
              <div className="form-group row">
                <div className="col-lg-3">
                  <Field
                    name="tpRiskCmt"
                    component={Input}
                    placeholder="tpRiesgoCmt"
                    label="tpRiesgoCmt"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="tpDrivingCart"
                    component={Input}
                    placeholder="tpManejoCart"
                    label="tpManejoCart"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    type='number'
                    name="tpCmtTrading"
                    component={Input}
                    placeholder="tpCmtTrading"
                    label="tpCmtTrading"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="codCuotapartista"
                    component={Input}
                    placeholder="codCuotapartista"
                    label="codCuotapartista"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-3 d-flex justify-content-center align-items-start text-center">
                  <FormControlLabel 
                    label='Requiere Firma Conjunta'
                    labelPlacement="top"                
                    control={
                      <Switch 
                        checked={values.jointSignatureRequired === 1} 
                        onChange={(e) => {
                          setFieldValue(`jointSignatureRequired`, e.target.checked === true? 1 : 0)
                        }} 
                      />
                    } 
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="jointSignatureReference"
                    component={Input}
                    placeholder="Referencia Firma Conjunta"
                    label="Referencia Firma Conjunta"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="codGrupoArOperBurs"
                    component={Input}
                    placeholder="codGrupoArOperBurs"
                    label="codGrupoArOperBurs"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    type='number'
                    name="codTpComitente"
                    component={Input}
                    placeholder="codTpComitente"
                    label="codTpComitente"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-3">
                  <Field
                    type='number'
                    name="codCategoriaUIF"
                    component={Input}
                    placeholder="codCategoriaUIF"
                    label="codCategoriaUIF"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    type='number'
                    name="codGrupoArAcreencias"
                    component={Input}
                    placeholder="codGrupoArAcreencias"
                    label="codGrupoArAcreencias"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    type='number'
                    name="codGrupoArCustodia"
                    component={Input}
                    placeholder="codGrupoArCustodia"
                    label="codGrupoArCustodia"
                  />
                </div>
                <div className="col-lg-3 d-flex justify-content-center align-items-start text-center">
                  <FormControlLabel 
                    label='No Presencial'
                    labelPlacement="top"                
                    control={
                      <Switch 
                        checked={values.noPresencial === 1} 
                        onChange={(e) => {
                          setFieldValue(`noPresencial`, e.target.checked === true? 1 : 0)
                        }} 
                      />
                    } 
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-3">
                  <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                    <ThemeProvider theme={defaultMaterialTheme}>
                      <KeyboardDatePicker
                        name="signatureDateFrom"
                        autoOk
                        fullWidth
                        inputVariant="outlined"
                        size="small"
                        label="Desde"
                        format="dd/MM/yyyy"
                        value={values.signatureDateFrom}
                        cancelLabel="cancelar"
                        onChange={date =>{
                            if(moment(date).isValid()){
                              //const fromDate = date.toISOString()
                              setFieldValue("signatureDateFrom", date)
                            }    
                        }}
                      />
                      </ThemeProvider>
                  </MuiPickersUtilsProvider>
                </div>
                <div className="col-lg-3 d-flex justify-content-center align-items-start text-center">
                  <FormControlLabel 
                    label='Tercero no intermediario'
                    labelPlacement="top"                
                    control={
                      <Switch 
                        checked={values.noIntermediaryThird === 1} 
                        onChange={(e) => {
                          setFieldValue(`noIntermediaryThird`, e.target.checked === true? 1 : 0)
                        }} 
                      />
                    } 
                  />
                </div>
                <div className="col-lg-3 d-flex justify-content-center align-items-start text-center">
                  <FormControlLabel 
                    label='Intermediario'
                    labelPlacement="top"                
                    control={
                      <Switch 
                        checked={values.intermediary === 1} 
                        onChange={(e) => {
                          setFieldValue(`intermediary`, e.target.checked === true? 1 : 0)
                        }} 
                      />
                    } 
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    type='number'
                    name="officialAccount"
                    component={Input}
                    placeholder="Oficial Cuenta"
                    label="Oficial Cuenta"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-3">
                  <Field
                    type='number'
                    name="administrator"
                    component={Input}
                    placeholder="Administrador"
                    label="Administrador"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    type='number'
                    name="producer"
                    component={Input}
                    placeholder="Productor"
                    label="Productor"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    type='number'
                    name="codTpVirtualWallet"
                    component={Input}
                    placeholder="CodTpBilleteraVirtual"
                    label="CodTpBilleteraVirtual"
                  />
                </div>
              </div>
              <div className={classes.submitContainer}>
                <Button 
                  variant="contained"
                  color="secondary"
                  type="submit"
                  className="ml-4"
                  size="large"
                  onClick={handleSubmit}
                  endIcon={
                    isSubmitting && <CircularProgress size={20} color="secondary"/>  
                  }
                >
                  Editar
                </Button>
              </div>
              <SnackbarMessage
                handleClose={handleClose}
                open={open}
                variant={variant}
                message={message}
              />
            </Form>
          </>
        )}
      </Formik>
    </>
  );
}
