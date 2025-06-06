import React from 'react';
import { Formik } from "formik";
import {useListingTableContext} from "./ListingTableContext";
import {isEqual} from "lodash";
import propTypes from 'prop-types';
import { MenuItem, Select } from '@material-ui/core';

import { withSnackbar } from '../../../../../HOCs/withSnackbar';


const prepareFilter = (queryParams, values) => {
    const { searchText } = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.manager = searchText;
    newQueryParams.filter = filter;
    return newQueryParams;
};

const ListingFilter = ({disabled, quotasStatus, setStatusQuota}) => {

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

    return (
        <>
            <Formik
                initialValues={{
                    searchText: "",
                    status: 0
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
                    <form onSubmit={handleSubmit} className="form form-label-right" style={{width: "400px"}}>
                        <div className="row align-items-center">
                            <div className="col-6">
                                <Select
                                    name="status"
                                    label="Estado de la cuota"
                                    fullWidth
                                    value={values.status}
                                    onChange={(e)=>{
                                        setFieldValue("status", e.target.value)
                                        setStatusQuota(e.target.value)
                                    }}
                                    >
                                        <MenuItem key={0} value={0}>
                                            Todos
                                        </MenuItem>
                                        {quotasStatus.map((e)=>(
                                        <MenuItem key={e.id} value={e.id}>
                                            {e.status}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </div>
                            <div className="col-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    name="searchText"
                                    placeholder="Buscar por Gestor"
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

export default withSnackbar(ListingFilter);