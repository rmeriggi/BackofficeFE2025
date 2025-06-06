/* eslint-disable eqeqeq */
import React from 'react';
import { Formik } from "formik";
import {isEqual} from "lodash";
import { ClientStatusTitles } from '../../../../../../../modules/Clients/BankAccounts/context/ContextHelper';



const prepareFilter = (queryParams, values) => {
    const { searchText } = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.CBU = searchText;
    filter.CBUAlias = searchText;
    filter.entity = searchText;

   
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
                        </div>
                    </form>
                )}
            </Formik>
        </>
    );
}

export default ListingFilter;