import React, { useState} from 'react';
import { Formik } from "formik";
import {isEqual} from "lodash";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import propTypes from 'prop-types';
import {useListingTableContext} from "./ListingTableContext";
import { getAllPnl } from '../../../../../_redux/blotter/pnlsActions';
import { colors, createMuiTheme, MenuItem, ThemeProvider } from '@material-ui/core';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns'
import { es } from 'date-fns/locale';
import { useFetchCombos } from "../../../../../hooks";
import { getCoins, getCounterparties } from "../../../../../_redux/combos/combosActions";
import { GeneralSelector } from "../../../../../components/Fields/GeneralSelector";

const prepareFilter = (queryParams, values) => {
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.name = values
    filter.passport = values
    newQueryParams.filter = filter;
    return newQueryParams;
};

const defaultMaterialTheme = createMuiTheme({
    palette: {
      primary: colors.indigo,
    },
  });



const ListingFilter = ({disabled, data, setShowCreateModal}) => {

    const [refresh, setRefresh] = useState(false) 
    // const [coins] = useFetchCombos('coins', getCoins)  
    // const [counterparties] = useFetchCombos('counterparties', getCounterparties)
    const [from, setFrom] = useState('')
    const [to, setTo] = useState('') 
    const [money, setMoney]= useState(0)
    const [comitente, setComitente]= useState(0)
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
    const dispatch = useDispatch()

    async function newListing(values) {         
        const from=values.from.toISOString().substring(0, 10) + "T00:00:00.000Z"
        const to=values.to.toISOString().substring(0, 10) + "T23:59:59.000Z"
        const idMoney=values.idMoney
        const idComitente=values.id
        if(values.from > values.to){
        }else{
        setRefresh(true)            
        await dispatch(getAllPnl( false , from, to, idMoney, idComitente))
        setRefresh(false)
        }            
    }

    async function refreshListing() { 
        const desde = from ? from: new Date();  
        const hasta = to ? to : new Date();          
        const inicial=desde.toISOString().substring(0, 10) + "T00:00:00.000Z"
        const final=hasta.toISOString().substring(0, 10) + "T23:59:59.000Z"
        if(inicial > final){
        }else{
        setRefresh(true)            
        await dispatch(getAllPnl( false , inicial, final, money, comitente))
        setRefresh(false)
        }            
    }   


    return (
        <>
            <Formik
                initialValues={{
                    searchText: "",
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
                            <div className="col-12">
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
                    </form>
                )}
            </Formik>
            {/* <div className="symbol-label ml-7" onClick={() => refreshListing()}>
                {refresh ? <CircularProgress size={15} color="secondary"/> :
                <i className="flaticon-refresh icon-xl text-primary" role="button"></i>}
            </div>       */}
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