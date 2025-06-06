import React from 'react';
import { Formik } from "formik";
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, TextField, colors, MenuItem } from '@material-ui/core';
import { getAll } from '../../utils/service';
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

const ListingFilterSelects = (props) => {

    const getListProducts = async(values) => {
        const response = await getAll(values)
        props.setData(response)
        props.disableLoading()
    }

    return (
        <>
            <Formik
                initialValues={{
                    idState: 0,
                    idProduct: 0
                }}
                onSubmit={(values) => {
                    props.enableLoading()
                    getListProducts(values);
                }}
            >
                {({
                      values,
                      handleSubmit,
                      handleBlur,
                      setFieldValue,
                  }) => (
                    <form onSubmit={handleSubmit} className="form form-label-right d-flex align-items-end">
                        <div className="form group row justify-content-end">
                            <div className="col-lg-3 px-1">
                            <TextField
                                    select
                                    size="small"
                                    label="Estado"
                                    fullWidth
                                    variant="outlined"
                                    value={values.idState}
                                    onChange={(e) => {
                                    setFieldValue("idState", e.target.value)
                                    handleSubmit()
                                    }}
                                    >
                                    <MenuItem key={0} value={0}>
                                        Todas
                                    </MenuItem>
                                    {props.states.map((c) => (
                                    <MenuItem key={c.id} value={c.id}>
                                    {c.state}
                                    </MenuItem>
                                    ))}  
                            </TextField> 
                            </div>
                            <div className="col-lg-3 px-1">
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <TextField
                                        select
                                        fullWidth
                                        size="small"
                                        label="Productos"
                                        variant="outlined"
                                        value={values.idProduct}
                                        onChange={(e) => {
                                            setFieldValue("idProduct", e.target.value)
                                            handleSubmit()
                                        }}
                                        >
                                            <MenuItem key={0} value={0}>
                                                Todos
                                            </MenuItem>
                                        {props.products.map((e) => (
                                            <MenuItem key={e.id} value={e.id}>
                                            {e.product}
                                            </MenuItem>
                                        ))} 
                                    </TextField>
                                </ThemeProvider >
                            </div>
                            <div className="col-lg-3 px-1">
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
                            <div className="col-lg-3 px-1">
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
                        </div>
                    </form>
                )}
            </Formik>
        </>
    );
}

export default ListingFilterSelects;