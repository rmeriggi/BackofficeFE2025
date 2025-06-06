import React from 'react';
import { Formik } from "formik";
import {isEqual} from "lodash";
import propTypes from 'prop-types';
import { es } from 'date-fns/locale';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/styles';
import { Button, CircularProgress, colors, createMuiTheme } from '@material-ui/core';
import { getExcel } from '../../../../../utils/exportExcel';
import {useListingTableContext} from "./ListingTableContext";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const prepareFilter = (queryParams, values) => {
    const { searchText } = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.event = searchText;
    newQueryParams.filter = filter;
    return newQueryParams;
};

const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: colors.indigo,
    },
});

const ListingFilter = ({ movementsData, dates, setDates, setLoading, loading}) => {
    
    const {
        queryParams,
        setQueryParams,
        setPageNumber
    } = useListingTableContext();

    const applyFilter = (values) => {
        const newQueryParams = prepareFilter(queryParams, values);
        if (!isEqual(newQueryParams, queryParams)) {
            setPageNumber(1)
            newQueryParams.pageNumber = 1;
            setQueryParams(newQueryParams);
        }
    };

    const propertiesData = {
        header: ['ID','Fecha Movimiento', "Fecha Valor", 'Acontecimiento', 'Descripción Acontecimiento Corto', "Descripción Acontecimiento Largo", "Comprobante N°", "valor", "Indicador", "Clave Movimiento"],
        properties:['id', 'movementDate', "dateValue", 'event', "shortEventDescription", "longEventDescription", "ticketNumber", "value", "indicator", "movementPassword"],
        array: movementsData,
    }

    return (
        <> 

        <Formik
            initialValues={{
                fromDate: new Date(dates.fromDate),
                toDate: new Date(dates.toDate)
            }}
            onSubmit={(values) => {
                setLoading(true)
                applyFilter(values)
                setDates({
                    fromDate: values.fromDate.toISOString(),
                    toDate: values.toDate.toISOString()
                })
            }}
        >
            {({
                values,
                handleSubmit,
                setFieldValue,
            }) => (
                <form onSubmit={handleSubmit} className="form form-label-right d-flex align-items-end">
                    <div className="form group row justify-content-end">
                        <div className="col-4">
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <KeyboardDatePicker
                                    autoOk
                                    size="small"        
                                    id='fromDate'
                                    inputVariant="outlined"
                                    label="Fecha desde"
                                    format="dd/MM/yyyy"
                                    value={values.fromDate}
                                    cancelLabel="cancelar"
                                    onChange={date => setFieldValue("fromDate",date)                                            
                                }
                                />
                                </ThemeProvider>
                            </MuiPickersUtilsProvider>
                        </div>
                        <div className="col-4">
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                                <ThemeProvider theme={defaultMaterialTheme}>
                                    <KeyboardDatePicker
                                    autoOk
                                    size="small"
                                    disableFuture
                                    inputVariant="outlined"
                                    label="Fecha hasta"
                                    format="dd/MM/yyyy"
                                    value={values.toDate}
                                    cancelLabel="cancelar"
                                    onChange={date => setFieldValue("toDate", date)}
                                />
                                </ThemeProvider>
                            </MuiPickersUtilsProvider>
                        </div>                              
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            className="ml-5"
                            size="small"
                            disabled={loading}
                            onSubmit={() => handleSubmit()}
                            endIcon={
                                loading && <CircularProgress size={15} color="secondary"/>  
                                }
                            >
                                Buscar
                        </Button>                                
                    </div>
                </form>
            )} 
        </Formik>
        {movementsData.length > 0 ? 
            (
            <div className="symbol-label ml-7" onClick={() => getExcel(propertiesData, "Movimientos")}>
                <i className="flaticon2-download icon-xl text-primary" role="button"></i>
            </div>
            ):(
            <div className="symbol-label ml-7">
                <i className="flaticon2-download icon-xl text-secondary"></i>
            </div>
            )
        }
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