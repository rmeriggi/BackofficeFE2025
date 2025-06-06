/* eslint-disable eqeqeq */
import React, { useEffect, useState } from 'react';
import { Formik } from "formik";
import propTypes from 'prop-types';
import { isEqual } from "lodash";
import { useListingTableContext } from "./ListingTableContext";
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme, colors, Button } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { setDatesValues } from '../../../../../utils/validationDates';
import DateFnsUtils from '@date-io/date-fns';
import { es } from 'date-fns/locale';
import { DownloadArchive } from '../components/DownloadArchive';
import * as XLSX from 'xlsx';

const defaultMaterialTheme = createMuiTheme({
    palette: {
        primary: colors.indigo,
    },
});

const prepareFilter = (queryParams, values) => {
    const { searchText } = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.id = searchText;
    newQueryParams.filter = filter;
    return newQueryParams;
};

const ListingFilter = ({ disabled, data, setValues, values, openCreateModal }) => {
    const [report, setReport] = useState(data);

    useEffect(() => {
        setReport(data);
    }, [data]);

    const {
        queryParams,
        setQueryParams,
        setPageNumber,
    } = useListingTableContext();

    const applyFilter = (values) => {
        const newQueryParams = prepareFilter(queryParams, values);
        if (!isEqual(newQueryParams, queryParams)) {
            setPageNumber(1);
            newQueryParams.pageNumber = 1;
            setQueryParams(newQueryParams);
        }
    };

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const handleDownloadExcel = () => {
        if (!Array.isArray(report.asientos)) {
            console.error("Error: report.asientos no es un arreglo");
            return;
        }

        const visibleData = report.asientos.map(entry => ({
            'ID': entry.id,
            'Fecha': entry.date,
            'Descripción': entry.data.map(d => d.description).join(", "),
            'Debe': entry.data.map(d => d.debit).join(", "),
            'Haber': entry.data.map(d => d.credit).join(", "),
        }));

        const worksheet = XLSX.utils.json_to_sheet(visibleData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Asientos Contables');
        XLSX.writeFile(workbook, 'Asientos_Contables.xlsx');
    };

    return (
        <>
            <Formik
                initialValues={{
                    searchText: "",
                    fromDate: values.fromDate,
                    toDate: values.toDate
                }}
                onSubmit={(values) => {
                    applyFilter(values);
                }}
            >
                {({
                    values,
                    handleSubmit,
                    handleBlur,
                    setFieldValue,
                }) => (
                    <form onSubmit={handleSubmit} className="form form-label-right">
                        <div className="row justify-content-center">
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
                                                if (date instanceof Date && !isNaN(date.valueOf()) && date <= tomorrow) {
                                                    setDatesValues(date, values.toDate, setFieldValue, "from");
                                                    setValues({
                                                        ...values,
                                                        fromDate: date,
                                                        id_client: 1
                                                    });
                                                    handleSubmit();
                                                }
                                            }}
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
                                                if (date instanceof Date && !isNaN(date.valueOf()) && date <= tomorrow) {
                                                    setDatesValues(date, values.fromDate, setFieldValue, "to");
                                                    setValues({
                                                        ...values,
                                                        toDate: date,
                                                        id_client: 1
                                                    });
                                                    handleSubmit();
                                                }
                                            }}
                                        />
                                    </ThemeProvider>
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>
                    </form>
                )}
            </Formik>
            <Button
                variant="contained"
                color="secondary"
                className="ml-4"
                size="large"
                onClick={() => openCreateModal()}
            >
                Agregar
            </Button>
            <Button
                variant="contained"
                color="primary"
                className="ml-2"
                onClick={handleDownloadExcel}
            >
                Descargar Excel
            </Button>
            <DownloadArchive listing={report.asientos} data={values} name='Asientos Contables' />
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
