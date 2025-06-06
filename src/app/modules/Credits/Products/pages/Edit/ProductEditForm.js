import React from "react";
import { es } from "date-fns/locale";
import { FormLabel } from "react-bootstrap";
import DateFnsUtils from '@date-io/date-fns'
import { Field } from "formik";
import { ThemeProvider } from "@material-ui/styles";
import { useEditContext } from "./Context/EditContext";
import { colors,InputAdornment } from "@material-ui/core";
import { createMuiTheme, FormControlLabel, Switch } from "@material-ui/core";
import { Input, Select } from "../../../../../../_metronic/_partials/controls";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import { EDIT_PRODUCT } from "./Context/actions";
import moment from "moment";
import { GeneralSelector } from "../../../../../components/Fields/GeneralSelector";

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
});

export function ProductEditForm({edit, setFieldValue, values, handleChange}) {

  const {
    countriesData, 
    currenciesData, 
    entitiesData, 
    frequenciesData,
    trxTypeData,
    creditsDestiny,
    dispatch
  } = useEditContext()

  const {frequencies} = frequenciesData
  const {types} = trxTypeData
  const {creditDestiny} = creditsDestiny

  const creditsTypes = types.filter(t => t.types.includes("Crédito"))
  const debitsTypes = types.filter(t => t.types.includes("Débito"))

  const dispatchFields = (value) => {
    dispatch({
      type: EDIT_PRODUCT,
      product: value
    })
  }

  return (
    <>
      <div className="form-group row">
        <div className="col-lg-3 mt-8">
          <GeneralSelector 
            values={values}
            valueName='idEntity'
            keyName='entity'
            label='Entidad'
            data={entitiesData}
            setFieldValue={setFieldValue}
            insideOnchange={(e) => {
              dispatchFields({idEntity: e.target.value})
              handleChange(e);
            }}
          /> 
        </div>
        <div className="col-lg-3 mt-8"> 
          <GeneralSelector 
            values={values}
            valueName='idCountry'
            keyName='country'
            label='Pais'
            data={countriesData}
            setFieldValue={setFieldValue}
            insideOnchange={(e) => {
              dispatchFields({idCountry :e.target.value})
              handleChange(e);
            }}
          /> 
        </div>
        <div className="col-lg-3 mt-8">
          <GeneralSelector 
            values={values}
            valueName='idCurrency'
            keyName='currency'
            label='Moneda'
            data={currenciesData}
            setFieldValue={setFieldValue}
            insideOnchange={(e) => {
              dispatchFields({idCurrency: e.target.value})
              handleChange(e);
            }}
          /> 
        </div>
        <div className="col-lg-3">
          <Field
            name="product"
            component={Input}
            placeholder="Producto"
            label="Producto"
            onChange={(e) => {
              handleChange(e)
              dispatchFields({product :e.target.value})
            }}
          />
        </div>  
      </div>
      <div className="form-group row">
        <div className="col-lg-3">
          <Field
            name="investment"
            component={Input}
            placeholder="Capital"
            label="Capital"
            onChange={(e) => {
              handleChange(e)
              dispatchFields({investment :e.target.value})
            }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </div>
        <div className="col-lg-3">
          <Field
            name="expenses"
            component={Input}
            placeholder="Gastos administrativos"
            label="Gastos administrativos"
            onChange={(e) => {
              handleChange(e)
              dispatchFields({expenses: e.target.value})
            }}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
        </div>
        <div className="col-lg-3">
          <Field
            name="taxes"
            component={Input}
            placeholder="Impuestos"
            label="Impuestos"
            onChange={(e) => {
              handleChange(e)
              dispatchFields({taxes :e.target.value})
            }}
            startAdornment={<InputAdornment position="start">%</InputAdornment>}
          /> 
        </div>
        <div className="col-lg-3">
          <Field
            name="punitive"
            component={Input}
            placeholder="Punitorios"
            label="Punitorios"
            onChange={(e) => {
              handleChange(e)
              dispatchFields({punitive :e.target.value})
            }}
            startAdornment={<InputAdornment position="start">%</InputAdornment>}
          /> 

        </div>
      </div>
      <div className="form-group row">
        <div className="col row">
          <FormLabel component="legend" className="col-12 mb-2 text-center">Vigencia</FormLabel>
          <div className="col-6">
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
              <ThemeProvider theme={defaultMaterialTheme}>
                <KeyboardDatePicker
                  name="date"
                  autoOk
                  fullWidth
                  inputVariant="outlined"
                  size="small"
                  label="Desde"
                  format="dd/MM/yyyy"
                  value={values.date}
                  cancelLabel="cancelar"
                  onChange={date =>{
                      setFieldValue("date", date)
                      if(moment(date).isValid()){
                        const fromDate = date.toISOString()
                        dispatchFields({date : fromDate})
                      }    
                  }}
                />
                </ThemeProvider>
            </MuiPickersUtilsProvider>
          </div>
          <div className="col-6">
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
              <ThemeProvider theme={defaultMaterialTheme}>
                <KeyboardDatePicker
                  autoOk
                  fullWidth
                  size="small"
                  inputVariant="outlined"
                  label="Hasta"
                  format="dd/MM/yyyy"
                  value={values.expiration}
                  cancelLabel="cancelar"
                  onChange={date => {
                    setFieldValue("expiration",date)
                    if(moment(date).isValid()){
                      const expiration = date.toISOString()
                      dispatchFields({expiration})
                    } 
                    
                  }}
                />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
          </div>
        </div>
        <div className="col-lg-3">
          <Field
            name="expirationDay"
            component={Input}
            placeholder="Día de vencimiento"
            label="Día de vencimiento"
            onChange={(e) => {
              handleChange(e)
              dispatchFields({expirationDay :e.target.value})
            }}
          />
        </div>
        <div className="col-lg-3">
          <Field
            name="cutDay"
            component={Input}
            placeholder="Día de corte cartera"
            label="Día de corte cartera"
            onChange={(e) => {
              handleChange(e)
              dispatchFields({cutDay: e.target.value})
            }}
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-lg-3">
          <Field
            name="freeDay"
            component={Input}
            placeholder="Periodo de gracia (días)"
            label="Periodo de gracia (días)"
            onChange={(e) => {
              handleChange(e)
              dispatchFields({freeDay: e.target.value})
            }}
          />
        </div>
        <div className="col-lg-3">
          <Field
            name="CFT"
            component={Input}
            placeholder="CFT"
            label="CFT"
            startAdornment={<InputAdornment position="start">%</InputAdornment>}
            onChange={(e) => {
              handleChange(e)
              dispatchFields({CFT :e.target.value})
            }}
          />
        </div>
        <div className="col-lg-3">
          <Field
            name="TNA"
            component={Input}
            placeholder="TNA"
            label="TNA"
            startAdornment={<InputAdornment position="start">%</InputAdornment>}
            onChange={(e) => {
              handleChange(e)
              dispatchFields({TNA :e.target.value})
            }}
          />
        </div>
        <div className="col-lg-3">
          <Field
            name="TEA"
            component={Input}
            placeholder="TEA"
            label="TEA"
            startAdornment={<InputAdornment position="start">%</InputAdornment>}
            onChange={(e) => {
              handleChange(e)
              dispatchFields({TEA :e.target.value})
            }}
          />
        </div>
      </div>
      <div className="form-group row">
        <div className="col-lg-3">
          <Field
            name="quota"
            component={Input}
            placeholder="Cupo"
            label="Cupo"
            onChange={(e) => {
              handleChange(e)
              dispatchFields({quota :e.target.value})
            }}
          />
        </div>
        <div className="col-lg-3">
          <Select 
            name="idFrecuency" 
            label="Frecuencia" 
            value={values.idFrecuency}
            onChange={(e) => {
              handleChange(e)
              setFieldValue("idFrecuency", e.target.value)
              dispatchFields({freidFrecuencycuency :e.target.value})
            }}
          >
            {frequencies.map((frecuency) => (
              <option key={frecuency.id} value={frecuency.id}>
                {frecuency.frecuency}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-lg-3">
          <Select 
            name="idDebitTransaction" 
            label="Tipo débito transacción" 
            value={values.idDebitTransaction}
            onChange={(e) => {
              handleChange(e)
              setFieldValue("idDebitTransaction", e.target.value)
              dispatchFields({idDebitTransaction :e.target.value})
            }}
          >
            {debitsTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.types}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-lg-3">
          <Select 
            name="idCreditTransaction" 
            label="Tipo crédito transacción" 
            value={values.idCreditTransaction}
            onChange={(e) => {
              handleChange(e)
              setFieldValue("idCreditTransaction", e.target.value)
              dispatchFields({idCreditTransaction :e.target.value})
            }}
          >
            {creditsTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.types}
              </option>
            ))}
          </Select>
        </div>
      </div>
      <div className="form-group row">
        <div className="col-lg-3">
          <Select 
            name="idCreditDestiny" 
            label="Destino crédito" 
            value={values.idCreditDestiny}
            onChange={(e) => {
              handleChange(e)
              setFieldValue("idCreditDestiny", e.target.value)
              dispatchFields({idCreditDestiny : e.target.value})
            }}
          >
            {creditDestiny.map((c) => (
              <option key={c.id} value={c.id}>
                {c.creditDestiny}
              </option>
            ))}
          </Select>
        </div>
        <div className="col-lg-3">
          <FormControlLabel 
            control={<Switch 
              checked={values.automaticApproval === "1"? true : false} 
              onChange={(e) => {
                setFieldValue("automaticApproval", e.target.checked === true? "1" : "0")
                dispatchFields({automaticApproval : e.target.checked === true? "1" : "0"})
              }} 
            />} 
            label="Aprobación automática"
            labelPlacement="top"                
          />
        </div>
        <div className="col-lg-3">
          <FormControlLabel 
            control={<Switch 
              checked={values.automaticTransfer === "1"? true : false} 
              onChange={(e) => {
                setFieldValue("automaticTransfer", e.target.checked === true? "1" : "0")
                dispatchFields({automaticTransfer :  e.target.checked === true? "1" : "0"})
              }} 
            />} 
            label="Transferencia automática"
            labelPlacement="top"                
          />
        </div>
        <div className="col-lg-3 d-flex align-items-baseline">
          <FormControlLabel 
            control={<Switch 
              checked={values.status === "1"? true : false} 
              onChange={(e) => {
                setFieldValue("status", e.target.checked === true? "1" : "0")
                dispatchFields({status :e.target.checked === true? "1" : "0"})
              }} 
            />} 
            label="Status"
            labelPlacement="top"                
          />
          <div>
            {values.status === "1" ?
              (<span>On</span>):
              (<span>Off</span>)
            } 
          </div>
        </div>
      </div>
    </>
  );
}