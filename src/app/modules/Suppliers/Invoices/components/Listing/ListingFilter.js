import React from 'react';
import { Formik } from "formik";
import {isEqual} from "lodash";
import propTypes from 'prop-types';
import {useListingTableContext} from "./ListingTableContext";
import { Button } from '@material-ui/core'

const prepareFilter = (queryParams, values) => {
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.instrumento = values
    filter.especie=values
    newQueryParams.filter = filter;
    return newQueryParams;
};


const ListingFilter = ({disabled, data, setShowCreateModal}) => {

    const {
        queryParamsInstrument,
        setQueryParamsInstrument,
        setPageNumber
    } = useListingTableContext();

    
    const applyFilter = (values) => {
        const newQueryParams = prepareFilter(queryParamsInstrument, values);
        if (!isEqual(newQueryParams, queryParamsInstrument)) {
            setPageNumber(1)
            newQueryParams.pageNumber = 1;
            setQueryParamsInstrument(newQueryParams);
        }
    };  


    return (
        <>
            <Formik
                initialValues={{
                    searchText: "",
                    from:new Date(),
                    to:new Date(),
                    idMoney:1,
                    id:0,
                    searchQuery: '',
                }}
                onSubmit={(values) => {
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
                            <div className="col-12">
                                {/* <input
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
                                /> */}
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