/* eslint-disable eqeqeq */
import React from 'react';
import { Formik } from "formik";
import {isEqual} from "lodash";
import { GeneralSelector } from '../Fields/GeneralSelector';
import { ClientStatusTitles } from '../../modules/Clients/Clients/context/ContextHelper';
import { colors, createMuiTheme, MenuItem, ThemeProvider } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import { es } from 'date-fns/locale';

const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: colors.indigo,
    },
  });

const prepareFilter = (queryParams, values) => {
    const { searchText, status, from, to } = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.name = searchText;
    filter.lastName = searchText;
    filter.email = searchText;
    filter.passport = searchText;
    filter.account = searchText;
    filter.status = status > 0 ? status : '';
    filter.from = from;
    filter.to = to;
    newQueryParams.filter = filter;
    return newQueryParams;
};

const ListingFilter = ({disabled, reportData, initialValuesFilters, contextValues, ...props}) => {

    const {
        placeholder
    } = props;

    const {
        queryParams,
        setQueryParams,
        setPageNumber,
    } = contextValues

    const statuses = ClientStatusTitles;
    const formatedStatus = statuses.map((status, index) => {
        return {
            id: index,
            status
        }
    });
    formatedStatus.shift();

    
    const applyFilter = (values) => {
        const newQueryParams = prepareFilter(queryParams, values);
        if (!isEqual(newQueryParams, queryParams)) {
            setPageNumber(1)
            newQueryParams.pageNumber = 1;
            setQueryParams(newQueryParams);
        }
    };
    
    
    return (
        <>
            <Formik
                initialValues={initialValuesFilters}
                onSubmit={(values) => {
                    applyFilter(values);
                }}
            >
                {({
                      values,
                      handleSubmit,
                      handleBlur,
                      handleChange,
                      setFieldValue,
                  }) => (
                    <form onSubmit={handleSubmit} className="form form-label-right">
                        <div className="row justify-content-end">
                            <div className="col" style={{width:'300px'}}>
                                <input
                                    type="text"
                                    className="form-control"
                                    name="searchText"
                                    placeholder={placeholder ? placeholder : 'Buscar'}
                                    disabled={disabled}
                                    onBlur={handleBlur}
                                    value={values.searchText}
                                    onChange={(e) => {
                                        setFieldValue("searchText", e.target.value);
                                        handleSubmit();
                                    }}
                                />
                            </div>
                            <div className="col">
                                <GeneralSelector 
                                    values={values}
                                    valueName='status'
                                    keyName='status'
                                    label='Estado'
                                    data={formatedStatus}
                                    setFieldValue={setFieldValue}
                                    insideOnchange={(e) => {
                                        handleChange(e);
                                        handleSubmit()
                                }}
                                    extraMenuItem= {
                                    <MenuItem key={0} value={0}>
                                        Todos
                                    </MenuItem>
                                    }
                                />
                            </div>
                            <div className="col text-center">
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                                    <ThemeProvider theme={defaultMaterialTheme}>
                                    <KeyboardDatePicker
                                        autoOk
                                        size="small"
                                        disableFuture
                                        inputVariant="outlined"
                                        label="Desde"
                                        format="dd/MM/yyyy"
                                        value={values.from}
                                        cancelLabel="cancelar"
                                        onChange={date => {
                                            setFieldValue("from",date)
                                            handleSubmit()
                                        }}
                                    />
                                    </ThemeProvider>
                                </MuiPickersUtilsProvider>
                            </div>
                            <div className="col text-center">
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                                    <ThemeProvider theme={defaultMaterialTheme}>
                                    <KeyboardDatePicker
                                        autoOk
                                        size="small"
                                        disableFuture
                                        inputVariant="outlined"
                                        label="Hasta"
                                        format="dd/MM/yyyy"
                                        value={values.to}
                                        cancelLabel="cancelar"
                                        onChange={date => {
                                            setFieldValue("to",date)
                                            handleSubmit()
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

export default ListingFilter;