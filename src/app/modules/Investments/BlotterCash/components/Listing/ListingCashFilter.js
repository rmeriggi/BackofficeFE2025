import React, { useState} from 'react';
import { Formik } from "formik";
import {isEqual} from "lodash";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import propTypes from 'prop-types';
import { useListingTableContext } from './ListingTableContext';
import { getAllCashMoney } from '../../../../../_redux/blotter/cashMoneyActions';
import { colors, createMuiTheme, MenuItem, ThemeProvider } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import { es } from 'date-fns/locale';
import { useFetchCombos } from "../../../../../hooks";
import { getDeadline } from "../../../../../_redux/combos/combosActions";
import { GeneralSelector } from "../../../../../components/Fields/GeneralSelector";


const prepareFilter = (queryParams, values) => {
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.mercado = values
    newQueryParams.filter = filter;
    return newQueryParams;
};

const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: colors.indigo,
    },
  });



const ListingCashFilter = ({disabled}) => {
    const [refresh, setRefresh] = useState(false) 
    const [deadline] = useFetchCombos('deadlines', getDeadline) 
    const [from, setFrom] = useState('')
    const [DeadLine, setDeadLine]= useState(0)
    const {
        queryParamsTable,
        setQueryParamsTable,
        setPageNumber
    } = useListingTableContext();
    
    const applyFilter = (values) => {
        const newQueryParams = prepareFilter(queryParamsTable, values);
        if (!isEqual(newQueryParams, queryParamsTable)) {
            setPageNumber(1)
            newQueryParams.pageNumber = 1;
            setQueryParamsTable(newQueryParams);
        }
    };
    const dispatch = useDispatch()

    async function newListing(values) {         
        const from=values.from.toISOString().substring(0, 10) + "T00:00:00.000Z"
        const to=values.from.toISOString().substring(0, 10) + "T23:59:59.000Z"
        const deadLine=values.deadline      
        setRefresh(true)            
        await dispatch(getAllCashMoney( false , from, to, deadLine))
        setRefresh(false)            
    }

    async function refreshListing() { 
        const desde = from ? from: new Date();            
        const inicial=desde.toISOString().substring(0, 10) + "T00:00:00.000Z"
        const final=desde.toISOString().substring(0, 10) + "T23:59:59.000Z"       
        setRefresh(true)            
        await dispatch(getAllCashMoney( false , inicial, final, DeadLine))
        setRefresh(false)                
    }   


    return (
        <>
            <Formik
                initialValues={{
                    searchText: "",
                    from:new Date(),
                    deadline:1
                }}
                onSubmit={(values) => {
                   return newListing(values);
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
                        <div className="row">
                            <div className="col-5">
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
                            <div className="col-4">
                            <MuiPickersUtilsProvider utils={DateFnsUtils} locale={es}> 
                                    <ThemeProvider theme={defaultMaterialTheme}>
                                    <KeyboardDatePicker
                                        autoOk
                                        size="small"
                                        inputVariant="outlined"
                                        label="Fecha"
                                        format="dd/MM/yyyy"
                                        value={values.from}
                                        cancelLabel="cancelar"
                                        onChange={date => {
                                            setFieldValue("from", date);
                                            setFrom(date)
                                            handleSubmit()
                                        }}
                                    />
                                    </ThemeProvider>
                                </MuiPickersUtilsProvider>
                            </div>
                            <div className="col-3">
                                <GeneralSelector 
                                    values={values}
                                    valueName='deadline'
                                    keyName='deadline'
                                    label='Plazo'
                                    data={deadline}
                                    setFieldValue={setFieldValue}
                                    insideOnchange={(e) => {
                                        handleChange(e);
                                        setDeadLine(e.target.value)
                                        handleSubmit()
                                }}
                                    extraMenuItem= {
                                    <MenuItem key={0} value={0}>
                                        Todas
                                    </MenuItem>
                                    }
                                />
                            </div>                            
                        </div>
                    </form>
                )}
            </Formik>
            <div className="symbol-label ml-7" onClick={() => refreshListing()}>
                {refresh ? <CircularProgress size={15} color="secondary"/> :
                <i className="flaticon-refresh icon-xl text-primary" role="button"></i>}
            </div>      
        </>
    );
}

ListingCashFilter.defaultProps = {
    disabled: false,
}

ListingCashFilter.propTypes = {
    disabled: propTypes.bool
}

export default ListingCashFilter;