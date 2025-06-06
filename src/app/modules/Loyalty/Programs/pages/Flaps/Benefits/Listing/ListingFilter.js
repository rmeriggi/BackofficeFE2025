import React from 'react';
import { Formik } from "formik";
import {useListingTableContext} from "./ListingTableContext";
import {isEqual} from "lodash";
import propTypes from 'prop-types';

const prepareFilter = (queryParams, values) => {
    const { searchText } = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.programId = searchText;
    filter.benefit = searchText;
    filter.description = searchText;
    newQueryParams.filter = filter;
    return newQueryParams;
};

const ListingFilter = ({disabled}) => {

    const {
        queryParams,
        setQueryParams
    } = useListingTableContext();

    const applyFilter = (values) => {
        const newQueryParams = prepareFilter(queryParams, values);
        if (!isEqual(newQueryParams, queryParams)) {
            newQueryParams.pageNumber = 1;
            setQueryParams(newQueryParams);
        }
    };

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
                      handleChange,
                      setFieldValue,
                  }) => (
                    <form onSubmit={handleSubmit} className="form form-label-right">
                        <div className="form-group row justify-content-between">
                            <div className="col-lg-2">
                                <input
                                    type="text"
                                    className="form-control"
                                    style={{width:'250px'}}
                                    name="searchText"
                                    placeholder="Buscar por ID de Programa, descripción y beneficio"
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