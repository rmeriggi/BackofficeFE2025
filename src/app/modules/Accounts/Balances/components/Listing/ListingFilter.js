import React from 'react';
import { Formik } from "formik";
import { isEqual } from 'lodash';
import { es } from 'date-fns/locale';
import propTypes from 'prop-types';
import format from 'date-fns/format';
import { getDate, getYear } from 'date-fns';
import DateFnsUtils from '@date-io/date-fns'
import { ThemeProvider } from '@material-ui/styles';
import { getBalances, getSum } from '../../utils/service';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import { colors, createMuiTheme, Button, CircularProgress } from '@material-ui/core';
import {useListingTableContext} from "./ListingTableContext"
import { GeneralSelector } from '../../../../../components/Fields/GeneralSelector';

const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: colors.indigo,
    },
  });

const prepareFilter = (queryParams, values) => {
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.cuit = values;
    filter.cvu = values;
    filter.businessName = values;
    filter.account = values;
    newQueryParams.filter = filter;
    return newQueryParams;
};

const ListingFilter = ({ setBalances, setSum, disabled, setNameExcel, currencies, entities}) => {

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

    const newListing = async(values) => {

        const year = getYear(values.date)
        const month = Number(format(values.date, "MM"))
        const day = getDate(values.date)
        const idEntity = values.idEntity
        const idCurrency = values.idCurrency
        
        const date = {
            year,
            month,
            day,
            idEntity,
            idCurrency
        }

        const responseBalances = await getBalances(date)
        const responseSum = await getSum(date)

        setBalances(responseBalances)
        setSum(responseSum)
        setNameExcel(`Saldos hasta ${format(values.date, "dd-MM-yyyy")}`)   
    }

    const date = new Date()

    return (
        <>
            <Formik
                initialValues={{
                    date: date.setDate(date.getDate()-1),
                    searchText: "",
                    idCurrency:"2",
                    idEntity: "1"
                }}
                onSubmit={(values) => {
                   return newListing(values);
                }}
            >
                {({
                      values,
                      handleSubmit,
                      setFieldValue,
                      handleBlur,
                      isSubmitting
                  }) => (
                      
                    <form onSubmit={handleSubmit} className="form form-label-right d-flex align-items-end">
                        <div className="form group row">
                            <div className="col-lg-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="searchText"
                                    placeholder="Buscar"
                                    disabled={disabled}
                                    onBlur={handleBlur}
                                    value={values.searchText}
                                    onChange={(e) => {
                                        setFieldValue("searchText", e.target.value);
                                        applyFilter(e.target.value);
                                    }}
                                />
                            </div>
                            <div className="col-lg-3">
                                <GeneralSelector 
                                    values={values}
                                    valueName='idCurrency'
                                    keyName='currency'
                                    label='Moneda'
                                    data={currencies}
                                    setFieldValue={setFieldValue}
                                />
                            </div>
                            <div className="col-lg-3">
                                <GeneralSelector 
                                    values={values}
                                    valueName='idEntity'
                                    keyName='entity'
                                    label='Entidad'
                                    data={entities}
                                    setFieldValue={setFieldValue}
                                />
                            </div>
                            <div className="col-lg-3">
                                <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                                    <ThemeProvider theme={defaultMaterialTheme}>
                                        <KeyboardDatePicker
                                        autoOk
                                        disableFuture
                                        size="small"
                                        inputVariant="outlined"
                                        label="Fecha Hasta"
                                        format="dd/MM/yyyy"
                                        value={values.date}
                                        cancelLabel="cancelar"
                                        onChange={date => setFieldValue("date", date)}
                                        />
                                    </ThemeProvider>
                                </MuiPickersUtilsProvider>
                            </div>
                        </div>
                        <Button
                            variant="contained"
                            color="secondary"
                            type="submit"
                            className="ml-2"
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