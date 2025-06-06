import React, { useState } from 'react'
import * as Yup from "yup";
import DateFnsUtils from '@date-io/date-fns'
import useIsMountedRef from '../../../../../hooks/useIsMountedRef';
import { es } from "date-fns/locale";
import { colors } from "@material-ui/core";
import { Autocomplete } from '@material-ui/lab';
import { ThemeProvider } from "@material-ui/styles";
import { Input, Select } from '../../../../../../_metronic/_partials/controls';
import { getAllAccounts } from '../../../../Accounts/Accounts/utils/service'
import { useOriginDestiny } from '../../utils/apiHooks';
import { LayoutSplashScreen } from "../../../../../../_metronic/layout";
import { useAllTrx } from '../../../../../utils/apiHooks';
import { Field, Form, Formik } from 'formik';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { FormControlLabel, Switch, createMuiTheme, FormLabel, TextField } from '@material-ui/core';
import { getCountries, getCurrencies } from '../../../../../_redux/combos/combosActions';
import { GeneralSelector } from '../../../../../components/Fields/GeneralSelector';
import { useFetchCombos } from '../../../../../hooks';

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
});

const taxSchema = Yup.object().shape({
  idcurrency : Yup.string(),
  idcountry : Yup.string(),
  tax: Yup.string()
    .required("Impuesto es requerido"),
  description: Yup.string()
    .required("Descripción es requerido"),
  date: Yup.date(),
  expiration: Yup.date(),
  originDestiny: Yup.string(),
  idaccount: Yup.string()
    .required("Cuenta es requerido"),
  idTrxCollector: Yup.string(),
  idTrxDiscount: Yup.string(),
  transaction: Yup.string(),
  fix: Yup.string(),
  baseMin: Yup.number()
    .required("Base Minima es requerido"),
  baseMax: Yup.number()
    .required("Base Máxima es requerida"),
  value: Yup.number()
    .required("Valor del impuesto es requerido"),
  type: Yup.string()
  .required("Tipo es requerido"),
  frecuency: Yup.number()
    .required("Frecuencia es requerido"),
  trxType: Yup.string(),
  amountType: Yup.string(),
  calc: Yup.string()
    .required("Calc es requerido"),
  formula: Yup.string()
    .required("Formula es requerido"),
});

