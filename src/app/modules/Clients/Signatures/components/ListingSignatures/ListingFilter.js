import React from 'react';
import { Formik } from "formik";
import { isEqual } from "lodash";
import propTypes from 'prop-types';
import { useListingTableContext } from "./ListingTableContext";
import { Button } from '@material-ui/core';

const prepareFilter = (queryParams, values) => {
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.nameRelation = values;
    newQueryParams.filter = filter;
    return newQueryParams;
};

const ListingFilter = ({ disabled, data, setShowCreateModal }) => {
    const {
        queryParams,
        setQueryParams,
    } = useListingTableContext();

    const applyFilter = (values) => {
        const newQueryParams = prepareFilter(queryParams, values);
        if (!isEqual(newQueryParams, queryParams)) {
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
                    // return newListing(values);
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
