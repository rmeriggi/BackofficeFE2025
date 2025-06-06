import React, { useMemo, useState } from 'react';
import { Formik } from "formik";
import {useListingTableContext} from "./ListingTableContext";
import {isEqual} from "lodash";
import { getExcel } from '../../../../../utils/exportExcel';
import { formatClientReport } from '../../../../../utils/formatData';

const prepareFilter = (queryParams, values) => {
    const { searchText } = values;
    const newQueryParams = { ...queryParams };
    const filter = {};
    filter.name = searchText;
    filter.lastName = searchText;
    filter.passport = searchText;
    filter.email = searchText;
    filter.account = searchText;
    newQueryParams.filter = filter;
    return newQueryParams;
};

const ListingFilter = ({disabled, data}) => {
    const [report, setReport] = useState([])
  
    useMemo(() => {
        const dataFormated = formatClientReport(data)
        setReport(dataFormated)
    }, [data])

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

    const propertiesData = {
        header: ['Nombre',"Apellido",'Email', 'Dni', 'Fecha alta', "País", "Estado", "Número de cuenta", "CVU", "Fecha CVU"],
        properties:['name', "lastName",'email', 'passport', "date", "country", "status", "account", "cvu", "dateCVU"],
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
                      handleChange,
                      setFieldValue,
                  }) => (
                    <form onSubmit={handleSubmit} className="form form-label-right">
                        <div className="row">
                            <div className="col-lg-2">
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
                        </div>
                    </form>
                )}
            </Formik>
            {data.length > 0 ? 
            (
            <div className="symbol-label ml-7" onClick={() => getExcel(propertiesData, "Clientes")}>
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


export default ListingFilter;