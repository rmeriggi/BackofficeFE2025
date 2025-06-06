import React from 'react';
import { Formik } from "formik";
import propTypes from 'prop-types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import DateFnsUtils from '@date-io/date-fns'
import { ThemeProvider } from '@material-ui/styles';
import { useAllProducts } from '../../../Credits/Products/utils/apiHook';
import { useAllUsers } from '../../../../utils/apiHooks';
import {  getTransactions } from '../../../../utils/service'
import { setDatesValues } from "../../../../utils/validationDates"
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { LayoutSplashScreen } from '../../../../../_metronic/layout';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { colors, createMuiTheme, TextField, MenuItem} from '@material-ui/core';

const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: colors.indigo,
    },
});

const today = new Date()
const tomorrow = today.setDate(today.getDate() + 1)

const ListingFilter = ({ setCashin }) => {

    const isMounted = useIsMountedRef();
    const [productsData, productsCompleted] = useAllProducts(isMounted);
    const [managersData, managersCompleted] = useAllUsers(isMounted);


    if (!(productsCompleted && managersCompleted)) {
        return <LayoutSplashScreen />
    }
    
    const { products } = productsData;
    const { users } = managersData;

    const newListing = async(values) => {
        const fromDate = format(values.fromDate , "yyyy-MM-dd")
        const toDate = format(values.toDate, "yyyy-MM-dd")
        const type = Number(values.product)

        const dataValues = {
            fromDate,
            toDate,
            type
        }

        const responseTransactions = await getTransactions(dataValues)
        setCashin(responseTransactions) 
    }

    return (
        <>
            <Formik
                initialValues={{
                    product: products[0].id,
                    manager: users[0].id,
                    fromDate: new Date(),
                    toDate: new Date()
                }}
                onSubmit={(values) => {
                   return newListing(values);
                }}
            >
                {({
                      values,
                      handleSubmit,
                      setFieldValue,
                      isSubmitting
                  }) => (
                    <form onSubmit={handleSubmit} className="form form-label-center">
                        <div className="row">
                            <div className="col-3 mt-3">
                            <ThemeProvider theme={defaultMaterialTheme}>
                                <TextField
                                    className="w-100"
                                    select
                                    size="small"
                                    label="Producto"
                                    variant="outlined"
                                    value={values.product}
                                    onChange={(e) => setFieldValue("product", e.target.value)}
                                    >
                                    {products.map((product) => (
                                        <MenuItem key={product.id} value={product.id}>
                                        {product.product}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </ThemeProvider >
                            </div>
                             <div className="col-3 mt-3">
                            <ThemeProvider theme={defaultMaterialTheme}>
                                <TextField
                                    className="w-100"
                                    select
                                    size="small"
                                    label="Gestor"
                                    variant="outlined"
                                    value={values.manager}
                                    onChange={(e) => setFieldValue("manager", e.target.value)}
                                    >
                                    {users.map((manager) => (
                                        <MenuItem key={manager.id} value={manager.id}>
                                        {manager.user}
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
                                            if(date instanceof Date && !isNaN(date.valueOf()) && date <= tomorrow ){setDatesValues(date, values.toDate, setFieldValue, "from")}
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
                                        onChange={date => {
                                            if(date instanceof Date && !isNaN(date.valueOf()) && date <= tomorrow ){
                                                setDatesValues(date, values.fromDate, setFieldValue, "to")}
                                            }}
                                        className="mt-3"
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

ListingFilter.defaultProps = {
    disabled: false,
}

ListingFilter.propTypes = {
    disabled: propTypes.bool
}

export default ListingFilter;