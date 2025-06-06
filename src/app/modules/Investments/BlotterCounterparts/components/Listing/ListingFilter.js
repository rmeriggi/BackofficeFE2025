import React, { useState} from 'react';
import { Formik } from "formik";
import {isEqual} from "lodash";
import { useDispatch } from "react-redux";
import { CircularProgress } from "@material-ui/core";
import propTypes from 'prop-types';
import {useListingTableContext} from "./ListingTableContext";
import { getCounterparties } from "../../../../../_redux/combos/combosActions";
import { Button } from '@material-ui/core'

const prepareFilter = (queryParams, values) => {
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.Descripcion = values
    newQueryParams.filter = filter;
    return newQueryParams;
};


const ListingFilter = ({disabled, data, setShowCreateModal}) => {

    const [refresh, setRefresh] = useState(false)  

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
        setRefresh(true)            
        await dispatch(getCounterparties())
        setRefresh(false)            
    }

    async function refreshListing() { 
        setRefresh(true)            
        await dispatch(getCounterparties())
        setRefresh(false)            
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
                        <div className="row">
                            <div className="col-9">
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
                        </div>
                    </form>
                )}
            </Formik>
            <div className="symbol-label ml-7" onClick={() => refreshListing()}>
                {refresh ? <CircularProgress size={15} color="secondary"/> :
                <i className="flaticon-refresh icon-xl text-primary" role="button"></i>}
            </div>  
            <Button
                variant="contained"
                color="secondary"
                className="ml-4"
                size="large"
                onClick={() => setShowCreateModal(true)}
            >
                {'Crear'}
            </Button>    
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