import React from 'react';
import { Formik } from "formik";
import propTypes from 'prop-types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import DateFnsUtils from '@date-io/date-fns'
import { ThemeProvider } from '@material-ui/styles';
import { useAllTrx } from '../../../../../utils/apiHooks';
import { setDatesValues } from "../../../../../utils/validationDates"
import {  getTransactions } from '../../../../../utils/service'
import useIsMountedRef from '../../../../../hooks/useIsMountedRef';
import { LayoutSplashScreen } from '../../../../../../_metronic/layout';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { colors, createMuiTheme, TextField, MenuItem, Button, CircularProgress } from '@material-ui/core';

const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: colors.indigo,
    },
});

const today = new Date()
const tomorrow = today.setDate(today.getDate() + 1)
   
 
const ListingFilter = ({ setCashout }) => {

    const isMounted = useIsMountedRef()
    const [transactionType, transactionTypeCompleted] = useAllTrx(isMounted)

    if (!transactionTypeCompleted) {
        return <LayoutSplashScreen />;
    }
    const { types } = transactionType
    const creditsArray = types.filter(t => t.types.includes("Débito"))

    const newListing = async(values) => {
        const fromDate = format(values.fromDate , "yyyy-MM-dd")
        const toDate = format(values.toDate, "yyyy-MM-dd")
        const type = Number(values.trxType)

        const dataValues = {
            fromDate,
            toDate,
            type
        }

        const responseTransactions = await getTransactions(dataValues)
        setCashout(responseTransactions) 
    }

    return (
        <>
            <Formik
                initialValues={{
                    trxType: creditsArray[0].id,
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
                    <form onSubmit={handleSubmit} className="form form-label-right d-flex align-items-end">
                        <div className="form group row">
                            <div className="col-4 mt-3">
                            <ThemeProvider theme={defaultMaterialTheme}>
                                <TextField
                                    className="w-100"
                                    select
                                    size="small"
                                    label="Tipo de transacción"
                                    variant="outlined"
                                    value={values.trxType}
                                    onChange={(e) => setFieldValue("trxType", e.target.value)}
                                    >
                                    {creditsArray.map((trxType) => (
                                        <MenuItem key={trxType.id} value={trxType.id}>
                                        {trxType.types}
                                        </MenuItem>
                                    ))}
                                </TextField>
                            </ThemeProvider >
                            </div>
                            <div className="col-4">
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
                                                setDatesValues(date, values.toDate, setFieldValue, "from")
                                            }
                                        }}
                                        className="mt-3"
                                        />
                                    </ThemeProvider>
                                </MuiPickersUtilsProvider>
                            </div>
                            <div className="col-4">
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
                                            }
                                        }}
                                        className="mt-3"
                                        />
                                    </ThemeProvider>
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            className="ml-4"
                            size="large"
                            disabled={isSubmitting}
                            onSubmit={() => handleSubmit()}
                            endIcon={
                            isSubmitting && <CircularProgress size={20} color="secondary"/>  
                            }
                        >
                            Buscar
                        </Button>
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