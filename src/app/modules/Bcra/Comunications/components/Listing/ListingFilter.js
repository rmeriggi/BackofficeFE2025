import React from 'react';
import { Formik } from "formik";
import {useListingTableContext} from "./ListingTableContext";
import {isEqual} from "lodash";
import propTypes from 'prop-types';

let value = 1
const consults = [
    {
        value: value++,
        name: "Solicitudes domicilio"
    }, {
        value: value++,
        name: "Solicitudes producto"
    }, {
        value: value++,
        name: "Solicitudes producto movimiento"
    }, {
        value: value++,
        name: "Medidas cautelares"
    },
]

const prepareFilter = (queryParams, values) => {
    const { searchText } = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.client = searchText;
    filter.comunication = searchText;
    newQueryParams.filter = filter;
    return newQueryParams;
};

const ListingFilter = ({disabled}) => {
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
                    consult: "",
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
                        <div className="row">
                            <div className="col-5">
                                <input
                                    type="text"
                                    className="form-control"
                                    style={{width:'200px'}}
                                    name="searchText"
                                    placeholder="Buscar"
                                    disabled={disabled}
                                    onBlur={handleBlur}
                                    value={values.searchText}
                                    onChange={(e) => {
                                        setFieldValue("searchText", e.target.value);
                                        handleSubmit();
                                    }}
                                />
                            </div>
                            <div className="col-6">
                                <select
                                className="form-control"
                                name="consult"
                                onChange={(e) => {
                                    setFieldValue("consult", e.target.value);
                                    handleSubmit();
                                }}
                                onBlur={handleBlur}
                                value={values.consult}
                                >
                                    <option value="">Todos</option>
                                    {consults.map((consult) => (
                                        <option key={consult.value} value={consult.value}>
                                            {consult.name}
                                        </option>
                                    ))}
                                </select>
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