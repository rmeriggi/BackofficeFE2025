import React from 'react';
import { es } from 'date-fns/locale';
import { Formik, Form } from "formik"
import DateFnsUtils from '@date-io/date-fns'
import { ThemeProvider } from '@material-ui/styles';
import {getDashboardInfo} from '../utils/service'
import {setDatesValues} from '../../../../utils/validationDates'
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import { createMuiTheme, MenuItem, TextField, colors, Button, CircularProgress } from '@material-ui/core';
import { GeneralSelector } from '../../../../components/Fields/GeneralSelector';

const defaultMaterialTheme = createMuiTheme({
 palette: {
  primary: colors.indigo,
 },
});

const today = new Date()
const tomorrow = today.setDate(today.getDate() + 1)

export const Filters = ({currencies, entities, products, setValues, onHide, initial, setInitial}) => {
  
    const dashboard = async (values) => { 
    const newValues = {
      ...values,
      fromDate: values.fromDate.toISOString(),
      toDate: values.toDate.toISOString(),
    }
    const response = await getDashboardInfo(newValues);
    setValues(response)    
    onHide()
  }

 return (
  <div className="bg-white py-3 m-2 ">
   <Formik
    initialValues={initial}
    
    onSubmit={(values) => {
      return dashboard(values);
    }}
    >
    {({ handleSubmit, setFieldValue, values, isSubmitting }) => (
    <Form onSubmit={handleSubmit} className="form-label-right"> 
     <div className="row justify-content-center">
      <div className="col-2" style={{marginTop: '10px'}}>
        <GeneralSelector 
          values={initial}
          valueName='idCurrency'
          keyName='currency'
          label='Moneda'
          data={currencies}
          setFieldValue={setFieldValue}
          insideOnchange={(e) => {
            setInitial({
              ...initial,
              idCurrency : e.target.value
            })
          }}
          extraMenuItem= {
          <MenuItem key={0} value={0}>
            Todas
          </MenuItem>
          }
        />
      </div>
      <div className="col-2" style={{marginTop: '10px'}}>
        <GeneralSelector 
          values={initial}
          valueName='idEntity'
          keyName='entity'
          label='Entidad'
          data={entities}
          setFieldValue={setFieldValue}
          insideOnchange={(e) => {
            setInitial({
              ...initial,
              idEntity : e.target.value
            })
          }}
          extraMenuItem= {
          <MenuItem key={0} value={0}>
            Todas
          </MenuItem>
          }
        />
      </div>
      <div className="col-2" style={{marginTop: '10px'}}>
       <ThemeProvider theme={defaultMaterialTheme}>
        <TextField
          className="w-100"
          select
          size="small"
          label="Productos"
          variant="outlined"
          value={initial.idCreditProduct}
          onChange={(e) => {
           setFieldValue("idCreditProduct", e.target.value)
           setInitial({
              ...initial,
              idCreditProduct : e.target.value
            })
          }}
          >
            <MenuItem key={0} value={0}>
                 Todas
            </MenuItem>
          {products.map((e) => (
            <MenuItem key={e.id} value={e.id}>
            {e.product}
            </MenuItem>
          ))}
        </TextField>
       </ThemeProvider >
      </div>
      <div className="col-2">
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
          <ThemeProvider theme={defaultMaterialTheme}>
              <KeyboardDatePicker
                autoOk
                size="small"
                inputVariant="outlined"
                label="Fecha Desde"
                disableFuture
                format="dd/MM/yyyy"
                value={values.fromDate}
                cancelLabel="cancelar"
                onChange={date => {
                  if(date instanceof Date && !isNaN(date.valueOf()) && date <= tomorrow ){
                    setDatesValues(date, values.toDate, setFieldValue, "from")
                    setInitial({
                      ...initial,
                      fromDate : date
                    })
                }}}
                className="mt-3"
            />
          </ThemeProvider>
        </MuiPickersUtilsProvider>
      </div>
      <div className="col-2">
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
            <ThemeProvider theme={defaultMaterialTheme}>
              <KeyboardDatePicker
                autoOk
                disableFuture
                size="small"
                inputVariant="outlined"
                label="Fecha Hasta"
                format="dd/MM/yyyy"
                value={values.toDate}
                cancelLabel="cancelar"
                onChange={date => {
                  if(date instanceof Date && !isNaN(date.valueOf()) && date <= tomorrow ){
                    setDatesValues(date, values.fromDate, setFieldValue, "to")
                    setInitial({
                      ...initial,
                      toDate : date
                    })
                }}}
                className="mt-3"
              />
            </ThemeProvider>
          </MuiPickersUtilsProvider>          
          <Button
            variant="contained"
            style={{marginTop:'20px'}}
            color="secondary"
            type="submit"
            className="ml-2"
            size="large"
            disabled={isSubmitting}
            onSubmit={() => 
              handleSubmit()                    
            }                           
            endIcon={
              isSubmitting && <CircularProgress size={20} color="secondary"/>  
            }
          >
            Aplicar Filtros
        </Button>
        </div>
      </div>
    </Form>
   )}
  </Formik>
 </div>
 )
}