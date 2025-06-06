import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { Input } from "../../../../../../../_metronic/_partials/controls";
import { 
  Button,
  CircularProgress,
  FormControlLabel,
  Switch,
  InputAdornment
} from '@material-ui/core';
import { SnackbarMessage } from "../../../../../../components/SnackbarMessage";
import { useHistory } from "react-router";
import { makeStyles } from '@material-ui/core';
import { useSnackBar } from '../../../../../../hooks/useSnackBar';
import moment from 'moment'
import { getCurrencies, getEntities } from "../../../../../../_redux/combos/combosActions";
import { GeneralSelector } from "../../../../../../components/Fields/GeneralSelector";
import { useFetchCombos } from "../../../../../../hooks";

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

const AccountEditSchema = Yup.object().shape({
  denomination: Yup.string()
  .required("Nombre de la cuenta es un campo requerido"),
});

const statusMock = [
  {
    id: 1,
    status: "Activo"
  },
  {
    id: 2,
    status: "Inactivo"
  },
  {
    id: 3,
    status: "Bloqueado"
  },
]

const currenciesHeritage = [
  {
    id: 1,
    currency: "Moneda Patrimonio 1"
  },
  {
    id: 2,
    currency: "Moneda Patrimonio 2"
  },
  {
    id: 3,
    currency: "Moneda Patrimonio 3"
  },
]

export function AccountEditForm({account}) {

    const classes = useStyles();
    const history = useHistory()
    const [currenciesData] = useFetchCombos('currencies', getCurrencies)
    const [entitiesData] = useFetchCombos('entities', getEntities)
    const { open, variant,message, handleClose, setOpenMessage } = useSnackBar()
    const [progress, setProgress] = useState(false);

    const initialValues = {
      denomination: account.denomination,
      id: account.id,
      date: moment(account.openingDate).format('DD/MM/YYYY'),
      currency: account.currency.currencyId,
      mail: account.mail,
      entity: account.entity.entityId,
      status: account.status.statusId,
      currencyHeritageId: account.currencyHeritage.id,
      isFisco: account.isFisco,
      estimatedHeritage: account.estimatedHeritage,
      isQualifiedInvestor: account.isQualifiedInvestor,
      activity: account.activity,
      expBrokerCtaName: account.expBrokerCtaName,
      expBrokerCta: account.expBrokerCta,
      expInvestment: account.expInvestment,
      investmentExperiencies: account.investmentExperiencies,
      opportunisticSpeculative: account.opportunisticSpeculative,
      ctaEstimatedAmount: account.ctaEstimatedAmount,
      ivaDate: moment(account.ivaDate).format('DD/MM/YYYY'),
      ivaCod: account.ivaCod,
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
        validationSchema={AccountEditSchema}
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
                    name="denomination"
                    component={Input}
                    placeholder="Nombre de la cuenta"
                    label="Nombre de la cuenta"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    disabled
                    name="id"
                    component={Input}
                    placeholder="N° de la cuenta"
                    label="N° de la cuenta"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="date"
                    component={Input}
                    placeholder="Fecha de apertura"
                    label="Fecha de apertura"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="mail"
                    component={Input}
                    placeholder="Mail"
                    label="Mail"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-3 mt-6">
                  <GeneralSelector 
                    values={values}
                    valueName='entity'
                    keyName='entity'
                    label='Entidad'
                    data={entitiesData}
                    setFieldValue={setFieldValue}
                    insideOnchange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className="col-lg-3 mt-6">
                  <GeneralSelector 
                    values={values}
                    valueName='currency'
                    keyName='currency'
                    label='Moneda'
                    data={currenciesData}
                    setFieldValue={setFieldValue}
                    insideOnchange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className="col-lg-3 mt-6">
                  <GeneralSelector 
                    values={values}
                    valueName='status'
                    keyName='status'
                    label='Estado'
                    data={{loading: false, data: statusMock}}
                    setFieldValue={setFieldValue}
                    insideOnchange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
                <div className="col-lg-3 mt-6">
                  <GeneralSelector 
                    values={values}
                    valueName='currencyHeritageId'
                    keyName='currency'
                    label='Moneda Patrimonio'
                    data={{loading: false, data: currenciesHeritage}}
                    setFieldValue={setFieldValue}
                    insideOnchange={(e) => {
                      handleChange(e);
                    }}
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-3">
                  <Field
                    name="estimatedHeritage"
                    component={Input}
                    placeholder="Patrimonio Estimado"
                    label="Patrimonio Estimado"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                </div>
                <div className="col-lg-3 d-flex justify-content-center align-items-start text-center">
                  <FormControlLabel 
                    label='Es fisco'
                    labelPlacement="top"                
                    control={
                      <Switch 
                        checked={values.isFisco === 1} 
                        onChange={(e) => {
                          setFieldValue(`isFisco`, e.target.checked === true? 1 : 0)
                        }} 
                      />
                    } 
                  />
                </div>
                <div className="col-lg-3 d-flex justify-content-center align-items-start text-center">
                  <FormControlLabel 
                    label='Inversor Calificado'
                    labelPlacement="top"                
                    control={
                      <Switch 
                        checked={values.isQualifiedInvestor === 1} 
                        onChange={(e) => {
                          setFieldValue(`isQualifiedInvestor`, e.target.checked === true? 1 : 0)
                        }} 
                      />
                    } 
                  />
                </div>
                <div className="col-lg-3 d-flex justify-content-center align-items-start text-center">
                  <Field
                    name="activity"
                    component={Input}
                    placeholder="Actividad"
                    label="Actividad"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-3">
                  <Field
                    name="expBrokerCtaName"
                    component={Input}
                    placeholder="Nombre de cta Broker"
                    label="Nombre de cta Broker"
                  />
                </div>
                <div className="col-lg-3 d-flex justify-content-center align-items-start text-center">
                    <FormControlLabel 
                      label='expBrokerCta'
                      labelPlacement="top"                
                      control={
                        <Switch 
                          checked={values.expBrokerCta === 1} 
                          onChange={(e) => {
                            setFieldValue(`expBrokerCta`, e.target.checked === true? 1 : 0)
                          }} 
                        />
                      } 
                    />
                </div>
                <div className="col-lg-3 d-flex justify-content-center align-items-start text-center">
                    <FormControlLabel 
                      label='expInversion'
                      labelPlacement="top"                
                      control={
                        <Switch 
                          checked={values.expInvestment === 1} 
                          onChange={(e) => {
                            setFieldValue(`expInvestment`, e.target.checked === true? 1 : 0)
                          }} 
                        />
                      } 
                    />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="investmentExperiencies"
                    component={Input}
                    placeholder="Experiencia en Inversiones"
                    label="Experiencia en Inversiones"
                  />
                </div>
              </div>
              <div className="form-group row">
                <div className="col-lg-3">
                  <Field
                    name="opportunisticSpeculative"
                    component={Input}
                    placeholder="Especulativo Oportunista"
                    label="Especulativo Oportunista"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="ctaEstimatedAmount"
                    component={Input}
                    placeholder="montoEstimaCta"
                    label="montoEstimaCta"
                    startAdornment={
                      <InputAdornment position="start">$</InputAdornment>
                    }
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="ivaDate"
                    component={Input}
                    placeholder="fechaDesdeCodTpContribIVA"
                    label="fechaDesdeCodTpContribIVA"
                  />
                </div>
                <div className="col-lg-3">
                  <Field
                    name="ivaCod"
                    component={Input}
                    placeholder="codTpContribIVA"
                    label="codTpContribIVA"
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
