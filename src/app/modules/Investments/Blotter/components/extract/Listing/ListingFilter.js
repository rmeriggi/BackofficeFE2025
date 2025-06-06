import React from 'react';
import { Formik } from "formik";
import { format, getDate, getYear } from 'date-fns';
import propTypes from 'prop-types';
import { es } from 'date-fns/locale';
import DateFnsUtils from '@date-io/date-fns'
import { ThemeProvider } from '@material-ui/styles';
import { getExtract, getExtractBalances } from '../../../utils/service';
import { setDatesValues } from '../../../../../../utils/validationDates';
import { getScreenTitleToExcel } from '../../../../../../utils/getTitle';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { colors, createMuiTheme, Button, CircularProgress } from '@material-ui/core';
import moment from 'moment';

const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: colors.indigo,
    },
});
 
const today = new Date()
const tomorrow = today.setDate(today.getDate() + 1)

const ListingFilter = ({ setExtracts, setBalances, setDate, idAccount, setNameExcel }) => {

    const newListing = async(values) => {
        const fromDayBefore = moment(values.fromDate).subtract(1, 'day')
        const fromYear = getYear(new Date(fromDayBefore))
        const fromMonth = Number(format(new Date(fromDayBefore), "MM"))
        const fromDay = getDate(new Date(fromDayBefore))
        const toYear = getYear(values.toDate)
        const toMonth = Number(format(values.toDate, "MM"))
        const toDay = getDate(values.toDate)

        const dataValuestToSum = {
            fromYear,
            fromMonth,
            fromDay,
            toYear,
            toMonth,
            toDay
        }

        const responseSum = await getExtractBalances(idAccount, dataValuestToSum)
        const {balancesAccounts} = responseSum

        if(balancesAccounts.initialBalance || balancesAccounts.initialBalance === 0){
            const dataValuesToExtract = {
                fromDate: format(values.fromDate, "yyyy-MM-dd"),
                toDate: format(values.toDate, "yyyy-MM-dd"),
                amount: balancesAccounts.initialBalance
            }

            const responseTransactions = await getExtract(idAccount,dataValuesToExtract)
            if(responseTransactions.extract?.length === 0){
                setExtracts({extract: []})
                setDate(values.toDate)
                setBalances(balancesAccounts)
            }else{
                setExtracts(responseTransactions)
                setDate(values.toDate)
                setBalances(balancesAccounts)
                getScreenTitleToExcel("Extracto", setNameExcel, values)
            }
        }else{
            setExtracts({extract: []})
            setBalances({balancesAccounts: {}})
        }
         
    }

    return (
        <>
            <Formik
                initialValues={{
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
                            <div className="col-6">
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
                            <div className="col-6">
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