export default function CreateTaxForm({edit = false, btnRef, createTax, saveTax, initialValues}) {

  const isMounted = useIsMountedRef()
  const [transactionType, transactionTypeCompleted] = useAllTrx(isMounted)
  const [currencies] = useFetchCombos('currencies', getCurrencies)
  const [countries] = useFetchCombos('countries', getCountries)
  const [originDestinyData, originDestinyCompleted] = useOriginDestiny(isMounted);
  const [accountsData, setAccounts] = useState([])

  const searchAccounts = async(search) => {
    const accountsData = await getAllAccounts(search)
    setAccounts(accountsData.accounts)
  }

  if(!(transactionTypeCompleted &&
      originDestinyCompleted)){
    return <LayoutSplashScreen />
  }

  const { types } = transactionType
  const { originDestiny } = originDestinyData

  return (
    <>
      <Formik
      initialValues={initialValues}
      validationSchema={taxSchema}
      onSubmit={(values) => {
        if(edit){
          return saveTax(values)
        }else{
          return createTax(values);
        }
      }}
      >
      {({ handleSubmit, setFieldValue, values }) => (
        <>
          <Form className="form form-label-right">   
            <div className="form-group row">
              <div className="col-lg-3 mt-8">
                <GeneralSelector 
                  values={values}
                  valueName='idcurrency'
                  keyName='currency'
                  label='Moneda'
                  data={currencies}
                  setFieldValue={setFieldValue}
                />
              </div>
              <div className="col-lg-3 mt-8">
                <GeneralSelector 
                  values={values}
                  valueName='idcountry'
                  keyName='country'
                  label='Pais'
                  data={countries}
                  setFieldValue={setFieldValue}
                />
              </div>
              <div className="col-lg-3">
                <Field
                  name="tax"
                  component={Input}
                  placeholder="Impuesto"
                  label="Impuesto"
                />
              </div>
              <div className="col-lg-3">
                <Field
                  name="description"
                  component={Input}
                  placeholder="Descripción"
                  label="Descripción"
                />
              </div>
            </div>
            <div className="form-group row">
              <div className="col-lg-3">
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                  <ThemeProvider theme={defaultMaterialTheme}>
                    <KeyboardDatePicker
                      autoOk
                      fullWidth
                      size='small'
                      inputVariant="outlined"
                      label="Inicio"
                      format="dd/MM/yyyy"
                      value={values.date}
                      cancelLabel="cancelar"
                      onChange={date => setFieldValue("date",date)}
                      className="mt-8"
                    />
                  </ThemeProvider>
                </MuiPickersUtilsProvider>
              </div>
              <div className="col-lg-3">
                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                  <ThemeProvider theme={defaultMaterialTheme}>
                    <KeyboardDatePicker
                      autoOk
                      fullWidth
                      size='small'
                      inputVariant="outlined"
                      label="Fin"
                      format="dd/MM/yyyy"
                      value={values.expiration}
                      cancelLabel="cancelar"
                      onChange={date => setFieldValue("expiration",date)}
                      className="mt-8"
                    />
                  </ThemeProvider>
                </MuiPickersUtilsProvider>
              </div>
              <div className="col-lg-3">
                <Select 
                  name="originDestiny" 
                  label="Origen Destino"
                  value={values.originDestiny}
                  onChange={(e) => setFieldValue("originDestiny", e.target.value)}
                >
                  {originDestiny.map((originDestiny) => (
                    <option key={originDestiny.id} value={originDestiny.id}>
                      {originDestiny.originDestiny}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="col-lg-3 text-center">
                {edit ? (
                  <FormControlLabel
                    className="mt-5"
                    control={
                      <Switch 
                        checked={values.status === "0" ? false : true} 
                        onChange={(e) => setFieldValue("status", e.target.checked !== false ? "1" : "0")} 
                        name="status"
                      />
                    } 
                    label="Status"
                    labelPlacement="start" 
                  />
                  ):(
                  <FormControlLabel
                    className="mt-5"
                    control={
                      <Switch checked={false} name="status"/>
                    } 
                    label="Status"
                    labelPlacement="start" 
                  />
                  )
                }
              </div>
            </div>
            <FormLabel component="legend" className="mb-5">Tax When</FormLabel>
            <div className="form-group row">
              <div className="col-3">
                <FormControlLabel 
                  className="mt-5"
                  control={<Switch 
                    checked={values.transaction === "0" ? false: true } 
                    onChange={(e) => {
                      setFieldValue("transaction", e.target.checked === false? "0": "1")
                      setFieldValue("fix", values.fix === "0"? "1": "0")
                    }} 
                    name="transaction"
                  />} 
                  label="Transacción"
                  labelPlacement="start" 
                />
              </div>
              <div className="col-3">
                <FormControlLabel
                  className="mt-5" 
                  control={<Switch 
                    checked={values.fix === "0" ? false: true } 
                    onChange={(e) => {
                      setFieldValue("fix", e.target.checked === false? "0": "1")
                      setFieldValue("transaction", values.transaction === "0"? "1": "0")
                    }}
                    name="fix"
                  />} 
                  label="Fijo"
                  labelPlacement="start"
                />
              </div>
            </div>
            <FormLabel component="legend" className="mb-5">Tax Value</FormLabel>
            <div className="form-group row"> 
              <div className="col-lg-3">
                <Field
                  type="number"
                  name="value"
                  component={Input}
                  placeholder="Valor del impuesto"
                  label="Valor del impuesto"
                /> 
              </div>
              <div className="col-lg-3"> 
                <Field
                  type="number"
                  name="baseMin"
                  component={Input}
                  placeholder="Base (min)"
                  label="Base (min)"
                />
              </div>
              <div className="col-lg-3">
                <Field
                  type="number"
                  name="baseMax"
                  component={Input}
                  placeholder="Base (max)"
                  label="Base (max)"
                /> 
              </div>
            </div>
            <FormLabel component="legend" className="mb-5">Tax Value Type</FormLabel>
            <div className="form-group row"> 
              <div className="col-lg-3">
                <Field
                  name="type"
                  component={Input}
                  placeholder="Tipo"
                  label="Tipo"
                />
              </div>
              <div className="col-lg-3"> 
                <Field
                  type="number"
                  name="frecuency"
                  component={Input}
                  placeholder="Frecuencia"
                  label="Frecuencia"
                />
              </div>
              <div className="col-3 text-center">
                <FormControlLabel 
                  className="mt-5"
                  control={<Switch 
                    checked={values.trxType === "0" ? false: true } 
                    onChange={(e) => {
                      setFieldValue("trxType", e.target.checked === false? "0": "1")
                      setFieldValue("amountType", values.amountType === "0"? "1": "0")
                    }} 
                    name="trxType"
                  />} 
                  label="Transacción"
                  labelPlacement="start" 
                />
              </div>
              <div className="col-3 text-center">
                <FormControlLabel
                  className="mt-5" 
                  control={<Switch 
                    checked={values.amountType === "0" ? false: true } 
                    onChange={(e) => {
                      setFieldValue("amountType", e.target.checked === false? "0": "1")
                      setFieldValue("trxType", values.trxType === "0"? "1": "0")
                    }}
                    name="amountType"
                  />} 
                  label="Fijo"
                  labelPlacement="start"
                />
              </div>
            </div>
            <FormLabel component="legend" className="mb-5">Tax Value Calc</FormLabel>
            <div className="form-group row">
              <div className="col-lg-3"> 
                <Field
                  name="calc"
                  component={Input}
                  placeholder="Calc"
                  label="Calc"
                />
              </div>
              <div className="col-lg-3"> 
                <Field
                  name="formula"
                  component={Input}
                  placeholder="Fórmula"
                  label="Fórmula"
                />
              </div>    
            </div>
            <FormLabel component="legend" className="mb-5">Tax Collector</FormLabel>
            <div className="form-group row">
              <div className="col-lg-4">
                <Autocomplete
                  style={{marginTop: "25px"}}
                  disablePortal
                  size="small"
                  name="idaccount"
                  options={accountsData}
                  getOptionLabel={option => option.alias.trim()}
                  getOptionSelected={(option, value) => option.id === value.id}
                  onChange={(e,newValue) => {
                    setFieldValue("idaccount", newValue !== null ?  newValue.id : "")
                  }}
                  renderInput={(params) =>                  
                    <TextField {...params}
                      variant="outlined"
                      label="Cuenta"
                      onChange={(e) => {
                        if(e.target.value.length === 3){
                          searchAccounts(e.target.value)
                        }
                      }}
                    />
                  }
                />
              </div>
              <div className="col-lg-4">
                <Select 
                  name="idTrxCollector" 
                  label="Trx Collector" 
                  value={values.idTrxCollector}
                  onChange={(e) => setFieldValue("idTrxCollector", e.target.value)}
                >
                  {types.map((trxType) => (
                    <option key={trxType.id} value={trxType.id}>
                      {trxType.types}
                    </option>
                  ))}
                </Select> 
              </div>
              <div className="col-lg-4">
                <Select 
                  name="idTrxDiscount" 
                  label="Discount" 
                  value={values.idTrxDiscount}
                  onChange={(e) => setFieldValue("idTrxDiscount", e.target.value)}
                >
                  {transactionType.types.map((trxType) => (
                    <option key={trxType.id} value={trxType.id}>
                      {trxType.types}
                    </option>
                  ))}
                </Select> 
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
  </>
  )
}
