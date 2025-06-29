/* eslint-disable eqeqeq */
import React, { useMemo, useState } from 'react';
import { Formik } from "formik";
import propTypes from 'prop-types';
import {isEqual} from "lodash";
import {useListingTableContext} from "./ListingTableContext";
import { getExcel } from '../../../../../utils/exportExcel';

const prepareFilter = (queryParams, values) => {
    const { searchText, searchTextAll } = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.transferId = searchText;
    filter.searchTextAll = searchTextAll;
    newQueryParams.filter = filter;
    return newQueryParams;
};

const ListingFilter = (props) => {

    const [report, setReport] = useState([])
      
    useMemo(() => {
        const dataFormated = props.data
        setReport(dataFormated)
    }, [props.data])

    const {
        queryParams,
        setQueryParams,
        setPageNumber,
    } = useListingTableContext();

    const applyFilter = (values) => {
        const newQueryParams = prepareFilter(queryParams, values);
        if (!isEqual(newQueryParams, queryParams)) {
            setPageNumber(1)
            newQueryParams.pageNumber = 1;
            setQueryParams(newQueryParams);
        }
    };

    const propertiesData = {
        header: ['Nombre',"CUIT",'CBU', 'Moneda', 'Importe', 'N° de transferencia'],
        properties:['ownerName', "cuit",'cbu', 'currency', 'amount', 'transferId'] ,
        array: report,
    }
    
    return (
        <>
            <Formik
                initialValues={{
                    searchText: "",
                    serchTextAll: ""
                }}
                onSubmit={(values) => {
                    applyFilter(values);
                }}
            >
                {({
                      values,
                      handleSubmit,
                      handleBlur,
                      setFieldValue,
                  }) => (
                    <form onSubmit={handleSubmit} className="form form-label-right">
                        <div className="row justify-space-around">
                            <div className="col-lg-6">
                                <input
                                    type="text"
                                    className="form-control"
                                    style={{width:'210px', marginRight: "35px"}}
                                    name="searchText"
                                    placeholder="Buscar por n° de transferencia"
                                    disabled={props.disabled}
                                    onBlur={handleBlur}
                                    value={values.searchText}
                                    onChange={(e) => {
                                        setFieldValue("searchText", e.target.value);
                                        handleSubmit();
                                    }}
                                />
                            </div>
                            {/*<div className='col-4'>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="searchTextAll"
                                        placeholder="Buscar"
                                        disabled={props.disabled}
                                        onBlur={handleBlur}
                                        value={values.serchTextAll}
                                        onChange={(e) => {
                                            setFieldValue("searchTextAll", e.target.value);
                                            handleSubmit()
                                        }}
                                    />
                                </div>*/}
                        </div>
                    </form>
                )}
            </Formik>
            {props.data.length > 0 ? 
            (
            <div className="symbol-label ml-7" onClick={() => getExcel(propertiesData, "Movimientos")}>
                <i className="flaticon2-download icon-xl text-primary" role="button"></i>
            </div>
            ):(
            <div className="symbol-label ml-7">
                <i className="flaticon2-download icon-xl text-secondary"></i>
            </div>
            )}
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