import React from 'react';
import { Formik, Form } from "formik"
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, MenuItem, TextField, colors} from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import { es } from 'date-fns/locale';
import {setDatesValues} from '../../../../utils/validationDates'

const today = new Date()
const tomorrow = today.setDate(today.getDate() + 1)

const defaultMaterialTheme = createMuiTheme({
 palette: {
  primary: colors.indigo,
 },
});
export const DashboardFilters = ({currencies, entities, groups, modules, setValues}) => {

  const dashboard = async (values) => { 
      const newValues = {
        ...values,
        fromDate: values.fromDate.toISOString(),
        toDate: values.toDate.toISOString(),
      }
  } 
 return (
  <div className="bg-white py-3 m-2 ">
   <Formik
    initialValues={{
     idCurrency: currencies[0].id ,
     idEntity: entities[0].id ,
     idGroup: groups[0].id ,
     idModules: modules[0].id ,
     fromDate: new Date(),
     toDate: new Date(),
    }}
    onSubmit={(values) => {
      dashboard(values);
    }}
    >
    {({ handleSubmit, setFieldValue, values }) => (
    <Form className="form-label-right"> 
     <div className="row justify-content-center">
      <div className="col-3">
       <ThemeProvider theme={defaultMaterialTheme}>
        <TextField
         className="w-100"
         select
         size="small"
         label="Moneda"
         variant="outlined"
         value={values.idCurrency}
         onChange={(e) => {
          setFieldValue("idCurrency", e.target.value)
          handleSubmit()
         }}
         >
         {currencies.map((c) => (
           <MenuItem key={c.id} value={c.id}>
           {c.currency.trim()}
           </MenuItem>
         ))}
        </TextField>
       </ThemeProvider >
      </div>
      <div className="col-3">
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
           handleSubmit()
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
      <div className="col-3">
       <ThemeProvider theme={defaultMaterialTheme}>
        <TextField
          className="w-100"
          select
          size="small"
          label="Módulos"
          variant="outlined"
          value={values.idModules}
          onChange={(e) => {
           setFieldValue("idModules", e.target.value)
           handleSubmit()
          }}
          >
          {modules.map((e) => (
            <MenuItem key={e.id} value={e.id}>
            {e.module}
            </MenuItem>
          ))}
        </TextField>
       </ThemeProvider >
      </div>
      <div className="col-3">
       <ThemeProvider theme={defaultMaterialTheme}>
        <TextField
          className="w-100"
          select
          size="small"
          label="Grupos"
          variant="outlined"
          value={values.idGroup}
          onChange={(e) => {
           setFieldValue("idGroup", e.target.value)
           handleSubmit()
          }}
          >
          {groups.map((e) => (
            <MenuItem key={e.id} value={e.id}>
            {e.group}
            </MenuItem>
          ))}
        </TextField>
       </ThemeProvider >
      </div>
        <div className="col-3">
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
                    setDatesValues(date, values.fromDate, setFieldValue, "from")
                    setFieldValue("fromDate", date)
                    handleSubmit() 
                  }
                }}
                className="mt-3"
           />
         </ThemeProvider>
        </MuiPickersUtilsProvider>
    </div>
     <div className="col-3">
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
                onChange={date =>{
                  if(date instanceof Date && !isNaN(date.valueOf()) && date <= tomorrow ){
                    setDatesValues(date, values.toDate, setFieldValue, "to")
                    setFieldValue("toDate", date)
                    handleSubmit() 
                  }
                }}
                className="mt-3"
                />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
      </div>
     </div>
    </Form>
   )}
  </Formik>
 </div>
 )
}