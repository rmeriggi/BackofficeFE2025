import React from 'react';
import { Formik, Form } from "formik"
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, MenuItem, TextField, colors, Button, CircularProgress } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { setDatesValues } from "../../../../utils/validationDates";
import DateFnsUtils from '@date-io/date-fns'
import { es } from 'date-fns/locale';
import { getDashboard } from "../utils/service"
import { useSubheader } from '../../../../../_metronic/layout';
import { dashboardAdapter } from '../adapters/dashboardAdapter';

const defaultMaterialTheme = createMuiTheme({
  palette: {
    primary: colors.indigo,
  },
});

export const Filters = ({products, groups, setValues, values, setDashboardInfo, clients}) => {

  const subheader = useSubheader()
  const get = async(values) => {
    try {
      const response = await getDashboard(values)
      const dashboardFormatted = dashboardAdapter(response.dashboard)
      setDashboardInfo(dashboardFormatted)
      subheader.handleClose()
    } catch (error) {
      setDashboardInfo({})
    }
  }

  return (
    <Formik
      initialValues={values}
      onSubmit={(values) => {
       return get(values)
      }}
    >
    {({setFieldValue, values, isSubmitting, handleSubmit }) => (
      <Form className="form-label-right">   
        <div className="row justify-content-center">
          <div className="col">
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
              <ThemeProvider theme={defaultMaterialTheme}>
                <KeyboardDatePicker
                  autoOk
                  disableFuture
                  fullWidth
                  size="small"
                  inputVariant="outlined"
                  label="Fecha Desde"
                  format="dd/MM/yyyy"
                  value={values.fromDate}
                  cancelLabel="cancelar"
                  onChange={date => {
                    setDatesValues(date, values.toDate, setFieldValue, "from")
                  }}
                />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
          </div>
          <div className="col">                              
            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
              <ThemeProvider theme={defaultMaterialTheme}>
                <KeyboardDatePicker
                  autoOk
                  disableFuture
                  fullWidth
                  size="small"
                  inputVariant="outlined"
                  label="Fecha Desde"
                  format="dd/MM/yyyy"
                  value={values.fromDate}
                  cancelLabel="cancelar"
                  onChange={date =>{
                      setDatesValues(date, values.toDate, setFieldValue, "from")
                  }}
                />
              </ThemeProvider>
            </MuiPickersUtilsProvider>
          </div>
        </div>
        <div className="row justify-content-center mt-5">
          <div className="col">
            <ThemeProvider theme={defaultMaterialTheme}>
              <TextField
                  select
                  fullWidth
                  size="small"
                  label="Producto"
                  variant="outlined"
                  value={values.productId}
                  onChange={(e) => {
                    setFieldValue("productId", e.target.value)
                    const newValues = {
                      ...values,
                      productId: e.target.value
                    }
                    setValues(newValues)
                  }}
                  >
                    <MenuItem key={0} value={0}>
                      Todos
                    </MenuItem>
                  {products.map((e) => (
                    <MenuItem key={e.id} value={e.id}>
                      {e.product}
                    </MenuItem>
                  ))}
              </TextField>
            </ThemeProvider >
          </div>
          <div className="col">
            <ThemeProvider theme={defaultMaterialTheme}>
              <TextField
                select
                fullWidth
                size="small"
                label="Grupo"
                variant="outlined"
                value={values.accountId}
                onChange={(e) => {
                  setFieldValue("accountId", e.target.value)
                  const newValues = {
                    ...values,
                    accountId: e.target.value
                  }
                  setValues(newValues)
                }}
                >
                  <MenuItem key={0} value={0}>
                    Todos
                  </MenuItem>
                {groups.map((e) => (
                  <MenuItem key={e.id} value={e.id}>
                    {e.group}
                  </MenuItem>
                ))}
              </TextField>
            </ThemeProvider >
          </div>
          <div className="col">
            <ThemeProvider theme={defaultMaterialTheme}>
              <TextField
                select
                fullWidth
                size="small"
                label="Cliente"
                variant="outlined"
                value={values.clientId}
                onChange={(e) => {
                  setFieldValue("clientId", e.target.value)
                  const newValues = {
                    ...values,
                    clientId: e.target.value
                  }
                  setValues(newValues)
                }}
                >
                  <MenuItem key={0} value={0}>
                    Todos
                  </MenuItem>
                {clients.map((e) => (
                  <MenuItem key={e.id} value={e.id}>
                    {e.client}
                  </MenuItem>
                ))}
              </TextField>
            </ThemeProvider >
          </div>
          <div className='col-2'>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              disabled={isSubmitting}
              onSubmit={() => handleSubmit()}
              endIcon={
                isSubmitting && <CircularProgress size={20} color="secondary"/>  
                }
              >
                Buscar
            </Button>
          </div>
        </div>
      </Form>
    )}
  </Formik>
  )
}