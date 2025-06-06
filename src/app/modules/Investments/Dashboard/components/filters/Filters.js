import React from 'react';
import { Formik, Form } from "formik"
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, MenuItem, TextField, colors } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { setDatesValues } from "../../../../../utils/validationDates";
import DateFnsUtils from '@date-io/date-fns'
import { es } from 'date-fns/locale';

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
});

const today = new Date()
const tomorrow = today.setDate(today.getDate() + 1)

export const Filters = ({currencies, entities, setValues, values}) => {

  return (
    <div className="bg-white rounded shadow-sm py-3 mb-1">
      <Formik
        initialValues={values}
        >
        {({setFieldValue, values }) => (
        <Form className="form-label-right">   
          <div className="row justify-content-center">
            <div className="col-lg-2">
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                 <ThemeProvider theme={defaultMaterialTheme}>
                     <KeyboardDatePicker
                     autoOk
                     disableFuture
                     size="small"
                     inputVariant="outlined"
                     label="Fecha Desde"
                     format="dd/MM/yyyy"
                     value={values.fromDate}
                     cancelLabel="cancelar"
                     onChange={date => {
                      if(date instanceof Date && !isNaN(date.valueOf()) && date <= tomorrow ){
                        setDatesValues(date, values.toDate, setFieldValue, "from")}
                      }}
                     />
                 </ThemeProvider>
             </MuiPickersUtilsProvider>
            </div>
            <div className="col-lg-2 mr-3">                              
              <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                 <ThemeProvider theme={defaultMaterialTheme}>
                     <KeyboardDatePicker
                     autoOk
                     disableFuture
                     size="small"
                     inputVariant="outlined"
                     label="Fecha Desde"
                     format="dd/MM/yyyy"
                     value={values.fromDate}
                     cancelLabel="cancelar"
                     onChange={date =>{
                        if(date instanceof Date && !isNaN(date.valueOf()) && date <= tomorrow ){
                          setDatesValues(date, values.toDate, setFieldValue, "from")}
                      }}
                     />
                 </ThemeProvider>
             </MuiPickersUtilsProvider>
            </div>
               <div className="col-lg-2 mr-3">
              <ThemeProvider theme={defaultMaterialTheme}>
                <TextField
                    className="w-100"
                    select
                    size="small"
                    label="Entidad"
                    variant="outlined"
                    value={values.idEntity}
                    onChange={(e) => {
                      setFieldValue("idEntity", e.target.value)
                      const newValues = {
                        ...values,
                        idEntity: e.target.value
                      }
                      setValues(newValues)
                  
                    }}
                    >
                    {entities.map((e) => (
                        <MenuItem key={e.id} value={e.id}>
                        {e.entity}
                        </MenuItem>
                    ))}
                </TextField>
              </ThemeProvider >
            </div>
            <div className="col-lg-2 mr-3">
              <ThemeProvider theme={defaultMaterialTheme}>
                <TextField
                    className="w-100"
                    select
                    size="small"
                    label="Entidad"
                    variant="outlined"
                    value={values.idEntity}
                    onChange={(e) => {
                      setFieldValue("idEntity", e.target.value)
                      const newValues = {
                        ...values,
                        idEntity: e.target.value
                      }
                      setValues(newValues)
                  
                    }}
                    >
                    {entities.map((e) => (
                        <MenuItem key={e.id} value={e.id}>
                        {e.entity}
                        </MenuItem>
                    ))}
                </TextField>
              </ThemeProvider >
            </div>
          </div>
        </Form>
      )}
    </Formik>
  </div>
  )
}