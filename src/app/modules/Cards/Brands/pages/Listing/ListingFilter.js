/* eslint-disable eqeqeq */
import React, { useMemo, useState } from 'react';
import { Formik } from "formik";
import propTypes from 'prop-types';
import {isEqual} from "lodash";
import {useListingTableContext} from "./ListingTableContext";
import { getExcel } from '../../../../../utils/exportExcel';

const prepareFilter = (queryParams, values) => {
    const { searchText } = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.brandName = searchText;
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
        header: ["ID", "Marca", "Sponsor", "Bin", "País", "Entidad"],
        properties:["id", "brandName", "sponsorName", "bin", "country", "entity"] ,
        array: report,
    }
    
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
                      setFieldValue,
                  }) => (
                    <form onSubmit={handleSubmit} className="form form-label-right">
                        <div className="row justify-space-around">
                            <div className="col-lg-3">
                                <input
                                    type="text"
                                    className="form-control"
                                    style={{width:'150px'}}
                                    name="searchText"
                                    placeholder="Buscar"
                                    disabled={props.disabled}
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
            {props.data.length > 0 ? 
            (
            <div className="symbol-label ml-7" onClick={() => getExcel(propertiesData, "Marcas")}>
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