import React, { useMemo, useState } from 'react';
import DateFnsUtils from '@date-io/date-fns'
import propTypes from 'prop-types';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { Formik } from "formik";
import { ThemeProvider } from '@material-ui/styles';
import { getExcel } from '../../../../../utils/exportExcel';
import { getTitleToExcel } from '../../../../../utils/getTitle';
import { formatAmountReport } from '../../../../..//utils/formatData';
import { setDatesValues } from "../../../../../utils/validationDates"
import transactionTypeCard from '../../__mocks__/transactionTypeCard';
import transactionsListMock from "../../__mocks__/transactionsListMock"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { colors, createMuiTheme, TextField, MenuItem, Button, CircularProgress } from '@material-ui/core';

const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: colors.indigo,
    },
});

const today = new Date()
const tomorrow = today.setDate(today.getDate() + 1)

const ListingFilter = ({ setTransactionsData }) => {

    const [report , setReport] = useState([])
    const [reportFormated , setReportFormated] = useState()
    const [nameExcel, setNameExcel] = useState("")

    useMemo(() => {
        const dataFormated = formatAmountReport(report)
        setReportFormated(dataFormated)
    }, [report])

    const propertiesData = {
        header: ['id','Fecha', 'Importe', 'Tipo de transacción'],
        properties:['id', 'date', 'amount', "type"] ,
        array: reportFormated,
    }

    const newListing = async(values) => {
        const fromDate = format(values.fromDate , "yyyy-MM-dd")
        const toDate = format(values.toDate, "yyyy-MM-dd")
        const type = Number(values.trxType)

        const dataValues = {
            fromDate,
            toDate,
            type
        }
    
        setTransactionsData(transactionsListMock)   
        setReport(transactionsListMock)
        
        getTitleToExcel(transactionTypeCard , dataValues, values, setNameExcel)
    }

    return (
        <> 
            <Formik
                initialValues={{
                    trxType: 1,
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
                                    {transactionTypeCard.map((trxType) => (
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
                                                setDatesValues(date, values.toDate, setFieldValue, "from")}
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
                                                setDatesValues(date, values.fromDate, setFieldValue, "to")}
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
            {report.length > 0 ? 
            (
            <div className="symbol-label ml-7" onClick={() => getExcel(propertiesData, nameExcel)}>
                <i className="flaticon2-download icon-xl text-primary" role="button"></i>
            </div>
            ):(
            <div className="symbol-label ml-7">
                <i className="flaticon2-download icon-xl text-secondary"></i>
            </div>
            )}
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