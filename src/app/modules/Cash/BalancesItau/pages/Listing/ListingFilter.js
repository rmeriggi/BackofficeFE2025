import React from 'react';
import { Formik } from "formik";
import {isEqual} from "lodash";
import { es } from 'date-fns/locale';
import DateFnsUtils from '@date-io/date-fns';
import { ThemeProvider } from '@material-ui/styles';
import { Button, CircularProgress, colors, createMuiTheme } from '@material-ui/core';
import { getExcel } from '../../../../../utils/exportExcel';
import {useListingTableContext} from "./ListingTableContext";
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { useHistory } from 'react-router-dom';
import { getBalancesItau } from '../../utils/service';
import { adapterBalancesItau } from '../../adapter/adapterBalancesItau';
import moment from 'moment';

const prepareFilter = (queryParams, values) => {
    const { searchText } = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.entity = searchText;
    newQueryParams.filter = filter;
    return newQueryParams;
};

const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: colors.indigo,
    },
});

const ListingFilter = ({disabled, data, setLoading, loading, setDataList, setDates}) => {
    
    const {
        queryParams,
        setQueryParams,
        setPageNumber,
        dates
    } = useListingTableContext();

    

    const history = useHistory()

    const applyFilter = (values) => {
        const newQueryParams = prepareFilter(queryParams, values);
        if (!isEqual(newQueryParams, queryParams)) {
            setPageNumber(1)
            newQueryParams.pageNumber = 1;
            setQueryParams(newQueryParams);
        }
    };

    const propertiesData = {
        header: ['ID','Entidad', "Fecha", 'Saldo'],
        properties:['id', 'entity', "date", 'amount'],
        array: data,
    }

    const handleClick = () => {
        history.push("/cash/balances-itau/create")
    }

    const getBalancesToList = async(values) => {
        const req = {
            ...values,
            fromDate : `${moment(values.fromDate).format('YYYY-MM-DD')}T00:00:00.000Z`
        }
        setDates(req)
        setLoading(true)
        try {
            const response = await getBalancesItau(req)
            const adaptedResponse = adapterBalancesItau(response.balancesItau)
            setDataList(adaptedResponse)
            setLoading(false)
        } catch (e) {
            setDataList([])
            setLoading(false)
        }
    }

    return (
        <> 
        <Formik
            initialValues={{
                searchText: "",
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
                    <div className="row">
                        <div className="col">
                            <input
                                type="text"
                                className="form-control"
                                name="searchText"
                                placeholder="Buscar por entidad"
                                disabled={disabled}
                                onBlur={handleBlur}
                                value={values.searchText}
                                onChange={(e) => {
                                    setFieldValue("searchText", e.target.value);
                                    handleSubmit();
                                }}
                            />
                        </div>
                    </div>
                </form>
            )}
        </Formik>
        <Formik
            initialValues={dates}
            onSubmit={(values) => {
                return getBalancesToList(values)
            }}
        >
            {({
                values,
                handleSubmit,
                setFieldValue,
            }) => (
                <form onSubmit={handleSubmit} className="form form-label-right d-flex align-items-end">
                    <div className="form group row justify-content-end align-items-center">
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
                                    value={moment(values.fromDate).add(3, 'hours')}
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
                        <div className="col-2"> 
                            <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            size="small"
                            disabled={loading}
                            onSubmit={() => handleSubmit()}
                            endIcon={
                                loading && <CircularProgress size={10} color="secondary"/>  
                                }
                            >
                                Buscar
                            </Button> 
                        </div>                                 
                    </div>
                </form>
            )} 
            </Formik>
            <div className='mx-3'>
                <Button
                    variant="contained"
                    color="secondary"
                    size="small"
                    onClick={() => handleClick()}
                    >
                        Crear
                </Button> 
            </div>
            {data.length > 0 ? 
                (
                <div className="symbol-label" onClick={() => getExcel(propertiesData, "Saldos itaú")}>
                    <i className="flaticon2-download icon-xl text-primary" role="button"></i>
                </div>
                ):(
                <div className="symbol-label">
                    <i className="flaticon2-download icon-xl text-secondary"></i>
                </div>
                )
            }
            
        </>
    );
}

export default ListingFilter;