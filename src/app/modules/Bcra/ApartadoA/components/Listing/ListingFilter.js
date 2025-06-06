import React, { useState } from 'react';
import { Formik } from "formik";
import propTypes from 'prop-types';
import { es } from 'date-fns/locale';
import DateFnsUtils from '@date-io/date-fns'
import { getSectionA } from '../../utils/service';
import { ThemeProvider } from '@material-ui/styles';
import { getDate, getMonth, getYear } from 'date-fns';
import { getExcel } from '../../../../../utils/exportExcel';
import { getScreenTitleToExcel } from '../../../../../utils/getTitle';
import { setDatesValues } from "../../../../../utils/validationDates"
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { colors, createMuiTheme, Button, CircularProgress } from '@material-ui/core';

const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: colors.indigo,
    },
});

const today = new Date()
const tomorrow = today.setDate(today.getDate() + 1)

const ListingFilter = ({ setSectionAList, propertiesData }) => {

    const [nameExcel, setNameExcel] = useState()

    const newListing = async(values) => {

        const fromDay = getDate(values.fromDate)
        const fromYear = getYear(values.fromDate)
        const fromMonth = getMonth(values.fromDate) + 1
        const toYear = getYear(values.toDate)
        const toMonth = getMonth(values.toDate) + 1
        const toDay = getDate(values.toDate)

        const dataValues = {
            fromYear,
            fromMonth,
            fromDay,
            toYear,
            toMonth,
            toDay,
        }

        const responseSectionA = await getSectionA(dataValues)
        setSectionAList(responseSectionA)
        getScreenTitleToExcel("Apartado A", setNameExcel, values)
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
                                                setDatesValues(date, values.toDate, setFieldValue, "from")}
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
            {propertiesData.array?.length > 0 ? 
            (
            <div className="symbol-label ml-7 mt-4" onClick={() => getExcel(propertiesData, nameExcel)}>
                <i className="flaticon2-download icon-xl text-primary" role="button"></i>
            </div>
            ):(
            <div className="symbol-label ml-7 mt-4">
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